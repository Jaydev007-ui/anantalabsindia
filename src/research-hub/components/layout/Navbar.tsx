import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Atom, 
  ChevronDown, 
  Search, 
  Menu, 
  X, 
  FileText, 
  BookOpen, 
  Wrench, 
  FlaskConical, 
  Users, 
  Info, 
  Lock, 
  Clock, 
  ArrowUpRight,
  Sparkles,
  Layers,
  Award
} from 'lucide-react';
import { SearchModal } from './SearchModal';
import { LeadModal } from '../common/LeadModal';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Close dropdowns on route change
  useEffect(() => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Global Ctrl+K / Cmd+K listener
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchModalOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-200/90 bg-white/95 backdrop-blur-xl shadow-xs transition-all">
        {/* Top institutional ribbon */}
        <div className="bg-slate-100 border-b border-slate-200 py-1 px-3 sm:px-8 text-[11px] font-mono flex items-center justify-between text-slate-500 overflow-x-auto scrollbar-none whitespace-nowrap gap-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-slate-800 font-semibold">Ananta Labs India</span>
              <span className="text-slate-300">|</span>
              <span className="hidden sm:inline text-slate-600">Official Digital R&D and Knowledge Platform</span>
            </div>
            <div className="hidden lg:flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white border border-slate-200 shadow-2xs">
              <img src="/intel-partner.jpg" alt="Intel Partner Alliance" className="w-3.5 h-3.5 object-contain" />
              <span className="text-[10px] font-bold text-slate-800 font-sans">Intel Partner Alliance</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a href="/" className="hover:text-sky-600 transition flex items-center gap-1 text-slate-600 font-medium">
              <ArrowUpRight className="w-3 h-3 text-sky-600 rotate-[-90deg]" />
              <span>Main Website</span>
            </a>
            <span className="text-slate-300">|</span>
            <Link to="/research/timeline" className="hover:text-sky-600 transition flex items-center gap-1 text-slate-600">
              <Clock className="w-3 h-3 text-sky-600" />
              <span className="hidden md:inline">2026 R&D Roadmap</span>
            </Link>
            <Link to="/research/admin" className="hover:text-sky-600 transition flex items-center gap-1 text-slate-600">
              <Lock className="w-3 h-3 text-slate-500" />
              <span>Admin CMS</span>
            </Link>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo & Brand */}
          <Link to="/research" className="flex items-center gap-3 shrink-0 group">
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-slate-200 bg-white flex items-center justify-center group-hover:border-sky-400 transition shadow-xs">
              <img src="/ananta-logo.jpg" alt="Ananta Labs Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="font-bold text-slate-900 text-base tracking-tight flex items-center gap-1.5 leading-tight">
                <span>Ananta Labs</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-sky-50 border border-sky-200 text-sky-700 font-medium">
                  R&D
                </span>
              </div>
              <div className="text-[11px] text-slate-500 font-sans tracking-wide">
                Research & Innovation Hub
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {/* Research Menu */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('research')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition">
                <span>Research</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeDropdown === 'research' ? 'rotate-180 text-sky-600' : 'text-slate-400'}`} />
              </button>
              {activeDropdown === 'research' && (
                <div className="absolute top-full left-0 w-64 p-2 bg-white border border-slate-200 rounded-xl shadow-xl shadow-slate-200/60 backdrop-blur-xl animate-fadeIn space-y-1">
                  <Link to="/research" className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-slate-50 transition">
                    <Sparkles className="w-4 h-4 text-sky-600 mt-0.5" />
                    <div>
                      <div className="text-xs font-semibold text-slate-900">Research Overview</div>
                      <div className="text-[11px] text-slate-500">Hub mission, impact & flagship work</div>
                    </div>
                  </Link>
                  <Link to="/research/projects" className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-slate-50 transition">
                    <FileText className="w-4 h-4 text-blue-600 mt-0.5" />
                    <div>
                      <div className="text-xs font-semibold text-slate-900">Research Projects</div>
                      <div className="text-[11px] text-slate-500">SwachhVision, Embalming & innovations</div>
                    </div>
                  </Link>
                  <Link to="/research/areas" className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-slate-50 transition">
                    <Layers className="w-4 h-4 text-indigo-600 mt-0.5" />
                    <div>
                      <div className="text-xs font-semibold text-slate-900">Research Areas</div>
                      <div className="text-[11px] text-slate-500">AI, Mechanical, Healthcare, Industry 4.0</div>
                    </div>
                  </Link>
                  <Link to="/research/archive" className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-slate-50 transition">
                    <Clock className="w-4 h-4 text-slate-500 mt-0.5" />
                    <div>
                      <div className="text-xs font-semibold text-slate-900">Research Archive</div>
                      <div className="text-[11px] text-slate-500">Chronological scientific registry</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* Knowledge Menu */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('knowledge')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition">
                <span>Knowledge</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeDropdown === 'knowledge' ? 'rotate-180 text-sky-600' : 'text-slate-400'}`} />
              </button>
              {activeDropdown === 'knowledge' && (
                <div className="absolute top-full left-0 w-64 p-2 bg-white border border-slate-200 rounded-xl shadow-xl shadow-slate-200/60 backdrop-blur-xl animate-fadeIn space-y-1">
                  <Link to="/research/explainers" className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-slate-50 transition">
                    <BookOpen className="w-4 h-4 text-amber-600 mt-0.5" />
                    <div>
                      <div className="text-xs font-semibold text-slate-900">Research Explained</div>
                      <div className="text-[11px] text-slate-500">Deep technical primers & guides</div>
                    </div>
                  </Link>
                  <Link to="/research/knowledge-base" className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-slate-50 transition">
                    <Layers className="w-4 h-4 text-indigo-600 mt-0.5" />
                    <div>
                      <div className="text-xs font-semibold text-slate-900">Knowledge Base</div>
                      <div className="text-[11px] text-slate-500">Technical encyclopedia & concepts</div>
                    </div>
                  </Link>
                  <Link to="/research/briefs" className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-slate-50 transition">
                    <FileText className="w-4 h-4 text-emerald-600 mt-0.5" />
                    <div>
                      <div className="text-xs font-semibold text-slate-900">Research Briefs</div>
                      <div className="text-[11px] text-slate-500">3-minute executive summaries</div>
                    </div>
                  </Link>
                  <Link to="/research/trends" className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-slate-50 transition">
                    <ArrowUpRight className="w-4 h-4 text-purple-600 mt-0.5" />
                    <div>
                      <div className="text-xs font-semibold text-slate-900">Technology Trends</div>
                      <div className="text-[11px] text-slate-500">Emerging horizons & analyses</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* Engineering Menu */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('engineering')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition">
                <span>Engineering</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeDropdown === 'engineering' ? 'rotate-180 text-sky-600' : 'text-slate-400'}`} />
              </button>
              {activeDropdown === 'engineering' && (
                <div className="absolute top-full left-0 w-64 p-2 bg-white border border-slate-200 rounded-xl shadow-xl shadow-slate-200/60 backdrop-blur-xl animate-fadeIn space-y-1">
                  <Link to="/research/tools" className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-slate-50 transition">
                    <Wrench className="w-4 h-4 text-emerald-600 mt-0.5" />
                    <div>
                      <div className="text-xs font-semibold text-slate-900">Engineering Tools</div>
                      <div className="text-[11px] text-slate-500">Calculators: Torque, Heat, Reynolds, etc.</div>
                    </div>
                  </Link>
                  <Link to="/research/experiments" className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-slate-50 transition">
                    <FlaskConical className="w-4 h-4 text-purple-600 mt-0.5" />
                    <div>
                      <div className="text-xs font-semibold text-slate-900">Experiments Hub</div>
                      <div className="text-[11px] text-slate-500">Lab setups, empirical graphs & logs</div>
                    </div>
                  </Link>
                  <Link to="/research/timeline" className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-slate-50 transition">
                    <Clock className="w-4 h-4 text-sky-600 mt-0.5" />
                    <div>
                      <div className="text-xs font-semibold text-slate-900">Interactive Timeline</div>
                      <div className="text-[11px] text-slate-500">Milestone development roadmap</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* People */}
            <Link 
              to="/research/researchers" 
              className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition"
            >
              Researchers
            </Link>

            {/* Exams / Certification */}
            <Link 
              to="/research/exams" 
              className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition flex items-center gap-1.5"
            >
              <Award className="w-4 h-4 text-sky-600" />
              <span>Assessments</span>
            </Link>

            {/* About Menu */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('about')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition">
                <span>About</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeDropdown === 'about' ? 'rotate-180 text-sky-600' : 'text-slate-400'}`} />
              </button>
              {activeDropdown === 'about' && (
                <div className="absolute top-full right-0 w-60 p-2 bg-white border border-slate-200 rounded-xl shadow-xl shadow-slate-200/60 backdrop-blur-xl animate-fadeIn space-y-1">
                  <Link to="/research/about" className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-slate-50 transition">
                    <Info className="w-4 h-4 text-sky-600 mt-0.5" />
                    <div>
                      <div className="text-xs font-semibold text-slate-900">About Ananta Labs R&D</div>
                      <div className="text-[11px] text-slate-500">Institutional vision & facilities</div>
                    </div>
                  </Link>
                  <Link to="/research/philosophy" className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-slate-50 transition">
                    <BookOpen className="w-4 h-4 text-indigo-600 mt-0.5" />
                    <div>
                      <div className="text-xs font-semibold text-slate-900">Research Philosophy</div>
                      <div className="text-[11px] text-slate-500">Tenets & experimental rigor</div>
                    </div>
                  </Link>
                  <Link to="/research/contact" className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-slate-50 transition">
                    <Users className="w-4 h-4 text-emerald-600 mt-0.5" />
                    <div>
                      <div className="text-xs font-semibold text-slate-900">Contact & Collaborate</div>
                      <div className="text-[11px] text-slate-500">Direct inquiries & partnerships</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </nav>

          {/* Right Actions: Search trigger, CTAs */}
          <div className="flex items-center gap-2.5">
            {/* Quick Search Button */}
            <button
              onClick={() => setSearchModalOpen(true)}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-100 border border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-900 transition text-xs"
              title="Search Hub (Ctrl+K)"
            >
              <Search className="w-4 h-4 text-sky-600" />
              <span className="hidden xl:inline text-slate-600">Search</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-slate-500 bg-white border border-slate-200 rounded">
                Ctrl+K
              </kbd>
            </button>

            {/* Primary CTA */}
            <Link
              to="/research/projects"
              className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-medium text-slate-700 transition"
            >
              <span>Explore Research</span>
            </Link>

            {/* Secondary CTA (hidden on mobile, visible on sm and up) */}
            <button
              onClick={() => setLeadModalOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-xs font-semibold text-white shadow-sm shadow-sky-600/20 transition"
            >
              <span>Collaborate With Us</span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="lg:hidden p-2 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-6 space-y-4 max-h-[85vh] overflow-y-auto shadow-2xl">
            {/* Quick Search in Mobile Drawer */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setSearchModalOpen(true);
              }}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-mono transition"
            >
              <span className="flex items-center gap-2">
                <Search className="w-4 h-4 text-sky-600" />
                <span>Search Repository...</span>
              </span>
              <span className="text-[10px] text-slate-400">Tap to search</span>
            </button>

            {/* Mobile Intel Partner Alliance Badge */}
            <div className="flex items-center gap-2.5 p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
              <img src="/intel-partner.jpg" alt="Intel Partner Alliance" className="w-7 h-7 object-contain shrink-0" />
              <div className="text-left font-sans">
                <span className="text-[10px] font-mono uppercase text-slate-400 block font-semibold leading-tight">Computing Ecosystem</span>
                <span className="text-xs font-bold text-slate-800 leading-tight">Intel Partner Alliance</span>
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-[11px] font-mono uppercase tracking-wider text-sky-600 px-2 py-1 font-semibold">Research</div>
              <Link onClick={() => setMobileMenuOpen(false)} to="/research" className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg">Research Overview</Link>
              <Link onClick={() => setMobileMenuOpen(false)} to="/research/projects" className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg">Research Projects</Link>
              <Link onClick={() => setMobileMenuOpen(false)} to="/research/areas" className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg">Research Areas</Link>
              <Link onClick={() => setMobileMenuOpen(false)} to="/research/archive" className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg">Research Archive</Link>
            </div>

            <div className="space-y-1 pt-2 border-t border-slate-100">
              <div className="text-[11px] font-mono uppercase tracking-wider text-amber-600 px-2 py-1 font-semibold">Knowledge</div>
              <Link onClick={() => setMobileMenuOpen(false)} to="/research/explainers" className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg">Research Explained</Link>
              <Link onClick={() => setMobileMenuOpen(false)} to="/research/knowledge-base" className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg">Knowledge Base</Link>
              <Link onClick={() => setMobileMenuOpen(false)} to="/research/briefs" className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg">Research Briefs</Link>
              <Link onClick={() => setMobileMenuOpen(false)} to="/research/trends" className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg">Technology Trends</Link>
            </div>

            <div className="space-y-1 pt-2 border-t border-slate-100">
              <div className="text-[11px] font-mono uppercase tracking-wider text-emerald-600 px-2 py-1 font-semibold">Engineering</div>
              <Link onClick={() => setMobileMenuOpen(false)} to="/research/tools" className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg">Engineering Tools & Calculators</Link>
              <Link onClick={() => setMobileMenuOpen(false)} to="/research/experiments" className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg">Experiments Hub</Link>
              <Link onClick={() => setMobileMenuOpen(false)} to="/research/timeline" className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg">Interactive Timeline</Link>
            </div>

            <div className="space-y-1 pt-2 border-t border-slate-100">
              <div className="text-[11px] font-mono uppercase tracking-wider text-sky-600 px-2 py-1 font-semibold">Certification</div>
              <Link onClick={() => setMobileMenuOpen(false)} to="/research/exams" className="block px-3 py-2 text-sm text-slate-800 hover:bg-slate-50 rounded-lg font-semibold flex items-center gap-2">
                <Award className="w-4 h-4 text-sky-600" />
                <span>MCQ Exams & Certification</span>
              </Link>
            </div>

            <div className="space-y-1 pt-2 border-t border-slate-100">
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 px-2 py-1 font-semibold">Institutional</div>
              <Link onClick={() => setMobileMenuOpen(false)} to="/research/researchers" className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg">Researchers Directory</Link>
              <Link onClick={() => setMobileMenuOpen(false)} to="/research/about" className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg">About Our Research</Link>
              <Link onClick={() => setMobileMenuOpen(false)} to="/research/philosophy" className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg">Research Philosophy</Link>
              <Link onClick={() => setMobileMenuOpen(false)} to="/research/contact" className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg">Contact & Collaboration</Link>
              <Link onClick={() => setMobileMenuOpen(false)} to="/research/admin" className="block px-3 py-2 text-sm text-sky-600 hover:bg-slate-50 rounded-lg">Admin CMS Portal</Link>
            </div>

            <div className="pt-4 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setLeadModalOpen(true);
                }}
                className="w-full py-2.5 bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white font-semibold rounded-xl text-sm shadow-md"
              >
                Collaborate With Us
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Global Modals */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
      />

      <LeadModal
        isOpen={leadModalOpen}
        onClose={() => setLeadModalOpen(false)}
      />
    </>
  );
};
