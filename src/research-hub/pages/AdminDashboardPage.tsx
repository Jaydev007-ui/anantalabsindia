import React, { useState } from 'react';
import { 
  Lock, 
  Unlock, 
  BarChart3, 
  Plus, 
  Edit3, 
  Trash2, 
  Save, 
  Download, 
  Upload, 
  RefreshCcw, 
  CheckCircle2, 
  FileText, 
  Cpu, 
  Users, 
  Mail, 
  Search,
  ExternalLink,
  ShieldCheck,
  Activity,
  Award,
  GraduationCap,
  CheckCircle,
  XCircle,
  Clock,
  UserPlus,
  BookOpen,
  Layers,
  TrendingUp,
  Sparkles,
  PlusCircle
} from 'lucide-react';
import { useHubData, LeadSubmission, ExamCandidate } from '../data/store';
import { 
  ResearchProject, 
  ResearchStatus, 
  ResearchAreaCategory, 
  Researcher,
  ExplainerArticle,
  KnowledgeArticle,
  ResearchBrief,
  TechTrend
} from '../types';
import { StatusBadge } from '../components/common/StatusBadge';
import { SeoHead } from '../components/common/SeoHead';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { UnifyAdminSecurityPanel } from '../security/UnifySecurityEngine';

export const AdminDashboardPage: React.FC = () => {
  const {
    stats,
    projects,
    researchers,
    candidates,
    leads,
    analytics,
    explainers,
    saveExplainer,
    deleteExplainer,
    knowledgeBase,
    saveKnowledgeArticle,
    deleteKnowledgeArticle,
    briefs,
    saveBrief,
    deleteBrief,
    trends,
    saveTrend,
    deleteTrend,
    updateStats,
    saveProject,
    deleteProject,
    saveResearcher,
    deleteResearcher,
    deleteExamCandidate,
    resetAllData,
    exportAllJson,
    importJsonData
  } = useHubData();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  const [authError, setAuthError] = useState('');

  const [activeTab, setActiveTab] = useState<'projects' | 'researchers' | 'candidates' | 'knowledge' | 'stats' | 'leads' | 'analytics' | 'security' | 'sync'>('projects');
  const [knowledgeSubTab, setKnowledgeSubTab] = useState<'explainers' | 'knowledgeBase' | 'briefs' | 'trends'>('explainers');

  // Explainer Editor State
  const [editingExplainer, setEditingExplainer] = useState<ExplainerArticle | null>(null);
  const [isNewExplainer, setIsNewExplainer] = useState(false);

  // Knowledge Article Editor State
  const [editingKnowledge, setEditingKnowledge] = useState<KnowledgeArticle | null>(null);
  const [isNewKnowledge, setIsNewKnowledge] = useState(false);

  // Brief Editor State
  const [editingBrief, setEditingBrief] = useState<ResearchBrief | null>(null);
  const [isNewBrief, setIsNewBrief] = useState(false);

  // Trend Editor State
  const [editingTrend, setEditingTrend] = useState<TechTrend | null>(null);
  const [isNewTrend, setIsNewTrend] = useState(false);

  // Project Editor State
  const [editingProject, setEditingProject] = useState<ResearchProject | null>(null);
  const [isNewProject, setIsNewProject] = useState(false);

  // Researcher Editor State
  const [editingResearcher, setEditingResearcher] = useState<Researcher | null>(null);
  const [isNewResearcher, setIsNewResearcher] = useState(false);
  const [candidateSearch, setCandidateSearch] = useState('');
  const [candidateTopicFilter, setCandidateTopicFilter] = useState('All');

  // Stats Editor State
  const [editableStats, setEditableStats] = useState({ ...stats });
  const [statsSavedNotice, setStatsSavedNotice] = useState(false);

  // Import JSON State
  const [jsonInput, setJsonInput] = useState('');
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === '9099093188') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Incorrect pass key. Access denied.');
    }
  };

  const handleStatsSave = () => {
    updateStats(editableStats);
    setStatsSavedNotice(true);
    setTimeout(() => setStatsSavedNotice(false), 2500);
  };

  const handleCreateNewResearcher = () => {
    const newRes: Researcher = {
      id: `res-${Date.now()}`,
      slug: `researcher-${Date.now()}`,
      name: 'New Researcher Name',
      role: 'Research Scientist',
      title: 'Ph.D. / M.Tech in Applied Engineering',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      biography: 'Specializes in computational intelligence, embedded architectures, and applied research at Ananta Labs India.',
      researchInterests: ['Artificial Intelligence', 'Embedded Systems'],
      orcid: '0009-0000-0000-0000',
      googleScholar: 'https://scholar.google.com',
      publicationsCount: 4,
      patentsCount: 1,
      featured: true
    };
    setEditingResearcher(newRes);
    setIsNewResearcher(true);
  };

  const handleSaveResearcher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingResearcher) return;
    saveResearcher(editingResearcher);
    setEditingResearcher(null);
    setIsNewResearcher(false);
  };

  const handleCreateNewExplainer = () => {
    const newExp: ExplainerArticle = {
      id: `exp-${Date.now()}`,
      slug: `what-is-new-concept-${Date.now()}`,
      title: 'What Is [Scientific Engineering Concept]?',
      category: 'Artificial Intelligence',
      readTime: '6 min read',
      author: 'Jaydev Zala',
      publishedDate: new Date().toISOString().split('T')[0],
      summary: 'Comprehensive scientific explainer clarifying engineering mechanics, system performance, and algorithmic workflows.',
      content: '## Fundamental Principles\n\nExplain the governing mathematical formulation and physical phenomenon.\n\n## Industrial Engineering Applications\n\nDetail practical industrial use-cases.',
      keyTakeaways: [
        'Fundamental architectural principle and mechanics',
        'Empirical trade-offs in power and throughput',
        'Industry 4.0 implementation criteria'
      ],
      relatedProjectSlugs: ['swachhvision'],
      relatedToolSlugs: ['reynolds-number'],
      seoDescription: 'Comprehensive engineering guide and explainer by Ananta Labs India.'
    };
    setEditingExplainer(newExp);
    setIsNewExplainer(true);
  };

  const handleSaveExplainer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExplainer) return;
    saveExplainer(editingExplainer);
    setEditingExplainer(null);
    setIsNewExplainer(false);
  };

  const handleCreateNewKnowledge = () => {
    const newKb: KnowledgeArticle = {
      id: `kb-${Date.now()}`,
      slug: `knowledge-concept-${Date.now()}`,
      title: 'New Technical Topic / Discipline',
      category: 'Artificial Intelligence',
      definition: 'Rigorous formal scientific definition of the engineering concept or technology standard.',
      coreExplanation: 'In-depth analysis of governing physics, mathematical models, and operational architecture.',
      keyConcepts: [
        { title: 'Foundational Mechanism', text: 'Governing equation and physical interactions under boundary conditions.' },
        { title: 'System Scalability', text: 'Hardware integration and deterministic timing guarantees.' }
      ],
      industrialApplications: ['Automated Quality Inspection', 'Medical Robotics', 'Aerospace Instrumentation'],
      advantages: ['High operational efficiency', 'Low computational overhead', 'Zero-drift calibration'],
      limitations: ['Thermal dissipation constraints under high loads', 'Requires precision sensor alignment'],
      relatedTechnologies: ['Edge AI', 'Microfluidics', 'Real-Time Embedded Systems'],
      relatedProjectSlugs: ['swachhvision'],
      references: ['IEEE Transactions on Engineering', 'Ananta Labs Technical Note 2026']
    };
    setEditingKnowledge(newKb);
    setIsNewKnowledge(true);
  };

  const handleSaveKnowledge = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingKnowledge) return;
    saveKnowledgeArticle(editingKnowledge);
    setEditingKnowledge(null);
    setIsNewKnowledge(false);
  };

  const handleCreateNewBrief = () => {
    const nextNum = briefs.length + 1;
    const padded = nextNum < 10 ? `#00${nextNum}` : `#0${nextNum}`;
    const newBrief: ResearchBrief = {
      id: `brief-${Date.now()}`,
      briefNumber: padded,
      slug: `brief-${Date.now()}`,
      title: 'Key Engineering Finding / Research Note',
      date: new Date().toISOString().split('T')[0],
      readTime: '3 min',
      keyFinding: 'Empirical testing demonstrated a 42% reduction in latency through localized tensor caching.',
      whyItMatters: 'Enables high-resolution civic surveillance on battery-powered edge hardware.',
      technicalInsight: 'By leveraging fixed-point integer quantization, memory bandwidth saturation was eliminated.',
      summary: 'Executive engineering summary explaining the laboratory breakthrough and practical deployment metrics.',
      relatedProjectSlugs: ['swachhvision'],
      references: ['Ananta Labs Lab Bench Test #14', 'Edge Vision Benchmarks 2026']
    };
    setEditingBrief(newBrief);
    setIsNewBrief(true);
  };

  const handleSaveBrief = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBrief) return;
    saveBrief(editingBrief);
    setEditingBrief(null);
    setIsNewBrief(false);
  };

  const handleCreateNewTrend = () => {
    const newTrend: TechTrend = {
      id: `trend-${Date.now()}`,
      slug: `tech-trend-${Date.now()}`,
      title: 'Emerging Engineering & Research Paradigm',
      category: 'Artificial Intelligence',
      horizon: 'Near-term (1-2 yrs)',
      maturity: 'Accelerating',
      executiveSummary: 'Analysis of emerging scientific developments, industrial market pull, and engineering feasibility.',
      keyDrivers: ['Decreasing sensor costs', 'Demand for sovereign embedded compute', 'Stricter municipal regulations'],
      engineeringChallenges: ['Thermal management in micro-enclosures', 'Determinism over wireless mesh links'],
      anantaLabsPerspective: 'Ananta Labs is positioning custom vision and fluidic architectures to address this shift directly.',
      sources: [
        { title: 'Global R&D Forecast 2026', url: 'https://anantalabsindia.org' }
      ]
    };
    setEditingTrend(newTrend);
    setIsNewTrend(true);
  };

  const handleSaveTrend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTrend) return;
    saveTrend(editingTrend);
    setEditingTrend(null);
    setIsNewTrend(false);
  };



  const handleCreateNewProject = () => {
    const nextNumber = projects.length + 1;
    const padded = nextNumber < 10 ? `00${nextNumber}` : `0${nextNumber}`;
    const newProj: ResearchProject = {
      id: `proj-${Date.now()}`,
      researchId: `ALR-2026-${padded}`,
      title: 'New Engineering Investigation',
      slug: `new-research-${Date.now()}`,
      abstract: 'Abstract describing the objective and empirical findings of the research study...',
      authors: ['Jaydev Zala'],
      organization: 'Ananta Labs India',
      category: 'Artificial Intelligence',
      tags: ['Engineering', 'Experimental'],
      status: 'Development',
      publicationDate: new Date().toISOString().split('T')[0],
      year: 2026,
      leadResearcherId: 'res-001',
      researchProblem: 'State the scientific or engineering problem being addressed...',
      objective: 'Define the targeted engineering breakthrough...',
      methodology: 'Detail the experimental and analytical methodology...',
      systemArchitecture: 'Specify the hardware and software architecture...',
      experimentalSetup: 'Describe instruments and testbed...',
      developmentProcess: 'Detail prototype iterations...',
      results: 'Report quantitative metrics and observations...',
      performanceMetrics: [
        { label: 'Latency', value: '25.0', unit: 'ms' },
        { label: 'Efficiency', value: '94.5', unit: '%' }
      ],
      discussion: 'Evaluate practical implications and comparative advantages...',
      limitations: 'Detail operational boundaries and constraints...',
      applications: ['Industrial Robotics', 'Municipal Systems'],
      futureWork: 'Next steps for hardware scaling...',
      conclusion: 'Final synthesis of research results...',
      references: ['Ananta Labs Tech Report 2026'],
      relatedProjectSlugs: [],
      relatedExplainerSlugs: [],
      relatedToolSlugs: [],
      featured: true
    };

    setEditingProject(newProj);
    setIsNewProject(true);
  };

  const handleSaveProjectForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;
    saveProject(editingProject);
    setEditingProject(null);
    setIsNewProject(false);
  };

  const handleExportJson = () => {
    const dataStr = exportAllJson();
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ananta-labs-research-export-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJson = () => {
    if (!jsonInput.trim()) return;
    const res = importJsonData(jsonInput);
    if (res.success) {
      setImportStatus('Successfully imported repository state!');
      setJsonInput('');
    } else {
      setImportStatus(`Import error: ${res.error}`);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-20">
        <SeoHead
          title="Admin CMS Authentication | Ananta Labs Research Hub"
          description="Internal content management and research registry administration."
          canonicalPath="admin"
        />
        <div className="p-8 bg-white border border-slate-200 rounded-3xl shadow-2xl text-center space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-sky-50 border border-sky-200/80 flex items-center justify-center text-sky-600 mx-auto">
            <Lock className="w-7 h-7" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Admin & CMS Portal</h1>
            <p className="text-xs text-slate-500 mt-1">
              Authorized access to publish research, edit live metrics, and view collaboration leads.
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            <div>
              <input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder=""
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-center font-mono text-sm text-slate-900 focus:outline-none focus:border-sky-500 tracking-widest"
                autoFocus
              />
              {authError && (
                <p className="text-xs text-rose-500 mt-2 font-mono">{authError}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white font-semibold rounded-xl text-sm transition shadow-lg shadow-sky-600/20"
            >
              Unlock Admin Portal
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <SeoHead
        title="Admin CMS & R&D Directorship | Ananta Labs Research Hub"
        description="Internal portal for managing research projects, editing statistics, and tracking analytics."
        canonicalPath="admin"
      />

      <Breadcrumbs items={[{ label: 'Admin CMS Portal' }]} />

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-emerald-50 text-emerald-600 text-xs font-mono mb-1">
            <Unlock className="w-3.5 h-3.5" />
            <span>Authenticated Directorship Session</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Ananta Labs R&D Content Management
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportJson}
            className="px-3.5 py-2 bg-white hover:bg-slate-100 border border-slate-200 text-xs font-mono text-sky-700 rounded-xl transition flex items-center gap-1.5"
            title="Export repository backup as JSON"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Backup</span>
          </button>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-xs font-mono text-slate-600 rounded-xl transition"
          >
            Lock Session
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 font-mono text-xs scrollbar-none whitespace-nowrap py-1">
        <button
          onClick={() => { setActiveTab('projects'); setEditingProject(null); }}
          className={`px-4 py-2 rounded-xl transition flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'projects'
              ? 'bg-cyan-500/20 text-sky-700 border border-sky-300'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Research Projects ({projects.length})</span>
        </button>

        <button
          onClick={() => { setActiveTab('researchers'); setEditingResearcher(null); }}
          className={`px-4 py-2 rounded-xl transition flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'researchers'
              ? 'bg-cyan-500/20 text-sky-700 border border-sky-300'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Researchers ({researchers.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('candidates')}
          className={`px-4 py-2 rounded-xl transition flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'candidates'
              ? 'bg-cyan-500/20 text-sky-700 border border-sky-300'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Exam Candidates ({candidates.length})</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('knowledge');
            setEditingExplainer(null);
            setEditingKnowledge(null);
            setEditingBrief(null);
            setEditingTrend(null);
          }}
          className={`px-4 py-2 rounded-xl transition flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'knowledge'
              ? 'bg-cyan-500/20 text-sky-700 border border-sky-300'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Knowledge Hub ({explainers.length + knowledgeBase.length + briefs.length + trends.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('stats')}
          className={`px-4 py-2 rounded-xl transition flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'stats'
              ? 'bg-cyan-500/20 text-sky-700 border border-sky-300'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Live Statistics</span>
        </button>

        <button
          onClick={() => setActiveTab('leads')}
          className={`px-4 py-2 rounded-xl transition flex items-center gap-2 ${
            activeTab === 'leads'
              ? 'bg-cyan-500/20 text-sky-700 border border-sky-300'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Mail className="w-4 h-4" />
          <span>Collaboration Leads ({leads.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-4 py-2 rounded-xl transition flex items-center gap-2 ${
            activeTab === 'analytics'
              ? 'bg-cyan-500/20 text-sky-700 border border-sky-300'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Analytics & Telemetry</span>
        </button>

        <button
          onClick={() => setActiveTab('security')}
          className={`px-4 py-2 rounded-xl transition flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'security'
              ? 'bg-cyan-500/20 text-sky-700 border border-sky-300'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>UNIFY Security Engine</span>
        </button>

        <button
          onClick={() => setActiveTab('sync')}
          className={`px-4 py-2 rounded-xl transition flex items-center gap-2 ${
            activeTab === 'sync'
              ? 'bg-cyan-500/20 text-sky-700 border border-sky-300'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <RefreshCcw className="w-4 h-4" />
          <span>JSON Sync & Restore</span>
        </button>
      </div>

      {/* Tab: Projects Management */}
      {activeTab === 'projects' && (
        <div className="space-y-6">
          {!editingProject ? (
            <>
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-500 font-mono">
                  Modify published papers, edit parameters, or publish new experimental work.
                </p>
                <button
                  onClick={handleCreateNewProject}
                  className="px-4 py-2 bg-gradient-to-r from-sky-600 to-blue-700 hover:from-cyan-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Research Project</span>
                </button>
              </div>

              <div className="space-y-3">
                {projects.map(p => (
                  <div
                    key={p.id}
                    className="p-5 bg-white border border-slate-200 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-sky-600">{p.researchId}</span>
                        <StatusBadge status={p.status} size="sm" />
                        {p.featured && (
                          <span className="text-[10px] font-mono text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200/40">
                            ★ Featured
                          </span>
                        )}
                      </div>
                      <h3 className="text-base font-bold text-slate-900">{p.title}</h3>
                      <div className="text-xs text-slate-500 font-mono">
                        {p.category} • Year: {p.year} • Authors: {p.authors.join(', ')}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => { setEditingProject(p); setIsNewProject(false); }}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-xs font-medium text-slate-800 rounded-lg transition flex items-center gap-1"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-sky-600" />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`Delete project ${p.researchId}: ${p.title}?`)) {
                            deleteProject(p.id);
                          }
                        }}
                        className="p-2 text-rose-400 hover:bg-rose-950/40 rounded-lg transition"
                        title="Delete project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            /* Project Editor Form */
            <form onSubmit={handleSaveProjectForm} className="p-8 bg-white border border-slate-200 rounded-3xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <h2 className="text-xl font-bold text-slate-900">
                  {isNewProject ? 'Add New Research Project' : `Edit: ${editingProject.researchId}`}
                </h2>
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                >
                  Cancel
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-600 mb-1">Research ID *</label>
                  <input
                    type="text"
                    required
                    value={editingProject.researchId}
                    onChange={(e) => setEditingProject({ ...editingProject, researchId: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-600 mb-1">Status</label>
                  <select
                    value={editingProject.status}
                    onChange={(e) => setEditingProject({ ...editingProject, status: e.target.value as ResearchStatus })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900"
                  >
                    <option value="Concept">Concept</option>
                    <option value="Development">Development</option>
                    <option value="Experimental">Experimental</option>
                    <option value="Validation">Validation</option>
                    <option value="Published">Published</option>
                    <option value="Deployed">Deployed</option>
                    <option value="Commercialized">Commercialized</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-600 mb-1">Research Area</label>
                  <select
                    value={editingProject.category}
                    onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value as ResearchAreaCategory })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900"
                  >
                    <option value="Artificial Intelligence">Artificial Intelligence</option>
                    <option value="Mechanical Engineering">Mechanical Engineering</option>
                    <option value="Healthcare Technology">Healthcare Technology</option>
                    <option value="Industry 4.0">Industry 4.0</option>
                    <option value="IoT & Embedded Systems">IoT & Embedded Systems</option>
                    <option value="Sustainable Technology">Sustainable Technology</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-600 mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={editingProject.title}
                  onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-600 mb-1">URL Slug *</label>
                  <input
                    type="text"
                    required
                    value={editingProject.slug}
                    onChange={(e) => setEditingProject({ ...editingProject, slug: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-600 mb-1">Publication Date</label>
                  <input
                    type="date"
                    value={editingProject.publicationDate}
                    onChange={(e) => setEditingProject({ ...editingProject, publicationDate: e.target.value, year: parseInt(e.target.value.split('-')[0]) || 2026 })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-600 mb-1">Abstract *</label>
                <textarea
                  required
                  rows={3}
                  value={editingProject.abstract}
                  onChange={(e) => setEditingProject({ ...editingProject, abstract: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-600 mb-1">Patent Identifier (Optional)</label>
                  <input
                    type="text"
                    value={editingProject.patent || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, patent: e.target.value })}
                    placeholder="e.g. IN Patent Application 202621008492"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-600 mb-1">DOI (Optional)</label>
                  <input
                    type="text"
                    value={editingProject.doi || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, doi: e.target.value })}
                    placeholder="e.g. 10.5281/zenodo..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-600 mb-1">Research Methodology</label>
                <textarea
                  rows={3}
                  value={editingProject.methodology}
                  onChange={(e) => setEditingProject({ ...editingProject, methodology: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-600 mb-1">System Architecture</label>
                <textarea
                  rows={3}
                  value={editingProject.systemArchitecture}
                  onChange={(e) => setEditingProject({ ...editingProject, systemArchitecture: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 resize-none"
                />
              </div>

              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 text-xs font-mono text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProject.featured || false}
                    onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}
                    className="accent-cyan-500 rounded"
                  />
                  <span>Feature on Homepage Showcase</span>
                </label>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs text-slate-700 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gradient-to-r from-sky-600 to-blue-700 text-white rounded-xl text-xs font-semibold shadow-lg shadow-sky-600/20"
                >
                  Save Research Project
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Tab: Researchers Management */}
      {activeTab === 'researchers' && (
        <div className="space-y-6">
          {!editingResearcher ? (
            <>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 tracking-tight">Ananta Labs Researchers & Scientists</h2>
                  <p className="text-xs text-slate-500 font-mono mt-1">
                    Manage institutional faculty, research leads, publication records, and scientific profiles.
                  </p>
                </div>
                <button
                  onClick={handleCreateNewResearcher}
                  className="px-4 py-2.5 bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition shadow-md shadow-sky-600/20"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Add New Researcher</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {researchers.map((res) => (
                  <div
                    key={res.id}
                    className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={res.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                          alt={res.name}
                          className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shadow-sm"
                        />
                        <div>
                          <h3 className="text-base font-bold text-slate-900">{res.name}</h3>
                          <p className="text-xs font-medium text-sky-600">{res.role}</p>
                          <p className="text-[11px] text-slate-500 line-clamp-1">{res.title}</p>
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                        {res.biography}
                      </p>

                      <div className="flex flex-wrap gap-1.5">
                        {res.researchInterests.map((interest, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md text-[11px] font-mono border border-slate-200"
                          >
                            {interest}
                          </span>
                        ))}
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs font-mono">
                        <div className="bg-slate-50 p-2 rounded-lg border border-slate-200 text-center">
                          <span className="text-[10px] text-slate-500 block uppercase">Publications</span>
                          <span className="font-bold text-slate-900">{res.publicationsCount || 0}</span>
                        </div>
                        <div className="bg-slate-50 p-2 rounded-lg border border-slate-200 text-center">
                          <span className="text-[10px] text-slate-500 block uppercase">Patents</span>
                          <span className="font-bold text-slate-900">{res.patentsCount || 0}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-3 pt-4 mt-4 border-t border-slate-100">
                      <span className="text-[11px] font-mono text-slate-400">ID: {res.id}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setEditingResearcher(res);
                            setIsNewResearcher(false);
                          }}
                          className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-mono flex items-center gap-1 transition"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Are you sure you want to delete researcher "${res.name}"?`)) {
                              deleteResearcher(res.id);
                            }
                          }}
                          className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 rounded-lg text-xs font-mono flex items-center gap-1 transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <form onSubmit={handleSaveResearcher} className="p-8 bg-white border border-slate-200 rounded-3xl shadow-lg space-y-6 max-w-3xl">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <h3 className="text-xl font-bold text-slate-900">
                  {isNewResearcher ? 'Add New Research Scientist' : `Edit Researcher: ${editingResearcher.name}`}
                </h3>
                <button
                  type="button"
                  onClick={() => setEditingResearcher(null)}
                  className="text-xs font-mono text-slate-500 hover:text-slate-900"
                >
                  Cancel
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={editingResearcher.name}
                    onChange={(e) => setEditingResearcher({ ...editingResearcher, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-700 mb-1">Role / Designation *</label>
                  <input
                    type="text"
                    required
                    value={editingResearcher.role}
                    onChange={(e) => setEditingResearcher({ ...editingResearcher, role: e.target.value })}
                    placeholder="e.g. Lead AI Scientist, Principal Robotics Engineer"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-700 mb-1">Academic Credentials / Title *</label>
                  <input
                    type="text"
                    required
                    value={editingResearcher.title}
                    onChange={(e) => setEditingResearcher({ ...editingResearcher, title: e.target.value })}
                    placeholder="e.g. Ph.D. in Computer Vision, IIT Bombay"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-700 mb-1">URL Slug</label>
                  <input
                    type="text"
                    value={editingResearcher.slug}
                    onChange={(e) => setEditingResearcher({ ...editingResearcher, slug: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-mono text-slate-700 mb-1">Photo Image URL</label>
                  <input
                    type="text"
                    value={editingResearcher.photo || ''}
                    onChange={(e) => setEditingResearcher({ ...editingResearcher, photo: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-mono text-slate-700 mb-1">Professional Biography *</label>
                  <textarea
                    rows={4}
                    required
                    value={editingResearcher.biography}
                    onChange={(e) => setEditingResearcher({ ...editingResearcher, biography: e.target.value })}
                    placeholder="Write a detailed summary of research contributions, domain expertise, and lab affiliations..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 leading-relaxed"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-mono text-slate-700 mb-1">Research Interests (Comma Separated)</label>
                  <input
                    type="text"
                    value={editingResearcher.researchInterests.join(', ')}
                    onChange={(e) => setEditingResearcher({
                      ...editingResearcher,
                      researchInterests: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                    })}
                    placeholder="Artificial Intelligence, Computer Vision, Edge Computing"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-700 mb-1">ORCID Identifier</label>
                  <input
                    type="text"
                    value={editingResearcher.orcid || ''}
                    onChange={(e) => setEditingResearcher({ ...editingResearcher, orcid: e.target.value })}
                    placeholder="0009-0000-0000-0000"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-700 mb-1">Google Scholar Profile URL</label>
                  <input
                    type="text"
                    value={editingResearcher.googleScholar || ''}
                    onChange={(e) => setEditingResearcher({ ...editingResearcher, googleScholar: e.target.value })}
                    placeholder="https://scholar.google.com/citations?user=..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-700 mb-1">Publications Count</label>
                  <input
                    type="number"
                    value={editingResearcher.publicationsCount || 0}
                    onChange={(e) => setEditingResearcher({ ...editingResearcher, publicationsCount: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-700 mb-1">Patents Count</label>
                  <input
                    type="number"
                    value={editingResearcher.patentsCount || 0}
                    onChange={(e) => setEditingResearcher({ ...editingResearcher, patentsCount: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingResearcher(null)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-xl text-xs font-mono hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gradient-to-r from-sky-600 to-blue-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-sky-600/20"
                >
                  Save Researcher Record
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Tab: Exam Candidates & Live States */}
      {activeTab === 'candidates' && (
        <div className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Exam Candidates & Live Telemetry</h2>
            <p className="text-xs text-slate-500 font-mono">
              Live states, scores, certification records, and candidate attempts across all 6 specialized engineering domains.
            </p>
          </div>

          {/* KPI Dashboard */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 font-mono">
            <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-sm">
              <span className="text-[11px] text-slate-500 block uppercase">Total Candidates</span>
              <span className="text-2xl font-bold text-slate-900 mt-1 block">{candidates.length}</span>
              <span className="text-[10px] text-slate-400 mt-1 block">Live registrations</span>
            </div>

            <div className="p-4 bg-white border border-emerald-200 rounded-2xl shadow-sm bg-emerald-50/30">
              <span className="text-[11px] text-emerald-700 block uppercase font-bold">Passed (≥60%)</span>
              <span className="text-2xl font-bold text-emerald-600 mt-1 block">
                {candidates.filter(c => c.result === 'PASSED').length}
              </span>
              <span className="text-[10px] text-emerald-600 mt-1 block">Certified engineers</span>
            </div>

            <div className="p-4 bg-white border border-rose-200 rounded-2xl shadow-sm bg-rose-50/30">
              <span className="text-[11px] text-rose-700 block uppercase font-bold">Failed (&lt;60%)</span>
              <span className="text-2xl font-bold text-rose-600 mt-1 block">
                {candidates.filter(c => c.result === 'FAILED').length}
              </span>
              <span className="text-[10px] text-rose-500 mt-1 block">Below threshold</span>
            </div>

            <div className="p-4 bg-white border border-sky-200 rounded-2xl shadow-sm bg-sky-50/30">
              <span className="text-[11px] text-sky-700 block uppercase font-bold">Pass Rate</span>
              <span className="text-2xl font-bold text-sky-700 mt-1 block">
                {candidates.length > 0
                  ? Math.round((candidates.filter(c => c.result === 'PASSED').length / candidates.length) * 100)
                  : 0}%
              </span>
              <span className="text-[10px] text-sky-600 mt-1 block">Qualifying ratio</span>
            </div>

            <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-sm col-span-2 md:col-span-1">
              <span className="text-[11px] text-slate-500 block uppercase">Avg Score</span>
              <span className="text-2xl font-bold text-indigo-700 mt-1 block">
                {candidates.filter(c => c.score !== undefined).length > 0
                  ? (
                      candidates.filter(c => c.score !== undefined).reduce((acc, c) => acc + (c.score || 0), 0) /
                      candidates.filter(c => c.score !== undefined).length
                    ).toFixed(1)
                  : '0'} / 40
              </span>
              <span className="text-[10px] text-slate-400 mt-1 block">Technical average</span>
            </div>
          </div>

          {/* Search & Topic Filters */}
          <div className="p-4 bg-white border border-slate-200 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={candidateSearch}
                onChange={(e) => setCandidateSearch(e.target.value)}
                placeholder="Search candidate, email, college..."
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-sky-500 font-mono"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1">
              {['All', 'IoT', 'Electronics', 'Artificial intelligence', 'Mechanical engineering', 'Manufacturing', 'Strength of materials'].map((topic) => (
                <button
                  key={topic}
                  onClick={() => setCandidateTopicFilter(topic)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition whitespace-nowrap ${
                    candidateTopicFilter === topic
                      ? 'bg-sky-600 text-white font-semibold'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>

          {/* Candidate Mobile Card Feed (< md screens) */}
          <div className="md:hidden space-y-3">
            {candidates
              .filter(c => {
                const matchSearch =
                  c.fullName.toLowerCase().includes(candidateSearch.toLowerCase()) ||
                  c.email.toLowerCase().includes(candidateSearch.toLowerCase()) ||
                  c.organization.toLowerCase().includes(candidateSearch.toLowerCase());
                const matchTopic = candidateTopicFilter === 'All' || c.topic === candidateTopicFilter;
                return matchSearch && matchTopic;
              })
              .map((c) => (
                <div key={c.id} className="p-4 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm font-sans">{c.fullName}</h4>
                      <p className="text-xs text-slate-500 font-mono">{c.email}</p>
                      <p className="text-[11px] text-slate-600 font-sans mt-0.5">{c.organization}</p>
                    </div>
                    <span className="px-2 py-0.5 bg-sky-50 text-sky-800 border border-sky-200 rounded-lg text-[10px] font-mono font-semibold shrink-0">
                      {c.topic}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono pt-2 border-t border-slate-100">
                    <div>
                      {c.result === 'PASSED' ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold text-[10px]">
                          <CheckCircle className="w-3 h-3 text-emerald-600" /> PASSED ({c.score}/40)
                        </span>
                      ) : c.result === 'FAILED' ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-rose-100 text-rose-800 rounded font-bold text-[10px]">
                          <XCircle className="w-3 h-3 text-rose-600" /> FAILED ({c.score}/40)
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-100 text-amber-800 rounded text-[10px]">
                          <Clock className="w-3 h-3 text-amber-600" /> In-Progress
                        </span>
                      )}
                    </div>
                    {c.certificateId && (
                      <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-700 font-mono">
                        {c.certificateId}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px] font-mono text-slate-400">
                    <span>
                      {c.completedAt ? new Date(c.completedAt).toLocaleDateString('en-IN') : new Date(c.startedAt).toLocaleDateString('en-IN')}
                    </span>
                    <button
                      onClick={() => {
                        if (confirm(`Remove record for candidate ${c.fullName}?`)) {
                          deleteExamCandidate(c.id);
                        }
                      }}
                      className="px-2.5 py-1 text-rose-600 hover:bg-rose-50 rounded-lg text-xs font-mono transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
          </div>

          {/* Candidate Table (Desktop & Tablet >= md) */}
          <div className="hidden md:block bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[11px]">
                  <tr>
                    <th className="px-5 py-3.5">Candidate Details</th>
                    <th className="px-4 py-3.5">Institution / Org</th>
                    <th className="px-4 py-3.5">Domain Topic</th>
                    <th className="px-4 py-3.5">Exam Result & Score</th>
                    <th className="px-4 py-3.5">Certificate ID</th>
                    <th className="px-4 py-3.5">Timestamp</th>
                    <th className="px-4 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-800">
                  {candidates
                    .filter(c => {
                      const matchSearch =
                        c.fullName.toLowerCase().includes(candidateSearch.toLowerCase()) ||
                        c.email.toLowerCase().includes(candidateSearch.toLowerCase()) ||
                        c.organization.toLowerCase().includes(candidateSearch.toLowerCase());
                      const matchTopic = candidateTopicFilter === 'All' || c.topic === candidateTopicFilter;
                      return matchSearch && matchTopic;
                    })
                    .map((c) => (
                      <tr key={c.id} className="hover:bg-slate-50/80 transition">
                        <td className="px-5 py-4">
                          <div className="font-bold text-slate-900 text-sm font-sans">{c.fullName}</div>
                          <div className="text-slate-500 text-[11px]">{c.email}</div>
                          <div className="text-slate-400 text-[10px]">{c.phone}</div>
                        </td>
                        <td className="px-4 py-4 text-slate-700 font-sans">
                          {c.organization}
                        </td>
                        <td className="px-4 py-4">
                          <span className="px-2.5 py-1 bg-sky-50 text-sky-800 border border-sky-200 rounded-lg text-[11px] font-semibold">
                            {c.topic}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          {c.result === 'PASSED' ? (
                            <div className="space-y-1">
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-md font-bold text-[11px]">
                                <CheckCircle className="w-3 h-3 text-emerald-600" /> PASSED
                              </span>
                              <div className="text-[11px] text-slate-600">
                                Score: <strong className="text-emerald-700">{c.score}</strong> / 40 ({c.percentage}%)
                              </div>
                            </div>
                          ) : c.result === 'FAILED' ? (
                            <div className="space-y-1">
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-rose-100 text-rose-800 border border-rose-300 rounded-md font-bold text-[11px]">
                                <XCircle className="w-3 h-3 text-rose-600" /> FAILED
                              </span>
                              <div className="text-[11px] text-slate-600">
                                Score: <strong className="text-rose-700">{c.score}</strong> / 40 ({c.percentage}%)
                              </div>
                            </div>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-amber-100 text-amber-800 border border-amber-300 rounded-md text-[11px]">
                              <Clock className="w-3 h-3 text-amber-600" /> In-Progress
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-4">
                          {c.certificateId ? (
                            <span className="px-2 py-1 bg-slate-100 border border-slate-300 text-slate-800 rounded font-mono text-[10px] font-bold">
                              {c.certificateId}
                            </span>
                          ) : (
                            <span className="text-slate-400 text-[11px] italic">Not Eligible</span>
                          )}
                        </td>
                        <td className="px-4 py-4 text-slate-500 text-[11px]">
                          {c.completedAt
                            ? new Date(c.completedAt).toLocaleString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                                hour: '2-digit',
                                minute: '2-digit'
                              })
                            : new Date(c.startedAt).toLocaleString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                        </td>
                        <td className="px-4 py-4 text-right">
                          <button
                            onClick={() => {
                              if (confirm(`Remove record for candidate ${c.fullName}?`)) {
                                deleteExamCandidate(c.id);
                              }
                            }}
                            className="p-1.5 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-lg transition"
                            title="Delete Candidate Record"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>

              {candidates.length === 0 && (
                <div className="p-8 text-center text-slate-500 font-mono text-xs">
                  No candidate examination records found.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab: Knowledge Hub Management (Research Explained, Knowledge Base, Briefs, Trends) */}
      {activeTab === 'knowledge' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">Knowledge Hub Directorship</h2>
              <p className="text-xs text-slate-500 font-mono mt-1">
                Manage all Knowledge menu publications: Research Explained, Knowledge Base, Research Briefs, and Technology Trends.
              </p>
            </div>
          </div>

          {/* Sub Navigation Bar */}
          <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200 overflow-x-auto text-xs font-mono">
            <button
              onClick={() => {
                setKnowledgeSubTab('explainers');
                setEditingExplainer(null);
                setEditingKnowledge(null);
                setEditingBrief(null);
                setEditingTrend(null);
              }}
              className={`px-4 py-2 rounded-xl transition flex items-center gap-2 whitespace-nowrap ${
                knowledgeSubTab === 'explainers'
                  ? 'bg-white text-sky-700 shadow-sm font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-600" />
              <span>Research Explained ({explainers.length})</span>
            </button>

            <button
              onClick={() => {
                setKnowledgeSubTab('knowledgeBase');
                setEditingExplainer(null);
                setEditingKnowledge(null);
                setEditingBrief(null);
                setEditingTrend(null);
              }}
              className={`px-4 py-2 rounded-xl transition flex items-center gap-2 whitespace-nowrap ${
                knowledgeSubTab === 'knowledgeBase'
                  ? 'bg-white text-sky-700 shadow-sm font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-indigo-600" />
              <span>Knowledge Base ({knowledgeBase.length})</span>
            </button>

            <button
              onClick={() => {
                setKnowledgeSubTab('briefs');
                setEditingExplainer(null);
                setEditingKnowledge(null);
                setEditingBrief(null);
                setEditingTrend(null);
              }}
              className={`px-4 py-2 rounded-xl transition flex items-center gap-2 whitespace-nowrap ${
                knowledgeSubTab === 'briefs'
                  ? 'bg-white text-sky-700 shadow-sm font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-emerald-600" />
              <span>Research Briefs ({briefs.length})</span>
            </button>

            <button
              onClick={() => {
                setKnowledgeSubTab('trends');
                setEditingExplainer(null);
                setEditingKnowledge(null);
                setEditingBrief(null);
                setEditingTrend(null);
              }}
              className={`px-4 py-2 rounded-xl transition flex items-center gap-2 whitespace-nowrap ${
                knowledgeSubTab === 'trends'
                  ? 'bg-white text-sky-700 shadow-sm font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5 text-purple-600" />
              <span>Technology Trends ({trends.length})</span>
            </button>
          </div>

          {/* Subtab 1: Research Explained */}
          {knowledgeSubTab === 'explainers' && (
            <div className="space-y-6">
              {!editingExplainer ? (
                <>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-slate-500 font-mono">
                      Educational scientific primers demystifying algorithms, hardware, and engineering models for organic traffic.
                    </p>
                    <button
                      onClick={handleCreateNewExplainer}
                      className="px-4 py-2 bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition shadow-sm"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Explainer Article</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {explainers.map((exp) => (
                      <div
                        key={exp.id}
                        className="p-5 bg-white border border-slate-200 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xs hover:shadow-sm"
                      >
                        <div className="space-y-1.5 flex-1">
                          <div className="flex items-center gap-2 text-xs font-mono">
                            <span className="px-2 py-0.5 bg-amber-50 text-amber-800 border border-amber-200 rounded font-semibold">
                              {exp.category}
                            </span>
                            <span className="text-slate-400">•</span>
                            <span className="text-slate-500">{exp.readTime}</span>
                            <span className="text-slate-400">•</span>
                            <span className="text-slate-500">Slug: /{exp.slug}</span>
                          </div>
                          <h3 className="text-base font-bold text-slate-900">{exp.title}</h3>
                          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                            {exp.summary}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 self-end md:self-center">
                          <button
                            onClick={() => {
                              setEditingExplainer(exp);
                              setIsNewExplainer(false);
                            }}
                            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-mono flex items-center gap-1 transition"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Delete explainer "${exp.title}"?`)) {
                                deleteExplainer(exp.id);
                              }
                            }}
                            className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 rounded-lg text-xs font-mono flex items-center gap-1 transition"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <form onSubmit={handleSaveExplainer} className="p-8 bg-white border border-slate-200 rounded-3xl shadow-lg space-y-6 max-w-3xl">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <h3 className="text-xl font-bold text-slate-900">
                      {isNewExplainer ? 'Create Research Explainer Article' : `Edit Explainer: ${editingExplainer.title}`}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setEditingExplainer(null)}
                      className="text-xs font-mono text-slate-500 hover:text-slate-900"
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-xs font-mono text-slate-700 mb-1">Article Title *</label>
                      <input
                        type="text"
                        required
                        value={editingExplainer.title}
                        onChange={(e) => setEditingExplainer({ ...editingExplainer, title: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-700 mb-1">URL Slug *</label>
                      <input
                        type="text"
                        required
                        value={editingExplainer.slug}
                        onChange={(e) => setEditingExplainer({ ...editingExplainer, slug: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-700 mb-1">Discipline Category *</label>
                      <input
                        type="text"
                        required
                        value={editingExplainer.category}
                        onChange={(e) => setEditingExplainer({ ...editingExplainer, category: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-700 mb-1">Read Time</label>
                      <input
                        type="text"
                        value={editingExplainer.readTime}
                        onChange={(e) => setEditingExplainer({ ...editingExplainer, readTime: e.target.value })}
                        placeholder="e.g. 5 min read"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-700 mb-1">Author Name</label>
                      <input
                        type="text"
                        value={editingExplainer.author}
                        onChange={(e) => setEditingExplainer({ ...editingExplainer, author: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-mono text-slate-700 mb-1">Executive Summary *</label>
                      <textarea
                        rows={3}
                        required
                        value={editingExplainer.summary}
                        onChange={(e) => setEditingExplainer({ ...editingExplainer, summary: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 leading-relaxed"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-mono text-slate-700 mb-1">Full Article Content (Markdown) *</label>
                      <textarea
                        rows={8}
                        required
                        value={editingExplainer.content}
                        onChange={(e) => setEditingExplainer({ ...editingExplainer, content: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono text-slate-900 leading-relaxed"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-mono text-slate-700 mb-1">Key Takeaways (One per line)</label>
                      <textarea
                        rows={3}
                        value={editingExplainer.keyTakeaways.join('\n')}
                        onChange={(e) => setEditingExplainer({
                          ...editingExplainer,
                          keyTakeaways: e.target.value.split('\n').filter(Boolean)
                        })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setEditingExplainer(null)}
                      className="px-4 py-2 border border-slate-300 text-slate-700 rounded-xl text-xs font-mono hover:bg-slate-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-gradient-to-r from-sky-600 to-blue-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-sky-600/20"
                    >
                      Save Explainer Article
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* Subtab 2: Knowledge Base */}
          {knowledgeSubTab === 'knowledgeBase' && (
            <div className="space-y-6">
              {!editingKnowledge ? (
                <>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-slate-500 font-mono">
                      Encyclopedia-style technical knowledge base covering concepts, governing equations, advantages, and limitations.
                    </p>
                    <button
                      onClick={handleCreateNewKnowledge}
                      className="px-4 py-2 bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition shadow-sm"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Knowledge Topic</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {knowledgeBase.map((kb) => (
                      <div
                        key={kb.id}
                        className="p-5 bg-white border border-slate-200 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xs hover:shadow-sm"
                      >
                        <div className="space-y-1.5 flex-1">
                          <div className="flex items-center gap-2 text-xs font-mono">
                            <span className="px-2 py-0.5 bg-indigo-50 text-indigo-800 border border-indigo-200 rounded font-semibold">
                              {kb.category}
                            </span>
                            <span className="text-slate-400">•</span>
                            <span className="text-slate-500">Slug: /{kb.slug}</span>
                          </div>
                          <h3 className="text-base font-bold text-slate-900">{kb.title}</h3>
                          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                            {kb.definition}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 self-end md:self-center">
                          <button
                            onClick={() => {
                              setEditingKnowledge(kb);
                              setIsNewKnowledge(false);
                            }}
                            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-mono flex items-center gap-1 transition"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Delete knowledge article "${kb.title}"?`)) {
                                deleteKnowledgeArticle(kb.id);
                              }
                            }}
                            className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 rounded-lg text-xs font-mono flex items-center gap-1 transition"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <form onSubmit={handleSaveKnowledge} className="p-8 bg-white border border-slate-200 rounded-3xl shadow-lg space-y-6 max-w-3xl">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <h3 className="text-xl font-bold text-slate-900">
                      {isNewKnowledge ? 'Create Encyclopedia Topic' : `Edit Topic: ${editingKnowledge.title}`}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setEditingKnowledge(null)}
                      className="text-xs font-mono text-slate-500 hover:text-slate-900"
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-xs font-mono text-slate-700 mb-1">Concept Title *</label>
                      <input
                        type="text"
                        required
                        value={editingKnowledge.title}
                        onChange={(e) => setEditingKnowledge({ ...editingKnowledge, title: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-700 mb-1">URL Slug *</label>
                      <input
                        type="text"
                        required
                        value={editingKnowledge.slug}
                        onChange={(e) => setEditingKnowledge({ ...editingKnowledge, slug: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-700 mb-1">Discipline Category *</label>
                      <select
                        value={editingKnowledge.category}
                        onChange={(e) => setEditingKnowledge({ ...editingKnowledge, category: e.target.value as any })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
                      >
                        {['Artificial Intelligence', 'Mechanical Engineering', 'Healthcare Technology', 'Industry 4.0', 'IoT & Embedded Systems', 'Sustainable Technology'].map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-mono text-slate-700 mb-1">Formal Definition *</label>
                      <textarea
                        rows={3}
                        required
                        value={editingKnowledge.definition}
                        onChange={(e) => setEditingKnowledge({ ...editingKnowledge, definition: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 leading-relaxed"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-mono text-slate-700 mb-1">Core Theoretical & Physical Explanation *</label>
                      <textarea
                        rows={5}
                        required
                        value={editingKnowledge.coreExplanation}
                        onChange={(e) => setEditingKnowledge({ ...editingKnowledge, coreExplanation: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 leading-relaxed font-mono"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-mono text-slate-700 mb-1">Industrial Applications (Comma separated)</label>
                      <input
                        type="text"
                        value={editingKnowledge.industrialApplications.join(', ')}
                        onChange={(e) => setEditingKnowledge({
                          ...editingKnowledge,
                          industrialApplications: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                        })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-700 mb-1">Key Advantages (Comma separated)</label>
                      <input
                        type="text"
                        value={editingKnowledge.advantages.join(', ')}
                        onChange={(e) => setEditingKnowledge({
                          ...editingKnowledge,
                          advantages: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                        })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-700 mb-1">Operational Limitations (Comma separated)</label>
                      <input
                        type="text"
                        value={editingKnowledge.limitations.join(', ')}
                        onChange={(e) => setEditingKnowledge({
                          ...editingKnowledge,
                          limitations: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                        })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setEditingKnowledge(null)}
                      className="px-4 py-2 border border-slate-300 text-slate-700 rounded-xl text-xs font-mono hover:bg-slate-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-gradient-to-r from-sky-600 to-blue-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-sky-600/20"
                    >
                      Save Knowledge Article
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* Subtab 3: Research Briefs */}
          {knowledgeSubTab === 'briefs' && (
            <div className="space-y-6">
              {!editingBrief ? (
                <>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-slate-500 font-mono">
                      Concise 3-minute executive summaries of laboratory findings, technical breakthroughs, and why it matters.
                    </p>
                    <button
                      onClick={handleCreateNewBrief}
                      className="px-4 py-2 bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition shadow-sm"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Research Brief</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {briefs.map((b) => (
                      <div
                        key={b.id}
                        className="p-5 bg-white border border-slate-200 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xs hover:shadow-sm"
                      >
                        <div className="space-y-1.5 flex-1">
                          <div className="flex items-center gap-2 text-xs font-mono">
                            <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded font-semibold">
                              Brief {b.briefNumber}
                            </span>
                            <span className="text-slate-400">•</span>
                            <span className="text-slate-500">{b.date}</span>
                            <span className="text-slate-400">•</span>
                            <span className="text-slate-500">{b.readTime}</span>
                          </div>
                          <h3 className="text-base font-bold text-slate-900">{b.title}</h3>
                          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                            <strong className="text-slate-800">Key Finding: </strong>{b.keyFinding}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 self-end md:self-center">
                          <button
                            onClick={() => {
                              setEditingBrief(b);
                              setIsNewBrief(false);
                            }}
                            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-mono flex items-center gap-1 transition"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Delete brief "${b.title}"?`)) {
                                deleteBrief(b.id);
                              }
                            }}
                            className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 rounded-lg text-xs font-mono flex items-center gap-1 transition"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <form onSubmit={handleSaveBrief} className="p-8 bg-white border border-slate-200 rounded-3xl shadow-lg space-y-6 max-w-3xl">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <h3 className="text-xl font-bold text-slate-900">
                      {isNewBrief ? 'Create Research Brief' : `Edit Brief: ${editingBrief.title}`}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setEditingBrief(null)}
                      className="text-xs font-mono text-slate-500 hover:text-slate-900"
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-700 mb-1">Brief Number *</label>
                      <input
                        type="text"
                        required
                        value={editingBrief.briefNumber}
                        onChange={(e) => setEditingBrief({ ...editingBrief, briefNumber: e.target.value })}
                        placeholder="#001"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-700 mb-1">URL Slug *</label>
                      <input
                        type="text"
                        required
                        value={editingBrief.slug}
                        onChange={(e) => setEditingBrief({ ...editingBrief, slug: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-mono text-slate-700 mb-1">Brief Title *</label>
                      <input
                        type="text"
                        required
                        value={editingBrief.title}
                        onChange={(e) => setEditingBrief({ ...editingBrief, title: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-mono text-slate-700 mb-1">Key Finding *</label>
                      <textarea
                        rows={2}
                        required
                        value={editingBrief.keyFinding}
                        onChange={(e) => setEditingBrief({ ...editingBrief, keyFinding: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 leading-relaxed"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-mono text-slate-700 mb-1">Why It Matters *</label>
                      <textarea
                        rows={2}
                        required
                        value={editingBrief.whyItMatters}
                        onChange={(e) => setEditingBrief({ ...editingBrief, whyItMatters: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 leading-relaxed"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-mono text-slate-700 mb-1">Technical Insight *</label>
                      <textarea
                        rows={2}
                        required
                        value={editingBrief.technicalInsight}
                        onChange={(e) => setEditingBrief({ ...editingBrief, technicalInsight: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 leading-relaxed font-mono"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setEditingBrief(null)}
                      className="px-4 py-2 border border-slate-300 text-slate-700 rounded-xl text-xs font-mono hover:bg-slate-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-gradient-to-r from-sky-600 to-blue-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-sky-600/20"
                    >
                      Save Research Brief
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* Subtab 4: Technology Trends */}
          {knowledgeSubTab === 'trends' && (
            <div className="space-y-6">
              {!editingTrend ? (
                <>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-slate-500 font-mono">
                      Strategic engineering trends tracking market acceleration, architectural challenges, and Ananta Labs R&D outlook.
                    </p>
                    <button
                      onClick={handleCreateNewTrend}
                      className="px-4 py-2 bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition shadow-sm"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Technology Trend</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {trends.map((t) => (
                      <div
                        key={t.id}
                        className="p-5 bg-white border border-slate-200 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xs hover:shadow-sm"
                      >
                        <div className="space-y-1.5 flex-1">
                          <div className="flex items-center gap-2 text-xs font-mono">
                            <span className="px-2 py-0.5 bg-purple-50 text-purple-800 border border-purple-200 rounded font-semibold">
                              {t.category}
                            </span>
                            <span className="text-slate-400">•</span>
                            <span className="text-slate-500">{t.horizon}</span>
                            <span className="text-slate-400">•</span>
                            <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded">
                              {t.maturity}
                            </span>
                          </div>
                          <h3 className="text-base font-bold text-slate-900">{t.title}</h3>
                          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                            {t.executiveSummary}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 self-end md:self-center">
                          <button
                            onClick={() => {
                              setEditingTrend(t);
                              setIsNewTrend(false);
                            }}
                            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-mono flex items-center gap-1 transition"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Delete trend "${t.title}"?`)) {
                                deleteTrend(t.id);
                              }
                            }}
                            className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 rounded-lg text-xs font-mono flex items-center gap-1 transition"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <form onSubmit={handleSaveTrend} className="p-8 bg-white border border-slate-200 rounded-3xl shadow-lg space-y-6 max-w-3xl">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <h3 className="text-xl font-bold text-slate-900">
                      {isNewTrend ? 'Create Technology Trend' : `Edit Trend: ${editingTrend.title}`}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setEditingTrend(null)}
                      className="text-xs font-mono text-slate-500 hover:text-slate-900"
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-xs font-mono text-slate-700 mb-1">Trend Title *</label>
                      <input
                        type="text"
                        required
                        value={editingTrend.title}
                        onChange={(e) => setEditingTrend({ ...editingTrend, title: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-700 mb-1">Time Horizon *</label>
                      <select
                        value={editingTrend.horizon}
                        onChange={(e) => setEditingTrend({ ...editingTrend, horizon: e.target.value as any })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
                      >
                        <option value="Near-term (1-2 yrs)">Near-term (1-2 yrs)</option>
                        <option value="Mid-term (3-5 yrs)">Mid-term (3-5 yrs)</option>
                        <option value="Long-term (5+ yrs)">Long-term (5+ yrs)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-700 mb-1">Market Maturity *</label>
                      <select
                        value={editingTrend.maturity}
                        onChange={(e) => setEditingTrend({ ...editingTrend, maturity: e.target.value as any })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
                      >
                        <option value="Emerging">Emerging</option>
                        <option value="Accelerating">Accelerating</option>
                        <option value="Mainstream">Mainstream</option>
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-mono text-slate-700 mb-1">Executive Summary *</label>
                      <textarea
                        rows={3}
                        required
                        value={editingTrend.executiveSummary}
                        onChange={(e) => setEditingTrend({ ...editingTrend, executiveSummary: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 leading-relaxed"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-mono text-slate-700 mb-1">Ananta Labs Perspective *</label>
                      <textarea
                        rows={3}
                        required
                        value={editingTrend.anantaLabsPerspective}
                        onChange={(e) => setEditingTrend({ ...editingTrend, anantaLabsPerspective: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 leading-relaxed"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setEditingTrend(null)}
                      className="px-4 py-2 border border-slate-300 text-slate-700 rounded-xl text-xs font-mono hover:bg-slate-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-gradient-to-r from-sky-600 to-blue-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-sky-600/20"
                    >
                      Save Technology Trend
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      )}

      {/* Tab: Live Statistics Editor (Section 6) */}
      {activeTab === 'stats' && (
        <div className="p-8 bg-white border border-slate-200 rounded-3xl space-y-6 max-w-2xl">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Edit Dynamic Homepage Statistics
            </h2>
            <p className="text-xs text-slate-500">
              Update institutional counters displayed on the homepage. Changes persist instantly in local storage.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-slate-600 mb-1">Research Projects Count</label>
              <input
                type="text"
                value={editableStats.projectsCount}
                onChange={(e) => setEditableStats({ ...editableStats, projectsCount: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-sm text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-600 mb-1">Experimental Studies Count</label>
              <input
                type="text"
                value={editableStats.experimentalStudiesCount}
                onChange={(e) => setEditableStats({ ...editableStats, experimentalStudiesCount: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-sm text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-600 mb-1">Patents & IP Count</label>
              <input
                type="text"
                value={editableStats.patentsIpCount}
                onChange={(e) => setEditableStats({ ...editableStats, patentsIpCount: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-sm text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-600 mb-1">Research Areas Count</label>
              <input
                type="text"
                value={editableStats.researchAreasCount}
                onChange={(e) => setEditableStats({ ...editableStats, researchAreasCount: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-sm text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-600 mb-1">Researchers Count</label>
              <input
                type="text"
                value={editableStats.researchersCount}
                onChange={(e) => setEditableStats({ ...editableStats, researchersCount: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-sm text-slate-900"
              />
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between">
            {statsSavedNotice ? (
              <span className="text-xs font-mono text-emerald-600 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Live statistics updated!
              </span>
            ) : <span />}

            <button
              onClick={handleStatsSave}
              className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-semibold transition"
            >
              Update Live Metrics
            </button>
          </div>
        </div>
      )}

      {/* Tab: Collaboration Leads */}
      {activeTab === 'leads' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Inbound Inquiries & Leads</h2>
            <span className="text-xs font-mono text-slate-500">Total: {leads.length}</span>
          </div>

          {leads.length === 0 ? (
            <div className="p-8 text-center bg-slate-50 border border-slate-200 rounded-2xl text-slate-500 text-xs font-mono">
              No inquiries submitted yet. Inquiries from the "Collaborate With Us" forms will appear here.
            </div>
          ) : (
            <div className="space-y-3">
              {leads.map(lead => (
                <div key={lead.id} className="p-5 bg-white border border-slate-200 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-sky-600 font-semibold">{lead.interestType}</span>
                    <span className="text-slate-500">{new Date(lead.timestamp).toLocaleString()}</span>
                  </div>
                  <div className="text-sm font-bold text-slate-900">
                    {lead.name} • <span className="font-normal text-slate-600">{lead.organization}</span>
                  </div>
                  <div className="text-xs font-mono text-slate-500">{lead.email}</div>
                  {lead.relatedProject && (
                    <div className="text-xs font-mono text-emerald-600">Context: {lead.relatedProject}</div>
                  )}
                  <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200">
                    {lead.message}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab: Analytics Dashboard (Section 26) */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-slate-900">Internal Analytics & Telemetry</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 bg-white border border-slate-200 rounded-2xl">
              <div className="text-xs font-mono text-slate-500">Total Tracked Page Views</div>
              <div className="text-3xl font-bold font-mono text-sky-600 mt-2">
                {Object.values(analytics.pageViews).reduce((a, b) => a + b, 0)}
              </div>
            </div>
            <div className="p-5 bg-white border border-slate-200 rounded-2xl">
              <div className="text-xs font-mono text-slate-500">Tool Calculations Executed</div>
              <div className="text-3xl font-bold font-mono text-emerald-600 mt-2">
                {Object.values(analytics.toolRuns).reduce((a, b) => a + b, 0)}
              </div>
            </div>
            <div className="p-5 bg-white border border-slate-200 rounded-2xl">
              <div className="text-xs font-mono text-slate-500">PDF Print / Downloads</div>
              <div className="text-3xl font-bold font-mono text-blue-600 mt-2">
                {Object.values(analytics.pdfDownloads).reduce((a, b) => a + b, 0)}
              </div>
            </div>

            <div className="p-5 bg-white border border-slate-200 rounded-2xl">
              <div className="text-xs font-mono text-slate-500">UNIFY Security Interceptions</div>
              <div className="text-3xl font-bold font-mono text-rose-600 mt-2">
                {localStorage.getItem('unify_blocked_counter') || '0'}
              </div>
            </div>
          </div>

          {/* UNIFY Security Engine Diagnostics Panel */}
          <div className="p-6 bg-slate-900 text-white rounded-3xl border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="font-bold text-sm tracking-tight">UNIFY Cryptographic Security Engine</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold border border-emerald-500/30">
                  ACTIVE DEFENSE
                </span>
              </div>
              <span className="text-xs font-mono text-slate-400">End-to-End Encryption (AES-256) Enclave</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
              <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                <span className="text-slate-400 block text-[10px] uppercase">Client Integrity</span>
                <span className="text-emerald-400 font-bold mt-1 block">Context Menu & F12 Blocked</span>
              </div>
              <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                <span className="text-slate-400 block text-[10px] uppercase">Inspection Shortcuts</span>
                <span className="text-sky-300 font-bold mt-1 block">Ctrl+Shift+I/J/C & Ctrl+U Trapped</span>
              </div>
              <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                <span className="text-slate-400 block text-[10px] uppercase">Legal IP Protection</span>
                <span className="text-amber-300 font-bold mt-1 block">Indian Copyright Act & Patent Law</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setActiveTab('security')}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-sky-300 hover:text-white text-xs font-mono rounded-xl transition flex items-center gap-1.5"
              >
                <span>Open Dedicated UNIFY Security Console</span>
                <span>→</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-white border border-slate-200 rounded-2xl space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-600 font-bold">
                Most Visited Hub Pages
              </h3>
              <div className="space-y-1.5 text-xs font-mono">
                {Object.entries(analytics.pageViews).map(([path, count]) => (
                  <div key={path} className="flex justify-between p-2 bg-slate-50 rounded border border-slate-200">
                    <span className="text-slate-600">{path}</span>
                    <span className="text-sky-600 font-bold">{count}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 bg-white border border-slate-200 rounded-2xl space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-600 font-bold">
                Recent Search Queries
              </h3>
              <div className="space-y-1.5 text-xs font-mono">
                {analytics.searchQueries.slice(0, 8).map((q, idx) => (
                  <div key={idx} className="p-2 bg-slate-50 rounded border border-slate-200 text-slate-600">
                    "{q}"
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: UNIFY Security Engine Diagnostics & Control */}
      {activeTab === 'security' && (
        <UnifyAdminSecurityPanel />
      )}

      {/* Tab: Sync & Restore */}
      {activeTab === 'sync' && (
        <div className="p-8 bg-white border border-slate-200 rounded-3xl space-y-6 max-w-2xl">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Repository Import / Export
            </h2>
            <p className="text-xs text-slate-500">
              Synchronize content changes or import a complete JSON database dump.
            </p>
          </div>

          <div className="space-y-3">
            <label className="block text-xs font-mono text-slate-600">Paste JSON Repository Content</label>
            <textarea
              rows={6}
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              placeholder="Paste exported JSON structure here..."
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs text-slate-900"
            />
            {importStatus && (
              <p className="text-xs font-mono text-sky-600">{importStatus}</p>
            )}
            <button
              onClick={handleImportJson}
              className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-semibold transition"
            >
              Import Repository JSON
            </button>
          </div>

          <div className="pt-6 border-t border-slate-200 space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-rose-400 font-bold">
              Factory Reset
            </h3>
            <p className="text-xs text-slate-500">
              Reset all projects, explainers, and metrics back to initial production defaults.
            </p>
            <button
              onClick={() => {
                if (confirm('Are you sure you want to reset all data back to factory defaults?')) {
                  resetAllData();
                  alert('Reset complete.');
                }
              }}
              className="px-4 py-2 bg-rose-950/60 hover:bg-rose-900 border border-rose-800 text-rose-300 rounded-xl text-xs font-mono transition"
            >
              Reset to Factory Initial Data
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
