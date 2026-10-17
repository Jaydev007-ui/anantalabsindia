// ============================================================================
// ANANTA LABS INDIA — MULTI-PROVIDER LLM & STREAMING REASONING ENGINE
// Seamlessly delegates to Gemini, OpenAI, Groq, or Internal Grounded RAG Engine.
// ============================================================================

import { retrieveRelevantDocuments, KnowledgeDocument } from './knowledgeBase';
import { detectLanguage, SupportedLanguage, LANGUAGE_PACKS } from './multilingual';
import { routeUserIntent, UserIntent } from './intentRouter';

export interface ChatMessagePayload {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface StreamGenerationOptions {
  messages: ChatMessagePayload[];
  language?: SupportedLanguage;
  leadContext?: any;
}

export const ANANTA_SYSTEM_PROMPT = `You are Ananta AI, the digital intelligence interface of Ananta Labs India.
Ananta Labs India is a deep-tech research & development laboratory based in Vadodara, Gujarat, India, led by Director and Lead AI & Robotics Scientist Jaydevsinh Zala.
The laboratory specializes in Edge Computer Vision, Medical Technology & Clinical Fluidics, Embedded Hardware, and Intelligent Automation.
Ananta Labs India is an official member of the Intel Partner Alliance.

STRICT GROUNDING & ETHICAL POLICY:
1. ONLY state verified facts grounded in Ananta Labs official records.
2. Flagship projects:
   - SwachhVision: Real-time Edge AI civic sanitary enforcement & spitting detection (<120ms on embedded vision nodes like ESP32-CAM).
   - Automated Embalming Machine: Closed-loop pressure-regulated arterial perfusion replacing gravity feed in medical mortuaries.
3. If an answer cannot be verified from company records, admit it clearly and offer to connect the visitor with human directorship via anantalabsindia@gmail.com or +91-89807-41150.
4. Support English, Hindi, and Gujarati natively. Automatically respond in the language spoken by the user.
5. Provide clean GitHub Flavored Markdown with bold headers, concise bullet points, formatted code blocks, and source links.`;

/**
 * High-Precision Grounded RAG Generation Generator
 * Generates streaming tokens grounded in verified Ananta Labs documents.
 */
export async function* generateGroundedStream(
  options: StreamGenerationOptions
): AsyncGenerator<string, void, unknown> {
  const { messages, language: forcedLang } = options;
  const lastUserMessage = [...messages].reverse().find(m => m.role === 'user')?.content || '';
  const detectedLang = forcedLang || detectLanguage(lastUserMessage);
  const langPack = LANGUAGE_PACKS[detectedLang] || LANGUAGE_PACKS.en;
  const intentAnalysis = routeUserIntent(lastUserMessage);

  // 1. Check for external LLM API keys (Gemini / OpenAI / Groq)
  const geminiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;
  const groqKey = process.env.GROQ_API_KEY;

  const relevantDocs = retrieveRelevantDocuments(lastUserMessage, 3);
  const contextSnippet = relevantDocs
    .map((r, i) => `[Source ${i + 1}: ${r.doc.title} (${r.doc.url})]\n${r.doc.content}`)
    .join('\n\n');

  // If Gemini API Key is present, stream from Google Gemini
  if (geminiKey) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:streamGenerateContent?alt=sse&key=${geminiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            system_instruction: {
              parts: [{ text: `${ANANTA_SYSTEM_PROMPT}\n\nVERIFIED COMPANY CONTEXT:\n${contextSnippet}\nRespond in ${detectedLang === 'hi' ? 'Hindi' : detectedLang === 'gu' ? 'Gujarati' : 'English'}.` }]
            },
            contents: messages.map(m => ({
              role: m.role === 'user' ? 'user' : 'model',
              parts: [{ text: m.content }]
            })),
            generationConfig: {
              temperature: 0.2,
              maxOutputTokens: 1024,
            }
          })
        }
      );

      if (response.ok && response.body) {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const dataStr = line.slice(6).trim();
              if (dataStr === '[DONE]') break;
              try {
                const parsed = JSON.parse(dataStr);
                const text = parsed?.candidates?.[0]?.content?.parts?.[0]?.text;
                if (text) yield text;
              } catch {}
            }
          }
        }
        return;
      }
    } catch (e) {
      console.warn('Gemini stream failed, falling back to Internal Grounded Engine:', e);
    }
  }

  // If OpenAI API Key is present, stream from OpenAI
  if (openaiKey) {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openaiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          stream: true,
          messages: [
            {
              role: 'system',
              content: `${ANANTA_SYSTEM_PROMPT}\n\nVERIFIED COMPANY CONTEXT:\n${contextSnippet}\nRespond in ${detectedLang === 'hi' ? 'Hindi' : detectedLang === 'gu' ? 'Gujarati' : 'English'}.`,
            },
            ...messages.map(m => ({ role: m.role, content: m.content })),
          ],
          temperature: 0.2,
        }),
      });

      if (response.ok && response.body) {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const dataStr = line.slice(6).trim();
              if (dataStr === '[DONE]') break;
              try {
                const parsed = JSON.parse(dataStr);
                const delta = parsed?.choices?.[0]?.delta?.content;
                if (delta) yield delta;
              } catch {}
            }
          }
        }
        return;
      }
    } catch (e) {
      console.warn('OpenAI stream failed, falling back to Internal Grounded Engine:', e);
    }
  }

  // If Groq API Key is present, stream from Groq
  if (groqKey) {
    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${groqKey}`,
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          stream: true,
          messages: [
            {
              role: 'system',
              content: `${ANANTA_SYSTEM_PROMPT}\n\nVERIFIED COMPANY CONTEXT:\n${contextSnippet}\nRespond in ${detectedLang === 'hi' ? 'Hindi' : detectedLang === 'gu' ? 'Gujarati' : 'English'}.`,
            },
            ...messages.map(m => ({ role: m.role, content: m.content })),
          ],
          temperature: 0.2,
        }),
      });

      if (response.ok && response.body) {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const dataStr = line.slice(6).trim();
              if (dataStr === '[DONE]') break;
              try {
                const parsed = JSON.parse(dataStr);
                const delta = parsed?.choices?.[0]?.delta?.content;
                if (delta) yield delta;
              } catch {}
            }
          }
        }
        return;
      }
    } catch (e) {
      console.warn('Groq stream failed, falling back to Internal Grounded Engine:', e);
    }
  }

  // --------------------------------------------------------------------------
  // INTERNAL HIGH-PRECISION GROUNDED RAG SYNTHESIS ENGINE
  // Zero external dependencies required: executes deterministic grounded RAG.
  // --------------------------------------------------------------------------
  const synthesizedChunks = buildGroundedResponse({
    intent: intentAnalysis.intent,
    query: lastUserMessage,
    relevantDocs,
    lang: detectedLang,
    langPack,
  });

  for (const chunk of synthesizedChunks) {
    yield chunk;
    // Natural human reading cadence
    await new Promise(r => setTimeout(r, 22));
  }
}

/**
 * Builds a structured, factually grounded response using retrieved documents.
 */
function buildGroundedResponse(params: {
  intent: UserIntent;
  query: string;
  relevantDocs: { doc: KnowledgeDocument; score: number }[];
  lang: SupportedLanguage;
  langPack: any;
}): string[] {
  const { intent, query, relevantDocs, lang, langPack } = params;
  const q = query.toLowerCase();

  let text = '';

  // 1. Human Escalation Intent
  if (intent === 'HUMAN_ESCALATION') {
    if (lang === 'hi') {
      text = `आप अनंता लैब्स इंडिया की कोर इंजीनियरिंग टीम और डायरेक्टर्स से सीधे संपर्क कर सकते हैं:\n\n` +
        `• **ईमेल:** [anantalabsindia@gmail.com](mailto:anantalabsindia@gmail.com)\n` +
        `• **अनुसंधान पूछताछ:** [research@anantalabsindia.org](mailto:research@anantalabsindia.org)\n` +
        `• **आधिकारिक फ़ोन:** [+91-89807-41150](tel:+918980741150)\n` +
        `• **मुख्यालय:** वडोदरा, गुजरात, भारत (390001)\n\n` +
        `आप हमारे [पार्टनरशिप फॉर्म](/#contact) के माध्यम से भी सीधे प्रोजेक्ट पूछताछ भेज सकते हैं।`;
    } else if (lang === 'gu') {
      text = `તમે અનંતા લેબ્સ ઇન્ડિયાની એન્જિનિયરિંગ ટીમ અને ડિરેક્ટર્સ સાથે સીધો સંપર્ક કરી શકો છો:\n\n` +
        `• **ઇમેઇલ:** [anantalabsindia@gmail.com](mailto:anantalabsindia@gmail.com)\n` +
        `• **સંશોધન પૂછપરછ:** [research@anantalabsindia.org](mailto:research@anantalabsindia.org)\n` +
        `• **સત્તાવાર ફોન:** [+91-89807-41150](tel:+918980741150)\n` +
        `• **હેડક્વાર્ટર:** વડોદરા, ગુજરાત, ભારત (390001)\n\n` +
        `તમે [પાર્ટનરશીપ ફોર્મ](/#contact) દ્વારા પણ સીધી પૂછપરછ મોકલી શકો છો.`;
    } else {
      text = `You can connect directly with our engineering directorship and researchers:\n\n` +
        `• **Corporate Communications:** [anantalabsindia@gmail.com](mailto:anantalabsindia@gmail.com)\n` +
        `• **Research & Development:** [research@anantalabsindia.org](mailto:research@anantalabsindia.org)\n` +
        `• **Direct Laboratory Desk:** [+91-89807-41150](tel:+918980741150)\n` +
        `• **Headquarters:** Vadodara, Gujarat, India (Postal Code: 390001)\n\n` +
        `You can also schedule an engineering review via our [Project Consultation Form](/#contact).`;
    }
  }

  // 2. Lead Qualification / Project Inquiry Intent
  else if (intent === 'LEAD_QUALIFICATION') {
    if (lang === 'hi') {
      text = `अनंता लैब्स इंडिया कस्टम डीप-टेक इंजीनियरिंग, कंप्यूटर विजन डिप्लॉयमेंट, और मेडिकल डिवाइस प्रोटोटाइपिंग के लिए प्रोजेक्ट कंसल्टेशन प्रदान करता है।\n\n` +
        `हम आपके प्रोजेक्ट को समझने के लिए तैयार हैं:\n` +
        `1. आपका प्रोजेक्ट उद्देश्य या इंजीनियरिंग चुनौती क्या है?\n` +
        `2. क्या आप हार्डवेयर (Embedded/Sensors) या सॉफ्टवेयर (AI/Vision) विकसित करना चाहते हैं?\n` +
        `3. आपकी अनुमानित टाइमलाइन क्या है?\n\n` +
        `आप नीचे दिए गए फ़ॉर्म से या [सीधे प्रोजेक्ट इंक्वायरी सबमिट करें](/#contact) जिससे हमारे वैज्ञानिक आपसे संपर्क करेंगे।`;
    } else if (lang === 'gu') {
      text = `અનંતા લેબ્સ ઇન્ડિયા કસ્ટમ ડીપ-ટેક એન્જિનિયરિંગ, કમ્પ્યુટર વિઝન અને મેડિકલ ફ્લુઇડિક્સ માટે પ્રોજેક્ટ કન્સલ્ટેશન ઓફર કરે છે.\n\n` +
        `અમારી ટીમ તમારા પ્રોજેક્ટને મૂલ્યાંકન કરવા તૈયાર છે:\n` +
        `1. તમારા પ્રોજેક્ટનો મુખ્ય ઉદ્દેશ્ય શું છે?\n` +
        `2. તમારી ટેકનિકલ જરૂરિયાત શું છે?\n\n` +
        `તમે અહીં સીધી વિગતો જણાવી શકો છો અથવા [પાર્ટનર વિથ અસ ફોર્મ](/#contact) ભરી શકો છો.`;
    } else {
      text = `Ananta Labs India accepts custom engineering partnerships, institutional R&D contracts, and prototyping commissions across Edge AI and Medical Hardware.\n\n` +
        `To structure your consultation with Director Jaydevsinh Zala, please share:\n` +
        `• **Project Objective:** The core technical problem or prototype you are building.\n` +
        `• **Domain:** (e.g., Computer Vision, Clinical Fluidics, TinyML, or Embedded Automation).\n` +
        `• **Target Deployment Timeline & Organization.**\n\n` +
        `You can reply here directly with your project summary, or submit your specifications via our [Direct R&D Inquiry Portal](/#contact).`;
    }
  }

  // 3. Product Discovery & Flagship Systems
  else if (intent === 'PRODUCT_DISCOVERY' || q.includes('swachhvision') || q.includes('embalming') || q.includes('store')) {
    if (q.includes('swachhvision') || q.includes('spitting')) {
      text = `### **SwachhVision — Real-Time Edge AI Civic Compliance**\n\n` +
        `**SwachhVision** is an end-to-end edge-computed artificial intelligence system engineered by Ananta Labs India for sanitary enforcement in smart cities, clean industrial corridors, and transport terminals.\n\n` +
        `**Key Verified Technical Specifications:**\n` +
        `• **Lightweight Vision Architecture:** Custom-trained neural network operating on edge nodes under 120ms latency.\n` +
        `• **On-Device Inference:** Zero cloud roundtrip latencies; privacy-preserving local metadata logging.\n` +
        `• **Hardware Integration:** Optimized for Intel architecture via Intel OpenVINO and low-power ESP32 optical nodes.\n\n` +
        `👉 [Explore Flagship Systems Specification](/#flagship-systems)`;
    } else if (q.includes('embalming') || q.includes('fluid') || q.includes('pump')) {
      text = `### **Automated Embalming Machine & Clinical Fluidics**\n\n` +
        `The **Automated Embalming Machine** is a closed-loop computerized clinical fluidics platform designed for hospital mortuaries, medical colleges, and forensic anatomy laboratories.\n\n` +
        `**Key Verified Technical Specifications:**\n` +
        `• **Closed-Loop Regulation:** Electronic pressure sensors monitor vascular resistance in real time to prevent specimen rupture.\n` +
        `• **Deterministic Pumping:** High-precision peristaltic & diaphragm pump manifolds replacing unregulated gravity perfusion.\n` +
        `• **Enclosure & Controls:** Medical-grade IP65 touchscreen console with automated failsafe cutoffs.\n\n` +
        `👉 [View Engineering Details on Flagship Page](/#flagship-systems)`;
    } else {
      text = `### **Ananta Labs Verified Hardware & Solutions Catalog**\n\n` +
        `Our engineering store and flagship systems catalog includes:\n\n` +
        `1. **SwachhVision:** Edge AI computer vision node for sanitary compliance and civic tracking. [Learn More](/#flagship-systems)\n` +
        `2. **Automated Embalming Machine:** Pressure-regulated clinical fluidics platform for hospital mortuaries. [Learn More](/#flagship-systems)\n` +
        `3. **ESP32-CAM Industrial Node:** Edge vision processing node with OV2640 sensor and TinyML firmware. [View in Store](/#store)\n` +
        `4. **Precision Fluidic Pump Assembly:** Digital PID pressure-regulated medical pumping module. [View in Store](/#store)\n\n` +
        `Visit our [Hardware Store](/#store) or consult with our team for custom specifications.`;
    }
  }

  // 4. Grounded Knowledge Retrieval fallback
  else if (relevantDocs.length > 0) {
    const topDoc = relevantDocs[0].doc;
    text = `### **${topDoc.title}**\n\n` +
      `${topDoc.content}\n\n` +
      `🔗 **Official Reference:** [${topDoc.title}](${topDoc.url})\n\n` +
      `*Source: Ananta Labs India Verified Digital Registry.*`;
  }

  // 5. General Greeting & Honest Fallback
  else {
    if (lang === 'hi') {
      text = `नमस्ते! मैं **अनंता एआई (Ananta AI)** हूँ। मैं अनंता लैब्स इंडिया के प्रमाणित अनुसंधान रिकॉर्ड, उत्पादों और इंजीनियरिंग समाधानों पर आधारित जानकारी प्रदान करता हूँ।\n\n` +
        `आप मुझसे इन विषयों पर पूछ सकते हैं:\n` +
        `• **फ्लैगशिप सिस्टम्स:** SwachhVision या Automated Embalming Machine\n` +
        `• **रिसर्च मेट्रिक्स:** 6 प्रोजेक्ट्स, 4 प्रायोगिक अध्ययन, 2 पेटेंट्स\n` +
        `• **प्रोजेक्ट कंसल्टेशन:** अपने कस्टम आरएंडडी या प्रोटोटाइपिंग की चर्चा करें\n\n` +
        `मैं आज आपकी किस प्रकार सहायता कर सकता हूँ?`;
    } else if (lang === 'gu') {
      text = `નમસ્તે! હું **અનંતા એઆઈ (Ananta AI)** છું. અનંતા લેબ્સ ઇન્ડિયાના સત્તાવાર ટેકનોલોજી અને એન્જિનિયરિંગ રિસર્ચ વિશે હું તમને સચોટ માહિતી આપી શકું છું.\n\n` +
        `તમે આ વિષયો પર પૂછી શકો છો:\n` +
        `• **SwachhVision અને Embalming Machine** ના સ્પેસિફિકેશન્સ\n` +
        `• **હાર્ડવેર સ્ટોર:** ESP32 વિઝન નોડ્સ અને ફ્લુઇડિક પમ્પ્સ\n` +
        `• **પ્રોજેક્ટ કન્સલ્ટેશન:** નવી સિસ્ટમ ડિઝાઇન કરવા માટે\n\n` +
        `તમારો પ્રશ્ન જણાવો.`;
    } else {
      text = `Hello! I am **Ananta AI**, the digital intelligence assistant of Ananta Labs India.\n\n` +
        `I am grounded strictly in our verified laboratory documentation and can assist you with:\n` +
        `• **Flagship Engineering Systems:** SwachhVision & Automated Embalming Machine.\n` +
        `• **Technical Specializations:** Edge AI, Computer Vision, TinyML, and Clinical Fluidics.\n` +
        `• **Laboratory Track Record:** 6 Research Projects, 4 Experimental Studies, 2 Patents & IP.\n` +
        `• **Project Consultation & Inquiries:** Discuss custom prototyping with our engineering directorship.\n\n` +
        `How may I assist your engineering inquiry today?`;
    }
  }

  // Stream word-by-word with punctuation grouping
  const words = text.split(/(\s+)/);
  const chunks: string[] = [];
  let buffer = '';

  for (let i = 0; i < words.length; i++) {
    buffer += words[i];
    if (buffer.length > 12 || i === words.length - 1) {
      chunks.push(buffer);
      buffer = '';
    }
  }

  return chunks;
}
