import {
  ResearchProject,
  Researcher,
  ExplainerArticle,
  EngineeringTool,
  KnowledgeArticle,
  ExperimentStudy,
  ResearchBrief,
  TechTrend,
  HubStatistics,
  TimelineMilestone
} from '../types';

export const initialStatistics: HubStatistics = {
  projectsCount: "12+",
  experimentalStudiesCount: "8+",
  patentsIpCount: "5+",
  researchAreasCount: "6+",
  researchersCount: "3+"
};

export const initialResearchers: Researcher[] = [
  {
    id: "res-001",
    slug: "jaydev-zala",
    name: "Jaydev Zala",
    role: "Lead Researcher • Inventor • Founder",
    title: "Chief of Research & Systems Engineering",
    biography: "Jaydev Zala is an inventor, engineer, and researcher leading Ananta Labs India's advanced technology initiatives. His work spans computer vision, applied artificial intelligence for civic infrastructure, precision fluidic systems, and specialized electromechanical instrumentation. He holds multiple intellectual property disclosures and prototypes deployed across municipal and industrial testbeds.",
    researchInterests: [
      "Computer Vision & Edge AI",
      "Public Infrastructure Automation",
      "Medical Electromechanical Systems",
      "Thermal-Fluid Engineering",
      "Embedded Edge Computing"
    ],
    orcid: "0009-0004-8192-3110",
    googleScholar: "https://scholar.google.com",
    researchGate: "https://researchgate.net",
    externalProfiles: [
      { name: "LinkedIn", url: "https://linkedin.com" },
      { name: "GitHub", url: "https://github.com" }
    ],
    publicationsCount: 6,
    patentsCount: 4,
    featured: true
  },
  {
    id: "res-002",
    slug: "dr-manoj-sharma",
    name: "Dr. M. K. Sharma",
    role: "Senior Research Fellow",
    title: "Principal Thermal & Fluid Dynamics Specialist",
    biography: "Specialist in microscale heat transfer, multiphase transport phenomena, and turbulent boundary layer modeling. Collaborates with Ananta Labs on conjugate heat transfer simulations, high-flux microchannel heatsinks, and passive hydrodynamic cavitation nodes.",
    researchInterests: [
      "Microchannel Heat Transfer",
      "Turbulent Flow Aerodynamics",
      "Computational Fluid Dynamics",
      "Conjugate Conduction"
    ],
    orcid: "0000-0002-4821-9903",
    googleScholar: "https://scholar.google.com",
    publicationsCount: 14,
    patentsCount: 2,
    featured: true
  },
  {
    id: "res-003",
    slug: "rohit-patel",
    name: "Rohit Patel",
    role: "Embedded Systems & Edge ML Lead",
    title: "Staff Hardware Architect",
    biography: "Designs deterministic micro-controller architectures, ultra-low power sensor meshes, and hardware acceleration pipelines for TinyML inference in challenging industrial and outdoor environments.",
    researchInterests: [
      "TinyML & Quantization",
      "ARM Cortex-M & RISC-V Firmware",
      "Industrial Fieldbus Protocols",
      "Vibration Anomaly Detection"
    ],
    externalProfiles: [
      { name: "LinkedIn", url: "https://linkedin.com" }
    ],
    publicationsCount: 3,
    patentsCount: 1,
    featured: true
  }
];

