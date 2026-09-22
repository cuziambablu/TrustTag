import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { useTrustTagStore } from '../store/trustTagStore';
import {
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  ArrowRight,
  Shield,
  Lock,
  FileCheck,
  Eye,
  Layers,
  Sparkles,
  Clock,
  ChevronRight,
  ExternalLink,
  Smartphone,
  Briefcase,
  Home as HomeIcon,
  Wrench,
  Check,
  X
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setPage, launchDemoScenario } = useTrustTagStore();

  // Hero Simulator Animation State (1: Agreement, 2: Evidence, 3: AI Scanning, 4: Results)
  const [heroStep, setHeroStep] = useState<number>(3);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  // Demo Section Interactive Scenario (01: MATCH, 02: MISMATCH, 03: NEEDS REVIEW)
  const [demoTab, setDemoTab] = useState<'MATCH' | 'MISMATCH' | 'NEEDS_REVIEW'>('MATCH');

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setHeroStep((prev) => (prev >= 4 ? 1 : prev + 1));
    }, 4500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA] text-[#111318] flex flex-col font-sans selection:bg-[#174EA6]/10 selection:text-[#174EA6]">
      <Navbar />

      {/* ==========================================
          SECTION 1 — HERO
          ========================================== */}
      <section className="pt-12 pb-16 md:pt-20 md:pb-24 border-b border-[#E4E7EC] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            {/* Left Column: Core Value Proposition */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#EEF4FF] border border-[#D0E2FF] text-[#174EA6] text-xs font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#174EA6]" />
                <span>Autonomous Agreement Verification</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight text-[#111318] leading-[1.12]">
                Proof that the work matches the promise.
              </h1>

              <p className="text-base sm:text-lg text-[#667085] leading-relaxed max-w-xl">
                TrustTag turns agreements and delivery evidence into verifiable proof — helping customers and service providers resolve disputes before they become problems.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={() => setPage('create-tag')}
                  className="inline-flex items-center justify-center gap-2 py-3 px-6 rounded-[6px] bg-[#174EA6] hover:bg-[#133E85] text-white text-sm font-semibold shadow-sm hover:shadow transition-all cursor-pointer min-h-[44px]"
                >
                  <span>Create an Agreement</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleScrollTo('how-it-works')}
                  className="inline-flex items-center justify-center gap-2 py-3 px-5 rounded-[6px] bg-[#FFFFFF] hover:bg-[#F2F4F7] text-[#111318] border border-[#E4E7EC] text-sm font-medium transition-colors cursor-pointer min-h-[44px]"
                >
                  <span>See How It Works</span>
                </button>
              </div>

              {/* Sub-CTA Note */}
              <p className="text-xs text-[#667085] pt-1">
                No complicated setup. No contracts to chase. Just verifiable proof.
              </p>
            </div>

            {/* Right Column: REAL TrustTag Product Interface Simulator */}
            <div className="lg:col-span-6">
              <div className="bg-[#FFFFFF] border border-[#E4E7EC] rounded-[10px] shadow-[0_12px_32px_rgba(16,24,40,0.06)] overflow-hidden">
                {/* Product Window Header */}
                <div className="px-4 py-3 bg-[#F7F8FA] border-b border-[#E4E7EC] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#E4E7EC]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#E4E7EC]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#E4E7EC]" />
                    <span className="ml-2 font-mono text-[11px] text-[#667085] font-medium">
                      CASE // TT-1043 — Living Room Painting
                    </span>
                  </div>

                  {/* Playback Controls */}
                  <div className="flex items-center gap-1.5 font-mono text-[10px]">
                    <span className="text-[#98A2B3] hidden sm:inline">STEP {heroStep}/4</span>
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="px-2 py-0.5 rounded-[4px] bg-[#FFFFFF] border border-[#E4E7EC] text-[#667085] hover:text-[#111318]"
                    >
                      {isPlaying ? 'PAUSE' : 'PLAY'}
                    </button>
                  </div>
                </div>

                {/* Stepper Tabs */}
                <div className="grid grid-cols-4 border-b border-[#E4E7EC] text-[11px] font-medium text-center">
                  {[
                    { s: 1, label: '01 Agreement' },
                    { s: 2, label: '02 Evidence' },
                    { s: 3, label: '03 AI Audit' },
                    { s: 4, label: '04 Result' },
                  ].map((item) => (
                    <button
                      key={item.s}
                      onClick={() => {
                        setHeroStep(item.s);
                        setIsPlaying(false);
                      }}
                      className={`py-2 px-1 border-b-2 transition-colors cursor-pointer ${
                        heroStep === item.s
                          ? 'border-[#174EA6] text-[#174EA6] font-semibold bg-[#F7F8FA]/60'
                          : 'border-transparent text-[#667085] hover:text-[#111318]'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                {/* Interactive Body */}
                <div className="p-5 sm:p-6 space-y-4">
                  {/* Step 1: Agreement Data */}
                  <div className="p-3.5 bg-[#F7F8FA] rounded-[6px] border border-[#E4E7EC] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#111318] uppercase tracking-wide font-mono">
                        LOCKED AGREEMENT
                      </span>
                      <span className="text-xs font-bold text-[#174EA6] font-mono">
                        ₹12,500 • Due Sep 25
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs text-[#111318]">
                      <div className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-[#15803D]" />
                        <span>Matte white finish</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-[#15803D]" />
                        <span>Two coats</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-[#15803D]" />
                        <span>Living room + ceiling</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-[#15803D]" />
                        <span>Complete by Friday</span>
                      </div>
                    </div>
                  </div>

                  {/* Step 2 & 3: Evidence & AI Scan */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-stretch">
                    {/* Visual Evidence Area */}
                    <div className="sm:col-span-7 aspect-[16/10] bg-[#0B1220] rounded-[6px] overflow-hidden relative border border-[#E4E7EC] flex items-center justify-center">
                      <img
                        src="/demo/white-room.svg"
                        alt="Submitted evidence"
                        className="w-full h-full object-cover opacity-90"
                      />

                      {/* Scanning Beam Overlay */}
                      {heroStep >= 2 && (
                        <div className="absolute inset-0 pointer-events-none">
                          <div className="w-full h-0.5 bg-[#3B82F6] shadow-[0_0_12px_#3B82F6] animate-scan-subtle" />
                          <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded-[3px] bg-[#0B1220]/80 border border-[#1E293B] text-[10px] font-mono text-[#E2E8F0]">
                            SPECTRAL ANALYSIS: 84% MATTE
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Step 3 & 4 Status Sidebar */}
                    <div className="sm:col-span-5 p-3 rounded-[6px] bg-[#F7F8FA] border border-[#E4E7EC] flex flex-col justify-between text-xs space-y-2">
                      <div>
                        <span className="text-[10px] font-mono uppercase text-[#667085] block font-semibold">
                          TRUSTTAG AI ENGINE
                        </span>
                        <p className="text-[11px] text-[#111318] mt-1 font-medium">
                          {heroStep <= 2 && 'Comparing agreement with evidence...'}
                          {heroStep >= 3 && 'Analysis complete. 3 / 4 matched.'}
                        </p>
                      </div>

                      {/* Mini Checklist */}
                      <div className="space-y-1.5 text-[11px]">
                        <div className="flex items-center justify-between text-[#15803D]">
                          <span>Matte white finish</span>
                          <span className="font-mono">MATCH</span>
                        </div>
                        <div className="flex items-center justify-between text-[#15803D]">
                          <span>Two coats applied</span>
                          <span className="font-mono">MATCH</span>
                        </div>
                        <div className="flex items-center justify-between text-[#15803D]">
                          <span>Living room walls</span>
                          <span className="font-mono">MATCH</span>
                        </div>
                        <div className="flex items-center justify-between text-[#B45309] font-medium">
                          <span>Ceiling evidence</span>
                          <span className="font-mono">REVIEW</span>
                        </div>
                      </div>

                      {/* Result Strip */}
                      <div className="pt-2 border-t border-[#E4E7EC] flex items-center justify-between">
                        <span className="text-[10px] font-mono text-[#667085]">CONFIDENCE: 92%</span>
                        <span className="text-[10px] font-mono uppercase font-semibold px-1.5 py-0.5 rounded bg-[#FFFBEB] text-[#B45309] border border-[#FDE68A]">
                          Needs Review
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Step 4: Verification Result Notification */}
                  <div className="p-3 bg-[#EEF4FF] rounded-[6px] border border-[#D0E2FF] flex items-start gap-2.5">
                    <AlertTriangle className="w-4 h-4 text-[#B45309] shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <span className="font-semibold text-[#111318] block">
                        3 of 4 requirements verified. 1 requires review.
                      </span>
                      <p className="text-[11px] text-[#667085] mt-0.5">
                        Wall color and coating confirmed. Ceiling evidence was not captured in the submitted photo.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 2 — TRUST SIGNAL
          ========================================== */}
      <section className="py-6 bg-[#FFFFFF] border-b border-[#E4E7EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#98A2B3] font-semibold whitespace-nowrap">
              BUILT FOR REAL-WORLD SERVICE TRANSACTIONS
            </span>
            <div className="flex flex-wrap items-center gap-6 sm:gap-8 text-xs font-medium text-[#667085]">
              <span className="hover:text-[#111318] transition-colors">Home Services</span>
              <span className="text-[#E4E7EC] hidden sm:inline">•</span>
              <span className="hover:text-[#111318] transition-colors">Freelancers</span>
              <span className="text-[#E4E7EC] hidden sm:inline">•</span>
              <span className="hover:text-[#111318] transition-colors">Agencies</span>
              <span className="text-[#E4E7EC] hidden sm:inline">•</span>
              <span className="hover:text-[#111318] transition-colors">Repair Services</span>
              <span className="text-[#E4E7EC] hidden sm:inline">•</span>
              <span className="hover:text-[#111318] transition-colors">Construction</span>
              <span className="text-[#E4E7EC] hidden sm:inline">•</span>
              <span className="hover:text-[#111318] transition-colors">Local Businesses</span>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 3 — PROBLEM
          ========================================== */}
      <section id="problem" className="py-16 md:py-24 border-b border-[#E4E7EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-widest text-[#174EA6] font-semibold block">
              THE ROOT CAUSE OF SERVICE DISPUTES
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#111318] mt-2">
              Most disputes start with a simple problem.
            </h2>
            <p className="text-sm sm:text-base text-[#667085] mt-3 leading-relaxed">
              The customer remembers one thing. The provider remembers another. The evidence arrives too late.
            </p>
          </div>

          {/* Side-by-Side Visual Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            {/* Left: What Was Agreed */}
            <div className="md:col-span-5 bg-[#FFFFFF] border border-[#E4E7EC] rounded-[8px] p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#E4E7EC]">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#667085] font-semibold">
                    WHAT WAS AGREED
                  </span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#F2F4F7] text-[#667085]">
                    VERBAL / PROMISED
                  </span>
                </div>

                <div className="mt-5 space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between p-2.5 rounded-[4px] bg-[#F7F8FA]">
                    <span className="text-[#667085]">Paint Color</span>
                    <span className="font-semibold text-[#111318]">"White paint"</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-[4px] bg-[#F7F8FA]">
                    <span className="text-[#667085]">Coats</span>
                    <span className="font-semibold text-[#111318]">"2 coats"</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-[4px] bg-[#F7F8FA]">
                    <span className="text-[#667085]">Price</span>
                    <span className="font-semibold text-[#111318]">"₹8,000"</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-[4px] bg-[#F7F8FA]">
                    <span className="text-[#667085]">Deadline</span>
                    <span className="font-semibold text-[#111318]">"Friday"</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-[#667085] mt-6 pt-4 border-t border-[#E4E7EC]">
                Stored informally across chat apps or verbal handshakes. Zero cryptographic audit seal.
              </p>
            </div>

            {/* Center: TrustTag Mismatch Indicator */}
            <div className="md:col-span-2 flex flex-col items-center justify-center gap-3 py-4">
              <div className="w-10 h-10 rounded-full bg-[#FEF3F2] border border-[#FECDCA] text-[#B42318] flex items-center justify-center shadow-xs">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-[#B42318] text-center">
                MISMATCH DETECTED
              </span>
              <span className="text-[10px] text-[#98A2B3] text-center max-w-[130px]">
                Autonomous clause-by-clause discrepancy audit
              </span>
            </div>

            {/* Right: What Was Delivered */}
            <div className="md:col-span-5 bg-[#FFFFFF] border border-[#FECDCA] rounded-[8px] p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#FECDCA]">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#B42318] font-semibold">
                    WHAT WAS DELIVERED
                  </span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#FEF3F2] text-[#B42318]">
                    SUBMITTED PHOTO
                  </span>
                </div>

                <div className="mt-5 space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between p-2.5 rounded-[4px] bg-[#FEF3F2] text-[#B42318]">
                    <span>Paint Color</span>
                    <span className="font-semibold">"Blue-grey wall" (✕)</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-[4px] bg-[#FEF3F2] text-[#B42318]">
                    <span>Coats</span>
                    <span className="font-semibold">"1 visible coat" (✕)</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-[4px] bg-[#F7F8FA] text-[#111318]">
                    <span className="text-[#667085]">Price</span>
                    <span className="font-semibold">"₹8,000" (✓)</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-[4px] bg-[#F7F8FA] text-[#111318]">
                    <span className="text-[#667085]">Deadline</span>
                    <span className="font-semibold">"Friday" (✓)</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-[#B42318] mt-6 pt-4 border-t border-[#FECDCA]">
                Without TrustTag, this leads to withheld payments, blame games, and lost relationships.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 4 — HOW TRUSTTAG WORKS
          ========================================== */}
      <section id="how-it-works" className="py-16 md:py-24 border-b border-[#E4E7EC] bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-widest text-[#174EA6] font-semibold block">
              FOUR REPEATABLE STAGES
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#111318] mt-2">
              From agreement to proof.
            </h2>
            <p className="text-sm sm:text-base text-[#667085] mt-3 leading-relaxed">
              TrustTag provides an unbroken, deterministic pipeline connecting what was promised to what was delivered.
            </p>
          </div>

          {/* Desktop Horizontal Flow / Mobile Vertical Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'AGREE',
                desc: 'Capture exactly what was promised via spoken voice, chat text, or structured form.',
                icon: FileCheck
              },
              {
                step: '02',
                title: 'CAPTURE',
                desc: 'Turn loose conversational requirements into measurable, atomic checkpoints.',
                icon: Layers
              },
              {
                step: '03',
                title: 'VERIFY',
                desc: 'Multimodal AI compares delivery evidence against each locked requirement.',
                icon: Sparkles
              },
              {
                step: '04',
                title: 'RESOLVE',
                desc: 'See exactly what matched, what deviated, and resolve without subjective disputes.',
                icon: CheckCircle2
              }
            ].map((s, idx) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.step}
                  className="p-6 rounded-[8px] bg-[#F7F8FA] border border-[#E4E7EC] flex flex-col justify-between space-y-4 hover:border-[#174EA6] transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#174EA6]">
                      {s.step}
                    </span>
                    <div className="w-8 h-8 rounded-[6px] bg-[#FFFFFF] border border-[#E4E7EC] flex items-center justify-center text-[#111318]">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-[#111318] tracking-tight">
                      {s.title}
                    </h3>
                    <p className="text-xs text-[#667085] mt-2 leading-relaxed">
                      {s.desc}
                    </p>
                  </div>

                  <div className="pt-2 text-[11px] font-mono text-[#98A2B3]">
                    {idx < 3 ? 'NEXT →' : 'COMPLETE'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 5 — PRODUCT SHOWCASE
          ========================================== */}
      <section id="product" className="py-16 md:py-24 border-b border-[#E4E7EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-widest text-[#174EA6] font-semibold block">
              OPERATIONAL COMMAND
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#111318] mt-2">
              Everything you need to verify the work.
            </h2>
            <p className="text-sm sm:text-base text-[#667085] mt-3 leading-relaxed">
              Track live service milestones, inspect photographic telemetry, and export cryptographically verifiable certificates.
            </p>
          </div>

          {/* Large Realistic Dashboard UI */}
          <div className="bg-[#FFFFFF] border border-[#E4E7EC] rounded-[10px] shadow-[0_16px_40px_rgba(16,24,40,0.06)] overflow-hidden">
            {/* Window bar */}
            <div className="px-5 py-3.5 bg-[#F7F8FA] border-b border-[#E4E7EC] flex items-center justify-between">
              <div className="flex items-center gap-6">
                <span className="text-xs font-bold text-[#111318] tracking-tight font-sans">
                  TrustTag Platform
                </span>
                <div className="hidden sm:flex items-center gap-4 text-xs font-medium text-[#667085]">
                  <span className="text-[#174EA6] font-semibold">Overview</span>
                  <span className="hover:text-[#111318] cursor-pointer">Agreements</span>
                  <span className="hover:text-[#111318] cursor-pointer">Verification</span>
                  <span className="hover:text-[#111318] cursor-pointer">Evidence</span>
                  <span className="hover:text-[#111318] cursor-pointer">Activity</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#15803D]" />
                <span className="text-[11px] font-mono text-[#667085]">SYSTEM ONLINE</span>
              </div>
            </div>

            {/* Dashboard Content */}
            <div className="p-6 space-y-6">
              {/* 4 Stats Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-[6px] bg-[#F7F8FA] border border-[#E4E7EC]">
                  <span className="text-[11px] font-mono uppercase text-[#667085]">Active Agreements</span>
                  <span className="text-2xl font-extrabold text-[#111318] block mt-1">12</span>
                </div>
                <div className="p-4 rounded-[6px] bg-[#F7F8FA] border border-[#E4E7EC]">
                  <span className="text-[11px] font-mono uppercase text-[#15803D]">Verified</span>
                  <span className="text-2xl font-extrabold text-[#15803D] block mt-1">8</span>
                </div>
                <div className="p-4 rounded-[6px] bg-[#F7F8FA] border border-[#E4E7EC]">
                  <span className="text-[11px] font-mono uppercase text-[#B45309]">Needs Review</span>
                  <span className="text-2xl font-extrabold text-[#B45309] block mt-1">2</span>
                </div>
                <div className="p-4 rounded-[6px] bg-[#F7F8FA] border border-[#E4E7EC]">
                  <span className="text-[11px] font-mono uppercase text-[#667085]">Awaiting Evidence</span>
                  <span className="text-2xl font-extrabold text-[#111318] block mt-1">2</span>
                </div>
              </div>

              {/* Realistic Agreement Rows */}
              <div className="border border-[#E4E7EC] rounded-[6px] overflow-hidden">
                <div className="px-4 py-2.5 bg-[#F7F8FA] border-b border-[#E4E7EC] grid grid-cols-12 text-[11px] font-mono uppercase text-[#667085] font-semibold">
                  <span className="col-span-5 sm:col-span-4">Agreement Name</span>
                  <span className="col-span-3 sm:col-span-2">Amount</span>
                  <span className="hidden sm:block sm:col-span-3">Checkpoints</span>
                  <span className="col-span-4 sm:col-span-3 text-right">Status</span>
                </div>

                <div className="divide-y divide-[#E4E7EC] text-xs">
                  {/* Row 1 */}
                  <div className="px-4 py-3 grid grid-cols-12 items-center hover:bg-[#F7F8FA] transition-colors">
                    <div className="col-span-5 sm:col-span-4 font-semibold text-[#111318]">
                      Living Room Painting
                      <span className="block text-[10px] text-[#667085] font-mono font-normal">TT-1043 • Due Sep 25</span>
                    </div>
                    <span className="col-span-3 sm:col-span-2 font-mono text-[#111318]">₹12,500</span>
                    <span className="hidden sm:block sm:col-span-3 text-[#667085]">3/4 matched</span>
                    <div className="col-span-4 sm:col-span-3 text-right">
                      <span className="inline-block px-2 py-0.5 rounded-[4px] text-[11px] font-mono uppercase font-medium bg-[#FFFBEB] text-[#B45309] border border-[#FDE68A]">
                        Needs Review
                      </span>
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="px-4 py-3 grid grid-cols-12 items-center hover:bg-[#F7F8FA] transition-colors">
                    <div className="col-span-5 sm:col-span-4 font-semibold text-[#111318]">
                      Website Development
                      <span className="block text-[10px] text-[#667085] font-mono font-normal">TT-1042 • Due Sep 28</span>
                    </div>
                    <span className="col-span-3 sm:col-span-2 font-mono text-[#111318]">₹35,000</span>
                    <span className="hidden sm:block sm:col-span-3 text-[#667085]">8/8 matched</span>
                    <div className="col-span-4 sm:col-span-3 text-right">
                      <span className="inline-block px-2 py-0.5 rounded-[4px] text-[11px] font-mono uppercase font-medium bg-[#F0FDF4] text-[#15803D] border border-[#BBF7D0]">
                        Verified
                      </span>
                    </div>
                  </div>

                  {/* Row 3 */}
                  <div className="px-4 py-3 grid grid-cols-12 items-center hover:bg-[#F7F8FA] transition-colors">
                    <div className="col-span-5 sm:col-span-4 font-semibold text-[#111318]">
                      AC Installation & Servicing
                      <span className="block text-[10px] text-[#667085] font-mono font-normal">TT-1041 • Due Today</span>
                    </div>
                    <span className="col-span-3 sm:col-span-2 font-mono text-[#111318]">₹4,500</span>
                    <span className="hidden sm:block sm:col-span-3 text-[#667085]">—</span>
                    <div className="col-span-4 sm:col-span-3 text-right">
                      <span className="inline-block px-2 py-0.5 rounded-[4px] text-[11px] font-mono uppercase font-medium bg-[#F2F4F7] text-[#667085] border border-[#E4E7EC]">
                        Awaiting Evidence
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 6 — AI VERIFICATION
          ========================================== */}
      <section className="py-16 md:py-24 border-b border-[#E4E7EC] bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-widest text-[#174EA6] font-semibold block">
              COMPUTER VISION & CLAUSE COMPARISON
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#111318] mt-2">
              AI doesn't just read the agreement. It checks the result.
            </h2>
            <p className="text-sm sm:text-base text-[#667085] mt-3 leading-relaxed">
              Our models deconstruct visual evidence against contractual clauses, highlighting deviations while maintaining calibrated uncertainty.
            </p>
          </div>

          {/* AI Inspection Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#F7F8FA] border border-[#E4E7EC] rounded-[10px] p-6 lg:p-8">
            {/* Clause & Evidence Column */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-4 bg-[#FFFFFF] border border-[#E4E7EC] rounded-[6px]">
                <span className="text-[10px] font-mono uppercase text-[#667085] block font-semibold">
                  AGREED CLAUSE
                </span>
                <span className="text-sm font-semibold text-[#111318] block mt-1">
                  Requirement: "Matte white finish"
                </span>
              </div>

              <div className="p-4 bg-[#FFFFFF] border border-[#E4E7EC] rounded-[6px] space-y-2">
                <span className="text-[10px] font-mono uppercase text-[#667085] block font-semibold">
                  SUBMITTED EVIDENCE
                </span>
                <div className="aspect-[16/10] rounded-[4px] overflow-hidden bg-[#0B1220] relative border border-[#E4E7EC]">
                  <img
                    src="/demo/white-room.svg"
                    alt="Inspection preview"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-2 left-2 px-1.5 py-0.5 rounded-[3px] bg-[#0B1220]/80 text-[#E2E8F0] font-mono text-[10px]">
                    1080p JPEG • Verified Timestamp
                  </span>
                </div>
              </div>
            </div>

            {/* AI Analysis Column */}
            <div className="lg:col-span-7 bg-[#FFFFFF] border border-[#E4E7EC] rounded-[8px] p-6 space-y-5">
              <div className="flex items-center justify-between border-b border-[#E4E7EC] pb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-[#667085] font-semibold">
                  AI-ASSISTED AUDIT MATRIX
                </span>
                <span className="text-xs font-mono font-bold text-[#174EA6]">
                  92% CONFIDENCE
                </span>
              </div>

              <div className="space-y-3 text-xs font-mono">
                <div className="flex items-center justify-between p-2.5 rounded-[4px] bg-[#F7F8FA]">
                  <span className="text-[#111318]">Color consistency</span>
                  <span className="text-[#15803D] font-bold">✓ MATCH (94%)</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-[4px] bg-[#F7F8FA]">
                  <span className="text-[#111318]">Coverage</span>
                  <span className="text-[#15803D] font-bold">✓ MATCH (96%)</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-[4px] bg-[#F7F8FA]">
                  <span className="text-[#111318]">Required area</span>
                  <span className="text-[#15803D] font-bold">✓ MATCH (91%)</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-[4px] bg-[#FFFBEB] text-[#B45309]">
                  <span className="font-semibold">Completion evidence</span>
                  <span className="font-bold">⚠ REVIEW NEEDED</span>
                </div>
              </div>

              {/* Calibrated Credibility Footnote */}
              <div className="p-3 bg-[#F7F8FA] rounded-[6px] border border-[#E4E7EC] text-xs text-[#667085] space-y-1">
                <p className="font-medium text-[#111318]">
                  Evidence suggests wall specifications are satisfied.
                </p>
                <p className="text-[11px] leading-relaxed">
                  TrustTag utilizes probabilistic computer vision. Human review is automatically recommended whenever camera angles, glare, or occlusions reduce confidence below 85%.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 7 — VERIFICATION REPORT
          ========================================== */}
      <section className="py-16 md:py-24 border-b border-[#E4E7EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-widest text-[#174EA6] font-semibold block">
              CONCLUSIVE DOCUMENTATION
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#111318] mt-2">
              Know exactly what matched.
            </h2>
            <p className="text-sm sm:text-base text-[#667085] mt-3 leading-relaxed">
              Export formal verification certificates with immutable timestamps, clause ratings, and objective discrepancy notes.
            </p>
          </div>

          {/* Premium Report UI */}
          <div className="max-w-3xl mx-auto bg-[#FFFFFF] border border-[#E4E7EC] rounded-[8px] p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E4E7EC] pb-4">
              <div>
                <span className="text-[10px] font-mono text-[#667085] uppercase tracking-wider block">
                  OFFICIAL AUDIT REPORT
                </span>
                <h3 className="text-lg font-bold text-[#111318] font-mono mt-0.5">
                  TRUSTTAG VERIFICATION REPORT
                </h3>
              </div>
              <div className="text-right sm:text-right">
                <span className="text-xs font-mono font-bold text-[#174EA6] block">₹12,500</span>
                <span className="text-[11px] text-[#667085]">Living Room Painting</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 rounded-[6px] bg-[#FFFBEB] border border-[#FDE68A]">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-[#B45309]" />
                <span className="text-xs font-semibold text-[#B45309]">
                  STATUS: 3 / 4 requirements matched
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#B45309]">AUDIT #TR-9940</span>
            </div>

            {/* Checklist */}
            <div className="space-y-2 text-xs font-mono">
              <div className="flex items-center justify-between py-1.5 border-b border-[#F2F4F7]">
                <span className="text-[#111318]">✓ Matte white finish</span>
                <span className="text-[#15803D]">SATISFIED</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-[#F2F4F7]">
                <span className="text-[#111318]">✓ Two coats applied</span>
                <span className="text-[#15803D]">SATISFIED</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-[#F2F4F7]">
                <span className="text-[#111318]">✓ Living room walls</span>
                <span className="text-[#15803D]">SATISFIED</span>
              </div>
              <div className="flex items-center justify-between py-1.5 text-[#B45309]">
                <span className="font-semibold">⚠ Ceiling evidence missing</span>
                <span>NEEDS REVIEW</span>
              </div>
            </div>

            {/* Observation block */}
            <div className="p-4 rounded-[6px] bg-[#F7F8FA] border border-[#E4E7EC] text-xs space-y-1">
              <span className="font-semibold text-[#111318] block font-mono text-[11px]">
                AI OBSERVATION:
              </span>
              <p className="text-[#667085] leading-relaxed">
                "The submitted evidence supports the wall-color and coverage requirements. Additional evidence is recommended for the ceiling."
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setPage('verification-result')}
                className="px-4 py-2 rounded-[6px] border border-[#E4E7EC] bg-[#FFFFFF] hover:bg-[#F7F8FA] text-xs font-semibold text-[#111318] cursor-pointer"
              >
                View Evidence
              </button>
              <button
                onClick={() => setPage('verification-result')}
                className="px-4 py-2 rounded-[6px] bg-[#174EA6] hover:bg-[#133E85] text-xs font-semibold text-white cursor-pointer shadow-xs"
              >
                Request Clarification
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 8 — USE CASES
          ========================================== */}
      <section id="solutions" className="py-16 md:py-24 border-b border-[#E4E7EC] bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-widest text-[#174EA6] font-semibold block">
              APPLICATION SPECTRUM
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#111318] mt-2">
              Engineered for every transaction where proof matters.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Home Services */}
            <div className="p-6 rounded-[8px] bg-[#F7F8FA] border border-[#E4E7EC] flex flex-col justify-between space-y-4 hover:border-[#174EA6] transition-colors">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-[6px] bg-[#FFFFFF] border border-[#E4E7EC] flex items-center justify-center text-[#174EA6]">
                  <HomeIcon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#111318] tracking-tight">
                  HOME SERVICES
                </h3>
                <p className="text-xs text-[#667085] leading-relaxed">
                  Painting, deep cleaning, plumbing repair, HVAC servicing, electrical upgrades. Verify room finishes, square footage, and pristine handover.
                </p>
              </div>

              <div className="pt-4 border-t border-[#E4E7EC] flex flex-wrap gap-1.5">
                {['Painting', 'Cleaning', 'Repair', 'Installation'].map((tag) => (
                  <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FFFFFF] border border-[#E4E7EC] text-[#667085]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Card 2: Freelancers */}
            <div className="p-6 rounded-[8px] bg-[#F7F8FA] border border-[#E4E7EC] flex flex-col justify-between space-y-4 hover:border-[#174EA6] transition-colors">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-[6px] bg-[#FFFFFF] border border-[#E4E7EC] flex items-center justify-center text-[#174EA6]">
                  <Smartphone className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#111318] tracking-tight">
                  FREELANCERS
                </h3>
                <p className="text-xs text-[#667085] leading-relaxed">
                  Websites, branding packages, video edits, technical development. Compare deliverable assets against creative briefs without endless revision loops.
                </p>
              </div>

              <div className="pt-4 border-t border-[#E4E7EC] flex flex-wrap gap-1.5">
                {['Websites', 'Design', 'Video editing', 'Development'].map((tag) => (
                  <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FFFFFF] border border-[#E4E7EC] text-[#667085]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Card 3: Business Services */}
            <div className="p-6 rounded-[8px] bg-[#F7F8FA] border border-[#E4E7EC] flex flex-col justify-between space-y-4 hover:border-[#174EA6] transition-colors">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-[6px] bg-[#FFFFFF] border border-[#E4E7EC] flex items-center justify-center text-[#174EA6]">
                  <Briefcase className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#111318] tracking-tight">
                  BUSINESS SERVICES
                </h3>
                <p className="text-xs text-[#667085] leading-relaxed">
                  Commercial marketing, facility maintenance, tenant turnover, IT consulting. Ensure multi-vendor deliverables strictly conform to statements of work.
                </p>
              </div>

              <div className="pt-4 border-t border-[#E4E7EC] flex flex-wrap gap-1.5">
                {['Marketing', 'Construction', 'Maintenance', 'Consulting'].map((tag) => (
                  <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FFFFFF] border border-[#E4E7EC] text-[#667085]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 9 — SECURITY / TRUST (DARK SECTION #0B1220)
          ========================================== */}
      <section className="py-20 bg-[#0B1220] text-white border-b border-[#1E293B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-widest text-[#3B82F6] font-semibold block">
              INTEGRITY & PROVABILITY
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mt-2">
              Proof should be clear. Not complicated.
            </h2>
            <p className="text-sm sm:text-base text-[#94A3B8] mt-3 leading-relaxed">
              Every TrustTag baseline is cryptographically hashed at creation. Evidence cannot be quietly substituted or backdated.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-[8px] bg-[#111A2E] border border-[#1E293B] space-y-3">
              <Lock className="w-5 h-5 text-[#3B82F6]" />
              <h4 className="text-sm font-bold text-white font-mono uppercase">
                Encrypted evidence
              </h4>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Images and deliverables are securely stored with SHA-256 integrity hashes to prevent tampering.
              </p>
            </div>

            <div className="p-5 rounded-[8px] bg-[#111A2E] border border-[#1E293B] space-y-3">
              <Eye className="w-5 h-5 text-[#3B82F6]" />
              <h4 className="text-sm font-bold text-white font-mono uppercase">
                Transparent verification
              </h4>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                See exact line-by-line reasoning, model confidence metrics, and detected feature deltas.
              </p>
            </div>

            <div className="p-5 rounded-[8px] bg-[#111A2E] border border-[#1E293B] space-y-3">
              <Clock className="w-5 h-5 text-[#3B82F6]" />
              <h4 className="text-sm font-bold text-white font-mono uppercase">
                Audit history
              </h4>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Complete chronological event stream documenting agreement creation, evidence upload, and verdicts.
              </p>
            </div>

            <div className="p-5 rounded-[8px] bg-[#111A2E] border border-[#1E293B] space-y-3">
              <Shield className="w-5 h-5 text-[#3B82F6]" />
              <h4 className="text-sm font-bold text-white font-mono uppercase">
                Timestamped agreements
              </h4>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Both parties receive an immutable digital seal establishing agreed scope prior to commencement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 10 — INTERACTIVE DEMO SCENARIOS
          ========================================== */}
      <section id="demo" className="py-16 md:py-24 border-b border-[#E4E7EC] bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-widest text-[#174EA6] font-semibold block">
              EVALUATION CONTROLLER
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#111318] mt-2">
              See TrustTag in action.
            </h2>
            <p className="text-sm sm:text-base text-[#667085] mt-3 leading-relaxed">
              Test all three deterministic evaluation outcomes in real-time. Click any scenario below to observe how the AI verification engine responds.
            </p>
          </div>

          {/* Scenario Tab Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setDemoTab('MATCH')}
              className={`px-4 py-2.5 rounded-[6px] text-xs font-mono font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                demoTab === 'MATCH'
                  ? 'bg-[#15803D] text-white shadow-sm'
                  : 'bg-[#F7F8FA] text-[#667085] border border-[#E4E7EC] hover:text-[#111318]'
              }`}
            >
              <Check className="w-3.5 h-3.5" />
              <span>01 MATCH</span>
            </button>

            <button
              onClick={() => setDemoTab('MISMATCH')}
              className={`px-4 py-2.5 rounded-[6px] text-xs font-mono font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                demoTab === 'MISMATCH'
                  ? 'bg-[#B42318] text-white shadow-sm'
                  : 'bg-[#F7F8FA] text-[#667085] border border-[#E4E7EC] hover:text-[#111318]'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>02 MISMATCH</span>
            </button>

            <button
              onClick={() => setDemoTab('NEEDS_REVIEW')}
              className={`px-4 py-2.5 rounded-[6px] text-xs font-mono font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                demoTab === 'NEEDS_REVIEW'
                  ? 'bg-[#B45309] text-white shadow-sm'
                  : 'bg-[#F7F8FA] text-[#667085] border border-[#E4E7EC] hover:text-[#111318]'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>03 NEEDS REVIEW</span>
            </button>
          </div>

          {/* Dynamic Interactive Card */}
          <div className="bg-[#F7F8FA] border border-[#E4E7EC] rounded-[10px] p-6 lg:p-8 space-y-6">
            {demoTab === 'MATCH' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#E4E7EC]">
                  <div>
                    <span className="text-xs font-mono uppercase text-[#15803D] font-bold">
                      SCENARIO 01 // PERFECT MATCH
                    </span>
                    <h3 className="text-base font-bold text-[#111318] mt-0.5">
                      Living Room Painting — White Satin Handover
                    </h3>
                  </div>
                  <span className="px-2.5 py-1 rounded-[4px] bg-[#F0FDF4] text-[#15803D] border border-[#BBF7D0] text-xs font-mono font-bold">
                    ✓ 4 / 4 MATCHED (94% CONFIDENCE)
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                  <div className="p-3 bg-[#FFFFFF] rounded border border-[#E4E7EC] space-y-2">
                    <span className="text-[#667085] uppercase text-[10px] block">VERIFIED CHECKPOINTS</span>
                    <div className="text-[#15803D] space-y-1">
                      <div>✓ Wall Color: Agreed White → Detected White (#FAFAFA)</div>
                      <div>✓ Coverage: 2 opaque coats confirmed</div>
                      <div>✓ Trim: Masking tape removed cleanly</div>
                      <div>✓ Handover: Completed Friday 4:30 PM</div>
                    </div>
                  </div>

                  <div className="p-3 bg-[#FFFFFF] rounded border border-[#E4E7EC] flex flex-col justify-between">
                    <div>
                      <span className="text-[#667085] uppercase text-[10px] block">ENGINE VERDICT</span>
                      <p className="text-xs text-[#111318] mt-1 font-sans">
                        Full compliance verified across all parameters. Milestone release authorized.
                      </p>
                    </div>
                    <button
                      onClick={() => launchDemoScenario('perfect_match')}
                      className="mt-3 py-1.5 px-3 rounded bg-[#174EA6] hover:bg-[#133E85] text-white font-mono text-xs cursor-pointer self-start"
                    >
                      Open in Full Workspace →
                    </button>
                  </div>
                </div>
              </div>
            )}

            {demoTab === 'MISMATCH' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#E4E7EC]">
                  <div>
                    <span className="text-xs font-mono uppercase text-[#B42318] font-bold">
                      SCENARIO 02 // MISMATCH DETECTED
                    </span>
                    <h3 className="text-base font-bold text-[#111318] mt-0.5">
                      Apartment Painting — Chromatic Deviation
                    </h3>
                  </div>
                  <span className="px-2.5 py-1 rounded-[4px] bg-[#FEF3F2] text-[#B42318] border border-[#FECDCA] text-xs font-mono font-bold">
                    ⚠ 2 REQUIREMENTS DON'T MATCH
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                  <div className="p-3 bg-[#FFFFFF] rounded border border-[#E4E7EC] space-y-2">
                    <span className="text-[#667085] uppercase text-[10px] block">DISCREPANCY LOG</span>
                    <div className="space-y-1">
                      <div className="text-[#B42318]">✕ Wall Color: Agreed White → Detected Blue/Grey (#2563EB)</div>
                      <div className="text-[#B42318]">✕ Finish: Single primer coat visible beneath pigment</div>
                      <div className="text-[#15803D]">✓ Timeline: Delivered on scheduled Friday</div>
                    </div>
                  </div>

                  <div className="p-3 bg-[#FFFFFF] rounded border border-[#E4E7EC] flex flex-col justify-between">
                    <div>
                      <span className="text-[#667085] uppercase text-[10px] block">ENGINE VERDICT</span>
                      <p className="text-xs text-[#111318] mt-1 font-sans">
                        Critical chromatic deviation. Customer notified with prompt to request rework or clarification.
                      </p>
                    </div>
                    <button
                      onClick={() => launchDemoScenario('mismatch_detected')}
                      className="mt-3 py-1.5 px-3 rounded bg-[#B42318] hover:bg-[#912018] text-white font-mono text-xs cursor-pointer self-start"
                    >
                      Open Mismatch Workspace →
                    </button>
                  </div>
                </div>
              </div>
            )}

            {demoTab === 'NEEDS_REVIEW' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#E4E7EC]">
                  <div>
                    <span className="text-xs font-mono uppercase text-[#B45309] font-bold">
                      SCENARIO 03 // INSUFFICIENT EVIDENCE
                    </span>
                    <h3 className="text-base font-bold text-[#111318] mt-0.5">
                      Ceiling Inspection — Optical Occlusion
                    </h3>
                  </div>
                  <span className="px-2.5 py-1 rounded-[4px] bg-[#FFFBEB] text-[#B45309] border border-[#FDE68A] text-xs font-mono font-bold">
                    ? EVIDENCE IS INSUFFICIENT (41% CONF)
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                  <div className="p-3 bg-[#FFFFFF] rounded border border-[#E4E7EC] space-y-2">
                    <span className="text-[#667085] uppercase text-[10px] block">QUALITY ANALYSIS</span>
                    <div className="space-y-1 text-[#B45309]">
                      <div>? Glare occlusion prevents surface segmentation</div>
                      <div>? Image resolution below 720p minimum threshold</div>
                      <div>? Ceiling angle missing from photographic frame</div>
                    </div>
                  </div>

                  <div className="p-3 bg-[#FFFFFF] rounded border border-[#E4E7EC] flex flex-col justify-between">
                    <div>
                      <span className="text-[#667085] uppercase text-[10px] block">ENGINE VERDICT</span>
                      <p className="text-xs text-[#111318] mt-1 font-sans">
                        Automated verdict suspended. Provider prompted to re-upload clear perpendicular photography.
                      </p>
                    </div>
                    <button
                      onClick={() => launchDemoScenario('insufficient_evidence')}
                      className="mt-3 py-1.5 px-3 rounded bg-[#B45309] hover:bg-[#92400E] text-white font-mono text-xs cursor-pointer self-start"
                    >
                      Open Review Workspace →
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 11 — FINAL CTA
          ========================================== */}
      <section className="py-20 bg-[#F7F8FA] border-b border-[#E4E7EC]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#111318]">
            Turn promises into proof.
          </h2>
          <p className="text-base sm:text-lg text-[#667085] max-w-xl mx-auto leading-relaxed">
            Create your first agreement and see how TrustTag verifies the result.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setPage('create-tag')}
              className="w-full sm:w-auto py-3.5 px-8 rounded-[6px] bg-[#174EA6] hover:bg-[#133E85] text-white text-sm font-semibold shadow-sm hover:shadow transition-all cursor-pointer min-h-[44px]"
            >
              Create an Agreement
            </button>
            <button
              onClick={() => launchDemoScenario('perfect_match')}
              className="w-full sm:w-auto py-3.5 px-6 rounded-[6px] bg-[#FFFFFF] hover:bg-[#F2F4F7] text-[#111318] border border-[#E4E7EC] text-sm font-medium transition-colors cursor-pointer min-h-[44px]"
            >
              Try Demo
            </button>
          </div>
        </div>
      </section>

      {/* ==========================================
          FOOTER
          ========================================== */}
      <footer className="py-12 bg-[#FFFFFF] text-xs text-[#667085]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="font-semibold text-[#111318] font-sans text-sm block">
              TrustTag
            </span>
            <p className="text-[11px] text-[#98A2B3] mt-0.5">
              AI-powered verification for real-world agreements.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <button onClick={() => handleScrollTo('product')} className="hover:text-[#111318]">
              Product
            </button>
            <button onClick={() => handleScrollTo('how-it-works')} className="hover:text-[#111318]">
              How It Works
            </button>
            <button onClick={() => handleScrollTo('demo')} className="hover:text-[#111318]">
              Demo
            </button>
            <span className="text-[#E4E7EC]">|</span>
            <button onClick={() => setPage('settings')} className="hover:text-[#111318]">
              Privacy
            </button>
            <button onClick={() => setPage('settings')} className="hover:text-[#111318]">
              Terms
            </button>
            <button onClick={() => setPage('settings')} className="hover:text-[#111318]">
              Contact
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
