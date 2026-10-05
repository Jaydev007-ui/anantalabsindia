import { useState, useEffect } from 'react';
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

import {
  initialStatistics,
  initialResearchers,
  initialProjects,
  initialExplainers,
  initialTools,
  initialKnowledgeBase,
  initialExperiments,
  initialBriefs,
  initialTrends,
  initialTimelineMilestones
} from './initialData';

const STORAGE_KEYS = {
  STATS: 'ananta_stats_v1',
  PROJECTS: 'ananta_projects_v1',
  RESEARCHERS: 'ananta_researchers_v1',
  EXPLAINERS: 'ananta_explainers_v1',
  EXPERIMENTS: 'ananta_experiments_v1',
  BRIEFS: 'ananta_briefs_v1',
  TRENDS: 'ananta_trends_v1',
  LEADS: 'ananta_leads_v1',
  ANALYTICS: 'ananta_analytics_v1',
  CANDIDATES: 'ananta_candidates_v1',
  KNOWLEDGE_BASE: 'ananta_knowledge_base_v1'
};

export interface ExamCandidate {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  organization: string;
  topic: string;
  status: 'Registered' | 'In-Progress' | 'Completed';
  result?: 'PASSED' | 'FAILED';
  score?: number;
  totalQuestions: number;
  percentage?: number;
  certificateId?: string;
  startedAt: string;
  completedAt?: string;
  answers?: Record<number, number>;
}


export interface LeadSubmission {
  id: string;
  name: string;
  email: string;
  organization: string;
  interestType: 'Research Collaboration' | 'Technology Development' | 'R&D Support' | 'IP Licensing' | 'General';
  relatedProject?: string;
  message: string;
  timestamp: string;
}

export interface AnalyticsRecord {
  pageViews: Record<string, number>;
  toolRuns: Record<string, number>;
  pdfDownloads: Record<string, number>;
  searchQueries: string[];
}

export function getStoredData<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

export function setStoredData<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("Failed to persist to localStorage", e);
  }
}

const initialCandidates: ExamCandidate[] = [
  {
    id: 'cand-001',
    fullName: 'Aarav Sharma',
    email: 'aarav.sharma@iitb.ac.in',
    phone: '+91 98201 12345',
    organization: 'IIT Bombay',
    topic: 'Artificial intelligence',
    status: 'Completed',
    result: 'PASSED',
    score: 34,
    totalQuestions: 40,
    percentage: 85,
    certificateId: 'AL-CERT-2026-AI-9021',
    startedAt: '2026-03-28T10:15:00.000Z',
    completedAt: '2026-03-28T11:08:24.000Z'
  },
  {
    id: 'cand-002',
    fullName: 'Pooja Iyer',
    email: 'pooja.iyer@nitk.edu.in',
    phone: '+91 94481 99201',
    organization: 'NIT Surathkal',
    topic: 'IoT',
    status: 'Completed',
    result: 'PASSED',
    score: 29,
    totalQuestions: 40,
    percentage: 72.5,
    certificateId: 'AL-CERT-2026-IOT-7183',
    startedAt: '2026-03-29T14:00:00.000Z',
    completedAt: '2026-03-29T14:52:10.000Z'
  },
  {
    id: 'cand-003',
    fullName: 'Rohan Deshmukh',
    email: 'rohan.mech@coep.ac.in',
    phone: '+91 98220 54123',
    organization: 'COEP Tech University Pune',
    topic: 'Mechanical engineering',
    status: 'Completed',
    result: 'FAILED',
    score: 21,
    totalQuestions: 40,
    percentage: 52.5,
    startedAt: '2026-03-30T09:30:00.000Z',
    completedAt: '2026-03-30T10:29:45.000Z'
  },
  {
    id: 'cand-004',
    fullName: 'Sneha Kulkarni',
    email: 'sneha.k@bmsce.ac.in',
    phone: '+91 97412 88319',
    organization: 'BMS College of Engineering',
    topic: 'Strength of materials',
    status: 'Completed',
    result: 'PASSED',
    score: 31,
    totalQuestions: 40,
    percentage: 77.5,
    certificateId: 'AL-CERT-2026-SOM-3382',
    startedAt: '2026-04-01T11:20:00.000Z',
    completedAt: '2026-04-01T12:15:30.000Z'
  }
];

