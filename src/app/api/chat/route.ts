import { NextRequest, NextResponse } from 'next/server';
import { generateGroundedStream, ChatMessagePayload } from '@/lib/ai/llmProvider';
import { checkRateLimit } from '@/lib/ai/rateLimiter';
import { detectLanguage } from '@/lib/ai/multilingual';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    // 1. Sliding-Window Rate Limiting per IP
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
               req.headers.get('x-real-ip') || 
               'anonymous-client';
    
    const rateCheck = checkRateLimit(ip, 35, 60 * 1000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { 
          error: 'Rate limit exceeded. Please wait a moment before sending another message.',
          resetInMs: rateCheck.resetInMs 
        },
        { 
          status: 429,
          headers: {
            'Retry-After': Math.ceil(rateCheck.resetInMs / 1000).toString(),
          }
        }
      );
    }

    // 2. Payload Validation & Sanitization
    const body = await req.json();
    const { messages, language } = body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Messages array is required.' }, { status: 400 });
    }

    // Limit conversation context to last 15 messages to prevent context overflow attacks
    const sanitizedMessages: ChatMessagePayload[] = messages
      .slice(-15)
      .map(m => ({
        role: m.role === 'user' ? 'user' : 'assistant',
        content: String(m.content || '').slice(0, 2000).trim()
      }))
      .filter(m => m.content.length > 0);

    if (sanitizedMessages.length === 0) {
      return NextResponse.json({ error: 'Valid message content required.' }, { status: 400 });
    }

    // 3. Create Server-Sent Events (SSE) ReadableStream
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          const generator = generateGroundedStream({
            messages: sanitizedMessages,
            language: language || detectLanguage(sanitizedMessages[sanitizedMessages.length - 1].content)
          });

          for await (const chunk of generator) {
            const payload = JSON.stringify({ text: chunk });
            controller.enqueue(encoder.encode(`data: ${payload}\n\n`));
          }

          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          controller.close();
        } catch (streamError: any) {
          console.error('Chat stream execution error:', streamError);
          const errorPayload = JSON.stringify({ error: 'Stream interrupted. Please try again.' });
          controller.enqueue(encoder.encode(`data: ${errorPayload}\n\n`));
          controller.close();
        }
      }
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream; charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
        'Connection': 'keep-alive',
      }
    });

  } catch (error: any) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error processing conversation.' },
      { status: 500 }
    );
  }
}