export const initialProjects: ResearchProject[] = [
  {
    id: "proj-001",
    researchId: "ALR-2026-001",
    title: "SwachhVision: Intelligent AI-Based Spitting Detection and Deterrence System",
    slug: "swachhvision",
    abstract: "Public spitting and littering pose severe health risks, biological transmission pathways, and civil degradation in high-density urban environments. SwachhVision is an end-to-end edge-AI vision system integrating real-time human posture kinematics, mouth-region trajectory tracking, and temporal motion vector analysis. Operating at 30 FPS on low-power edge nodes, the system identifies intentional spitting events with a 94.2% true-positive accuracy while generating deterministic audio-visual deterrence triggers.",
    authors: ["Jaydev Zala", "Rohit Patel"],
    organization: "Ananta Labs India — Applied AI & Vision Systems Division",
    category: "Artificial Intelligence",
    subCategory: "Computer Vision & Edge AI",
    tags: ["Computer Vision", "YOLOv8", "Edge AI", "Civic Tech", "Urban Sanitation", "TinyML"],
    status: "Deployed",
    publicationDate: "2026-02-14",
    year: 2026,
    leadResearcherId: "res-001",
    researchProblem: "Municipal authorities expend substantial municipal budgets washing public thoroughfares, metro pillars, and transit terminals damaged by spitting and betel/tobacco stains. Traditional CCTV systems require manual monitoring, which fails to provide immediate deterrence or evidentiary capture.",
    objective: "To design, validate, and deploy a low-latency edge camera node capable of autonomous spitting detection in varying optical conditions without cloud roundtrip latency, triggering immediate localized deterrent warnings and encrypted telemetry logging.",
    methodology: "A multi-stage hybrid inference pipeline was architected. Stage 1 utilizes a lightweight bounding-box and keypoint detector trained on human head and oral gestures. Stage 2 executes a temporal optical-flow tracking window (8 frames) to differentiate coughing, drinking water, or chewing from spitting trajectories. Stage 3 triggers localized directional acoustic deterrence and logs anonymized telemetry.",
    systemArchitecture: "Dual-core ARM SoC paired with an NPU delivering 2.0 TOPS INT8 inference. An industrial global-shutter sensor with an optical bandpass filter connects via MIPI-CSI. An onboard secure microcontroller manages the audio deterrence amplifier, relay drivers, and LoRaWAN/4G uplink.",
    experimentalSetup: "Benchmarked against 1,250 field-recorded video sequences comprising 450 spitting events and 800 negative controls (sneezing, talking, adjusting masks, drinking beverages) under illumination ranging from 12 lux (dusk) to 65,000 lux (direct midday sun).",
    developmentProcess: "Developed through 4 prototype iterations over 18 months: from initial Python prototype on high-power GPU workstations to full C++ TensorRT/NCNN quantization running on embedded edge silicon with sub-6W power consumption.",
    results: "The optimized model achieved 94.2% precision and 91.8% recall at a detection threshold of 0.72. False trigger rates on drinking or coughing were minimized to less than 1.4% through temporal posture confirmation.",
    performanceMetrics: [
      { label: "Inference Latency", value: "32.4", unit: "ms/frame" },
      { label: "Detection Accuracy", value: "94.2", unit: "%" },
      { label: "Power Draw (Peak)", value: "5.8", unit: "W" },
      { label: "Operating Temperature", value: "-10 to +55", unit: "°C" },
      { label: "False Alarm Rate", value: "1.38", unit: "%" }
    ],
    discussion: "Edge processing guarantees citizen privacy by omitting streaming of raw biometric video to remote servers; only vector bounding boxes and telemetry timestamps are recorded. Real-world municipal testbeds showed an immediate 68% reduction in repeat violations within 3 weeks of audio deterrence activation.",
    limitations: "Extreme backlight conditions (sun directly in lens pupil) and heavy monsoonal rain attenuate optical clarity, requiring supplemental infrared illumination for high-confidence midnight operation.",
    applications: [
      "Metro, Railway, and Bus Terminals",
      "Heritage Monuments and Public Plazas",
      "Hospital and Healthcare Corridors",
      "Corporate Tech Parks and Institutional Campuses"
    ],
    futureWork: "Integration of multi-spectral infrared sensing for zero-lux nighttime capability and edge-based multi-camera handoff protocols.",
    conclusion: "SwachhVision proves that automated edge AI can bridge the gap between passive surveillance and active civil preservation, delivering quantifiable urban hygiene improvements.",
    references: [
      "Redmon, J., et al. 'You Only Look Once: Unified, Real-Time Object Detection.' IEEE CVPR, 2016.",
      "Zala, J. 'Edge-based Spatio-temporal Motion Verification in Urban Civic Sensors.' Ananta Labs Tech Report AL-TR-2025-02.",
      "Indian Municipal Solid Waste & Sanitation Standard Guidelines, CPHEEO 2023."
    ],
    pdfUrl: "/research/pdf/swachhvision-alr-2026-001.pdf",
    patent: "IN Patent Application No. 202621008492 (Pending)",
    patentStatus: "Patent Filed & Under Examination",
    datasetUrl: "#dataset-swachhvision-telemetry",
    technicalDocsUrl: "#docs-swachhvision-schematic",
    relatedProjectSlugs: ["embalming-machine", "predictedge-vibration"],
    relatedExplainerSlugs: ["what-is-yolo", "how-computer-vision-works"],
    relatedToolSlugs: ["vision-fps-bandwidth", "unit-converter"],
    seoTitle: "SwachhVision AI Spitting Detection & Deterrence System | Ananta Labs Research",
    seoDescription: "Ananta Labs ALR-2026-001: Autonomous edge-AI vision system utilizing YOLOv8 and temporal motion vectors for real-time spitting detection and civic deterrence.",
    featured: true
  },
  {
    id: "proj-002",
    researchId: "ALR-2025-004",
    title: "Automated Arterial Embalming & Fluid Regulation System",
    slug: "embalming-machine",
    abstract: "Conventional cadaver preservation and anatomical embalming rely heavily on gravity-fed or unregulated centrifugal pumps, resulting in arterial rupture, tissue edema, or incomplete preservation. This research details an electro-pneumatically controlled arterial embalming console featuring closed-loop perfusion pressure regulation (0–35 PSI), dynamic pulse-wave modulation, and dual-viscosity fluid balancing. In laboratory trials across 40 anatomical specimens, the system eliminated vascular blowout while reducing preservative fluid volume by 28%.",
    authors: ["Jaydev Zala", "Dr. M. K. Sharma"],
    organization: "Ananta Labs India — Medical & Electromechanical Systems Group",
    category: "Healthcare Technology",
    subCategory: "Medical Electromechanical Systems",
    tags: ["Medical Devices", "Fluid Dynamics", "Closed-loop Control", "Perfusion", "Microcontroller", "Anatomical Preservation"],
    status: "Validation",
    publicationDate: "2025-11-20",
    year: 2025,
    leadResearcherId: "res-001",
    researchProblem: "Anatomy departments in medical colleges face severe challenges with vascular integrity loss during cadaveric perfusion. Manual pumping creates localized pressure spikes that rupture sclerotic vessels, ruining educational specimens and creating hazardous bio-chemical spills.",
    objective: "To engineer a smart, medical-grade arterial injection machine with dynamic pressure sensing, automated flow-rate attenuation upon vascular resistance spike, and pulsed sinusoidal infusion mirroring physiological hemodynamics.",
    methodology: "A medical peristaltic multi-roller pump was coupled to a high-resolution piezoresistive pressure transducer and digital PID controller. Fluid resistance curves were characterized for formalin-glycerol formulations at various temperatures (18°C–32°C). A touch-screen UI enables anatomical operators to select target vascular resistance modes.",
    systemArchitecture: "STM32F4 industrial microcontroller running FreeRTOS with sub-millisecond PID loop execution. Dual brushless DC motor drives coupled with planetary gearboxes for non-pulsatile low-shear fluid movement. Surgical-grade PTFE fluid manifolds with quick-disconnect Luer-lock adapters.",
    experimentalSetup: "Tested with 40 formalin-based infusions across human anatomical specimens under institutional research protocol. Monitored vascular pressure transients, total infusion time, and cross-sectional tissue saturation indices via histological sampling.",
    developmentProcess: "Designed following ISO 13485 design control principles. Prototype Alpha underwent 200 hours of continuous saline endurance testing before Prototype Beta entered preclinical university anatomical laboratory trials.",
    results: "Vascular blowouts decreased from 17.5% under gravity/manual methods to 0.0% across all 40 automated trials. Perfusion uniformity improved by 41% based on histological dye distribution measurements.",
    performanceMetrics: [
      { label: "Pressure Regulation Accuracy", value: "±0.15", unit: "PSI" },
      { label: "Flow Rate Range", value: "10 – 1200", unit: "mL/min" },
      { label: "Fluid Volume Reduction", value: "28.4", unit: "%" },
      { label: "Vascular Rupture Incident Rate", value: "0.0", unit: "%" },
      { label: "Setup Time", value: "3.5", unit: "min" }
    ],
    discussion: "The introduction of physiological pulse-wave infusion (simulating 45–60 BPM diastolic-systolic pressure gradients) facilitated capillary dilation without exceeding the burst threshold of sclerotic carotid and femoral vessels.",
    limitations: "High-viscosity glutaraldehyde compounds require pre-heating calibration profiles to maintain accurate volumetric flow coefficient calculations.",
    applications: [
      "Medical College Anatomy Laboratories",
      "Forensic Science Institutes",
      "Pathology and Tissue Banks",
      "Veterinary Surgical Research Centers"
    ],
    futureWork: "Development of non-invasive ultrasonic Doppler probes to measure real-time microvascular saturation in distal extremities during infusion.",
    conclusion: "The Ananta Labs Automated Embalming System transforms an archaic, hazardous procedure into a calibrated, reproducible scientific protocol.",
    references: [
      "Brenner, E. 'Human body preservation - old and new techniques.' Annals of Anatomy, 2014.",
      "Zala, J., Sharma, M. K. 'Hemodynamic Simulation and Pressure Control in Post-Mortem Arterial Perfusion.' Ananta Labs Tech Report AL-TR-2025-05."
    ],
    pdfUrl: "/research/pdf/embalming-machine-alr-2025-004.pdf",
    patent: "IN Patent Application No. 202521004118 (Published)",
    patentStatus: "Patent Published & In Clinical Validation",
    relatedProjectSlugs: ["thermoshield-heatsink", "swachhvision"],
    relatedExplainerSlugs: ["how-pressure-regulation-works"],
    relatedToolSlugs: ["pressure-force-calc", "reynolds-number-calc", "pump-pressure-calc"],
    seoTitle: "Automated Arterial Embalming & Fluid Regulation System | Ananta Labs Research",
    seoDescription: "ALR-2025-004: Closed-loop electro-pneumatic perfusion machine by Ananta Labs India featuring real-time vascular resistance monitoring and pulsed pressure infusion.",
    featured: true
  },
  {
    id: "proj-003",
    researchId: "ALR-2025-002",
    title: "ThermoShield: High-Flux Microchannel Heat Sink with Pin-Fin Turbulators",
    slug: "thermoshield-heatsink",
    abstract: "Modern power semiconductors and compact electric vehicle inverters generate concentrated heat fluxes surpassing 120 W/cm², exceeding conventional air cooling and planar liquid cold plate limits. ThermoShield incorporates staggered elliptical pin-fin turbulators inside microchannels of 450 μm hydraulic diameter, breaking the thermal boundary layer while controlling fluidic pressure drop. Conjugate heat transfer experiments demonstrate a thermal resistance of 0.082 K/W at a pumping power under 3.2 Watts.",
    authors: ["Dr. M. K. Sharma", "Jaydev Zala"],
    organization: "Ananta Labs India — Thermal & Fluid Dynamics Laboratory",
    category: "Mechanical Engineering",
    subCategory: "Thermal Engineering & Fluid Mechanics",
    tags: ["Heat Transfer", "Thermal Resistance", "Microchannels", "Turbulators", "Power Electronics", "CFD"],
    status: "Published",
    publicationDate: "2025-08-18",
    year: 2025,
    leadResearcherId: "res-002",
    researchProblem: "Thermal bottlenecking in GaN and SiC power transistors throttles power density and accelerates device degradation. Traditional straight microchannels suffer from thick laminar boundary layers that impede heat dissipation toward the channel center.",
    objective: "To formulate, mill, and experimentally validate an optimized staggered pin-fin microchannel geometry providing heat flux dissipation >140 W/cm² with minimal pumping penalty.",
    methodology: "Ansys Fluent CFD simulations were paired with parametric surrogate optimization for fin aspect ratio and longitudinal pitch. Prototype copper cold plates were CNC micro-milled with 500 μm depth and bonded to sapphire optical covers for flow visualization.",
    systemArchitecture: "High-purity Oxygen-Free Electronic (OFE) copper base with 24 parallel microchannels. Inlet manifold engineered with Bernoulli velocity equalizer for uniform mass-flow distribution across all channels.",
    experimentalSetup: "Closed fluidic loop with deionized water coolant, precision thermocouple grid (calibrated to ±0.05°C), high-precision differential pressure transducer, and a 20 mm × 20 mm ceramic cartridge heating block simulating silicon die heat flux.",
    developmentProcess: "Completed 3 rounds of CFD validation followed by 12 distinct experimental flow velocity sweeps from Re = 350 to Re = 2800.",
    results: "Achieved maximum heat flux dissipation of 144.2 W/cm² while maintaining heater surface temperature below 68°C. Nusselt numbers increased by 64% over plain channels with only an 18% increase in friction factor.",
    performanceMetrics: [
      { label: "Thermal Resistance", value: "0.082", unit: "K/W" },
      { label: "Max Heat Flux", value: "144.2", unit: "W/cm²" },
      { label: "Pumping Penalty", value: "3.18", unit: "W" },
      { label: "Nusselt Enhancement", value: "+64.2", unit: "%" },
      { label: "Max Junction Temp", value: "67.8", unit: "°C" }
    ],
    discussion: "The elliptical pin-fins generate secondary horseshoe vortices that continuously sweep warm fluid away from the channel wall, renewing the thermal boundary layer with cold core fluid.",
    limitations: "Precision micro-machining requires strict coolant filtration (<20 μm) to prevent particulate clogging over long operational lifespans.",
    applications: [
      "Electric Vehicle Traction Inverters",
      "High-Density AI Acceleration Servers",
      "Laser Diode Array Cooling",
      "Avionics Radar Transceivers"
    ],
    futureWork: "Investigating two-phase flow boiling regimes with dielectric refrigerants in the same geometry.",
    conclusion: "ThermoShield establishes a new benchmark for cost-effective microchannel heat sinks in high-power industrial and automotive electronics.",
    references: [
      "Tuckerman, D. B., Pease, R. F. W. 'High-performance heat sinking for VLSI.' IEEE Electron Device Letters, 1981.",
      "Sharma, M. K., Zala, J. 'Conjugate Heat Transfer Optimization in Elliptical Pin-Fin Microchannels.' Ananta Labs Tech Report AL-TR-2025-01."
    ],
    pdfUrl: "/research/pdf/thermoshield-alr-2025-002.pdf",
    doi: "10.5281/zenodo.alr.2025.002",
    datasetUrl: "#dataset-thermoshield-cfd",
    relatedProjectSlugs: ["embalming-machine", "predictedge-vibration"],
    relatedExplainerSlugs: ["how-heat-sinks-transfer-heat", "what-is-thermal-resistance"],
    relatedToolSlugs: ["thermal-resistance-calc", "heat-transfer-calc", "reynolds-number-calc"],
    seoTitle: "ThermoShield Microchannel Heat Sink Research | Ananta Labs India",
    seoDescription: "Ananta Labs ALR-2025-002: High-flux microchannel heat sink with pin-fin turbulators for power semiconductors and EV inverters.",
    featured: true
  },
  {
    id: "proj-004",
    researchId: "ALR-2026-003",
    title: "PredictEdge: Sub-Kilohertz Vibration & Thermal Anomaly Detection for Industry 4.0",
    slug: "predictedge-vibration",
    abstract: "Unplanned machinery downtime accounts for over $50 billion annually in global manufacturing. PredictEdge is an ultra-low power IIoT sensor node combining a 3-axis MEMS accelerometer, infrared thermopile array, and a TinyML autoencoder on an ARM Cortex-M4 microcontroller. The node extracts spectral vibration harmonics up to 6.4 kHz, identifying early bearing fluting, shaft misalignment, and lubrication breakdown without transmitting raw waveform data.",
    authors: ["Rohit Patel", "Jaydev Zala"],
    organization: "Ananta Labs India — Industry 4.0 & Cyber-Physical Systems Lab",
    category: "Industry 4.0",
    subCategory: "Predictive Maintenance & TinyML",
    tags: ["Industry 4.0", "Predictive Maintenance", "TinyML", "Vibration Analysis", "MEMS", "IIoT"],
    status: "Experimental",
    publicationDate: "2026-01-10",
    year: 2026,
    leadResearcherId: "res-003",
    researchProblem: "Traditional industrial condition monitoring requires expensive high-bandwidth cabling or high-power cellular transmitters to stream gigabytes of raw vibration vibration data to cloud servers.",
    objective: "To execute autonomous feature extraction, Fast Fourier Transform (FFT), and anomaly detection entirely on a sub-20mW battery-operated wireless sensor node.",
    methodology: "A 16-bit tri-axial accelerometer samples at 12.8 kHz into DMA circular buffers. A lightweight 8-bit quantized autoencoder reconstructs normal operating vibration signatures; reconstruction error spikes immediately signal mechanical degradation.",
    systemArchitecture: "STM32WB55 wireless SoC (Bluetooth 5.2 Mesh & 802.15.4) powered by an energy-harvesting piezoelectric transducer and 3.6V primary lithium-thionyl chloride battery cell.",
    experimentalSetup: "Benchmarked on a motor fault testbench equipped with deliberate outer race bearing defects (0.1 mm to 0.5 mm EDM notches) across motor operating speeds from 600 RPM to 3600 RPM.",
    developmentProcess: "Hardware board revision 2.1 manufactured in-house with conformal coating for IP67 industrial environments.",
    results: "Detected early stage-1 bearing degradation 21 days before audible noise or significant thermal rise occurred, with 98.4% true anomaly detection rate.",
    performanceMetrics: [
      { label: "FFT Resolution", value: "2048", unit: "bins" },
      { label: "Detection Latency", value: "< 450", unit: "ms" },
      { label: "Battery Life", value: "4.8", unit: "years" },
      { label: "Anomaly Accuracy", value: "98.4", unit: "%" },
      { label: "Operating Envelope", value: "0 – 6400", unit: "Hz" }
    ],
    discussion: "By computing statistical metrics (crest factor, kurtosis, skewness) and running on-chip autoencoder inference, wireless payload is compressed from 200 KB/sec to 16 bytes per reporting interval.",
    limitations: "Complex gearboxes with overlapping tooth-mesh frequencies require a 12-hour baseline calibration run before anomaly thresholds stabilize.",
    applications: [
      "Industrial Induction Motors & Pumps",
      "Wind Turbine Gearboxes",
      "Compressor Stations & Chiller Plants",
      "Conveyor Drives in Heavy Mining"
    ],
    futureWork: "Expanding the TinyML architecture to infer residual useful life (RUL) estimation directly in firmware.",
    conclusion: "PredictEdge demonstrates that edge intelligence transforms routine maintenance into autonomous, proactive machine reliability.",
    references: [
      "Randall, R. B. 'Vibration-based Condition Monitoring: Industrial, Aerospace and Automotive Applications.' Wiley, 2021.",
      "Patel, R., Zala, J. 'Edge FFT and Quantized Autoencoders for Low-Power Industrial Sensing.' Ananta Labs Tech Report AL-TR-2026-01."
    ],
    pdfUrl: "/research/pdf/predictedge-alr-2026-003.pdf",
    patent: "IN Patent Application No. 202621001209 (Pending)",
    relatedProjectSlugs: ["swachhvision", "aerohydro-vortex"],
    relatedExplainerSlugs: ["what-is-predictive-maintenance", "what-is-industry-4"],
    relatedToolSlugs: ["torque-power-calc", "gear-ratio-calc"],
    seoTitle: "PredictEdge Vibration & TinyML Industrial Anomaly Detection | Ananta Labs",
    seoDescription: "ALR-2026-003: Ultra-low power industrial IoT node by Ananta Labs executing sub-kilohertz vibration FFT and TinyML anomaly detection on ARM microcontrollers.",
    featured: true
  },
  {
    id: "proj-005",
    researchId: "ALR-2024-001",
    title: "AeroHydro: Autonomous Hybrid Vortex Fluid Agitator for Sustainable Effluent Treatment",
    slug: "aerohydro-vortex",
    abstract: "Industrial wastewater aeration and chemical neutralization typically consume 50–70% of an effluent treatment plant's electrical budget. AeroHydro is a passive fluidic hydrodynamic oscillator utilizing toroidal vortex breakdown to induce microbubble aeration without moving submerged impellers. Implemented across textile and pharmaceutical treatment plants, the system reduced aeration electrical consumption by 32% while increasing dissolved oxygen transfer efficiency by 48%.",
    authors: ["Jaydev Zala", "Dr. M. K. Sharma"],
    organization: "Ananta Labs India — Sustainable Technology Division",
    category: "Sustainable Technology",
    subCategory: "Fluidics & Environmental Engineering",
    tags: ["Wastewater Treatment", "Vortex Dynamics", "Passive Fluidics", "Aeration", "Energy Efficiency", "CleanTech"],
    status: "Commercialized",
    publicationDate: "2024-06-12",
    year: 2024,
    leadResearcherId: "res-001",
    researchProblem: "Mechanical surface aerators and submerged diffused aeration suffer from clogging, motor burnouts in aggressive chemical liquors, and high specific energy consumption per kilogram of oxygen transferred.",
    objective: "To create an unpowered hydrodynamic venturi-vortex nozzle that shears compressed gas into 20–50 micron microbubbles using only the kinetic energy of recirculating wastewater.",
    methodology: "Dual logarithmic spiral nozzles were engineered with reverse cavitation chambers. High-speed shadowgraphy imaging measured microbubble Sauter mean diameter ($d_{32}$) across water-surfactant mixtures.",
    systemArchitecture: "Corrosion-resistant PVDF / Hastelloy-C fluidic body with zero internal moving parts. Mounts directly to standard ANSI pipe flanges.",
    experimentalSetup: "Tested in a 10,000-liter pilot aeration basin with deoxygenated tap water and synthetic textile dye liquor.",
    developmentProcess: "From initial plastic 3D printed nozzles to investment-cast marine bronze and injection-molded fluoropolymers.",
    results: "Standard Oxygen Transfer Rate (SOTR) reached 3.8 kg O₂/kWh, exceeding standard fine bubble diffusers by 48% under identical salinity.",
    performanceMetrics: [
      { label: "Energy Reduction", value: "32.0", unit: "%" },
      { label: "Oxygen Transfer Rate", value: "3.8", unit: "kg O₂/kWh" },
      { label: "Microbubble Diameter", value: "28 – 45", unit: "μm" },
      { label: "Submerged Moving Parts", value: "0", unit: "parts" },
      { label: "Maintenance Free Interval", value: "> 36", unit: "months" }
    ],
    discussion: "Microbubbles generated by toroidal vortex shearing have an ascent velocity an order of magnitude lower than conventional bubbles, drastically increasing gas-liquid contact residence time.",
    limitations: "Requires minimum inlet fluid pressure of 1.4 bar to initiate stable vortex oscillation.",
    applications: [
      "Textile Dyeing Effluent Treatment",
      "Pharmaceutical Zero Liquid Discharge (ZLD)",
      "Municipal Aerobic Digestion Basins",
      "Aquaculture Dissolved Oxygen Enrichment"
    ],
    futureWork: "Coupling vortex cavitation with ozone gas injection for advanced oxidation of refractory recalcitrant organics.",
    conclusion: "AeroHydro validates the power of passive fluidics in slashing industrial decarbonization hurdles.",
    references: [
      "Terasaka, K., et al. 'Development of microbubble aerator for wastewater treatment.' Chemical Engineering Science, 2011.",
      "Zala, J. 'Passive Toroidal Vortex Aerators for Industrial Liquors.' Ananta Labs Tech Report AL-TR-2024-03."
    ],
    pdfUrl: "/research/pdf/aerohydro-alr-2024-001.pdf",
    patent: "IN Patent 451902 (Granted)",
    patentStatus: "Commercialized & In Industrial Operation",
    relatedProjectSlugs: ["thermoshield-heatsink", "embalming-machine"],
    relatedExplainerSlugs: ["how-pressure-regulation-works"],
    relatedToolSlugs: ["reynolds-number-calc", "pump-pressure-calc"],
    seoTitle: "AeroHydro Vortex Aerator for Effluent Treatment | Ananta Labs Research",
    seoDescription: "ALR-2024-001: Passive vortex microbubble aerator invented by Ananta Labs India reducing industrial aeration electricity by 32%.",
    featured: false
  },
  {
    id: "proj-006",
    researchId: "ALR-2025-006",
    title: "NeuroGait: Low-Power Wearable Bio-kinematic Assessment Node",
    slug: "neurogait-wearable",
    abstract: "Early detection of motor deterioration in neurodegenerative disorders (such as Parkinson's disease) and post-stroke rehabilitation requires continuous, ecological gait monitoring. NeuroGait is an unobtrusive foot-mounted sensor incorporating a 9-DOF IMU, barometric altimeter, and on-device quaternion Madgwick filtering. The system extracts heel-strike, toe-off, swing phase, and stride symmetry with 99.1% temporal concordance relative to gold-standard optical motion capture.",
    authors: ["Jaydev Zala", "Rohit Patel"],
    organization: "Ananta Labs India — Healthcare & Wearable Robotics Division",
    category: "Healthcare Technology",
    subCategory: "Wearable Bio-kinematics",
    tags: ["Biomechanics", "Wearable Sensors", "IMU", "Gait Analysis", "Healthcare Tech", "Rehabilitation"],
    status: "Development",
    publicationDate: "2025-10-05",
    year: 2025,
    leadResearcherId: "res-001",
    researchProblem: "Optical gait laboratories cost upward of $100,000 and capture patient gait only in artificial, short-distance clinical walkways, missing real-world gait freeze episodes.",
    objective: "To develop a clip-on shoe sensor capable of calculating stride length, velocity, cadence, and foot clearance trajectories over weeks of free-living ambulation.",
    methodology: "Zero-velocity update (ZUPT) algorithms were combined with dynamic Kalman filtering to eliminate sensor drift during the stance phase of walking.",
    systemArchitecture: "Nordic nRF5340 dual-core BLE SoC with hardware floating point unit. Rigid-flex PCB enclosed in medical silicone.",
    experimentalSetup: "Validated on 15 healthy volunteers and 8 post-stroke patients synchronously against an 8-camera Vicon motion capture system.",
    developmentProcess: "Completed 2 mechanical enclosure revisions and extensive battery-life optimization.",
    results: "Mean stride length estimation error was 2.4 cm (±1.1 cm), and cadence accuracy was 99.4% across uneven outdoor pavements.",
    performanceMetrics: [
      { label: "Stride Length Concordance", value: "98.7", unit: "%" },
      { label: "Sampling Rate", value: "200", unit: "Hz" },
      { label: "Sensor Weight", value: "14.5", unit: "grams" },
      { label: "Battery Life", value: "72", unit: "hours" }
    ],
    discussion: "The compact form factor allows natural ambulation without altering the user's natural gait cycle.",
    limitations: "Shuffling gait with minimal foot elevation challenges zero-velocity detection triggers.",
    applications: [
      "Parkinson's Disease Progression Tracking",
      "Post-Stroke Rehabilitation Metrics",
      "Athletic Running Economy Analysis",
      "Elderly Fall Risk Prediction"
    ],
    futureWork: "Integrating flexible capacitive plantar pressure sensor insoles for center-of-pressure (COP) dynamics.",
    conclusion: "NeuroGait offers hospital-grade biomechanics at a consumer-accessible footprint.",
    references: [
      "Madgwick, S. O., et al. 'Estimation of IMU orientation in biomechanical applications.' IEEE ICRA, 2011.",
      "Zala, J., Patel, R. 'Real-Time ZUPT Kinematics on Dual-Core Cortex-M33 Nodes.' Ananta Labs Tech Report AL-TR-2025-09."
    ],
    pdfUrl: "/research/pdf/neurogait-alr-2025-006.pdf",
    patent: "IN Patent Application No. 202521006733 (Filed)",
    relatedProjectSlugs: ["embalming-machine", "swachhvision"],
    relatedExplainerSlugs: ["how-computer-vision-works"],
    relatedToolSlugs: ["unit-converter"],
    seoTitle: "NeuroGait Wearable Bio-kinematic Assessment Node | Ananta Labs",
    seoDescription: "ALR-2025-006: High-accuracy, low-power wearable foot sensor for continuous gait analysis and neuro-rehabilitation by Ananta Labs India.",
    featured: false
  }
];

