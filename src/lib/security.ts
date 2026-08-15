import { insertThreat } from "@/lib/db";

// Helper to detect SQL Injections and XSS Payloads
export function detectThreats(obj: any): { hasThreat: boolean; details: string; type: string } {
  const sqlPattern = /('|--|#|\/\*|\*\/|UNION\s+SELECT|DROP\s+TABLE|INSERT\s+INTO|OR\s+['"]?\d+['"]?\s*=\s*['"]?\d+['"]?)/gi;
  const xssPattern = /(<script\b[^>]*>|onerror\s*=|onload\s*=|javascript\s*:|alert\s*\(|confirm\s*\(|<iframe\b)/gi;

  for (const key in obj) {
    if (typeof obj[key] === "string") {
      const val = obj[key];
      if (sqlPattern.test(val)) {
        return { 
          hasThreat: true, 
          type: "SQL Injection Exploit", 
          details: `Suspicious SQL query syntax identified in request field [${key}]: "${val}"` 
        };
      }
      if (xssPattern.test(val)) {
        return { 
          hasThreat: true, 
          type: "Cross-Site Scripting Exploit", 
          details: `Active script execution token identified in request field [${key}]: "${val}"` 
        };
      }
    }
  }
  return { hasThreat: false, details: "", type: "" };
}

// Log input exploit threat on server side and trigger warning
export async function logExploitAttempt(type: string, details: string, reqUrl: string) {
  const threatId = `AN-THR-${Math.floor(100000 + Math.random() * 900000)}`;
  const threat = {
    id: threatId,
    type,
    source: `Server API [${reqUrl}]`,
    details,
    date: new Date().toISOString(),
  };

  try {
    await insertThreat(threat);
    
    // Trigger external email dispatch using the API internal route handler (sends SMTP email)
    const base = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    await fetch(`${base}/api/threats`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(threat)
    });
  } catch (err) {
    console.error("Exploit logging failed:", err);
  }
}
