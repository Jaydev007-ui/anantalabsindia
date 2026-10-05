export type ResearchStatus = 
  | 'Concept'
  | 'Development'
  | 'Experimental'
  | 'Validation'
  | 'Published'
  | 'Deployed'
  | 'Commercialized';

export type ResearchAreaCategory =
  | 'Artificial Intelligence'
  | 'Mechanical Engineering'
  | 'Healthcare Technology'
  | 'Industry 4.0'
  | 'IoT & Embedded Systems'
  | 'Sustainable Technology';

export interface ResearchProject {
  id: string;
  researchId: string; // e.g. "ALR-2026-001"
  title: string;
  slug: string;
  abstract: string;
  authors: string[];
  organization: string;
  category: ResearchAreaCategory;
  subCategory?: string;
  tags: string[];
  status: ResearchStatus;
  publicationDate: string;
  year: number;
  coverImage?: string;
  leadResearcherId: string;
  
  // Structured Scientific Content
  researchProblem: string;
  objective: string;
  methodology: string;
  systemArchitecture: string;
  experimentalSetup: string;
  developmentProcess: string;
  results: string;
  performanceMetrics: { label: string; value: string; unit?: string }[];
  discussion: string;
  limitations: string;
  applications: string[];
  futureWork: string;
  conclusion: string;
  references: string[];
  
  // Identifiers & Attachments
  pdfUrl?: string;
  doi?: string;
  patent?: string;
  patentStatus?: string;
  datasetUrl?: string;
  technicalDocsUrl?: string;
  
  // Internal Graph
  relatedProjectSlugs: string[];
  relatedExplainerSlugs: string[];
  relatedToolSlugs: string[];
  
  // SEO
  seoTitle?: string;
  seoDescription?: string;
  featured?: boolean;
}

export interface Researcher {
  id: string;
  slug: string;
  name: string;
  role: string;
  title: string;
  photo?: string;
  biography: string;
  researchInterests: string[];
  orcid?: string;
  googleScholar?: string;
  researchGate?: string;
  externalProfiles?: { name: string; url: string }[];
  publicationsCount?: number;
  patentsCount?: number;
  featured?: boolean;
}

export interface ExplainerArticle {
  id: string;
  slug: string;
  title: string;
  category: string;
  readTime: string;
  author: string;
  publishedDate: string;
  summary: string;
  content: string; // Markdown or rich structured text
  keyTakeaways: string[];
  formula?: {
    latex: string;
    description: string;
  };
  relatedProjectSlugs: string[];
  relatedToolSlugs: string[];
  seoDescription: string;
}

export interface ToolField {
  id: string;
  label: string;
  defaultValue: number;
  min?: number;
  max?: number;
  step?: number;
  units?: { label: string; multiplier: number }[];
  description?: string;
}

export interface EngineeringTool {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  formulaLatex: string;
  formulaExplanation: string;
  assumptions: string[];
  fields: ToolField[];
  calculate: (inputs: Record<string, number>) => {
    primaryValue: number | string;
    unit: string;
    secondaryOutputs?: { label: string; value: string | number; unit?: string }[];
    interpretation?: string;
  };
  relatedProjectSlugs: string[];
  relatedExplainerSlugs: string[];
}

export interface KnowledgeArticle {
  id: string;
  slug: string;
  title: string;
  category: ResearchAreaCategory;
  definition: string;
  coreExplanation: string;
  keyConcepts: { title: string; text: string }[];
  industrialApplications: string[];
  advantages: string[];
  limitations: string[];
  relatedTechnologies: string[];
  relatedProjectSlugs: string[];
  references: string[];
}

export interface ExperimentStudy {
  id: string;
  experimentId: string; // e.g. "ALE-2026-001"
  slug: string;
  title: string;
  date: string;
  category: ResearchAreaCategory;
  objective: string;
  equipment: string[];
  experimentalSetup: string;
  variables: { name: string; type: 'Independent' | 'Dependent' | 'Controlled'; description: string }[];
  procedure: string[];
  measurements: { step: string; reading: string; notes?: string }[];
  graphData?: { x: number | string; y: number; label: string }[];
  graphConfig?: { xLabel: string; yLabel: string; title: string };
  observations: string[];
  conclusion: string;
  relatedProjectSlug?: string;
}

export interface ResearchBrief {
  id: string;
  briefNumber: string; // e.g. "#001"
  slug: string;
  title: string;
  date: string;
  readTime: string;
  keyFinding: string;
  whyItMatters: string;
  technicalInsight: string;
  summary: string;
  relatedProjectSlugs: string[];
  references: string[];
}

export interface TechTrend {
  id: string;
  slug: string;
  title: string;
  category: ResearchAreaCategory;
  horizon: 'Near-term (1-2 yrs)' | 'Mid-term (3-5 yrs)' | 'Long-term (5+ yrs)';
  maturity: 'Emerging' | 'Accelerating' | 'Mainstream';
  executiveSummary: string;
  keyDrivers: string[];
  engineeringChallenges: string[];
  anantaLabsPerspective: string;
  sources: { title: string; url?: string }[];
}

export interface HubStatistics {
  projectsCount: string;
  experimentalStudiesCount: string;
  patentsIpCount: string;
  researchAreasCount: string;
  researchersCount: string;
}

export interface TimelineMilestone {
  year: number;
  quarter: string;
  title: string;
  description: string;
  category: ResearchAreaCategory;
  projectSlug?: string;
  milestoneType: 'Initiation' | 'Prototype' | 'Patent' | 'Deployment' | 'Validation' | 'Commercialized';
}