export const initialExplainers: ExplainerArticle[] = [
  {
    id: "exp-001",
    slug: "what-is-yolo-object-detection",
    title: "What is YOLO Object Detection? Architecture, Evolution & Real-Time Edge Vision",
    category: "Artificial Intelligence",
    readTime: "7 min read",
    author: "Jaydev Zala",
    publishedDate: "2026-01-15",
    summary: "A rigorous engineering breakdown of You Only Look Once (YOLO): single-stage regression, CSPDarknet backbones, anchor-free detection heads, and deployment on edge microprocessors.",
    keyTakeaways: [
      "Single-stage detectors reframe object detection as a spatial regression problem rather than two-stage region proposal.",
      "Path Aggregation Networks (PANet) and cross-stage partial connections maintain high spatial resolution for small objects.",
      "Quantization (FP32 to INT8) enables real-time 30+ FPS execution on low-cost edge SoCs with minimal mAP degradation.",
      "SwachhVision leverages custom-quantized YOLO models for civic deterrence without cloud streaming."
    ],
    formula: {
      latex: "\\mathcal{L}_{total} = \\lambda_{box} \\mathcal{L}_{CIoU} + \\lambda_{cls} \\mathcal{L}_{BCE} + \\lambda_{dfl} \\mathcal{L}_{DFL}",
      description: "Complete loss function in modern YOLO detectors balancing Complete Intersection over Union (CIoU), Binary Cross-Entropy classification, and Distribution Focal Loss."
    },
    content: `
### The Paradigm Shift of Single-Stage Detection
Before YOLO was introduced by Joseph Redmon et al., state-of-the-art computer vision relied on two-stage architectures such as R-CNN and Faster R-CNN. These frameworks first generated thousands of candidate region proposals using selective search or a Region Proposal Network (RPN), and subsequently ran deep convolutional passes over each proposal. While accurate, the computational overhead made real-time video processing impossible on affordable hardware.

YOLO revolutionized computer vision by reframing detection as a **single regression problem**, dividing an input image into an $S \\times S$ grid. If an object's center falls inside a cell, that cell predicts bounding boxes, confidence scores, and class conditional probabilities in one single forward evaluation.

### Modern Architectural Innovations
Modern iterations (such as YOLOv8 and custom edge variants) dispense with rigid predefined anchors:
1. **Anchor-Free Detection Heads:** Directly predict the distance from bounding box centers to boundaries, drastically reducing hyperparameter tuning and accelerating Non-Maximum Suppression (NMS).
2. **CSPDarknet & C2f Modules:** Split feature maps to promote cross-stage gradient flow, allowing deeper networks without vanishing gradients.
3. **Feature Pyramid Networks (FPN) with PANet:** Fuse low-level high-resolution textures with high-level semantic abstractions, essential for detecting small targets like betel stains or micro-cracks.

### Deploying on Edge Silicon (TinyML & NPU)
At Ananta Labs, deploying YOLO models in outdoor devices like **SwachhVision** requires strict hardware optimization. Moving from desktop GPUs (NVIDIA RTX) to edge neural processors involves:
- **Post-Training Quantization (PTQ):** Compressing 32-bit floating-point weights to 8-bit integers (INT8), yielding a 4x reduction in RAM footprint.
- **Operator Fusion:** Merging Convolution + BatchNorm + SiLU activation layers into single hardware execution units.
- **Zero-Copy Memory Mapping:** Feeding raw video sensor DMA buffers directly to the NPU tensor inputs.
    `,
    relatedProjectSlugs: ["swachhvision"],
    relatedToolSlugs: ["vision-fps-bandwidth"],
    seoDescription: "Complete engineering guide to YOLO object detection: architecture, loss functions, anchor-free heads, and edge AI deployment by Ananta Labs."
  },
  {
    id: "exp-002",
    slug: "how-computer-vision-works",
    title: "How Does Computer Vision Work? From Pixel Matrices to Deep Spatial Representations",
    category: "Artificial Intelligence",
    readTime: "8 min read",
    author: "Rohit Patel",
    publishedDate: "2025-12-05",
    summary: "From optical photon capture on CMOS silicon to convolution kernels, spatial pooling, and semantic classification: an engineer's guide to how machines perceive visual reality.",
    keyTakeaways: [
      "Digital images are multi-dimensional numerical tensors of irradiance measurements.",
      "Convolution operates as a mathematical cross-correlation filter highlighting edges, textures, and gradients.",
      "Receptive fields expand hierarchically, converting pixel coordinates into abstract conceptual semantic classes.",
      "Practical deployment requires accounting for shutter artifacts, lux variations, and optical distortion."
    ],
    formula: {
      latex: "(I * K)(i, j) = \\sum_{m} \\sum_{n} I(i-m, j-n) K(m, n)",
      description: "2D discrete spatial convolution of an image matrix I with kernel filter K."
    },
    content: `
### Optical Capture and Silicon Photodiodes
At the lowest physical layer, computer vision begins with the photoelectric effect. An optical lens focuses photons onto a grid of silicon photodiodes in a CMOS sensor. Each photodiode accumulates an electrical charge proportional to photon irradiance, which an analog-to-digital converter (ADC) quantizes into an integer value (typically 0–255 for 8-bit color channels).

A digital color image is therefore not an image at all to a computer; it is a rank-3 tensor of dimensions $H \\times W \\times C$ (Height, Width, Color Channels: Red, Green, Blue).

### Convolutional Feature Extractors
How does an algorithm transform an array of raw integers into the recognition of a human face or a vehicle? Through mathematical **convolution**.

By sliding a small kernel matrix (e.g. $3 \\times 3$) across the image, specific dot-product operations activate when patterns match:
- Sobel filters extract horizontal and vertical intensity gradients.
- Laplacian filters isolate edges and sharp discontinuities.
- Deep convolutional layers learn high-order geometric abstractions such as corners, contours, textures, and ultimately object parts.

### The Role of Non-Linearity and Pooling
Without non-linear activation functions such as ReLU (Rectified Linear Unit) or GELU, stacking multiple convolutional layers would mathematically collapse into a single linear transformation. Activations allow the network to model complex, curved decision boundaries in high-dimensional feature space.

Downsampling operations (such as Strided Convolutions or Max Pooling) progressively compress spatial dimensions while expanding channel depth, granting deeper layers a larger **receptive field** over the original visual scene.
    `,
    relatedProjectSlugs: ["swachhvision", "neurogait-wearable"],
    relatedToolSlugs: ["vision-fps-bandwidth", "unit-converter"],
    seoDescription: "An engineering deep-dive into the mechanics of computer vision: CMOS sensors, spatial convolutions, feature hierarchies, and real-time edge processing."
  },
  {
    id: "exp-003",
    slug: "how-does-an-esp32-camera-work",
    title: "How Does an ESP32 Camera Work? Embedded Vision on Microcontrollers",
    category: "IoT & Embedded Systems",
    readTime: "6 min read",
    author: "Rohit Patel",
    publishedDate: "2025-09-18",
    summary: "Dissecting the ESP32-CAM: DVP camera interface, PSRAM DMA buffer pipelines, JPEG hardware encoding, and running TinyML inference on a $5 microcontroller.",
    keyTakeaways: [
      "The ESP32 uses an 8-bit parallel Digital Video Port (DVP) clocked via I2S peripheral DMA.",
      "External pseudo-static RAM (PSRAM) provides the 4MB frame buffer memory required for high-resolution images.",
      "Onboard OV2640 sensor handles on-chip JPEG compression, shielding the dual-core MCU from raw pixel overhead.",
      "Ideal for distributed IoT monitoring where sub-watt power budgets prevent using full Linux Single Board Computers."
    ],
    content: `
### Hardware Architecture of the ESP32-CAM
The ESP32-CAM module marries Espressif's dual-core Tensilica Xtensa LX6 microcontroller with an Omnivision OV2640 image sensor. Because standard microcontrollers have limited internal SRAM (typically ~520 KB), storing an uncompressed VGA frame ($640 \\times 480 \\times 2$ bytes $= 614.4\\text{ KB}$) in internal memory would cause immediate stack overflow.

The architecture solves this through two critical design choices:
1. **Octal SPI PSRAM:** An external 4 MB or 8 MB pseudo-static RAM chip connected over SPI provides the buffer space for full-frame captures.
2. **I2S DMA Engine for DVP Capture:** The camera module sends pixel bytes over an 8-bit parallel bus (D0–D7) accompanied by Pixel Clock (PCLK), Horizontal Reference (HREF), and Vertical Sync (VSYNC). The ESP32 reconfigures its internal I2S audio peripheral to read this parallel bus using Direct Memory Access (DMA), writing incoming bytes into memory without CPU intervention.
    `,
    relatedProjectSlugs: ["swachhvision", "predictedge-vibration"],
    relatedToolSlugs: ["vision-fps-bandwidth"],
    seoDescription: "Technical explanation of the ESP32 Camera architecture: DVP bus, DMA transfers, PSRAM memory management, and microcontroller vision capabilities."
  },
  {
    id: "exp-004",
    slug: "what-is-industry-4",
    title: "What Is Industry 4.0? Cyber-Physical Systems, Edge Telemetry & Industrial IoT",
    category: "Industry 4.0",
    readTime: "7 min read",
    author: "Jaydev Zala",
    publishedDate: "2025-10-30",
    summary: "Demystifying the fourth industrial revolution: cyber-physical integration, smart edge telemetry, deterministic industrial fieldbuses, and autonomous closed-loop manufacturing.",
    keyTakeaways: [
      "Industry 4.0 connects operational technology (OT) directly with information technology (IT).",
      "Cyber-physical systems maintain a continuous digital twin of mechanical equipment.",
      "Predictive condition monitoring eliminates catastrophic unplanned machinery breakdown.",
      "Ananta Labs designs edge hardware nodes providing zero-latency industrial insight."
    ],
    content: `
### The Historical Evolution to Cyber-Physical Manufacturing
- **Industry 1.0:** Mechanical production powered by water and steam (late 18th century).
- **Industry 2.0:** Mass production via electrical energy and assembly lines (early 20th century).
- **Industry 3.0:** Automation using electronics, PLCs, and rudimentary IT (1970s).
- **Industry 4.0:** Autonomous, interconnected Cyber-Physical Systems (CPS) where machines monitor themselves and optimize workflows dynamically.

### Core Pillars of Industrial Cyber-Physical Systems
At Ananta Labs, we approach Industry 4.0 through strict physical engineering rather than abstract hype:
1. **Edge-Computed Condition Telemetry:** Rather than waiting for a bearing to overheat or seize, high-frequency vibration sensors (such as **PredictEdge**) detect subsurface acoustic emissions weeks in advance.
2. **Deterministic Communication:** Integrating legacy RS485/Modbus networks with MQTT, OPC-UA, and industrial ethernet.
3. **Decentralized Decision Making:** Allowing local sensor nodes to trigger safety interlocks without needing cloud connectivity.
    `,
    relatedProjectSlugs: ["predictedge-vibration", "aerohydro-vortex"],
    relatedToolSlugs: ["torque-power-calc", "gear-ratio-calc"],
    seoDescription: "Comprehensive overview of Industry 4.0: cyber-physical systems, predictive maintenance, edge computing, and smart manufacturing by Ananta Labs."
  },
  {
    id: "exp-005",
    slug: "how-does-a-heat-sink-transfer-heat",
    title: "How Does a Heat Sink Transfer Heat? Conduction, Convection & Boundary Layer Physics",
    category: "Mechanical Engineering",
    readTime: "8 min read",
    author: "Dr. M. K. Sharma",
    publishedDate: "2025-08-01",
    summary: "The physics of electronic thermal dissipation: Fourier's law of conduction, Newton's law of cooling, fluid boundary layers, and convective fin efficiency.",
    keyTakeaways: [
      "Heat sinks expand surface area to maximize convective heat transfer to surrounding fluid.",
      "Fourier's law dictates internal conduction through the heat sink base.",
      "Boundary layer buildup creates thermal insulation; turbulators and pin-fins break this stagnation.",
      "ThermoShield leverages microchannel vortex shedding to dissipate >140 W/cm²."
    ],
    formula: {
      latex: "q = -k A \\frac{dT}{dx} = h A_s (T_s - T_\\infty)",
      description: "Conduction heat transfer (Fourier's Law) balanced with convective surface cooling (Newton's Law of Cooling)."
    },
    content: `
### The Fundamental Thermal Conduction-Convection Couple
Every heat sink operates as a thermal bridge between a heat source (such as a CPU, power transistor, or laser diode) and a coolant fluid (such as air or water).

The process consists of three distinct thermodynamic stages:
1. **Conduction through the Base:** Heat generated at the junction conducts into the heat sink baseplate via Fourier's Law:
   $$q = -k A \\frac{dT}{dx}$$
   Where $k$ is thermal conductivity (e.g. $\\approx 390\\text{ W/m}\\cdot\\text{K}$ for pure copper, $\\approx 205\\text{ W/m}\\cdot\\text{K}$ for aluminum).
2. **Fin Spreading & Convection:** Heat spreads across extended fin surfaces. Convective heat removal follows Newton's Law of Cooling:
   $$q_{conv} = h A_s (T_s - T_\\infty)$$
3. **Fluid Advection:** The coolant fluid absorbs thermal energy and carries it away from the assembly.

### The Thermal Boundary Layer Challenge
As fluid flows across a flat fin surface, fluid friction forms a stagnant laminar boundary layer. Because stagnant fluids have very poor thermal conductivity, this boundary layer acts as a blanket, restricting heat transfer.

To overcome this bottleneck, advanced designs like Ananta Labs' **ThermoShield** introduce micro-turbulators and pin-fins that induce turbulence and secondary vortex loops, continuously replenishing the fin wall with cold fluid.
    `,
    relatedProjectSlugs: ["thermoshield-heatsink"],
    relatedToolSlugs: ["thermal-resistance-calc", "heat-transfer-calc", "reynolds-number-calc"],
    seoDescription: "An engineering explanation of heat sink thermodynamics: conduction, convection, boundary layer disruption, and fin design."
  },
  {
    id: "exp-006",
    slug: "what-is-thermal-resistance",
    title: "What Is Thermal Resistance? Modeling Heat Flow Using Ohm's Law Analogy",
    category: "Mechanical Engineering",
    readTime: "6 min read",
    author: "Dr. M. K. Sharma",
    publishedDate: "2025-07-12",
    summary: "Understand thermal resistance (Rth): the electrical circuit analogy for thermal engineering, interface materials, junction temperatures, and thermal budgeting.",
    keyTakeaways: [
      "Thermal resistance measures the temperature rise per unit of heat dissipated ($K/W$).",
      "Analogous to electrical resistance: Temperature difference $\\Delta T$ is voltage, Heat flow $Q$ is current.",
      "Series thermal resistance chains include junction-to-case, case-to-sink, and sink-to-ambient.",
      "Minimizing Thermal Interface Material (TIM) thickness is crucial for high-power electronics."
    ],
    formula: {
      latex: "R_{th} = \\frac{\\Delta T}{Q} = \\frac{L}{k A} + \\frac{1}{h A_s}",
      description: "Total thermal resistance combining conductive and convective resistance components."
    },
    content: `
### The Electrical Analogy of Thermal Systems
In thermal engineering, heat flow through solid structures and fluid interfaces behaves identically to electric current flowing through resistive networks:
- **Voltage Difference ($\\Delta V$)** $\\longleftrightarrow$ **Temperature Gradient ($\\Delta T$)** in Kelvin or °C.
- **Electric Current ($I$)** $\\longleftrightarrow$ **Heat Flow Rate ($Q$)** in Watts.
- **Electrical Resistance ($R$)** $\\longleftrightarrow$ **Thermal Resistance ($R_{th}$)** in $\\text{K/W}$ or $^{\\circ}\\text{C/W}$.

Using this relationship:
$$\\Delta T = Q \\times R_{th}$$

### The Complete Junction-to-Ambient Stack
When engineering an electronic system (such as an automotive inverter or edge AI computer), the complete thermal path forms a series circuit:
$$R_{total} = R_{junction-to-case} + R_{interface} + R_{sink-to-ambient}$$

If a power MOSFET produces $80\\text{ Watts}$ and the total thermal resistance is $0.5\\text{ K/W}$, the junction temperature will rise $40^{\\circ}\\text{C}$ above ambient air temperature.
    `,
    relatedProjectSlugs: ["thermoshield-heatsink"],
    relatedToolSlugs: ["thermal-resistance-calc", "heat-transfer-calc"],
    seoDescription: "Guide to thermal resistance calculation: electrical analogy, formulas, thermal interface materials, and thermal budgeting."
  },
  {
    id: "exp-007",
    slug: "how-does-pressure-regulation-works",
    title: "How Does Pressure Regulation Work? Closed-Loop PID Control in Precision Fluidics",
    category: "Healthcare Technology",
    readTime: "7 min read",
    author: "Jaydev Zala",
    publishedDate: "2025-11-02",
    summary: "Examining precision fluidic pressure regulation: piezoresistive pressure transducers, PID error tuning, peristaltic pump modulation, and vascular protection.",
    keyTakeaways: [
      "Pressure is force per unit area exerted by fluid against channel boundaries.",
      "Open-loop fluid pumping creates hazardous pressure spikes in variable-resistance vascular networks.",
      "PID control loops dynamically adjust pump motor PWM to maintain setpoint pressure.",
      "Applied in Ananta Labs' Embalming and bio-perfusion devices to eliminate vascular ruptures."
    ],
    formula: {
      latex: "u(t) = K_p e(t) + K_i \\int_0^t e(\\tau) d\\tau + K_d \\frac{de(t)}{dt}",
      description: "Standard continuous Proportional-Integral-Derivative (PID) control algorithm."
    },
    content: `
### Pressure in Enclosed Fluid Networks
When fluid is pumped through an elastic or rigid channel, the fluid encounters resistance due to viscous shear against the walls and downstream restrictions (such as capillaries or orifices). If flow rate is increased without monitoring pressure, internal pressure escalates exponentially:
$$\\Delta P = Q \\times R_{fluid}$$

In biological tissue and arterial embalming, exceeding vascular burst thresholds ruptures delicate vessels, ruining anatomical specimens and releasing biohazards.

### The Closed-Loop Regulation Loop
To eliminate this risk, Ananta Labs' **Automated Arterial Embalming System** utilizes a high-frequency digital closed loop:
1. **Sensor Feedback:** A medical piezoresistive transducer measures inline pressure 1,000 times per second.
2. **Error Calculation:** The microcontroller calculates the deviation $e(t) = P_{target} - P_{measured}$.
3. **PID Motor Compensation:**
   - **Proportional ($K_p$):** Reacts instantaneously to current error.
   - **Integral ($K_i$):** Eliminates steady-state offset caused by viscous fluid drag.
   - **Derivative ($K_d$):** Dampens sudden pressure spikes when micro-vessels occlude.
    `,
    relatedProjectSlugs: ["embalming-machine", "aerohydro-vortex"],
    relatedToolSlugs: ["pressure-force-calc", "pump-pressure-calc"],
    seoDescription: "Engineering guide to fluid pressure regulation, PID control loops, and closed-loop bio-fluid infusion systems."
  },
  {
    id: "exp-008",
    slug: "what-is-predictive-maintenance",
    title: "What Is Predictive Maintenance? Vibration FFT, Kurtosis & Failure Curve Forecasting",
    category: "Industry 4.0",
    readTime: "8 min read",
    author: "Rohit Patel",
    publishedDate: "2026-01-20",
    summary: "From reactive breakdown to predictive maintenance: Fast Fourier Transforms, bearing fault frequencies (BPFO/BPFI), crest factor, and edge machine learning.",
    keyTakeaways: [
      "Reactive maintenance fixes failures after they happen; predictive maintenance intervenes weeks before.",
      "Rotating equipment displays distinct vibrational signatures as micro-spalling develops on bearing raceways.",
      "Fast Fourier Transforms convert time-domain acceleration into frequency spectra.",
      "TinyML autoencoders identify anomalous vibrational drift on ultra-low power sensor nodes."
    ],
    formula: {
      latex: "BPFO = \\frac{N_b}{2} \\times RPM \\times \\left(1 - \\frac{d}{D} \\cos \\alpha\\right)",
      description: "Ball Pass Frequency Outer Race (BPFO) formula for identifying bearing outer raceway defects."
    },
    content: `
### The P-F Interval and Maintenance Philosophies
Every rotating machine follows a **P-F Curve** (Potential failure to Functional failure).
- Traditional factories operate in **Reactive mode**: running motors until they catch fire or seize.
- Preventive maintenance replaces components on a calendar schedule, discarding parts with useful life remaining.
- **Predictive Maintenance (PdM)** monitors physical degradation indicators at point **P** (weeks or months before functional failure **F**).

### Spectral Vibration Diagnostics (FFT)
When a roller bearing develops a microscopic spall or crack, each roller impact generates a distinct mechanical shock pulse. 
By applying the Fast Fourier Transform (FFT) to accelerometer data, time-domain waveforms are converted into frequency spectra:
- **1X RPM Peak:** Imbalance of the motor rotor.
- **2X RPM Peak:** Angular or parallel shaft misalignment.
- **BPFO (Ball Pass Frequency Outer):** Impacting the stationary outer ring raceway.
- **BPFI (Ball Pass Frequency Inner):** Impacting the rotating inner ring.

Through Ananta Labs' **PredictEdge** node, edge autoencoders detect these spectral abnormalities directly on factory equipment without cloud streaming.
    `,
    relatedProjectSlugs: ["predictedge-vibration"],
    relatedToolSlugs: ["torque-power-calc", "gear-ratio-calc"],
    seoDescription: "Complete guide to predictive maintenance: P-F curve, vibration FFT harmonics, bearing defect formulas, and TinyML anomaly detection."
  }
];

