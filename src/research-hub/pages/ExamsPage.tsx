import React, { useState, useEffect, useRef } from 'react';
import { 
  Award, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  ChevronRight, 
  ChevronLeft, 
  Flag, 
  Printer, 
  RotateCcw, 
  ShieldCheck, 
  Cpu, 
  Zap, 
  BrainCircuit, 
  Cog, 
  Factory, 
  Layers,
  ArrowRight,
  BookOpen,
  UserCheck
} from 'lucide-react';
import { QUESTION_BANK, EXAM_TOPICS, ExamTopic, Question } from '../data/examQuestions';
import { useHubData, ExamCandidate } from '../data/store';
import { SeoHead } from '../components/common/SeoHead';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';

const TOPIC_DETAILS: Record<ExamTopic, { title: string; desc: string; icon: any; color: string }> = {
  'IoT': {
    title: 'Internet of Things (IoT) & Edge Computing',
    desc: 'MQTT/CoAP protocols, LoRaWAN CSS modulation, 6LoWPAN mesh, hardware security modules & edge sensor telemetry.',
    icon: Cpu,
    color: 'from-blue-600 to-cyan-600'
  },
  'Electronics': {
    title: 'Electronics & Semiconductor Engineering',
    desc: 'Operational amplifiers, MOSFET/BJT biasing, Nyquist sampling, RF transmission lines & mixed-signal VLSI principles.',
    icon: Zap,
    color: 'from-amber-500 to-orange-600'
  },
  'Artificial intelligence': {
    title: 'Artificial Intelligence & Deep Learning',
    desc: 'Convolutional neural nets, Transformer self-attention, backpropagation dynamics, loss functions & generative architectures.',
    icon: BrainCircuit,
    color: 'from-purple-600 to-indigo-600'
  },
  'Mechanical engineering': {
    title: 'Mechanical Engineering & Fluid Dynamics',
    desc: 'Thermodynamics, Carnot/Rankine cycles, Navier-Stokes, Reynolds/Nusselt numbers & kinetic machine kinematics.',
    icon: Cog,
    color: 'from-slate-700 to-blue-800'
  },
  'Manufacturing': {
    title: 'Advanced Manufacturing & Metrology',
    desc: "Merchant's force circle, Taylor's tool life, casting solidification, CNC G-code & modern powder bed additive fusion.",
    icon: Factory,
    color: 'from-emerald-600 to-teal-700'
  },
  'Strength of materials': {
    title: 'Strength of Materials & Mechanics of Solids',
    desc: "Hooke's generalized law, Mohr's circle of stress, Euler column buckling, shear center & von Mises yield criteria.",
    icon: Layers,
    color: 'from-red-600 to-rose-700'
  }
};

