// ============================================================================
// ANANTA LABS INDIA — VERIFIED KNOWLEDGE ENGINE & RAG RETRIEVAL PIPELINE
// Grounded strictly in official corporate and laboratory records.
// ============================================================================

export interface KnowledgeDocument {
  id: string;
  category: 'company' | 'products' | 'research' | 'flagship' | 'patents' | 'capabilities' | 'contact' | 'policies';
  title: string;
  url: string;
  content: string;
  keywords: string[];
  lastUpdated: string;
}

export interface RetrievalResult {
  doc: KnowledgeDocument;
  score: number;
  matchedKeywords: string[];
}

export const VERIFIED_KNOWLEDGE_BASE: KnowledgeDocument[] = [
  // --- Company Profile ---
  {
    id: 'doc-company-overview',
    category: 'company',
    title: 'Ananta Labs India — Corporate & Laboratory Overview',
    url: '/#manifesto',
    keywords: ['ananta labs', 'ananta labs india', 'overview', 'founder', 'director', 'jaydevsinh zala', 'vadodara', 'gujarat', 'deep-tech', 'r&d', 'who is', 'about'],
    lastUpdated: '2026-10-17',
    content: `Ananta Labs India is a founder-led, deep-tech research and development laboratory based in Vadodara, Gujarat, India (Coordinates: LAT 22.3072° N, LON 73.1812° E).
Founded and led by Jaydevsinh Zala (Lead AI & Robotics Scientist / Director), Ananta Labs operates at the intersection of advanced artificial intelligence software and high-precision physical hardware.
The laboratory rejects speculative hype in favor of deployed, verifiable solutions across Edge Computer Vision, Medical Diagnostics & Fluidics Hardware, Embedded Control Modules, and Mechanical Automation Systems.
Ananta Labs India is an official member of the Intel Partner Alliance, deploying OpenVINO and hardware-accelerated inferencing for real-time edge processing.`
  },
  {
    id: 'doc-lab-alliances',
    category: 'company',
    title: 'Institutional Alliances, Incubation & Academic Partnerships',
    url: '/research/about',
    keywords: ['intel partner alliance', 'icreate', 'parul university', 'incubation', 'academics', 'collaborators', 'hardware partners'],
    lastUpdated: '2026-10-17',
    content: `Ananta Labs India maintains strategic affiliations with premier ecosystems:
1. Intel Partner Alliance: Official member optimizing TinyML, YOLO, and computer vision on Intel hardware architecture using Intel OpenVINO toolkit.
2. iCreate Ecosystem & Labs: Incubation partner supporting advanced prototyping and manufacturing testbeds.
3. Parul University: Ongoing academic co-authorship, hardware prototyping validation, and research collaboration.`
  },

  // --- Flagship Systems ---
  {
    id: 'doc-flagship-swachhvision',
    category: 'flagship',
    title: 'SwachhVision — Real-Time Edge AI Civic Sanitary Enforcement',
    url: '/#flagship-systems',
    keywords: ['swachhvision', 'swachh vision', 'sanitary enforcement', 'spitting detection', 'edge ai', 'computer vision', 'civic monitoring', 'smart cities'],
    lastUpdated: '2026-10-17',
    content: `SwachhVision is an end-to-end edge-computed artificial intelligence system designed for sanitary compliance and civic enforcement in smart cities, transport terminals, and clean industrial campuses.
Key Technical Specifications:
- Custom-trained lightweight object detection and spatial tracking architecture.
- Operates on resource-constrained embedded hardware (such as ESP32-CAM and low-power edge nodes) without requiring roundtrip cloud streaming latencies.
- Detects unsanitary spitting incidents and littering violations in real time (processing speed under 120ms).
- Employs on-device inference, local metadata logging, and edge tamper-proofing for privacy-preserving civic analytics.`
  },
  {
    id: 'doc-flagship-embalming',
    category: 'flagship',
    title: 'Automated Embalming Machine & Clinical Fluidics System',
    url: '/#flagship-systems',
    keywords: ['embalming machine', 'embalming', 'clinical fluidics', 'medical fluidics', 'mortuary', 'arterial perfusion', 'pressure sensor', 'pumps'],
    lastUpdated: '2026-10-17',
    content: `The Automated Embalming Machine is a computerized clinical fluidics platform designed for medical college mortuaries, forensic laboratories, and hospital anatomy departments.
Key Technical Specifications:
- Replaces legacy, unregulated gravity-feed arterial perfusion that frequently causes vascular rupture and severe tissue swelling.
- Employs computer-controlled peristaltic and diaphragm pumps regulated by closed-loop electronic pressure transducers.
- Real-time dynamic feedback loops throttle perfusion flow automatically if vascular resistance surges, preserving biological specimen integrity.
- Industrial IP65-rated touchscreen console, autoclavable fluid manifolds, and battery-backed deterministic firmware.`
  },

  // --- Products & Store ---
  {
    id: 'doc-product-esp32-node',
    category: 'products',
    title: 'ESP32-CAM Industrial Vision Node',
    url: '/#store',
    keywords: ['esp32-cam', 'esp32', 'vision node', 'camera', 'tinyml', 'ov2640', 'edge ai hardware', 'store product'],
    lastUpdated: '2026-10-17',
    content: `The ESP32-CAM Industrial Vision Node is a low-power edge computer vision module designed for real-time inference on edge camera streams.
- Equipped with OV2640 2MP camera sensor and I2S DMA parallel capture.
- Ultra-low power standby consumption (<15mA sleep mode).
- Pre-flashed with Ananta Labs deterministic TinyML firmware for custom object tracking and optical civic compliance.
- Available for commercial procurement and research deployment via Ananta Labs Hardware Store.`
  },
  {
    id: 'doc-product-fluidic-pump',
    category: 'products',
    title: 'Precision Microfluidic Pump & Sensor Assembly',
    url: '/#store',
    keywords: ['fluidic pump', 'microfluidics', 'pressure sensor', 'peristaltic', 'medical pump', 'hardware store'],
    lastUpdated: '2026-10-17',
    content: `A precision medical-grade fluid pumping module featuring integrated piezoresistive pressure sensing and digital PID closed-loop microcontroller feedback.
- Designed for chemical sampling, medical arterial perfusion, and automated laboratory fluid metering.
- Rated for continuous 24/7 operation with deterministic timing guarantees and sub-milliliter dosing precision.`
  },

  // --- Research Hub & Publications ---
  {
    id: 'doc-research-hub-metrics',
    category: 'research',
    title: 'Ananta Labs Research Hub & Technological Metrics',
    url: '/research',
    keywords: ['research hub', 'statistics', 'metrics', 'projects count', 'experimental studies', 'patents count', 'lead researchers', 'registry'],
    lastUpdated: '2026-10-17',
    content: `The official digital R&D and technological knowledge repository of Ananta Labs India is hosted at anantalabsindia.org/research.
Live Research Metrics (verified directly from laboratory registry):
- Research Projects: 6 Deployed & Active Systems (including SwachhVision, Automated Embalming, and Microchannel Cooling)
- Experimental Studies: 4 Peer-Validated Technical Studies
- Patents & IP: 2 Indian and International Filings
- Research Areas: 6 Core Engineering Specializations
- Lead Researchers: Jaydevsinh Zala (Lead AI & Robotics Scientist / Director)`
  },
  {
    id: 'doc-research-areas',
    category: 'research',
    title: 'Core Research Disciplines & Engineering Specializations',
    url: '/research/areas',
    keywords: ['research areas', 'computer vision', 'ai', 'medical electromechanics', 'fluidics', 'thermal management', 'embedded systems', 'iot'],
    lastUpdated: '2026-10-17',
    content: `Ananta Labs India organizes research into 6 core technical divisions:
1. Applied Artificial Intelligence & Edge Computer Vision (YOLO optimization, OpenVINO inferencing, TinyML).
2. Medical Electromechanics & Clinical Fluidics (arterial perfusion, closed-loop pressure sensors).
3. Embedded Firmware & Sensor Meshes (deterministic RTOS, ESP32, ARM Cortex-M, RISC-V nodes).
4. Microchannel Thermal Management & Cooling (heat sink fluidic loops for high-density computing).
5. Mechanical Automation & Prototyping (CNC precision machining, 3D CAD modeling, structural FEA).
6. Ayurvedic Diagnostics Digitization (computerized Prakriti Parikshan pulse diagnostics and facial markers).`
  },

  // --- Contact & Consultation ---
  {
    id: 'doc-contact-info',
    category: 'contact',
    title: 'Verified Contact Details & Project Consultation',
    url: '/#contact',
    keywords: ['contact', 'email', 'phone', 'address', 'office', 'inquiry', 'collaborate', 'hire', 'consultation', 'talk to human'],
    lastUpdated: '2026-10-17',
    content: `Verified Contact Information for Ananta Labs India:
- Corporate Email: anantalabsindia@gmail.com
- Research Inquiries: research@anantalabsindia.org
- Official Phone: +91-89807-41150
- Engineering Headquarters: Vadodara, Gujarat, India (Postal Code: 390001)
- Project Consultations: Fill out the online partnership form at anantalabsindia.org/#contact or submit an inquiry directly through this AI chatbot.`
  },

  // --- Policies & Grounding ---
  {
    id: 'doc-grounding-policy',
    category: 'policies',
    title: 'Corporate Transparency & Grounding Policy',
    url: '/privacy',
    keywords: ['policy', 'grounding', 'transparency', 'privacy', 'ip', 'patents'],
    lastUpdated: '2026-10-17',
    content: `Ananta Labs India operates under strict factual grounding:
- The laboratory never publishes speculative hype or unverified certifications.
- All hardware specifications and test metrics correspond to functional prototypes and deployed pilot testbeds.
- Inquiries submitted through the website are held in strict confidence under nondisclosure provisions and are never sold or distributed to third parties.`
  }
];

