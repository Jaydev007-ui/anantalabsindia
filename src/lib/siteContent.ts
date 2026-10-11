// Centralized Site Content & Admin State System
// Supports live updates across all sections, role-based passkeys, internal R&D, attendance, and targets

export interface ProductItem {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  price: number;
  specs: { label: string; value: string }[];
  features: string[];
  imageUrl: string;
  inStock: boolean;
  featured?: boolean;
}

export interface PatentItem {
  id: string;
  category: string;
  title: string;
  org: string;
  desc: string;
  tag: string;
  link?: string;
}

export interface CapabilityItem {
  id: string;
  iconName: string;
  title: string;
  description: string;
  metric: string;
}

export interface FlagshipItem {
  id: string;
  code: string;
  category: string;
  title: string;
  description: string;
  pipeline: string[];
  metrics: { label: string; value: string }[];
  partnerInfo?: string;
}

export interface SiteContentData {
  hero: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    description: string;
    location: string;
    primaryCtaText: string;
    secondaryCtaText: string;
  };
  manifesto: {
    tagline: string;
    pullQuote: string;
    p1: string;
    p2: string;
    p3: string;
    specs: { label: string; value: string }[];
  };
  flagship: {
    sectionTag: string;
    systems: FlagshipItem[];
  };
  capabilities: {
    sectionTag: string;
    items: CapabilityItem[];
  };
  patents: {
    sectionTag: string;
    items: PatentItem[];
  };
  store: {
    sectionTag: string;
    heading: string;
    subheading: string;
    products: ProductItem[];
  };
}

export interface TeamMember {
  id: string;
  passkey: string;
  name: string;
  email: string;
  phone?: string;
  role: "Main Admin" | "Senior Researcher" | "Hardware Engineer" | "AI Specialist" | "Operations" | "Associate";
  department: string;
  joinedDate: string;
  active: boolean;
  avatarColor: string;
}

export interface RDResearchItem {
  id: string;
  title: string;
  description: string;
  purpose: string;
  authorId: string;
  authorName: string;
  fileName?: string;
  fileData?: string; // Data URL / Base64
  fileType?: string;
  fileSize?: string;
  designFileName?: string;
  designFileData?: string;
  designFileType?: string;
  designFileSize?: string;
  date: string;
  status: "Draft" | "Review" | "Approved";
}

export interface AttendanceRecord {
  id: string;
  memberId: string;
  memberName: string;
  passkey: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM AM/PM
  workDone: string;
  timestamp: number;
}

export interface TargetTask {
  id: string;
  title: string;
  description: string;
  duration: string; // e.g. "3 days", "1 week"
  deadline: string;
  assignedToId: string;
  assignedToName: string;
  assignedById: string;
  assignedByName: string;
  status: "Pending" | "In Progress" | "Completed";
  createdAt: string;
  completionNote?: string;
  completionFileName?: string;
  completionFileData?: string;
  completedAt?: string;
}

// Master Admin fixed profile
export const JAYDEV_ADMIN: TeamMember = {
  id: "admin-jaydev",
  passkey: "9099093188",
  name: "Jaydev Zala",
  email: "jaydev@anantalabsindia.org",
  phone: "+91 90990 93188",
  role: "Main Admin",
  department: "Executive & Deep-Tech R&D",
  joinedDate: "2024-01-01",
  active: true,
  avatarColor: "#7FBFA0",
};