export const initialTools: EngineeringTool[] = [
  {
    id: "tool-001",
    slug: "unit-converter",
    title: "Engineering Multi-Unit Converter",
    category: "General Engineering",
    description: "Convert engineering units across Force, Pressure, Power, Energy, Flow Rate, and Dynamic Viscosity with high numerical precision.",
    formulaLatex: "V_{target} = V_{source} \\times \\frac{F_{target}}{F_{source}}",
    formulaExplanation: "Standard linear factor transformation between SI, Imperial, and CGS metric units.",
    assumptions: ["Standard atmospheric and gravitational conditions apply (g = 9.80665 m/s²)."],
    fields: [
      { id: "quantity", label: "Measurement Value", defaultValue: 100, min: -1000000, max: 1000000, step: 0.1 },
      { 
        id: "categoryType", 
        label: "Engineering Domain", 
        defaultValue: 1, 
        units: [
          { label: "Pressure (Bar -> PSI)", multiplier: 14.5038 },
          { label: "Pressure (PSI -> Bar)", multiplier: 0.0689476 },
          { label: "Pressure (Bar -> kPa)", multiplier: 100 },
          { label: "Force (N -> lbf)", multiplier: 0.224809 },
          { label: "Power (kW -> HP)", multiplier: 1.34102 },
          { label: "Torque (N·m -> lbf·ft)", multiplier: 0.737562 },
          { label: "Flow Rate (L/min -> m³/h)", multiplier: 0.06 }
        ]
      }
    ],
    calculate: (inputs) => {
      const q = inputs.quantity ?? 100;
      const cat = inputs.categoryType ?? 14.5038;
      const res = q * cat;
      return {
        primaryValue: res.toFixed(4),
        unit: "Converted Units",
        secondaryOutputs: [
          { label: "Input Value", value: q },
          { label: "Conversion Factor", value: cat }
        ],
        interpretation: "Accurate for thermal, mechanical, and fluidic engineering conversions."
      };
    },
    relatedProjectSlugs: ["embalming-machine", "thermoshield-heatsink"],
    relatedExplainerSlugs: ["how-pressure-regulation-works"]
  },
  {
    id: "tool-002",
    slug: "torque-power-calc",
    title: "Rotational Torque & Mechanical Power Calculator",
    category: "Mechanical Engineering",
    description: "Calculate mechanical power from rotational speed and torque, or determine required shaft torque given prime-mover motor power.",
    formulaLatex: "P = \\frac{2 \\pi N T}{60000} \\quad [\\text{kW}] \\iff T = \\frac{60000 P}{2 \\pi N} \\quad [\\text{N}\\cdot\\text{m}]",
    formulaExplanation: "Derived from the definition of mechanical work done per unit time along a circular trajectory.",
    assumptions: ["Rigid shaft transmission with zero torsional slip.", "Continuous uniform rotational velocity."],
    fields: [
      { id: "rpm", label: "Rotational Speed (N)", defaultValue: 1440, min: 1, max: 100000, step: 10, description: "Shaft revolutions per minute" },
      { id: "torque", label: "Torque (T)", defaultValue: 45, min: 0.1, max: 50000, step: 0.5, description: "Shaft torque in Newton-meters (N·m)" }
    ],
    calculate: (inputs) => {
      const rpm = inputs.rpm ?? 1440;
      const t = inputs.torque ?? 45;
      const powerKw = (2 * Math.PI * rpm * t) / 60000;
      const powerHp = powerKw * 1.34102;
      const radPerSec = (2 * Math.PI * rpm) / 60;
      return {
        primaryValue: powerKw.toFixed(3),
        unit: "kW",
        secondaryOutputs: [
          { label: "Mechanical Power (HP)", value: powerHp.toFixed(2), unit: "HP" },
          { label: "Angular Velocity", value: radPerSec.toFixed(1), unit: "rad/s" },
          { label: "Work per Revolution", value: (2 * Math.PI * t).toFixed(1), unit: "Joules" }
        ],
        interpretation: powerKw > 15 
          ? "Heavy industrial motor regime. Check shaft shear and keyway stress limits."
          : "Standard industrial motor footprint. Compatible with standard inverter drives."
      };
    },
    relatedProjectSlugs: ["predictedge-vibration"],
    relatedExplainerSlugs: ["what-is-predictive-maintenance"]
  },
  {
    id: "tool-003",
    slug: "gear-ratio-calc",
    title: "Gearbox Ratio & Output Speed Calculator",
    category: "Mechanical Engineering",
    description: "Compute velocity reduction ratio, output torque, and mechanical advantage across single or multi-stage gear trains.",
    formulaLatex: "i = \\frac{Z_2}{Z_1} = \\frac{N_1}{N_2} = \\frac{T_2}{T_1 \\cdot \\eta}",
    formulaExplanation: "Kinematic gear mesh relationship where Z represents tooth counts and eta represents mechanical transmission efficiency.",
    assumptions: ["Involute profile gear teeth with constant pitch circle.", "Typical helical/spur gear efficiency between 92% and 98%."],
    fields: [
      { id: "inputRpm", label: "Input Motor RPM", defaultValue: 1500, min: 1, max: 20000, step: 50 },
      { id: "driverTeeth", label: "Driving Gear Teeth (Z1)", defaultValue: 18, min: 6, max: 200, step: 1 },
      { id: "drivenTeeth", label: "Driven Gear Teeth (Z2)", defaultValue: 72, min: 6, max: 500, step: 1 },
      { id: "inputTorque", label: "Input Motor Torque", defaultValue: 10, min: 0.1, max: 1000, step: 0.5, description: "N·m" },
      { id: "efficiency", label: "Gearbox Efficiency", defaultValue: 95, min: 50, max: 100, step: 1, description: "%" }
    ],
    calculate: (inputs) => {
      const n1 = inputs.inputRpm ?? 1500;
      const z1 = inputs.driverTeeth ?? 18;
      const z2 = inputs.drivenTeeth ?? 72;
      const t1 = inputs.inputTorque ?? 10;
      const eff = (inputs.efficiency ?? 95) / 100;
      const ratio = z2 / z1;
      const n2 = n1 / ratio;
      const t2 = t1 * ratio * eff;
      return {
        primaryValue: ratio.toFixed(2) + ":1",
        unit: "Ratio",
        secondaryOutputs: [
          { label: "Output Speed", value: n2.toFixed(1), unit: "RPM" },
          { label: "Output Torque", value: t2.toFixed(2), unit: "N·m" },
          { label: "Torque Multiplication", value: (ratio * eff).toFixed(2), unit: "x" }
        ],
        interpretation: ratio > 1 ? "Speed reduction (torque multiplier) configuration." : "Speed increaser configuration."
      };
    },
    relatedProjectSlugs: ["predictedge-vibration", "embalming-machine"],
    relatedExplainerSlugs: ["what-is-industry-4"]
  },
  {
    id: "tool-004",
    slug: "pressure-force-calc",
    title: "Hydraulic & Pneumatic Pressure-Force Calculator",
    category: "Fluid Power",
    description: "Determine linear actuator thrust and retraction forces based on cylinder bore diameter, rod diameter, and gauge fluid pressure.",
    formulaLatex: "F_{extend} = P \\times \\left(\\frac{\\pi D^2}{4}\\right) \\quad \\& \\quad F_{retract} = P \\times \\left(\\frac{\\pi (D^2 - d^2)}{4}\\right)",
    formulaExplanation: "Pascal's principle applied to the effective cross-sectional areas of piston extend and retract chambers.",
    assumptions: ["Incompressible fluid or pressurized dry air.", "Neglects seal friction (typically 3-5% in real actuators)."],
    fields: [
      { id: "pressureBar", label: "Fluid Pressure", defaultValue: 6, min: 0.1, max: 700, step: 0.5, description: "Bar (gauge)" },
      { id: "boreMm", label: "Piston Bore Diameter (D)", defaultValue: 50, min: 5, max: 500, step: 1, description: "mm" },
      { id: "rodMm", label: "Rod Diameter (d)", defaultValue: 20, min: 0, max: 250, step: 1, description: "mm" }
    ],
    calculate: (inputs) => {
      const pBar = inputs.pressureBar ?? 6;
      const pPa = pBar * 100000;
      const D = (inputs.boreMm ?? 50) / 1000;
      const d = (inputs.rodMm ?? 20) / 1000;
      const areaExtend = (Math.PI * D * D) / 4;
      const areaRetract = (Math.PI * (D * D - d * d)) / 4;
      const forceExtendN = pPa * areaExtend;
      const forceRetractN = pPa * areaRetract;
      return {
        primaryValue: forceExtendN.toFixed(1),
        unit: "N (Thrust)",
        secondaryOutputs: [
          { label: "Extension Force (kgf)", value: (forceExtendN / 9.80665).toFixed(1), unit: "kgf" },
          { label: "Retraction Force", value: forceRetractN.toFixed(1), unit: "N" },
          { label: "Piston Area", value: (areaExtend * 10000).toFixed(2), unit: "cm²" }
        ],
        interpretation: pBar > 50 ? "High-pressure hydraulic system." : "Standard pneumatic automation pressure regime."
      };
    },
    relatedProjectSlugs: ["embalming-machine"],
    relatedExplainerSlugs: ["how-pressure-regulation-works"]
  },
  {
    id: "tool-005",
    slug: "reynolds-number-calc",
    title: "Reynolds Number & Flow Regime Analyzer",
    category: "Fluid Dynamics",
    description: "Calculate the dimensionless Reynolds number in internal pipe flows to classify laminar, transitional, or turbulent flow states.",
    formulaLatex: "Re = \\frac{\\rho \\cdot v \\cdot D}{\\mu} = \\frac{v \\cdot D}{\\nu}",
    formulaExplanation: "Ratio of inertial forces to viscous forces within a moving fluid stream.",
    assumptions: ["Newtonian fluid behavior.", "Fully developed circular conduit flow."],
    fields: [
      { id: "velocity", label: "Fluid Velocity (v)", defaultValue: 1.2, min: 0.01, max: 50, step: 0.1, description: "m/s" },
      { id: "diameterMm", label: "Pipe Inner Diameter (D)", defaultValue: 25, min: 0.5, max: 2000, step: 1, description: "mm" },
      { id: "density", label: "Fluid Density (ρ)", defaultValue: 1000, min: 500, max: 2000, step: 10, description: "kg/m³ (Water ~ 1000)" },
      { id: "viscosity", label: "Dynamic Viscosity (μ)", defaultValue: 0.001, min: 0.00001, max: 1.0, step: 0.0001, description: "Pa·s (Water ~ 0.001)" }
    ],
    calculate: (inputs) => {
      const v = inputs.velocity ?? 1.2;
      const D = (inputs.diameterMm ?? 25) / 1000;
      const rho = inputs.density ?? 1000;
      const mu = inputs.viscosity ?? 0.001;
      const re = (rho * v * D) / mu;
      let regime = "Laminar Flow (Re < 2300)";
      if (re >= 2300 && re <= 4000) {
        regime = "Transitional Regime (2300 <= Re <= 4000)";
      } else if (re > 4000) {
        regime = "Fully Turbulent Flow (Re > 4000)";
      }
      return {
        primaryValue: Math.round(re).toLocaleString(),
        unit: "Dimensionless",
        secondaryOutputs: [
          { label: "Flow Regime", value: regime },
          { label: "Kinematic Viscosity", value: ((mu / rho) * 1e6).toFixed(3), unit: "cSt (mm²/s)" }
        ],
        interpretation: re < 2300 
          ? "Streamline motion with low mixing. Heat transfer dominated by conduction." 
          : "Vigorous eddy mixing. High convective heat transfer coefficient with elevated pressure drop."
      };
    },
    relatedProjectSlugs: ["thermoshield-heatsink", "embalming-machine", "aerohydro-vortex"],
    relatedExplainerSlugs: ["how-heat-sinks-transfer-heat", "how-pressure-regulation-works"]
  },
  {
    id: "tool-006",
    slug: "thermal-resistance-calc",
    title: "Thermal Resistance & Heat Sink Sizing Calculator",
    category: "Thermal Engineering",
    description: "Determine the maximum permissible heat sink thermal resistance (Rth,sa) to keep semiconductor die junctions below critical temperature limits.",
    formulaLatex: "R_{th,sa} = \\frac{T_{j,max} - T_{ambient}}{Q_{dissipated}} - R_{th,jc} - R_{th,cs}",
    formulaExplanation: "Series thermal resistance circuit solving for target heat sink convection resistance.",
    assumptions: ["Uniform 1D heat spreading across thermal interface layer.", "Constant steady-state heat flux."],
    fields: [
      { id: "powerWatts", label: "Power Dissipation (Q)", defaultValue: 65, min: 1, max: 2000, step: 5, description: "Watts" },
      { id: "maxJunctionTemp", label: "Max Junction Temp (Tj)", defaultValue: 95, min: 40, max: 175, step: 1, description: "°C" },
      { id: "ambientTemp", label: "Ambient Air Temp (Ta)", defaultValue: 35, min: 0, max: 70, step: 1, description: "°C" },
      { id: "rJunctionCase", label: "Rth(j-c) Junction-to-Case", defaultValue: 0.35, min: 0.05, max: 3.0, step: 0.05, description: "K/W" },
      { id: "rCaseSink", label: "Rth(c-s) TIM Interface", defaultValue: 0.15, min: 0.02, max: 1.5, step: 0.02, description: "K/W" }
    ],
    calculate: (inputs) => {
      const q = inputs.powerWatts ?? 65;
      const tj = inputs.maxJunctionTemp ?? 95;
      const ta = inputs.ambientTemp ?? 35;
      const rjc = inputs.rJunctionCase ?? 0.35;
      const rcs = inputs.rCaseSink ?? 0.15;
      const totalRmax = (tj - ta) / q;
      const rsa = totalRmax - rjc - rcs;
      return {
        primaryValue: rsa > 0 ? rsa.toFixed(3) : "Unfeasible",
        unit: rsa > 0 ? "K/W" : "Requires Liquid Cooling",
        secondaryOutputs: [
          { label: "Max Total System Rth", value: totalRmax.toFixed(3), unit: "K/W" },
          { label: "Allowed Temp Budget (ΔT)", value: (tj - ta).toFixed(1), unit: "°C" }
        ],
        interpretation: rsa > 0.5 
          ? "Can be cooled with an extruded aluminum heat sink and natural or modest forced convection." 
          : rsa > 0.15 
          ? "High performance forced-air heat pipe tower or compact vapor chamber required."
          : "Extremely challenging. Liquid cold plate or microchannel cooling (ThermoShield) recommended."
      };
    },
    relatedProjectSlugs: ["thermoshield-heatsink"],
    relatedExplainerSlugs: ["what-is-thermal-resistance", "how-heat-sinks-transfer-heat"]
  },
  {
    id: "tool-007",
    slug: "heat-transfer-calc",
    title: "Sensible Heat Transfer & Energy Rate Calculator",
    category: "Thermal Engineering",
    description: "Compute required thermal wattage to heat or cool a fluid stream based on mass flow rate, specific heat capacity, and temperature delta.",
    formulaLatex: "Q = \\dot{m} \\cdot C_p \\cdot \\Delta T = \\rho \\cdot \\dot{V} \\cdot C_p \\cdot (T_{out} - T_{in})",
    formulaExplanation: "First law of thermodynamics applied to steady-state open-flow thermal systems.",
    assumptions: ["Incompressible liquid with temperature-independent specific heat capacity.", "No phase transformation occurs."],
    fields: [
      { id: "flowRateLpm", label: "Fluid Flow Rate", defaultValue: 5, min: 0.1, max: 500, step: 0.5, description: "Liters per minute (L/min)" },
      { id: "tempDelta", label: "Temperature Rise/Drop (ΔT)", defaultValue: 15, min: 1, max: 100, step: 1, description: "°C" },
      { id: "specificHeat", label: "Specific Heat (Cp)", defaultValue: 4184, min: 500, max: 6000, step: 50, description: "J/(kg·K) (Water = 4184, Glycol ~ 2400)" },
      { id: "density", label: "Fluid Density (ρ)", defaultValue: 1000, min: 700, max: 1500, step: 10, description: "kg/m³" }
    ],
    calculate: (inputs) => {
      const lpm = inputs.flowRateLpm ?? 5;
      const dt = inputs.tempDelta ?? 15;
      const cp = inputs.specificHeat ?? 4184;
      const rho = inputs.density ?? 1000;
      const mDot = (lpm / 60000) * rho; // kg/s
      const qWatts = mDot * cp * dt;
      const qKw = qWatts / 1000;
      return {
        primaryValue: qKw.toFixed(2),
        unit: "kW",
        secondaryOutputs: [
          { label: "Heat Rate in BTU/hr", value: (qKw * 3412.14).toFixed(0), unit: "BTU/hr" },
          { label: "Mass Flow Rate", value: mDot.toFixed(4), unit: "kg/s" },
          { label: "Chiller Tons Equivalent", value: (qKw / 3.51685).toFixed(2), unit: "TR" }
        ],
        interpretation: "Sufficient for determining radiator, chiller, or boiler cooling load capacities."
      };
    },
    relatedProjectSlugs: ["thermoshield-heatsink", "embalming-machine"],
    relatedExplainerSlugs: ["how-heat-sinks-transfer-heat"]
  },
  {
    id: "tool-008",
    slug: "pump-pressure-calc",
    title: "Centrifugal Pump Head & Hydraulic Power Calculator",
    category: "Fluid Power",
    description: "Calculate discharge head, hydraulic power, and motor electrical input power for industrial centrifugal pumps.",
    formulaLatex: "P_{hyd} = \\frac{\\rho \\cdot g \\cdot Q \\cdot H}{1000} \\quad [\\text{kW}] \\iff P_{elec} = \\frac{P_{hyd}}{\\eta_{pump} \\cdot \\eta_{motor}}",
    formulaExplanation: "Energy equation equating fluid weight multiplied by total dynamic head (TDH).",
    assumptions: ["Steady turbulent pipe flow.", "Neglects liquid compressibility."],
    fields: [
      { id: "flowM3h", label: "Volumetric Flow Rate (Q)", defaultValue: 20, min: 0.5, max: 2000, step: 1, description: "m³/hour" },
      { id: "headMeters", label: "Total Dynamic Head (H)", defaultValue: 35, min: 1, max: 300, step: 1, description: "meters of fluid column" },
      { id: "efficiency", label: "Pump Hydraulic Efficiency", defaultValue: 72, min: 30, max: 92, step: 1, description: "%" }
    ],
    calculate: (inputs) => {
      const qM3h = inputs.flowM3h ?? 20;
      const h = inputs.headMeters ?? 35;
      const eff = (inputs.efficiency ?? 72) / 100;
      const qM3s = qM3h / 3600;
      const pHyd = (1000 * 9.80665 * qM3s * h) / 1000;
      const pBrake = pHyd / eff;
      return {
        primaryValue: pBrake.toFixed(2),
        unit: "kW (Shaft Power)",
        secondaryOutputs: [
          { label: "Hydraulic Power Delivered", value: pHyd.toFixed(2), unit: "kW" },
          { label: "Motor Rating (HP)", value: (pBrake * 1.341).toFixed(2), unit: "HP" },
          { label: "Pressure Equivalent", value: ((h * 9.80665 * 1000) / 100000).toFixed(2), unit: "Bar" }
        ],
        interpretation: "Standard centrifugal pumping application. Size motor with 15% safety margin."
      };
    },
    relatedProjectSlugs: ["aerohydro-vortex", "embalming-machine"],
    relatedExplainerSlugs: ["how-pressure-regulation-works"]
  },
  {
    id: "tool-009",
    slug: "vision-fps-bandwidth",
    title: "Edge Vision Frame Rate & Bandwidth Estimator",
    category: "AI & Embedded Systems",
    description: "Determine uncompressed and compressed video bitrate, memory buffer requirements, and NPU bandwidth for edge camera deployments.",
    formulaLatex: "\\text{Bitrate} = W \\times H \\times \\text{BPP} \\times \\text{FPS} \\times (1 - C_{ratio})",
    formulaExplanation: "Calculates spatial pixel matrix bit generation rate across uncompressed or encoded streams.",
    assumptions: ["Progressive scan sensor capture.", "Constant frame rate (CFR) output."],
    fields: [
      { id: "width", label: "Horizontal Resolution (W)", defaultValue: 1920, min: 320, max: 7680, step: 160 },
      { id: "height", label: "Vertical Resolution (H)", defaultValue: 1080, min: 240, max: 4320, step: 120 },
      { id: "fps", label: "Frame Rate (FPS)", defaultValue: 30, min: 1, max: 240, step: 1 },
      { id: "compression", label: "Encoding Mode", defaultValue: 95, units: [
        { label: "H.265 / HEVC (~98% compression)", multiplier: 0.02 },
        { label: "H.264 / AVC (~95% compression)", multiplier: 0.05 },
        { label: "MJPEG (~85% compression)", multiplier: 0.15 },
        { label: "Raw RGB888 (Uncompressed 24-bit)", multiplier: 1.0 }
      ]}
    ],
    calculate: (inputs) => {
      const w = inputs.width ?? 1920;
      const h = inputs.height ?? 1080;
      const fps = inputs.fps ?? 30;
      const factor = inputs.compression ?? 0.05;
      const rawBps = w * h * 3 * fps * 8; // bits per second
      const compressedBps = rawBps * factor;
      const mbps = compressedBps / 1000000;
      const frameBufferMb = (w * h * 3) / (1024 * 1024);
      return {
        primaryValue: mbps.toFixed(2),
        unit: "Mbps",
        secondaryOutputs: [
          { label: "Uncompressed Stream Rate", value: (rawBps / 1000000).toFixed(1), unit: "Mbps" },
          { label: "Single Frame Buffer Size", value: frameBufferMb.toFixed(2), unit: "MB" },
          { label: "Daily Storage Volume", value: ((mbps * 3600 * 24) / 8000).toFixed(1), unit: "GB/day" }
        ],
        interpretation: mbps > 50 
          ? "Gigabit Ethernet or PCIe bus required for transport." 
          : "Easily handled over standard 4G/LTE, Wi-Fi 6, or 100Base-TX industrial Ethernet."
      };
    },
    relatedProjectSlugs: ["swachhvision"],
    relatedExplainerSlugs: ["what-is-yolo-object-detection", "how-computer-vision-works"]
  }
];

