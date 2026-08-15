import { NextResponse } from "next/server";
import { queryThreats, insertThreat } from "@/lib/db";
import nodemailer from "nodemailer";

export const dynamic = "force-dynamic";

// Email dispatcher helper
async function sendAlertEmail(threat: any) {
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT || "587";
  const smtpUser = process.env.SMTP_USER || process.env.EMAIL_USER;
  const smtpPass = process.env.SMTP_PASS || process.env.EMAIL_PASS;

  console.log(`[SECURITY DISPATCH] Threat incident detected. Type: ${threat.type}`);

  if (!smtpHost || !smtpUser || !smtpPass) {
    console.warn("[SECURITY DISPATCH] SMTP mail server variables not configured. Alert email logging simulated to console.");
    return false;
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: parseInt(smtpPort, 10),
      secure: smtpPort === "465",
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const mailOptions = {
      from: `"Unify Security Shield" <${smtpUser}>`,
      to: "anantalabsindia@gmail.com",
      subject: `🚨 [SECURITY ALERT] ${threat.type} Incident Reported`,
      text: `
Unify Security Shield has detected a potential threat incident.

-----------------------------------------
INCIDENT PARAMETERS
-----------------------------------------
Incident ID: ${threat.id}
Incident Type: ${threat.type}
Incident Date: ${threat.date}
Source Target: ${threat.source}

Details:
${threat.details}

-----------------------------------------
Ananta Labs India • Unify Content Protection Engine
      `,
      html: `
        <div style="font-family: monospace; background-color: #050505; color: #E5E7EB; padding: 24px; border: 1px solid #DC2626;">
          <h2 style="color: #EF4444; margin-top: 0; border-bottom: 2px solid #EF4444; padding-bottom: 8px;">
            🚨 SECURITY THREAT INCIDENT REPORTED
          </h2>
          <table style="width: 100%; border-collapse: collapse; font-size: 12px; margin: 16px 0;">
            <tr>
              <td style="padding: 6px; color: #6B7280; font-weight: bold; width: 120px;">INCIDENT ID:</td>
              <td style="padding: 6px; color: #FFFFFF;">${threat.id}</td>
            </tr>
            <tr>
              <td style="padding: 6px; color: #6B7280; font-weight: bold;">INCIDENT TYPE:</td>
              <td style="padding: 6px; color: #F87171; font-weight: bold;">${threat.type}</td>
            </tr>
            <tr>
              <td style="padding: 6px; color: #6B7280; font-weight: bold;">DATE / TIME:</td>
              <td style="padding: 6px; color: #FFFFFF;">${threat.date}</td>
            </tr>
            <tr>
              <td style="padding: 6px; color: #6B7280; font-weight: bold;">SOURCE ADDR:</td>
              <td style="padding: 6px; color: #60A5FA;">${threat.source}</td>
            </tr>
          </table>
          <div style="border-top: 1px solid #1F2937; padding-top: 12px; margin-top: 12px;">
            <strong style="color: #9CA3AF; display: block; margin-bottom: 4px;">INCIDENT LOG DETAILS:</strong>
            <pre style="background-color: #111827; padding: 12px; border-radius: 4px; overflow-x: auto; color: #F97316; font-size: 11px; margin: 0; border: 1px solid #374151;">${threat.details}</pre>
          </div>
          <div style="margin-top: 24px; font-size: 9px; color: #4B5563; border-top: 1px solid #1F2937; padding-top: 8px; text-align: center;">
            Ananta Labs India • Unify Content Protection Engine
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("[SECURITY DISPATCH] Alert email dispatched successfully. Message ID:", info.messageId);
    return true;
  } catch (err) {
    console.error("[SECURITY DISPATCH] SMTP delivery failed:", err);
    return false;
  }
}

export async function GET() {
  try {
    const data = await queryThreats();
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: "Failed to query threat logs" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const threatId = body.id || `AN-THR-${Math.floor(100000 + Math.random() * 900000)}`;
    const threat = {
      id: threatId,
      type: body.type || "Unknown Activity",
      source: body.source || "External",
      details: body.details || "No details provided.",
      date: body.date || new Date().toISOString(),
    };

    await insertThreat(threat);
    await sendAlertEmail(threat);
    return NextResponse.json({ success: true, id: threatId });
  } catch (e) {
    return NextResponse.json({ error: "Failed to record threat" }, { status: 500 });
  }
}