export const INITIAL_SITE_CONTENT: SiteContentData = {
  hero: {
    eyebrow: "Deep-Tech R&D · Vadodara, Gujarat, India",
    titleLine1: "Engineering intelligence",
    titleLine2: "for real-world systems.",
    description: "Developing state-of-the-art computer vision models, medical diagnostics hardware, and automated manufacturing pipelines for industry and academia.",
    location: "Vadodara, Gujarat, India",
    primaryCtaText: "View Flagship Systems",
    secondaryCtaText: "Patents & Recognition",
  },
  manifesto: {
    tagline: "01 // MANIFESTO",
    pullQuote: '"We engineer intelligence for the physical world. Where pixels meet hardware, and algorithms drive real-world impact."',
    p1: "Ananta Labs India is a founder-led, deep-tech research and development laboratory based in Vadodara, Gujarat. We operate at the convergence of advanced software intelligence and high-precision physical hardware, rejecting speculative hype in favor of deployed, verifiable solutions.",
    p2: "Our research team specializes in building lightweight, state-of-the-art computer vision models, medical diagnostics hardware, embedded control modules, and mechanical automation systems. We collaborate closely with premier academic institutions and manufacturing leaders to deploy production-ready technology directly to the field.",
    p3: "From automated healthcare fluidics and computerized pulse diagnostics (Prakriti Parikshan) to high-speed visual inspection pipelines, our focus is absolute: engineering robust intelligence that works under noisy, variable real-world conditions.",
    specs: [
      { label: "BASE LOCATION", value: "VADODARA, GUJARAT, IN" },
      { label: "FOCUS AREAS", value: "AI, CV, MED-TECH, MANUFACTURING" },
      { label: "ACADEMIC ALIGNMENT", value: "PARUL UNIVERSITY CO-AUTHORSHIP" },
      { label: "INTELLECTUAL PROPERTY", value: "ACTIVE INDIAN & INTERNATIONAL FILINGS" },
      { label: "DEPLOYMENT MODEL", value: "EDGE EMBEDDED & INDUSTRIAL HARDWARE" },
    ],
  },
  flagship: {
    sectionTag: "02 // FLAGSHIP SYSTEMS",
    systems: [
      {
        id: "spitting-ai",
        code: "CASE STUDY A // INDUSTRIAL AI",
        category: "Civil & Sanitation Intelligence",
        title: "AI-Based Spitting Detection & Prevention",
        description: "An end-to-end edge-computed artificial intelligence system designed for sanitary compliance and real-world civic enforcement. Utilizing a custom-trained lightweight object detection architecture, the system operates on low-resource hardware to identify compliance violations in real time.",
        pipeline: ["DETECT", "VERIFY", "IDENTIFY", "RECORD", "ACT"],
        metrics: [
          { label: "PRECISION", value: "89.7%" },
          { label: "RECALL", value: "94.3%" },
          { label: "F1-SCORE", value: "91.9%" },
          { label: "mAP@50", value: "93.0%" },
        ],
        partnerInfo: "Conducted in collaboration with Parul University, deployed as a field pilot within national GATI 4.0 guidelines.",
      },
      {
        id: "ayurai-veda",
        code: "CASE STUDY B // HEALTHCARE SYSTEMS",
        category: "Medical Diagnostics",
        title: "AyurAI Veda: Prakriti Parikshan (Dosha)",
        description: "An algorithmic diagnostics engine mapping physiological optical inputs to classical Ayurvedic constitutions (Doshas). Using structural landmark extractors and physical texture normalizers, the platform runs local inference to perform automated Prakriti Parikshan.",
        pipeline: ["OPTICAL CAPTURE", "NORMALIZATION", "LANDMARK MESH", "SPECTRAL RUN", "DOSHA VECTOR"],
        metrics: [
          { label: "VATA", value: "34.5%" },
          { label: "PITTA", value: "41.2%" },
          { label: "KAPHA", value: "24.3%" },
          { label: "CONFIDENCE", value: "98.4%" },
        ],
        partnerInfo: "Integrated with high-definition facial and vascular structural landmarks for holistic wellness metrics.",
      },
    ],
  },
  capabilities: {
    sectionTag: "03 // CAPABILITIES",
    items: [
      {
        id: "cv",
        iconName: "Eye",
        title: "Computer Vision",
        description: "Custom edge object detection models, temporal violator tracking, face re-identification under noise, and illumination-insensitive structural mapping.",
        metric: "INFERENCE SPEED // 45.2 FPS",
      },
      {
        id: "med",
        iconName: "HeartPulse",
        title: "Medical & Health Technology",
        description: "Automated diagnostics fluidics control, physiological landmark mesh mapping, dosha classification (Prakriti Parikshan), and optical skin normalizations.",
        metric: "MESH COMPLIANCE // 98.4%",
      },
      {
        id: "embedded",
        iconName: "Cpu",
        title: "Embedded Systems",
        description: "Low-power firmware for microcontroller nodes, sensory aggregation, telemetry relays, and automated prevention hardware trigger relays.",
        metric: "HARDWARE RUNTIME // 99.998%",
      },
      {
        id: "research",
        iconName: "BookOpen",
        title: "Research & Publication",
        description: "High-impact IEEE conference papers, co-authored clinical validation trials, GATI 4.0 methodology compliance, and open-source R&D datasets.",
        metric: "IEEE INDEXED // GATI 4.0",
      },
    ],
  },
  patents: {
    sectionTag: "04 // RECOGNITION & INTELLECTUAL PROPERTY",
    items: [
      {
        id: "in-patent",
        category: "INTELLECTUAL PROPERTY",
        title: "IN Patent Filings",
        org: "Indian Patent Office (IPO)",
        desc: "State-filed patents covering automated prevention hardware triggers, sanitization controllers, and edge neural networks.",
        tag: "REG_IN // FILED",
      },
      {
        id: "pct-patent",
        category: "GLOBAL COMPLIANCE",
        title: "PCT Filings",
        org: "World Intellectual Property Org",
        desc: "International PCT patent filings extending local computer vision and diagnostic systems to global jurisdictions.",
        tag: "WIPO_PCT // ACTIVE",
      },
      {
        id: "ieee-pub",
        category: "ACADEMIC LITERATURE",
        title: "IEEE Publications",
        org: "IEEE Xplore Library",
        desc: "Peer-reviewed journals and conference papers in computer vision and health diagnostics, co-authored with Parul University.",
        tag: "IEEE_INDEX // PUBLISHED",
      },
      {
        id: "icreate",
        category: "INCUBATION STAGE",
        title: "iCreate Ecosystem",
        org: "Technology Business Incubator",
        desc: "Official partnership and workspace incubation in Gujarat's premier deep-tech innovation catalyst environment.",
        tag: "IC_GUJ // PARTNER",
      },
    ],
  },
  store: {
    sectionTag: "05 // HARDWARE STORE & INSTRUMENTATION",
    heading: "Production Engineering Systems",
    subheading: "Commercial medical and scientific instruments available for direct institution procurement and clinical deployment.",
    products: [
      {
        id: "prod-embalming-machine",
        name: "Portable Clinical Embalming Machine",
        category: "Medical Hardware",
        tagline: "Industrial Grade Preservation Fluidics System",
        description: "A compact, micro-regulated clinical preservation machine designed with dual-power AC/DC backup, vibration-damped laminar flow, and precise multi-chamber tank control for medical colleges, mortuaries, and research facilities.",
        price: 25000,
        imageUrl: "/embalming_machine.jpg",
        inStock: true,
        featured: true,
        specs: [
          { label: "Tank Capacity", value: "10L / 15L Available" },
          { label: "Flow Rate", value: "0.5 - 4.5 L/min Regulated" },
          { label: "Power Modes", value: "230V AC + 12V DC Battery" },
          { label: "Pump Tech", value: "Vibration-Damped Diaphragm" },
          { label: "Warranty", value: "1 Year Full Lab Support" },
        ],
        features: [
          "Compact laboratory footprint with carry handles",
          "Dual Power AC mains with seamless DC battery switch",
          "Multi-chamber chemical resistant fluid tank",
          "Fine digital flow needle dial with pressure feedback",
          "Laminar vascular flow without pressure shock spikes",
          "Complete hose, cannula, and fluid coupling kit included",
        ],
      },
      {
        id: "prod-swachh-edge-node",
        name: "SwachhVision Edge AI Sensor Hub",
        category: "Industrial Vision",
        tagline: "Compact Industrial CCTV AI Inference Unit",
        description: "Edge computer equipped with optimized neural processing for real-world civic compliance monitoring, multi-stream RTSP processing, and instant automated alert triggering.",
        price: 18500,
        imageUrl: "/hero_engineering.jpg",
        inStock: true,
        featured: false,
        specs: [
          { label: "Processor", value: "Quad-Core Neural NPU (6 TOPS)" },
          { label: "Video Streams", value: "Up to 4x 1080p 30FPS" },
          { label: "Connectivity", value: "Gigabit LAN, WiFi, 4G LTE Option" },
          { label: "Enclosure", value: "IP66 Weatherproof Cast Aluminum" },
        ],
        features: [
          "Offline edge inference without cloud dependency",
          "Real-time event recording and relay trigger",
          "Tamper-proof encrypted local storage",
          "Web management dashboard pre-installed",
        ],
      },
    ],
  },
};