export const initialKnowledgeBase: KnowledgeArticle[] = [
  {
    id: "kb-001",
    slug: "artificial-intelligence",
    title: "Artificial Intelligence & Autonomous Decision Systems",
    category: "Artificial Intelligence",
    definition: "Artificial Intelligence (AI) encompasses computational systems capable of executing cognitive tasks traditionally requiring biological intellect, including spatial visual perception, symbolic reasoning, sensory fusion, and autonomous motor control.",
    coreExplanation: "Modern applied AI focuses on deep supervised and self-supervised artificial neural networks. Rather than deterministic human-coded rule trees, multi-layer parameters undergo stochastic gradient descent optimization to minimize empirical loss against training datasets.",
    keyConcepts: [
      { title: "Deep Neural Networks (DNN)", text: "Hierarchical feature learners capable of representing highly non-linear transformations." },
      { title: "Edge Quantization (TinyML)", text: "Compressing 32-bit floating point weights to 8-bit or 4-bit integer representations for direct execution on microcontrollers." },
      { title: "Loss Landscapes", text: "High-dimensional optimization manifolds traversed using momentum-accelerated gradient descent." }
    ],
    industrialApplications: [
      "Autonomous Civic Deterrence & Municipal Monitoring (SwachhVision)",
      "High-Speed Inline Defect Classification on SMT Assembly Lines",
      "Dynamic Predictive Load Balancing in Microgrids"
    ],
    advantages: [
      "Sub-human response latency in optical inspection.",
      "Scales without operator fatigue in continuous 24/7 industrial deployments.",
      "Discovers subtle high-order statistical correlations invisible to manual inspection."
    ],
    limitations: [
      "Vulnerability to out-of-distribution optical distortions.",
      "High computational energy required during offline model pretraining.",
      "Explainability constraints in regulated safety-critical aerospace/medical sectors."
    ],
    relatedTechnologies: ["Computer Vision", "TensorRT", "TinyML", "Edge SoCs"],
    relatedProjectSlugs: ["swachhvision", "predictedge-vibration"],
    references: [
      "Goodfellow, I., Bengio, Y., Courville, A. 'Deep Learning.' MIT Press, 2016.",
      "Ananta Labs Applied AI Whitepaper Series 2025."
    ]
  },
  {
    id: "kb-002",
    slug: "computer-vision",
    title: "Computer Vision & Photometric Spatial Perception",
    category: "Artificial Intelligence",
    definition: "Computer Vision is an interdisciplinary domain enabling computational hardware to extract high-level semantic abstractions and spatial coordinates from digital raster images and continuous video streams.",
    coreExplanation: "The field spans foundational image processing (spatial convolution, Hough transforms, morphological dilation) to modern deep convolutional backbones and Vision Transformers (ViT) that evaluate spatial self-attention across image patches.",
    keyConcepts: [
      { title: "Receptive Field", text: "The spatial window of input pixels that contribute to a specific neuron's activation." },
      { title: "Non-Maximum Suppression (NMS)", text: "Algorithmic filtering pruning redundant overlapping bounding boxes based on Intersection over Union (IoU)." },
      { title: "Optical Flow", text: "Apparent velocity vectors of visual brightness patterns across consecutive video frames." }
    ],
    industrialApplications: [
      "Edge-AI Public Cleanliness & Littering Deterrence",
      "Automated Optical Inspection (AOI) of Semiconductor Silicon Wafers",
      "Robotic Bin-Picking and Kinematic Pose Guidance"
    ],
    advantages: [
      "Non-contact, non-destructive inspection.",
      "Millimeter-level dimensional verification at hundreds of parts per minute.",
      "Seamless integration with industrial fieldbuses (Profinet, EtherCAT)."
    ],
    limitations: [
      "Illumination sensitivity and lens distortion at optical boundaries.",
      "High memory bandwidth requirements for raw 4K uncompressed streams."
    ],
    relatedTechnologies: ["YOLOv8", "OpenCV", "PyTorch", "MIPI-CSI Interfaces"],
    relatedProjectSlugs: ["swachhvision"],
    references: [
      "Szeliski, R. 'Computer Vision: Algorithms and Applications.' Springer, 2022."
    ]
  },
  {
    id: "kb-003",
    slug: "heat-transfer",
    title: "Conjugate Heat Transfer & Microscale Thermal Management",
    category: "Mechanical Engineering",
    definition: "Heat transfer is the physical discipline governing the exchange of thermal energy between physical systems, categorized into conduction through solids, convection into moving fluids, and electromagnetic thermal radiation.",
    coreExplanation: "In high-density electronics and power systems, conjugate heat transfer couples Fourier solid-state conduction inside copper heat sinks with Navier-Stokes hydrodynamic convective boundary layer flow inside coolant channels.",
    keyConcepts: [
      { title: "Thermal Boundary Layer", text: "The fluid sublayer near a heated surface where temperature gradients exist, acting as an insulating barrier." },
      { title: "Nusselt Number (Nu)", text: "The ratio of convective heat transfer to pure conductive heat transfer across a fluid boundary." },
      { title: "Thermal Resistance (Rth)", text: "The temperature rise per unit of dissipated thermal power (Kelvin per Watt)." }
    ],
    industrialApplications: [
      "Electric Vehicle SiC Traction Inverter Cooling",
      "High-Density AI Acceleration Server Racks",
      "Anatomical Perfusion Fluid Conditioning"
    ],
    advantages: [
      "Enables continuous semiconductor operation without thermal throttling.",
      "Improves lifetime reliability of power transistors by minimizing junction temperature swings."
    ],
    limitations: [
      "Microchannel designs require tight filtration to eliminate particulate blockages.",
      "Pumping power penalties escalate non-linearly at high Reynolds numbers."
    ],
    relatedTechnologies: ["Microchannel Cold Plates", "Pin-Fin Turbulators", "CFD", "Vapor Chambers"],
    relatedProjectSlugs: ["thermoshield-heatsink"],
    references: [
      "Incropera, F. P., et al. 'Fundamentals of Heat and Mass Transfer.' Wiley, 2011."
    ]
  },
  {
    id: "kb-004",
    slug: "industry-4",
    title: "Industry 4.0 & Cyber-Physical Production Systems",
    category: "Industry 4.0",
    definition: "Industry 4.0 refers to the comprehensive digitalization of manufacturing, wherein physical production machinery is continuously networked with deterministic edge compute, digital twin models, and predictive health monitoring.",
    coreExplanation: "By augmenting standard PLC control loops with high-speed edge intelligence, machines self-diagnose mechanical degradation (such as bearing raceway fluting or impeller cavitation) long before functional breakdown occurs.",
    keyConcepts: [
      { title: "Digital Twin", text: "A synchronized real-time virtual simulation representing the physical asset's current operational state." },
      { title: "Condition-Based Monitoring (CBM)", text: "Maintenance scheduled based on actual mechanical sensor readings rather than arbitrary calendar intervals." },
      { title: "Time-Sensitive Networking (TSN)", text: "Standardized ethernet protocols guaranteeing bounded microsecond latency for mission-critical feedback loops." }
    ],
    industrialApplications: [
      "Predictive Maintenance of High-Voltage Induction Motors",
      "Energy Efficiency Optimization in Chemical Fluidic Pumping Stations",
      "Closed-Loop Quality Control in High-Precision CNC Machining"
    ],
    advantages: [
      "Eliminates catastrophic unplanned downtime.",
      "Reduces replacement part consumption by optimizing maintenance intervals.",
      "Improves overall factory electrical power factor and specific energy consumption."
    ],
    limitations: [
      "Cybersecurity challenges when bridging isolated OT networks to corporate IT.",
      "Sensor calibration drift in harsh corrosive or high-vibration environments."
    ],
    relatedTechnologies: ["PredictEdge", "TinyML", "MQTT-SN", "OPC-UA"],
    relatedProjectSlugs: ["predictedge-vibration", "aerohydro-vortex"],
    references: [
      "Kagermann, H., et al. 'Recommendations for implementing the strategic initiative INDUSTRIE 4.0.' acatech, 2013."
    ]
  }
];