// React Hook to access and mutate Hub Data
export function useHubData() {
  const [stats, setStatsState] = useState<HubStatistics>(() => getStoredData(STORAGE_KEYS.STATS, initialStatistics));
  const [projects, setProjectsState] = useState<ResearchProject[]>(() => getStoredData(STORAGE_KEYS.PROJECTS, initialProjects));
  const [researchers, setResearchersState] = useState<Researcher[]>(() => getStoredData(STORAGE_KEYS.RESEARCHERS, initialResearchers));
  const [candidates, setCandidatesState] = useState<ExamCandidate[]>(() => getStoredData(STORAGE_KEYS.CANDIDATES, initialCandidates));
  const [explainers, setExplainersState] = useState<ExplainerArticle[]>(() => getStoredData(STORAGE_KEYS.EXPLAINERS, initialExplainers));
  const [experiments, setExperimentsState] = useState<ExperimentStudy[]>(() => getStoredData(STORAGE_KEYS.EXPERIMENTS, initialExperiments));
  const [briefs, setBriefsState] = useState<ResearchBrief[]>(() => getStoredData(STORAGE_KEYS.BRIEFS, initialBriefs));
  const [trends, setTrendsState] = useState<TechTrend[]>(() => getStoredData(STORAGE_KEYS.TRENDS, initialTrends));
  const [leads, setLeadsState] = useState<LeadSubmission[]>(() => getStoredData(STORAGE_KEYS.LEADS, []));
  const [analytics, setAnalyticsState] = useState<AnalyticsRecord>(() => 
    getStoredData(STORAGE_KEYS.ANALYTICS, { pageViews: {}, toolRuns: {}, pdfDownloads: {}, searchQueries: [] })
  );

  // Tools & knowledge have functional/calculation logic and rich base records
  const tools = initialTools;
  const [knowledgeBase, setKnowledgeBaseState] = useState<KnowledgeArticle[]>(() => getStoredData(STORAGE_KEYS.KNOWLEDGE_BASE, initialKnowledgeBase));
  const timeline = initialTimelineMilestones;

  const updateStats = (newStats: HubStatistics) => {
    setStatsState(newStats);
    setStoredData(STORAGE_KEYS.STATS, newStats);
  };

  const saveProject = (project: ResearchProject) => {
    setProjectsState(prev => {
      const idx = prev.findIndex(p => p.id === project.id || p.slug === project.slug);
      let updated: ResearchProject[];
      if (idx >= 0) {
        updated = [...prev];
        updated[idx] = project;
      } else {
        updated = [project, ...prev];
      }
      setStoredData(STORAGE_KEYS.PROJECTS, updated);
      return updated;
    });
  };

  const deleteProject = (id: string) => {
    setProjectsState(prev => {
      const updated = prev.filter(p => p.id !== id && p.slug !== id);
      setStoredData(STORAGE_KEYS.PROJECTS, updated);
      return updated;
    });
  };

  const saveResearcher = (researcher: Researcher) => {
    setResearchersState(prev => {
      const idx = prev.findIndex(r => r.id === researcher.id);
      let updated: Researcher[];
      if (idx >= 0) {
        updated = [...prev];
        updated[idx] = researcher;
      } else {
        updated = [...prev, researcher];
      }
      setStoredData(STORAGE_KEYS.RESEARCHERS, updated);
      return updated;
    });
  };

  const deleteResearcher = (id: string) => {
    setResearchersState(prev => {
      const updated = prev.filter(r => r.id !== id);
      setStoredData(STORAGE_KEYS.RESEARCHERS, updated);
      return updated;
    });
  };

  const saveExamCandidate = (candidate: ExamCandidate) => {
    setCandidatesState(prev => {
      const idx = prev.findIndex(c => c.id === candidate.id);
      let updated: ExamCandidate[];
      if (idx >= 0) {
        updated = [...prev];
        updated[idx] = candidate;
      } else {
        updated = [candidate, ...prev];
      }
      setStoredData(STORAGE_KEYS.CANDIDATES, updated);
      return updated;
    });
  };

  const deleteExamCandidate = (id: string) => {
    setCandidatesState(prev => {
      const updated = prev.filter(c => c.id !== id);
      setStoredData(STORAGE_KEYS.CANDIDATES, updated);
      return updated;
    });
  };

  const saveExplainer = (article: ExplainerArticle) => {
    setExplainersState(prev => {
      const idx = prev.findIndex(a => a.id === article.id);
      let updated: ExplainerArticle[];
      if (idx >= 0) {
        updated = [...prev];
        updated[idx] = article;
      } else {
        updated = [article, ...prev];
      }
      setStoredData(STORAGE_KEYS.EXPLAINERS, updated);
      return updated;
    });
  };

  const deleteExplainer = (id: string) => {
    setExplainersState(prev => {
      const updated = prev.filter(e => e.id !== id && e.slug !== id);
      setStoredData(STORAGE_KEYS.EXPLAINERS, updated);
      return updated;
    });
  };

  const saveKnowledgeArticle = (article: KnowledgeArticle) => {
    setKnowledgeBaseState(prev => {
      const idx = prev.findIndex(k => k.id === article.id || k.slug === article.slug);
      let updated: KnowledgeArticle[];
      if (idx >= 0) {
        updated = [...prev];
        updated[idx] = article;
      } else {
        updated = [article, ...prev];
      }
      setStoredData(STORAGE_KEYS.KNOWLEDGE_BASE, updated);
      return updated;
    });
  };

  const deleteKnowledgeArticle = (id: string) => {
    setKnowledgeBaseState(prev => {
      const updated = prev.filter(k => k.id !== id && k.slug !== id);
      setStoredData(STORAGE_KEYS.KNOWLEDGE_BASE, updated);
      return updated;
    });
  };

  const saveBrief = (brief: ResearchBrief) => {
    setBriefsState(prev => {
      const idx = prev.findIndex(b => b.id === brief.id || b.slug === brief.slug);
      let updated: ResearchBrief[];
      if (idx >= 0) {
        updated = [...prev];
        updated[idx] = brief;
      } else {
        updated = [brief, ...prev];
      }
      setStoredData(STORAGE_KEYS.BRIEFS, updated);
      return updated;
    });
  };

  const deleteBrief = (id: string) => {
    setBriefsState(prev => {
      const updated = prev.filter(b => b.id !== id && b.slug !== id);
      setStoredData(STORAGE_KEYS.BRIEFS, updated);
      return updated;
    });
  };

  const saveTrend = (trend: TechTrend) => {
    setTrendsState(prev => {
      const idx = prev.findIndex(t => t.id === trend.id || t.slug === trend.slug);
      let updated: TechTrend[];
      if (idx >= 0) {
        updated = [...prev];
        updated[idx] = trend;
      } else {
        updated = [trend, ...prev];
      }
      setStoredData(STORAGE_KEYS.TRENDS, updated);
      return updated;
    });
  };

  const deleteTrend = (id: string) => {
    setTrendsState(prev => {
      const updated = prev.filter(t => t.id !== id && t.slug !== id);
      setStoredData(STORAGE_KEYS.TRENDS, updated);
      return updated;
    });
  };

  const saveExperiment = (exp: ExperimentStudy) => {
    setExperimentsState(prev => {
      const idx = prev.findIndex(e => e.id === exp.id);
      let updated: ExperimentStudy[];
      if (idx >= 0) {
        updated = [...prev];
        updated[idx] = exp;
      } else {
        updated = [exp, ...prev];
      }
      setStoredData(STORAGE_KEYS.EXPERIMENTS, updated);
      return updated;
    });
  };

  const addLead = (lead: Omit<LeadSubmission, 'id' | 'timestamp'>) => {
    const newLead: LeadSubmission = {
      ...lead,
      id: "lead-" + Date.now(),
      timestamp: new Date().toISOString()
    };
    setLeadsState(prev => {
      const updated = [newLead, ...prev];
      setStoredData(STORAGE_KEYS.LEADS, updated);
      return updated;
    });
    return newLead;
  };

  const trackPageView = (path: string) => {
    setAnalyticsState(prev => {
      const count = (prev.pageViews[path] || 0) + 1;
      const updated = {
        ...prev,
        pageViews: { ...prev.pageViews, [path]: count }
      };
      setStoredData(STORAGE_KEYS.ANALYTICS, updated);
      return updated;
    });
  };

  const trackToolRun = (toolSlug: string) => {
    setAnalyticsState(prev => {
      const count = (prev.toolRuns[toolSlug] || 0) + 1;
      const updated = {
        ...prev,
        toolRuns: { ...prev.toolRuns, [toolSlug]: count }
      };
      setStoredData(STORAGE_KEYS.ANALYTICS, updated);
      return updated;
    });
  };

  const trackPdfDownload = (projectSlug: string) => {
    setAnalyticsState(prev => {
      const count = (prev.pdfDownloads[projectSlug] || 0) + 1;
      const updated = {
        ...prev,
        pdfDownloads: { ...prev.pdfDownloads, [projectSlug]: count }
      };
      setStoredData(STORAGE_KEYS.ANALYTICS, updated);
      return updated;
    });
  };

  const trackSearch = (query: string) => {
    if (!query.trim()) return;
    setAnalyticsState(prev => {
      const updated = {
        ...prev,
        searchQueries: [query, ...prev.searchQueries.slice(0, 49)]
      };
      setStoredData(STORAGE_KEYS.ANALYTICS, updated);
      return updated;
    });
  };

  const resetAllData = () => {
    localStorage.clear();
    setStatsState(initialStatistics);
    setProjectsState(initialProjects);
    setResearchersState(initialResearchers);
    setExplainersState(initialExplainers);
    setExperimentsState(initialExperiments);
    setBriefsState(initialBriefs);
    setTrendsState(initialTrends);
    setLeadsState([]);
    setAnalyticsState({ pageViews: {}, toolRuns: {}, pdfDownloads: {}, searchQueries: [] });
  };

  const exportAllJson = () => {
    return JSON.stringify({
      version: "1.0",
      exportDate: new Date().toISOString(),
      stats,
      projects,
      researchers,
      explainers,
      experiments,
      briefs,
      trends
    }, null, 2);
  };

  const importJsonData = (rawJson: string) => {
    try {
      const parsed = JSON.parse(rawJson);
      if (parsed.stats) updateStats(parsed.stats);
      if (parsed.projects) {
        setProjectsState(parsed.projects);
        setStoredData(STORAGE_KEYS.PROJECTS, parsed.projects);
      }
      if (parsed.researchers) {
        setResearchersState(parsed.researchers);
        setStoredData(STORAGE_KEYS.RESEARCHERS, parsed.researchers);
      }
      if (parsed.explainers) {
        setExplainersState(parsed.explainers);
        setStoredData(STORAGE_KEYS.EXPLAINERS, parsed.explainers);
      }
      if (parsed.experiments) {
        setExperimentsState(parsed.experiments);
        setStoredData(STORAGE_KEYS.EXPERIMENTS, parsed.experiments);
      }
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e?.message || "Invalid JSON format" };
    }
  };

  return {
    stats,
    projects,
    researchers,
    explainers,
    tools,
    knowledgeBase,
    experiments,
    briefs,
    trends,
    timeline,
    leads,
    analytics,
    updateStats,
    saveProject,
    deleteProject,
    saveResearcher,
    saveExplainer,
    saveExperiment,
    addLead,
    trackPageView,
    trackToolRun,
    trackPdfDownload,
    trackSearch,
    resetAllData,
    candidates,
    deleteResearcher,
    saveExamCandidate,
    deleteExamCandidate,
    deleteExplainer,
    saveKnowledgeArticle,
    deleteKnowledgeArticle,
    saveBrief,
    deleteBrief,
    saveTrend,
    deleteTrend,
    exportAllJson,
    importJsonData
  };
}