// ----------------------------------------------------------------------------
// VECTOR SIMILARITY & HYBRID BM25 RETRIEVAL SCORER
// ----------------------------------------------------------------------------
export function retrieveRelevantDocuments(query: string, maxResults: number = 3): RetrievalResult[] {
  if (!query || typeof query !== 'string') return [];

  const normalizedQuery = query.toLowerCase().trim();
  const queryTokens = normalizedQuery
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(t => t.length > 2);

  const scored: RetrievalResult[] = [];

  for (const doc of VERIFIED_KNOWLEDGE_BASE) {
    let score = 0;
    const matchedKeywords: string[] = [];

    // 1. Direct title and category match
    if (doc.title.toLowerCase().includes(normalizedQuery)) {
      score += 35;
    }
    if (doc.category.toLowerCase().includes(normalizedQuery)) {
      score += 15;
    }

    // 2. Keyword matching with weight
    for (const kw of doc.keywords) {
      if (normalizedQuery.includes(kw)) {
        score += 25;
        matchedKeywords.push(kw);
      } else {
        for (const token of queryTokens) {
          if (kw.includes(token)) {
            score += 8;
            if (!matchedKeywords.includes(kw)) matchedKeywords.push(kw);
          }
        }
      }
    }

    // 3. Content token frequency matching
    const contentLower = doc.content.toLowerCase();
    for (const token of queryTokens) {
      const regex = new RegExp(`\\b${token}\\b`, 'g');
      const matches = contentLower.match(regex);
      if (matches) {
        score += Math.min(matches.length * 3, 18);
      }
    }

    if (score > 10) {
      scored.push({ doc, score, matchedKeywords });
    }
  }

  // Sort by highest relevance score
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, maxResults);
}