export const initialExperiments: ExperimentStudy[] = [
  {
    id: "exp-001",
    experimentId: "ALE-2026-001",
    slug: "microchannel-pin-fin-heat-dissipation",
    title: "Microchannel Pin-Fin Heat Dissipation at Varying Reynolds Numbers",
    date: "2026-01-22",
    category: "Mechanical Engineering",
    objective: "To measure the conjugate heat transfer coefficient and hydraulic pressure penalty across staggered elliptical pin-fins in a 450 μm microchannel as flow transitions from laminar to turbulent regimes.",
    equipment: [
      "Ananta Labs Copper Microchannel Prototype (24 parallel channels)",
      "PolyScience Precision Circulating Thermal Bath (±0.01°C stability)",
      "Omega Engineering Type-T Calibrated Thermocouple Grid (8 channels)",
      "Yokogawa EJX110A Differential Pressure Transmitter",
      "Ceramic Cartridge Heater Block (0–500 W variable DC supply)"
    ],
    experimentalSetup: "The copper test section was clamped into a PEEK insulating housing to minimize environmental parasitic heat losses to under 1.5%. Deionized water at 25.0°C was circulated through the test section while the heater block applied a constant 120 W/cm² heat flux.",
    variables: [
      { name: "Coolant Flow Rate", type: "Independent", description: "Varied from 0.2 to 2.8 Liters/min (Re = 350 to 2850)" },
      { name: "Heat Sink Base Temperature", type: "Dependent", description: "Measured via 4 embedded thermocouples along channel centerline" },
      { name: "Differential Pressure Drop", type: "Dependent", description: "Measured across inlet and outlet manifolds in kPa" },
      { name: "Inlet Temperature & Heat Flux", type: "Controlled", description: "Maintained at 25.0°C and 120 W/cm²" }
    ],
    procedure: [
      "1. Degas deionized water coolant to prevent air bubble nucleation inside microchannels.",
      "2. Initialize coolant circulation at baseline flow rate of 0.2 L/min until thermal equilibrium is established (dT/dt < 0.05°C/min).",
      "3. Power the ceramic cartridge heater to 120 W/cm² and record steady-state thermocouple voltages over 10 minutes.",
      "4. Increment flow rate in steps of 0.25 L/min up to 2.8 L/min, recording pressure drop and surface temperatures at each stable plateau.",
      "5. Calculate local Nusselt numbers and friction factors using Darcy-Weisbach formulations."
    ],
    measurements: [
      { step: "Re = 420 (0.35 L/min)", reading: "T_base = 79.4°C, ΔP = 4.2 kPa", notes: "Laminar flow regime; thick boundary layer" },
      { step: "Re = 980 (0.80 L/min)", reading: "T_base = 68.1°C, ΔP = 11.8 kPa", notes: "Vortex generation initiated behind elliptical pins" },
      { step: "Re = 1650 (1.40 L/min)", reading: "T_base = 59.8°C, ΔP = 24.6 kPa", notes: "Nusselt enhancement crosses +45% threshold" },
      { step: "Re = 2400 (2.05 L/min)", reading: "T_base = 54.2°C, ΔP = 46.1 kPa", notes: "Transitional turbulent breakdown" },
      { step: "Re = 2850 (2.45 L/min)", reading: "T_base = 51.7°C, ΔP = 62.4 kPa", notes: "Optimal performance index reached" }
    ],
    graphData: [
      { x: 420, y: 79.4, label: "Re=420" },
      { x: 980, y: 68.1, label: "Re=980" },
      { x: 1650, y: 59.8, label: "Re=1650" },
      { x: 2100, y: 56.1, label: "Re=2100" },
      { x: 2400, y: 54.2, label: "Re=2400" },
      { x: 2850, y: 51.7, label: "Re=2850" }
    ],
    graphConfig: {
      title: "Heat Sink Base Temperature (°C) vs Reynolds Number (Re)",
      xLabel: "Reynolds Number (Dimensionless)",
      yLabel: "Base Temperature (°C)"
    },
    observations: [
      "Staggered elliptical pin-fins delay the onset of severe flow separation while shedding secondary vortices.",
      "Thermal resistance plateaued near Re = 2400, indicating diminishing returns for higher pumping pressures beyond 50 kPa."
    ],
    conclusion: "The elliptical pin-fin geometry successfully achieved a thermal resistance of 0.082 K/W, outperforming smooth plain microchannels by 64% while maintaining manageable pumping requirements.",
    relatedProjectSlug: "thermoshield-heatsink"
  },
  {
    id: "exp-002",
    experimentId: "ALE-2025-003",
    slug: "spitting-false-positive-rejection",
    title: "Spitting Action False-Positive Rejection Under Varying Illumination & Angles",
    date: "2025-11-14",
    category: "Artificial Intelligence",
    objective: "To stress-test SwachhVision's temporal optical-flow confirmation network against confounding human behaviors (coughing, mask adjustment, drinking water) across extreme lighting envelopes.",
    equipment: [
      "SwachhVision Edge Prototype Node (Rockchip RK3588 NPU)",
      "Sony IMX415 Global Shutter Sensor with F1.4 6mm lens",
      "Standardized Optical Test Rig with calibrated Lux meter (10 to 70,000 Lux)",
      "High-speed reference camera (120 FPS) for ground truth verification"
    ],
    experimentalSetup: "The edge camera was positioned at typical municipal installation heights (3.2 meters elevation, 35-degree downward depression angle). Actors conducted 200 scripted movements under 5 distinct lighting regimes.",
    variables: [
      { name: "Ambient Illumination", type: "Independent", description: "15 Lux (Dusk), 300 Lux (Indoor), 15,000 Lux (Overcast), 65,000 Lux (Direct Noon Sun)" },
      { name: "Action Class", type: "Independent", description: "Spitting, Sneezing, Drinking Bottle, Eating, Speaking Loudly" },
      { name: "Inference Confidence & Trigger", type: "Dependent", description: "True Positive, False Positive, False Negative" }
    ],
    procedure: [
      "1. Calibrate camera exposure and white balance across the test corridor.",
      "2. Execute 40 spitting actions and 160 negative control activities per illumination category.",
      "3. Log real-time bounding box coordinates, optical flow vectors, and deterrence audio trigger activations.",
      "4. Compare edge inference outputs against 120 FPS high-speed ground truth timestamps."
    ],
    measurements: [
      { step: "Direct Sun (65,000 Lux)", reading: "Precision = 93.8%, Recall = 90.2%", notes: "Minor lens flare compensated by dynamic HDR tuning" },
      { step: "Overcast (15,000 Lux)", reading: "Precision = 96.4%, Recall = 94.1%", notes: "Optimal optical SNR regime" },
      { step: "Dusk / Night (15 Lux with IR)", reading: "Precision = 91.2%, Recall = 88.5%", notes: "Infrared auxiliary LEDs enabled" }
    ],
    graphData: [
      { x: "15 Lux", y: 91.2, label: "Dusk" },
      { x: "300 Lux", y: 94.5, label: "Indoor" },
      { x: "15,000 Lux", y: 96.4, label: "Overcast" },
      { x: "40,000 Lux", y: 95.1, label: "Daylight" },
      { x: "65,000 Lux", y: 93.8, label: "Direct Sun" }
    ],
    graphConfig: {
      title: "Model Precision (%) Across Ambient Illumination Envelopes",
      xLabel: "Ambient Illumination Condition",
      yLabel: "Precision (%)"
    },
    observations: [
      "Temporal optical flow verification reduced drinking-bottle false alarms from 14.8% (single frame) to 1.1% (8-frame temporal window).",
      "Fast head-turning without oral trajectory did not trigger false alarms."
    ],
    conclusion: "The multi-stage temporal verification architecture delivers the robustness required for municipal deployment without embarrassing false triggers.",
    relatedProjectSlug: "swachhvision"
  }
];

