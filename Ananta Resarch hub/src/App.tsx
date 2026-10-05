import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { LeadModal } from './components/common/LeadModal';

// Pages
import { HomePage } from './pages/HomePage';
import { ResearchProjectsPage } from './pages/ResearchProjectsPage';
import { ResearchProjectDetail } from './pages/ResearchProjectDetail';
import { ResearchAreasPage } from './pages/ResearchAreasPage';
import { ResearchArchivePage } from './pages/ResearchArchivePage';
import { ExplainersPage } from './pages/ExplainersPage';
import { ExplainerDetail } from './pages/ExplainerDetail';
import { EngineeringToolsPage } from './pages/EngineeringToolsPage';
import { ToolDetailPage } from './pages/ToolDetailPage';
import { KnowledgeBasePage } from './pages/KnowledgeBasePage';
import { KnowledgeDetailPage } from './pages/KnowledgeDetailPage';
import { ExperimentsPage } from './pages/ExperimentsPage';
import { ExperimentDetail } from './pages/ExperimentDetail';
import { ResearchBriefsPage } from './pages/ResearchBriefsPage';
import { ResearchBriefDetail } from './pages/ResearchBriefDetail';
import { TechnologyTrendsPage } from './pages/TechnologyTrendsPage';
import { ResearchersPage } from './pages/ResearchersPage';
import { ResearcherProfile } from './pages/ResearcherProfile';
import { ResearchTimelinePage } from './pages/ResearchTimelinePage';
import { GlobalSearchPage } from './pages/GlobalSearchPage';
import { AboutResearchPage } from './pages/AboutResearchPage';
import { ResearchPhilosophyPage } from './pages/ResearchPhilosophyPage';
import { ContactPage } from './pages/ContactPage';
import {
  ResearchEthicsPage,
  CorrectionPolicyPage,
  PrivacyPolicyPage,
  TermsPage
} from './pages/PolicyPages';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { ExamsPage } from './pages/ExamsPage';
import { UnifySecurityEngine } from './security/UnifySecurityEngine';

export function App() {
  const [globalLeadModalOpen, setGlobalLeadModalOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-sky-200 selection:text-sky-900">
        <UnifySecurityEngine />
        <Navbar />

        <main className="flex-1">
          <Routes>
            {/* Direct Root Redirect to /research */}
            <Route path="/" element={<Navigate to="/research" replace />} />

            {/* Core /research Routes */}
            <Route path="/research" element={<HomePage />} />
            <Route path="/research/projects" element={<ResearchProjectsPage />} />
            <Route path="/research/project/:slug" element={<ResearchProjectDetail />} />
            <Route path="/research/areas" element={<ResearchAreasPage />} />
            <Route path="/research/archive" element={<ResearchArchivePage />} />

            {/* Knowledge & Explainers */}
            <Route path="/research/explainers" element={<ExplainersPage />} />
            <Route path="/research/explainer/:slug" element={<ExplainerDetail />} />
            <Route path="/research/knowledge-base" element={<KnowledgeBasePage />} />
            <Route path="/research/knowledge-base/:slug" element={<KnowledgeDetailPage />} />
            <Route path="/research/briefs" element={<ResearchBriefsPage />} />
            <Route path="/research/briefs/:slug" element={<ResearchBriefDetail />} />
            <Route path="/research/trends" element={<TechnologyTrendsPage />} />

            {/* Engineering & Calculators */}
            <Route path="/research/tools" element={<EngineeringToolsPage />} />
            <Route path="/research/tools/:slug" element={<ToolDetailPage />} />
            <Route path="/research/experiments" element={<ExperimentsPage />} />
            <Route path="/research/experiments/:slug" element={<ExperimentDetail />} />
            <Route path="/research/timeline" element={<ResearchTimelinePage />} />
            <Route path="/research/exams" element={<ExamsPage />} />


            {/* People */}
            <Route path="/research/researchers" element={<ResearchersPage />} />
            <Route path="/research/researcher/:slug" element={<ResearcherProfile />} />

            {/* Search */}
            <Route path="/research/search" element={<GlobalSearchPage />} />

            {/* Institutional, Trust & Contact */}
            <Route path="/research/about" element={<AboutResearchPage />} />
            <Route path="/research/philosophy" element={<ResearchPhilosophyPage />} />
            <Route path="/research/contact" element={<ContactPage />} />
            <Route path="/research/ethics" element={<ResearchEthicsPage />} />
            <Route path="/research/corrections" element={<CorrectionPolicyPage />} />
            <Route path="/research/privacy" element={<PrivacyPolicyPage />} />
            <Route path="/research/terms" element={<TermsPage />} />

            {/* Admin CMS */}
            <Route path="/research/admin" element={<AdminDashboardPage />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/research" replace />} />
          </Routes>
        </main>

        <Footer onOpenLeadModal={() => setGlobalLeadModalOpen(true)} />

        <LeadModal
          isOpen={globalLeadModalOpen}
          onClose={() => setGlobalLeadModalOpen(false)}
          defaultType="Research Collaboration"
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