export const ExamsPage: React.FC = () => {
  const { saveExamCandidate } = useHubData();

  // Navigation / Phase State: 'select' | 'exam' | 'result'
  const [phase, setPhase] = useState<'select' | 'exam' | 'result'>('select');

  // Selected Topic
  const [selectedTopic, setSelectedTopic] = useState<ExamTopic | null>(null);

  // Registration Modal State
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [candidateForm, setCandidateForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    organization: ''
  });

  // Active Exam Session State
  const [activeCandidate, setActiveCandidate] = useState<ExamCandidate | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [flagged, setFlagged] = useState<Record<number, boolean>>({});
  const [timeLeft, setTimeLeft] = useState<number>(60 * 60); // 60 minutes in seconds

  // Exam Results State
  const [score, setScore] = useState<number>(0);
  const [percentage, setPercentage] = useState<number>(0);
  const [passed, setPassed] = useState<boolean>(false);
  const [certificateId, setCertificateId] = useState<string>('');
  const [showReview, setShowReview] = useState<boolean>(false);

  // Timer Ref
  const timerRef = useRef<any>(null);

  // Countdown Timer Effect
  useEffect(() => {
    if (phase === 'exam' && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            handleAutoSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [phase, timeLeft]);

  // Open Registration Modal for a Topic
  const handleOpenRegister = (topic: ExamTopic) => {
    setSelectedTopic(topic);
    setIsRegisterModalOpen(true);
  };

  // Submit Registration and Begin Exam
  const handleStartExam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTopic || !candidateForm.fullName || !candidateForm.email) return;

    const topicQuestions = QUESTION_BANK[selectedTopic].slice(0, 40);
    setQuestions(topicQuestions);
    setAnswers({});
    setFlagged({});
    setCurrentIndex(0);
    setTimeLeft(60 * 60); // 60 minutes
    setIsRegisterModalOpen(false);

    const newCandidate: ExamCandidate = {
      id: `cand-${Date.now()}`,
      fullName: candidateForm.fullName.trim(),
      email: candidateForm.email.trim(),
      phone: candidateForm.phone.trim(),
      organization: candidateForm.organization.trim() || 'Independent Scholar',
      topic: selectedTopic,
      status: 'In-Progress',
      totalQuestions: 40,
      startedAt: new Date().toISOString()
    };

    setActiveCandidate(newCandidate);
    saveExamCandidate(newCandidate);
    setPhase('exam');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Select Option
  const handleSelectOption = (optionIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [currentIndex]: optionIndex
    }));
  };

  // Toggle Flag
  const toggleFlag = (index: number) => {
    setFlagged((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // Calculate & Submit Exam
  const calculateAndFinishExam = () => {
    if (timerRef.current) clearInterval(timerRef.current);

    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (answers[idx] === q.correctAnswer) {
        correctCount += 1;
      }
    });

    const calculatedPercentage = Math.round((correctCount / 40) * 1000) / 10; // e.g. 72.5%
    const isPassing = calculatedPercentage >= 60.0; // 60% criteria = 24/40

    // Generate unique Certificate ID if passed
    const topicAbbr = selectedTopic ? selectedTopic.substring(0, 3).toUpperCase() : 'ENG';
    const randCode = Math.floor(1000 + Math.random() * 9000);
    const certId = isPassing ? `ALR-CERT-2026-${topicAbbr}-${randCode}` : undefined;

    setScore(correctCount);
    setPercentage(calculatedPercentage);
    setPassed(isPassing);
    if (certId) setCertificateId(certId);

    // Save final state in candidate store
    if (activeCandidate) {
      const updatedCandidate: ExamCandidate = {
        ...activeCandidate,
        status: 'Completed',
        result: isPassing ? 'PASSED' : 'FAILED',
        score: correctCount,
        percentage: calculatedPercentage,
        certificateId: certId,
        completedAt: new Date().toISOString(),
        answers
      };
      saveExamCandidate(updatedCandidate);
      setActiveCandidate(updatedCandidate);
    }

    setPhase('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleManualSubmit = () => {
    const answeredCount = Object.keys(answers).length;
    const unansweredCount = 40 - answeredCount;
    const confirmMsg = unansweredCount > 0
      ? `You have ${unansweredCount} unanswered questions out of 40. Are you sure you want to finalize and submit your examination?`
      : 'Are you sure you want to submit your examination now?';

    if (window.confirm(confirmMsg)) {
      calculateAndFinishExam();
    }
  };

  const handleAutoSubmit = () => {
    alert('Time has expired! Your examination is being evaluated automatically.');
    calculateAndFinishExam();
  };

  // Reset to Topic Selection
  const handleRetakeExam = () => {
    setPhase('select');
    setSelectedTopic(null);
    setShowReview(false);
  };

  // Format Timer mm:ss
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      <SeoHead
        title="Technical Assessment & Certification | Ananta Labs Research Hub"
        description="Rigorous 40-question technical competency examination across IoT, Electronics, AI, Mechanical, Manufacturing, and Strength of Materials. 60% passing criteria for official verified certification."
        canonicalPath="exams"
      />

      {/* Screen 1: Domain Selection & Hub Overview */}
      {phase === 'select' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
          <Breadcrumbs
            items={[
              { label: 'Knowledge', url: '/research/knowledge-base' },
              { label: 'Technical Examinations & Certification' }
            ]}
          />

          {/* Hero Section */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100 text-sky-800 border border-sky-300 font-mono text-xs font-semibold">
              <Award className="w-4 h-4 text-sky-600" />
              <span>Official R&D Competency Certification</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              Ananta Labs Engineering & Research Assessments
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans">
              Rigorous, standardized technical evaluations for engineers, researchers, and university scholars. 
              Demonstrate mastery across deep engineering domains with timed, multi-choice technical challenges.
            </p>
          </div>

          {/* Guidelines Banner */}
          <div className="p-6 bg-white border border-slate-200 rounded-3xl shadow-sm grid grid-cols-1 md:grid-cols-4 gap-6 text-xs font-mono">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-sky-50 text-sky-700 border border-sky-200">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-slate-900 block text-sm">60 Minutes</span>
                <span className="text-slate-500">Strict countdown timer per attempt</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-purple-50 text-purple-700 border border-purple-200">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-slate-900 block text-sm">40 Questions</span>
                <span className="text-slate-500">High-difficulty engineering problems</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-slate-900 block text-sm">60% Passing Criteria</span>
                <span className="text-slate-500">Must score 24/40 or higher to qualify</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-amber-50 text-amber-700 border border-amber-200">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-slate-900 block text-sm">Auto Certificate</span>
                <span className="text-slate-500">Official verified credential generated</span>
              </div>
            </div>
          </div>

          {/* Topic Cards Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">Select Examination Discipline</h2>
              <span className="text-xs font-mono text-slate-500">6 Specialized Engineering Tracks</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {EXAM_TOPICS.map((topic) => {
                const info = TOPIC_DETAILS[topic];
                const IconComponent = info.icon;
                return (
                  <div
                    key={topic}
                    className="p-6 bg-white border border-slate-200 hover:border-sky-300 rounded-3xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${info.color} flex items-center justify-center text-white shadow-md`}>
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <span className="px-3 py-1 bg-slate-100 border border-slate-200 text-slate-700 text-[11px] font-mono rounded-full font-semibold">
                          40 Questions
                        </span>
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-700 transition">
                          {info.title}
                        </h3>
                        <p className="text-xs text-slate-600 mt-2 leading-relaxed font-sans">
                          {info.desc}
                        </p>
                      </div>

                      <div className="pt-2 flex items-center gap-2 text-[11px] font-mono text-slate-500 border-t border-slate-100">
                        <span>Timer: 60 min</span>
                        <span>•</span>
                        <span>Cutoff: 60%</span>
                        <span>•</span>
                        <span className="text-sky-700 font-semibold">Hard</span>
                      </div>
                    </div>

                    <div className="pt-6 mt-6 border-t border-slate-100">
                      <button
                        onClick={() => handleOpenRegister(topic)}
                        className="w-full py-3 bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition shadow-md shadow-sky-600/10"
                      >
                        <span>Take Exam</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Registration Modal Popup */}
      {isRegisterModalOpen && selectedTopic && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-5 sm:p-8 shadow-2xl space-y-6 max-h-[92vh] overflow-y-auto">
            <div className="flex items-start justify-between">
              <div>
                <span className="px-2.5 py-1 bg-sky-100 text-sky-800 text-[11px] font-mono font-semibold rounded-lg">
                  {selectedTopic}
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-2">Candidate Registration</h3>
                <p className="text-xs text-slate-500 font-sans mt-0.5">
                  Enter your verified credentials. These details will be embedded in your official Ananta Labs Certificate.
                </p>
              </div>
              <button
                onClick={() => setIsRegisterModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleStartExam} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-700 mb-1">
                  Full Name (As will appear on Certificate) *
                </label>
                <input
                  type="text"
                  required
                  value={candidateForm.fullName}
                  onChange={(e) => setCandidateForm({ ...candidateForm, fullName: e.target.value })}
                  placeholder="e.g. Dr. Rajesh Kumar / Aarav Sharma"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-700 mb-1">
                  Institutional / Corporate Email *
                </label>
                <input
                  type="email"
                  required
                  value={candidateForm.email}
                  onChange={(e) => setCandidateForm({ ...candidateForm, email: e.target.value })}
                  placeholder="name@university.edu or name@company.com"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-700 mb-1">
                    Contact Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={candidateForm.phone}
                    onChange={(e) => setCandidateForm({ ...candidateForm, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-700 mb-1">
                    College / Organization *
                  </label>
                  <input
                    type="text"
                    required
                    value={candidateForm.organization}
                    onChange={(e) => setCandidateForm({ ...candidateForm, organization: e.target.value })}
                    placeholder="e.g. IIT Bombay / Ananta Labs"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-2xl text-[11px] font-mono text-amber-800 space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-amber-900">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-600" /> Examination Rules
                </div>
                <p>• 40 questions must be completed within 60 minutes.</p>
                <p>• Passing score is 60% (minimum 24 correct answers).</p>
                <p>• Auto-submits when countdown timer reaches 00:00.</p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsRegisterModalOpen(false)}
                  className="px-4 py-2.5 text-xs font-mono text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 text-white rounded-xl text-xs font-semibold shadow-md shadow-sky-600/20"
                >
                  Start 60-Minute Assessment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Screen 2: Active Exam Window */}
      {phase === 'exam' && selectedTopic && questions.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
          {/* Sticky Header Bar */}
          <div className="sticky top-16 sm:top-20 z-30 bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl p-3 sm:p-4 shadow-md flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <img
                src="/ananta-logo.jpg"
                alt="Ananta Labs Logo"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl object-contain border border-slate-200 shadow-sm shrink-0"
              />
              <div className="min-w-0">
                <span className="text-[10px] sm:text-[11px] font-mono text-sky-700 font-bold block uppercase tracking-wider truncate">
                  {selectedTopic}
                </span>
                <span className="text-xs font-bold text-slate-900 truncate block">
                  {candidateForm.fullName}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4 shrink-0">
              {/* Countdown Timer */}
              <div className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl font-mono font-bold text-xs sm:text-sm border ${
                timeLeft < 300 
                  ? 'bg-rose-50 text-rose-600 border-rose-300 animate-pulse' 
                  : timeLeft < 900
                  ? 'bg-amber-50 text-amber-700 border-amber-300'
                  : 'bg-slate-100 text-slate-800 border-slate-200'
              }`}>
                <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>{formatTime(timeLeft)}</span>
              </div>

              <button
                onClick={handleManualSubmit}
                className="px-3 sm:px-5 py-1.5 sm:py-2 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 text-white rounded-xl text-xs font-semibold shadow-md shadow-emerald-600/20 whitespace-nowrap"
              >
                Submit
              </button>
            </div>
          </div>

          {/* Mobile & Tablet Quick Jump Question Palette Strip */}
          <div className="lg:hidden p-3 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-slate-500">
              <span className="font-semibold text-slate-700">Quick Jump:</span>
              <span className="text-[11px] text-sky-700">{Object.keys(answers).length}/40 Answered</span>
            </div>
            <div className="overflow-x-auto scrollbar-none flex items-center gap-1.5 py-1">
              {questions.map((_, idx) => {
                const isAnswered = answers[idx] !== undefined;
                const isFlagged = flagged[idx];
                const isCurrent = currentIndex === idx;

                let bgClass = 'bg-slate-100 text-slate-700 border-slate-200';
                if (isCurrent) bgClass = 'ring-2 ring-sky-500 bg-sky-100 font-bold text-sky-900 border-sky-400';
                else if (isAnswered) bgClass = 'bg-emerald-600 text-white border-emerald-600';
                else if (isFlagged) bgClass = 'bg-amber-500 text-white border-amber-500';

                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`min-w-8 h-8 rounded-lg text-xs font-mono font-bold flex items-center justify-center border transition shrink-0 ${bgClass}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Question Panel (3 cols) */}
            <div className="lg:col-span-3 space-y-6">
              <div className="p-6 sm:p-8 bg-white border border-slate-200 rounded-3xl shadow-sm space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 text-xs font-mono">
                  <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg font-bold">
                    Question {currentIndex + 1} of 40
                  </span>
                  <button
                    onClick={() => toggleFlag(currentIndex)}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition ${
                      flagged[currentIndex]
                        ? 'bg-amber-100 text-amber-800 border border-amber-300'
                        : 'text-slate-500 hover:text-slate-800 bg-slate-50'
                    }`}
                  >
                    <Flag className="w-3.5 h-3.5" />
                    <span>{flagged[currentIndex] ? 'Marked for Review' : 'Mark for Review'}</span>
                  </button>
                </div>

                {/* Question Text */}
                <div className="text-base sm:text-lg font-semibold text-slate-900 leading-relaxed font-sans">
                  {questions[currentIndex]?.question}
                </div>

                {/* 4 Options */}
                <div className="space-y-3 pt-2">
                  {questions[currentIndex]?.options.map((opt, optIdx) => {
                    const isSelected = answers[currentIndex] === optIdx;
                    const letter = String.fromCharCode(65 + optIdx); // A, B, C, D
                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectOption(optIdx)}
                        className={`w-full p-4 rounded-2xl border text-left flex items-start gap-3.5 transition ${
                          isSelected
                            ? 'bg-sky-50 border-sky-400 text-sky-950 font-medium shadow-sm'
                            : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800 hover:bg-slate-50'
                        }`}
                      >
                        <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-mono font-bold flex-shrink-0 ${
                          isSelected
                            ? 'bg-sky-600 text-white'
                            : 'bg-slate-100 text-slate-700 border border-slate-200'
                        }`}>
                          {letter}
                        </span>
                        <span className="text-sm pt-0.5 leading-relaxed font-sans">{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Question Footer Nav */}
                <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                  <button
                    onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                    disabled={currentIndex === 0}
                    className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-mono font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1.5"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>

                  <span className="text-xs font-mono text-slate-400">
                    {Object.keys(answers).length} / 40 Answered
                  </span>

                  <button
                    onClick={() => setCurrentIndex((prev) => Math.min(39, prev + 1))}
                    disabled={currentIndex === 39}
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-mono font-semibold disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1.5"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Question Palette (1 col) */}
            <div className="space-y-4">
              <div className="p-6 bg-white border border-slate-200 rounded-3xl shadow-sm space-y-4">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">
                  Question Palette
                </h4>

                {/* 40 Grid */}
                <div className="grid grid-cols-5 gap-2">
                  {questions.map((_, idx) => {
                    const isAnswered = answers[idx] !== undefined;
                    const isFlagged = flagged[idx];
                    const isCurrent = currentIndex === idx;

                    let bgClass = 'bg-slate-100 text-slate-600 border-slate-200';
                    if (isCurrent) {
                      bgClass = 'ring-2 ring-sky-500 font-bold';
                    }
                    if (isAnswered) {
                      bgClass = 'bg-emerald-600 text-white border-emerald-600';
                    }
                    if (isFlagged) {
                      bgClass = 'bg-amber-500 text-white border-amber-500';
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`h-9 rounded-xl text-xs font-mono border transition flex items-center justify-center ${bgClass}`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>

                {/* Legend */}
                <div className="pt-4 border-t border-slate-100 space-y-2 text-[11px] font-mono text-slate-600">
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded bg-emerald-600" />
                    <span>Answered ({Object.keys(answers).length})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded bg-amber-500" />
                    <span>Marked for Review ({Object.values(flagged).filter(Boolean).length})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded bg-slate-100 border border-slate-300" />
                    <span>Unanswered ({40 - Object.keys(answers).length})</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Screen 3: Result & Certificate Output */}
      {phase === 'result' && selectedTopic && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
          {/* Result Banner */}
          <div className={`p-8 rounded-3xl border text-center space-y-4 ${
            passed
              ? 'bg-emerald-50 border-emerald-300 text-emerald-950 shadow-lg shadow-emerald-100'
              : 'bg-rose-50 border-rose-300 text-rose-950 shadow-lg shadow-rose-100'
          }`}>
            <div className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center shadow-md">
              {passed ? (
                <div className="w-16 h-16 rounded-2xl bg-emerald-600 text-white flex items-center justify-center">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
              ) : (
                <div className="w-16 h-16 rounded-2xl bg-rose-600 text-white flex items-center justify-center">
                  <XCircle className="w-9 h-9" />
                </div>
              )}
            </div>

            <div>
              <span className={`px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider ${
                passed ? 'bg-emerald-200 text-emerald-900' : 'bg-rose-200 text-rose-900'
              }`}>
                {passed ? 'QUALIFIED / CERTIFIED' : 'NOT QUALIFIED'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold mt-3">
                {passed
                  ? `Congratulations, ${candidateForm.fullName}!`
                  : `Assessment Completed: Below 60% Passing Threshold`}
              </h2>
              <p className="text-sm text-slate-600 max-w-xl mx-auto mt-2 font-sans">
                {passed
                  ? `You have successfully satisfied the technical evaluation criteria in ${selectedTopic}. Your digital Certificate of Competency has been generated below.`
                  : `You scored ${score} out of 40 (${percentage}%). A minimum score of 60% (24 correct answers) is required to qualify for official certification.`}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 p-4 sm:px-6 sm:py-3 bg-white/80 backdrop-blur rounded-2xl border border-slate-200 font-mono text-xs sm:text-sm max-w-xl mx-auto divide-y sm:divide-y-0 sm:divide-x divide-slate-200 text-center">
              <div className="py-1 sm:py-0">
                <span className="text-[10px] text-slate-400 block uppercase">Correct Answers</span>
                <span className="text-lg sm:text-xl font-bold text-slate-900">{score} / 40</span>
              </div>
              <div className="py-1 sm:py-0">
                <span className="text-[10px] text-slate-400 block uppercase">Percentage</span>
                <span className={`text-lg sm:text-xl font-bold ${passed ? 'text-emerald-700' : 'text-rose-700'}`}>
                  {percentage}%
                </span>
              </div>
              <div className="py-1 sm:py-0">
                <span className="text-[10px] text-slate-400 block uppercase">Qualifying Cutoff</span>
                <span className="text-lg sm:text-xl font-bold text-slate-700">60% (24 Qs)</span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              {passed && (
                <button
                  onClick={() => window.print()}
                  className="px-6 py-2.5 bg-gradient-to-r from-sky-600 to-blue-700 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition shadow-md shadow-sky-600/20"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print / Save PDF Certificate</span>
                </button>
              )}
              <button
                onClick={() => setShowReview(!showReview)}
                className="px-5 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-mono transition"
              >
                {showReview ? 'Hide Question Review' : 'Review Answers & Explanations'}
              </button>
              <button
                onClick={handleRetakeExam}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-mono flex items-center gap-1.5 transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Take Another Assessment</span>
              </button>
            </div>
          </div>

          {/* Certificate Component (Visible & Print-ready) */}
          {passed && (
            <div id="printable-certificate" className="bg-white border-4 sm:border-8 border-double border-slate-300 rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-12 shadow-2xl relative overflow-hidden text-center space-y-6 sm:space-y-8 font-sans overflow-x-auto">
              {/* Watermark Logo */}
              <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
                <img src="/ananta-logo.jpg" alt="Watermark" className="w-[500px] h-[500px] object-contain" />
              </div>

              {/* Certificate Header */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <img
                    src="/ananta-logo.jpg"
                    alt="Ananta Labs Official Logo"
                    className="w-14 h-14 object-contain rounded-2xl border border-slate-200 shadow-sm"
                  />
                  <div className="text-left">
                    <h3 className="text-lg font-black text-slate-900 tracking-tight">ANANTA LABS INDIA</h3>
                    <p className="text-[11px] font-mono text-sky-700 uppercase tracking-widest font-semibold">
                      Research & Innovation Hub • Technology Division
                    </p>
                  </div>
                </div>

                <div className="text-right font-mono text-xs text-slate-500">
                  <div>Credential ID: <strong className="text-slate-900">{certificateId}</strong></div>
                  <div>Issue Date: {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                </div>
              </div>

              {/* Certificate Body */}
              <div className="space-y-4 py-4">
                <span className="text-xs font-mono uppercase tracking-widest text-slate-500 block">
                  Certificate of Research Competency & Engineering Excellence
                </span>

                <h1 className="text-2xl sm:text-4xl font-serif text-slate-900 font-bold">
                  {candidateForm.fullName}
                </h1>

                <p className="text-sm font-mono text-slate-500">
                  Affiliation: {candidateForm.organization}
                </p>

                <p className="text-sm sm:text-base text-slate-700 max-w-2xl mx-auto leading-relaxed pt-2">
                  has demonstrated rigorous technical proficiency and mastery in the specialized scientific domain of
                </p>

                <div className="py-2">
                  <span className="inline-block px-6 py-2 bg-sky-50 border border-sky-300 text-sky-900 font-mono font-bold text-lg rounded-2xl shadow-sm">
                    {selectedTopic}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto font-mono">
                  Achieved an examination qualifying score of <strong>{score} / 40 ({percentage}%)</strong> under 
                  standard 60-minute evaluation protocol administered by Ananta Labs India.
                </p>
              </div>

              {/* Certificate Signatures & Seal */}
              <div className="pt-8 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-6 items-end">
                <div className="space-y-1 text-left font-mono">
                  <div className="h-10 flex items-end">
                    <span className="font-serif italic text-lg text-slate-800">Jaydev Zala</span>
                  </div>
                  <div className="border-t border-slate-400 pt-1 text-[11px] text-slate-500">
                    <strong className="text-slate-800 block font-sans">Jaydev Zala</strong>
                    Lead Scientist & Director
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center">
                  <div className="w-20 h-20 rounded-full border-4 border-dashed border-amber-600/70 flex items-center justify-center bg-amber-50/50 text-amber-700 shadow-inner">
                    <ShieldCheck className="w-10 h-10 text-amber-600" />
                  </div>
                  <span className="text-[10px] font-mono text-amber-800 uppercase tracking-widest mt-1 font-bold">
                    Official Verified Seal
                  </span>
                </div>

                <div className="space-y-1 text-right font-mono">
                  <div className="h-10 flex items-end justify-end">
                    <span className="font-mono text-xs text-slate-500">Verification: anantalabsindia.org</span>
                  </div>
                  <div className="border-t border-slate-400 pt-1 text-[11px] text-slate-500">
                    <strong className="text-slate-800 block font-sans">Academic Evaluation Board</strong>
                    Ananta Labs Research Hub
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Question Review Section (Collapsible) */}
          {showReview && (
            <div className="p-8 bg-white border border-slate-200 rounded-3xl shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <h3 className="text-lg font-bold text-slate-900">
                  Comprehensive Question Analysis & Explanations
                </h3>
                <span className="text-xs font-mono text-slate-500">
                  Score: {score} / 40 ({percentage}%)
                </span>
              </div>

              <div className="space-y-6">
                {questions.map((q, idx) => {
                  const candidateAnswer = answers[idx];
                  const isCorrect = candidateAnswer === q.correctAnswer;
                  return (
                    <div
                      key={q.id}
                      className={`p-5 rounded-2xl border ${
                        isCorrect
                          ? 'bg-emerald-50/40 border-emerald-200'
                          : 'bg-rose-50/40 border-rose-200'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-2">
                          <span className={`w-6 h-6 rounded-lg text-xs font-mono font-bold flex items-center justify-center ${
                            isCorrect ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                          }`}>
                            {idx + 1}
                          </span>
                          <span className={`text-xs font-mono font-bold ${
                            isCorrect ? 'text-emerald-700' : 'text-rose-700'
                          }`}>
                            {isCorrect ? 'CORRECT' : 'INCORRECT'}
                          </span>
                        </div>
                      </div>

                      <p className="text-sm font-semibold text-slate-900 mt-2 font-sans">
                        {q.question}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 text-xs font-mono">
                        {q.options.map((opt, optIdx) => {
                          let optStyle = 'bg-white border-slate-200 text-slate-700';
                          if (optIdx === q.correctAnswer) {
                            optStyle = 'bg-emerald-100 border-emerald-300 text-emerald-900 font-bold';
                          } else if (optIdx === candidateAnswer && !isCorrect) {
                            optStyle = 'bg-rose-100 border-rose-300 text-rose-900 font-bold line-through';
                          }
                          return (
                            <div key={optIdx} className={`p-2.5 rounded-xl border ${optStyle}`}>
                              {String.fromCharCode(65 + optIdx)}. {opt}
                            </div>
                          );
                        })}
                      </div>

                      <div className="mt-3 p-3 bg-white/80 rounded-xl border border-slate-200 text-xs text-slate-600 leading-relaxed font-sans">
                        <strong className="text-slate-800 font-mono">Scientific Explanation: </strong>
                        {q.explanation}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