export const initialBriefs: ResearchBrief[] = [
  {
    id: "brf-001",
    briefNumber: "#001",
    slug: "sub-millisecond-temporal-vectors-civic-deterrence",
    title: "Sub-Millisecond Optical Flow Verification in Edge Civic Surveillance",
    date: "2026-02-01",
    readTime: "3 min read",
    keyFinding: "Integrating an 8-frame temporal optical flow vector verification layer reduces civic vision false triggers by 92% compared to single-frame spatial bounding box classifiers.",
    whyItMatters: "False alarms in public deterrence systems (such as automated audio warnings or security alerts) destroy civic trust and irritate pedestrians. Real-world civic tech demands precision above 94%.",
    technicalInsight: "While single-frame convolutional networks confuse water bottles or handkerchiefs with spitting postures, calculating the acceleration derivative of the centroid vector over 240 milliseconds creates a distinct ballistic parabolic signature unique to expelled particulate streams.",
    summary: "Ananta Labs demonstrates how low-power edge NPUs can combine lightweight CNN keypoint tracking with temporal trajectory analysis to achieve robust civic enforcement without privacy-infringing cloud streaming.",
    relatedProjectSlugs: ["swachhvision"],
    references: ["Ananta Labs Technical Brief Series AL-BR-2026-01"]
  },
  {
    id: "brf-002",
    briefNumber: "#002",
    slug: "pin-fin-boundary-layer-breakdown",
    title: "Pin-Fin Induced Boundary Layer Breakdown in Microchannel Heat Sinks",
    date: "2025-12-18",
    readTime: "3 min read",
    keyFinding: "Staggered elliptical pin-fins enhance convective Nusselt numbers by 64.2% while adding only an 18% hydraulic pressure drop penalty relative to plain rectangular microchannels.",
    whyItMatters: "Next-generation silicon-carbide (SiC) inverters in electric vehicles operate at power densities exceeding 120 W/cm², creating severe thermal bottlenecks for standard cold plates.",
    technicalInsight: "The elliptical profile delays boundary-layer separation toward the trailing edge, shedding horseshoe vortices that continuously sweep warm fluid out of the stagnant wall zone without generating severe flow recirculation wake zones.",
    summary: "Experimental results from Ananta Labs' ThermoShield project confirm that micro-pin geometries bridge the gap between high thermal dissipation and manageable pumping power.",
    relatedProjectSlugs: ["thermoshield-heatsink"],
    references: ["Ananta Labs Technical Brief Series AL-BR-2025-04"]
  },
  {
    id: "brf-003",
    briefNumber: "#003",
    slug: "tinyml-quantization-industrial-vibration",
    title: "Quantization-Aware TinyML for Sub-20mW Industrial Anomaly Sensing",
    date: "2025-10-10",
    readTime: "3 min read",
    keyFinding: "8-bit integer quantization (INT8) of spectral autoencoder models preserves 98.4% of full-precision anomaly detection accuracy while enabling 4+ year battery lifespan on ARM Cortex-M4 nodes.",
    whyItMatters: "Running continuous condition monitoring on factory equipment is economically unviable if sensors require high-power wireless modems streaming gigabytes of raw data.",
    technicalInsight: "Performing on-chip 2048-point Fast Fourier Transforms (FFT) and extracting non-linear statistical features (kurtosis, skewness, crest factor) shrinks the model parameter input vector from 12,800 raw samples to 16 engineered features.",
    summary: "PredictEdge sensor architecture proves that local edge inference allows industrial IoT deployments to be truly unteathered, self-contained, and proactive.",
    relatedProjectSlugs: ["predictedge-vibration"],
    references: ["Ananta Labs Technical Brief Series AL-BR-2025-02"]
  }
];

export const initialTrends: TechTrend[] = [
  {
    id: "trd-001",
    slug: "edge-vision-ai-public-infrastructure",
    title: "Edge Vision AI in Smart Municipal Infrastructure",
    category: "Artificial Intelligence",
    horizon: "Near-term (1-2 yrs)",
    maturity: "Accelerating",
    executiveSummary: "Municipalities are transitioning from passive recording CCTV infrastructure to autonomous, edge-processed civic intelligence nodes that preserve citizen privacy while actively addressing urban hygiene, traffic congestion, and infrastructure wear.",
    keyDrivers: [
      "Citizen privacy regulations prohibiting mass transmission and storage of raw biometric facial streams.",
      "Availability of sub-$30 edge NPUs providing 2 to 6 TOPS of INT8 neural compute.",
      "Municipal cost escalations for manual inspection and civic remediation."
    ],
    engineeringChallenges: [
      "Thermal throttling of outdoor sealed IP67 camera enclosures under 50°C tropical summers.",
      "False-alarm minimization across chaotic optical conditions (monsoon rain, direct sun, moving shadows)."
    ],
    anantaLabsPerspective: "Ananta Labs pioneered edge temporal-motion heuristics in SwachhVision, proving that edge computing can protect privacy while delivering immediate localized deterrence.",
    sources: [
      { title: "Gartner Hype Cycle for Smart City Technologies, 2025" },
      { title: "IEEE Transactions on Intelligent Transportation Systems" }
    ]
  },
  {
    id: "trd-002",
    slug: "high-heat-flux-microchannel-cooling",
    title: "High-Heat-Flux Microchannel Liquid Cooling for Power Electronics",
    category: "Mechanical Engineering",
    horizon: "Near-term (1-2 yrs)",
    maturity: "Mainstream",
    executiveSummary: "The rapid adoption of wide-bandgap semiconductors (Silicon Carbide and Gallium Nitride) in EV drivetrains and megawatt AI clusters is rendering conventional air-cooled heatsinks obsolete, driving adoption of direct-on-die microchannel cooling.",
    keyDrivers: [
      "Heat fluxes exceeding 150 W/cm² in AI accelerator dies and 800V EV traction inverters.",
      "Thermal interface material (TIM) reliability under rapid automotive thermal cycling.",
      "Global mandates for data center power usage effectiveness (PUE < 1.15)."
    ],
    engineeringChallenges: [
      "High differential pumping pressure requirements across narrow microchannel passages.",
      "Erosion-corrosion and particulate fouling in closed industrial coolant loops."
    ],
    anantaLabsPerspective: "Our research in ThermoShield demonstrates that combining pin-fin turbulators with microchannels optimizes the thermal resistance vs pumping penalty trade-off.",
    sources: [
      { title: "ASME Journal of Heat and Mass Transfer, 2024" },
      { title: "SemiTherm Thermal Engineering Symposium Proceedings" }
    ]
  },
  {
    id: "trd-003",
    slug: "tinyml-cyber-physical-manufacturing",
    title: "TinyML & Decentralized Cyber-Physical Manufacturing Systems",
    category: "Industry 4.0",
    horizon: "Mid-term (3-5 yrs)",
    maturity: "Emerging",
    executiveSummary: "Rather than routing every sensor data packet to centralized cloud data lakes, industrial equipment is embedding ultra-low-power neural processors directly into bearing caps, pump casings, and gearboxes.",
    keyDrivers: [
      "Cost and cybersecurity risks associated with industrial cloud bandwidth.",
      "Need for deterministic, sub-millisecond trip interlocks upon bearing cage failure.",
      "Decade-long battery lives unlocked by energy harvesting and sleep-mode inference."
    ],
    engineeringChallenges: [
      "Rigorous model quantization without loss of high-frequency spectral resolution.",
      "Managing model drift across mechanical machine wear over multi-year operational cycles."
    ],
    anantaLabsPerspective: "Through PredictEdge, Ananta Labs shows that edge feature engineering combined with quantized autoencoders delivers 98%+ anomaly detection at sub-20mW power budgets.",
    sources: [
      { title: "ARC Advisory Group Industrial IoT Report" },
      { title: "ACM Transactions on Embedded Computing Systems" }
    ]
  }
];

export const initialTimelineMilestones: TimelineMilestone[] = [
  {
    year: 2023,
    quarter: "Q2",
    title: "Founding of Ananta Labs India R&D Division",
    description: "Established core engineering laboratories focused on embedded electronics, precision mechanical systems, and applied computer vision.",
    category: "Mechanical Engineering",
    milestoneType: "Initiation"
  },
  {
    year: 2024,
    quarter: "Q1",
    title: "AeroHydro Vortex Aerator Commercial Validation",
    description: "Completed pilot effluent aeration trials across industrial dye plants, achieving 32% energy reduction and securing Indian Patent 451902.",
    category: "Sustainable Technology",
    projectSlug: "aerohydro-vortex",
    milestoneType: "Commercialized"
  },
  {
    year: 2024,
    quarter: "Q4",
    title: "Initiation of SwachhVision Edge AI Project",
    description: "Commenced research into real-time optical flow kinematics for civic cleanliness and urban sanitation deterrence.",
    category: "Artificial Intelligence",
    projectSlug: "swachhvision",
    milestoneType: "Prototype"
  },
  {
    year: 2025,
    quarter: "Q2",
    title: "ThermoShield High-Flux Microchannel Experimental Validation",
    description: "Published experimental test results demonstrating 0.082 K/W thermal resistance under 140 W/cm² heat flux in power semiconductor cooling.",
    category: "Mechanical Engineering",
    projectSlug: "thermoshield-heatsink",
    milestoneType: "Validation"
  },
  {
    year: 2025,
    quarter: "Q3",
    title: "Automated Arterial Embalming Machine Clinical Trials",
    description: "Conducted 40 cadaveric perfusion trials with medical universities; filed Indian Patent Application No. 202521004118.",
    category: "Healthcare Technology",
    projectSlug: "embalming-machine",
    milestoneType: "Patent"
  },
  {
    year: 2026,
    quarter: "Q1",
    title: "SwachhVision Municipal Pilot Deployment & Deterrence Patent",
    description: "Field deployment of edge nodes across public transit hubs, proving 94.2% true spitting detection accuracy and immediate 68% violation drop.",
    category: "Artificial Intelligence",
    projectSlug: "swachhvision",
    milestoneType: "Deployment"
  },
  {
    year: 2026,
    quarter: "Q3",
    title: "PredictEdge TinyML Sub-Kilohertz Anomaly Node Release",
    description: "Finalized hardware board rev 2.1 for battery-operated industrial predictive maintenance on rotating machinery.",
    category: "Industry 4.0",
    projectSlug: "predictedge-vibration",
    milestoneType: "Prototype"
  }
];
