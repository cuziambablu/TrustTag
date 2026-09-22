import React from 'react';
import { Navbar } from '../components/layout/Navbar';
import { useTrustTagStore } from '../store/trustTagStore';
import { StatusBadge } from '../components/common/StatusBadge';

export const LandingPage: React.FC = () => {
  const { setPage, launchDemoScenario } = useTrustTagStore();

  return (
    <div className="min-h-screen bg-[#F7F7F4] text-[#111111] flex flex-col font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-16 pb-20 md:pt-24 md:pb-28 border-b border-[#DCDCD6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Editorial Headline & Actions (6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#6B6B67] block font-semibold">
                TRUSTTAG VERIFICATION SYSTEM
              </span>

              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#111111] leading-[1.08]">
                Proof that the work matches the promise.
              </h1>

              <p className="text-base sm:text-lg text-[#6B6B67] max-w-xl leading-relaxed">
                TrustTag turns verbal agreements and delivery evidence into verifiable proof.
              </p>

              <div className="pt-4 flex flex-wrap items-center gap-4 font-mono text-xs">
                <button
                  onClick={() => setPage('create-tag')}
                  className="py-3 px-6 rounded-[4px] bg-[#111111] hover:bg-[#2E2E2E] text-white font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Create an Agreement
                </button>

                <button
                  onClick={() => launchDemoScenario('mismatch_detected')}
                  className="py-3 px-6 rounded-[4px] bg-[#FFFFFF] hover:bg-[#F0F0EB] text-[#111111] border border-[#DCDCD6] font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Try Demo
                </button>
              </div>

              {/* Sub-metrics */}
              <div className="pt-8 border-t border-[#DCDCD6] grid grid-cols-3 gap-6 max-w-md font-mono text-xs">
                <div>
                  <span className="text-lg font-bold text-[#111111] block">4/4</span>
                  <span className="text-[10px] text-[#6B6B67] uppercase">Criteria Precision</span>
                </div>
                <div>
                  <span className="text-lg font-bold text-[#111111] block">0 SHA</span>
                  <span className="text-[10px] text-[#6B6B67] uppercase">Audit Tampering</span>
                </div>
                <div>
                  <span className="text-lg font-bold text-[#111111] block">100%</span>
                  <span className="text-[10px] text-[#6B6B67] uppercase">Objective Logic</span>
                </div>
              </div>
            </div>

            {/* Right Column: Realistic TrustTag Verification Interface (6 cols) */}
            <div className="lg:col-span-6">
              <div className="bg-[#FFFFFF] border border-[#DCDCD6] rounded-[6px] p-6 shadow-sm font-mono text-xs space-y-4">
                <div className="flex items-center justify-between border-b border-[#DCDCD6] pb-3">
                  <div>
                    <span className="text-[10px] text-[#6B6B67] uppercase block">CASE RECORD</span>
                    <span className="font-bold text-sm text-[#111111]">TT-1043 // APARTMENT PAINTING</span>
                  </div>
                  <StatusBadge status="mismatch" size="sm" />
                </div>

                {/* Agreement on Left & Evidence on Right */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Left: Agreement */}
                  <div className="p-3 bg-[#F7F7F4] border border-[#DCDCD6] rounded-[3px] space-y-2">
                    <span className="text-[10px] text-[#6B6B67] uppercase block font-semibold">
                      AGREED TERMS
                    </span>
                    <div className="text-[11px] text-[#111111] space-y-1">
                      <div>Task: <strong>Paint bedroom</strong></div>
                      <div>Color: <strong>White</strong></div>
                      <div>Coats: <strong>2 coats</strong></div>
                      <div>Fee: <strong>₹8,000</strong></div>
                      <div>Deadline: <strong>Friday</strong></div>
                    </div>
                  </div>

                  {/* Right: Delivery Evidence */}
                  <div className="p-3 bg-[#F7F7F4] border border-[#DCDCD6] rounded-[3px] space-y-2">
                    <span className="text-[10px] text-[#6B6B67] uppercase block font-semibold">
                      DELIVERY EVIDENCE
                    </span>
                    <div className="aspect-[16/11] rounded-[2px] overflow-hidden border border-[#DCDCD6] bg-[#111111] relative">
                      <img
                        src="/demo/blue-room.svg"
                        alt="Submitted evidence"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-1 right-1 bg-[#111111]/90 text-white text-[9px] px-1 py-0.2 border border-[#333333]">
                        #2563EB
                      </div>
                    </div>
                  </div>
                </div>

                {/* Verification result connecting them */}
                <div className="p-3.5 bg-[#FEF2F2] border border-[#FECACA] rounded-[3px]">
                  <div className="flex items-center justify-between font-bold text-[#991B1B] text-[11px] mb-1">
                    <span>⚠ REQUIREMENT MISMATCH DETECTED</span>
                    <span>92% CONF</span>
                  </div>
                  <p className="text-xs font-sans text-[#111111] leading-relaxed">
                    Wall color appears significantly different from the agreed requirement. Agreed: <strong className="text-[#111111]">White</strong> vs Detected: <strong className="text-[#1D4ED8]">Blue</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1: The Problem */}
      <section className="py-20 border-b border-[#DCDCD6] bg-[#FFFFFF]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#6B6B67] block font-semibold">
            THE PROBLEM
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111111] leading-tight">
            “Most service disputes start with a simple problem: nobody has the same understanding of what was promised.”
          </h2>
          <p className="text-sm text-[#6B6B67] max-w-2xl mx-auto leading-relaxed font-mono">
            Unrecorded conversations, vague WhatsApp threads, and subjective handshakes leave clients and providers exposed. TrustTag establishes an immutable contract record and verifies delivery using computer vision.
          </p>
        </div>
      </section>

      {/* Section 2: How TrustTag Works (AGREE → CAPTURE → VERIFY → RESOLVE) */}
      <section id="how-it-works" className="py-20 border-b border-[#DCDCD6] bg-[#F7F7F4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#6B6B67] block font-semibold mb-2">
              PROCESS
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-[#111111]">
              How TrustTag works.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 font-mono text-xs">
            <div className="p-6 bg-[#FFFFFF] border border-[#DCDCD6] rounded-[4px] space-y-2">
              <span className="text-sm font-bold text-[#1D4ED8] block">01</span>
              <h3 className="font-bold text-xs uppercase tracking-wider text-[#111111]">
                AGREE
              </h3>
              <p className="text-[#6B6B67] font-sans leading-relaxed">
                Parties verbally agree on work: service scope, price, deadline, and expectations.
              </p>
            </div>

            <div className="p-6 bg-[#FFFFFF] border border-[#DCDCD6] rounded-[4px] space-y-2">
              <span className="text-sm font-bold text-[#1D4ED8] block">02</span>
              <h3 className="font-bold text-xs uppercase tracking-wider text-[#111111]">
                CAPTURE
              </h3>
              <p className="text-[#6B6B67] font-sans leading-relaxed">
                TrustTag converts spoken terms into structured, measurable acceptance criteria.
              </p>
            </div>

            <div className="p-6 bg-[#FFFFFF] border border-[#DCDCD6] rounded-[4px] space-y-2">
              <span className="text-sm font-bold text-[#1D4ED8] block">03</span>
              <h3 className="font-bold text-xs uppercase tracking-wider text-[#111111]">
                VERIFY
              </h3>
              <p className="text-[#6B6B67] font-sans leading-relaxed">
                Provider uploads evidence photos. AI cross-checks pixels directly against the criteria.
              </p>
            </div>

            <div className="p-6 bg-[#FFFFFF] border border-[#DCDCD6] rounded-[4px] space-y-2">
              <span className="text-sm font-bold text-[#1D4ED8] block">04</span>
              <h3 className="font-bold text-xs uppercase tracking-wider text-[#111111]">
                RESOLVE
              </h3>
              <p className="text-[#6B6B67] font-sans leading-relaxed">
                Objective audit report certifies MATCH, MISMATCH, or NEEDS REVIEW without disputes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Example Case ("Paint bedroom walls white") */}
      <section id="use-cases" className="py-20 border-b border-[#DCDCD6] bg-[#FFFFFF]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#6B6B67] block font-semibold mb-2">
              REAL-WORLD INSPECTION CASE
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-[#111111]">
              “Paint bedroom walls white.”
            </h2>
          </div>

          <div className="border border-[#DCDCD6] rounded-[6px] bg-[#F7F7F4] p-6 sm:p-8 font-mono text-xs space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Agreed */}
              <div className="p-4 bg-[#FFFFFF] border border-[#DCDCD6] rounded-[4px] space-y-2">
                <span className="text-[10px] text-[#6B6B67] uppercase block font-semibold">
                  AGREED SPECIFICATIONS
                </span>
                <ul className="text-xs text-[#111111] space-y-1.5 font-sans">
                  <li>• White paint finish</li>
                  <li>• 2 coats required</li>
                  <li>• ₹8,000 compensation</li>
                  <li>• Completion by Friday</li>
                </ul>
              </div>

              {/* Delivered */}
              <div className="p-4 bg-[#FFFFFF] border border-[#DCDCD6] rounded-[4px] space-y-2">
                <span className="text-[10px] text-[#6B6B67] uppercase block font-semibold">
                  DELIVERED EVIDENCE
                </span>
                <div className="aspect-[16/10] rounded-[2px] overflow-hidden border border-[#DCDCD6] bg-[#111111]">
                  <img src="/demo/blue-room.svg" alt="Delivered blue room" className="w-full h-full object-cover" />
                </div>
                <span className="text-[10px] text-[#6B6B67] block">Photo evidence submitted by contractor</span>
              </div>

              {/* AI Result */}
              <div className="p-4 bg-[#FEF2F2] border border-[#FECACA] rounded-[4px] space-y-2 text-[#991B1B]">
                <span className="text-[10px] uppercase block font-bold">
                  AI AUDIT RESULT
                </span>
                <div className="font-bold text-xs uppercase">
                  Requirement Mismatch Detected
                </div>
                <p className="text-xs font-sans text-[#111111] leading-relaxed">
                  “Wall color appears significantly different from the agreed requirement.”
                </p>
                <div className="pt-2 border-t border-[#FECACA] text-[10px] text-[#6B6B67]">
                  Confidence: <strong>92%</strong> • 3/4 Criteria Matched
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Trust Report Preview */}
      <section className="py-20 border-b border-[#DCDCD6] bg-[#F7F7F4]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#6B6B67] block font-semibold">
            TRUST REPORT PREVIEW
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-[#111111]">
            Clear, impartial verification certificates.
          </h2>
          <p className="text-sm text-[#6B6B67] max-w-xl mx-auto">
            Every TrustTag outputs a shareable cryptographic audit report containing exact requirement diffs, detected values, and calibrated confidence metrics.
          </p>

          <div className="p-6 bg-[#FFFFFF] border border-[#DCDCD6] rounded-[4px] text-left font-mono text-xs max-w-2xl mx-auto space-y-3">
            <div className="flex justify-between border-b border-[#DCDCD6] pb-2 text-[10px] text-[#6B6B67]">
              <span>CERTIFICATE ID: TT-CERT-1043</span>
              <span>SHA256: e8d4f09a12c4...72d54e48b1</span>
            </div>
            <div className="grid grid-cols-2 gap-4 py-2">
              <div>
                <span className="text-[#6B6B67] block text-[10px]">CONTRACTED TASK:</span>
                <span className="text-[#111111] font-bold">Paint bedroom walls white</span>
              </div>
              <div>
                <span className="text-[#6B6B67] block text-[10px]">EVIDENCE STATUS:</span>
                <span className="text-[#B91C1C] font-bold">MISMATCH (Blue detected)</span>
              </div>
            </div>
            <div className="text-[11px] font-sans text-[#6B6B67] pt-2 border-t border-[#DCDCD6]">
              Calibrated algorithm assessment. Non-absolute probability distribution.
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Final CTA */}
      <section className="py-20 bg-[#FFFFFF]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111111]">
            Make your next agreement verifiable.
          </h2>
          <p className="text-sm text-[#6B6B67] max-w-lg mx-auto">
            Eliminate service disputes before they happen with objective AI verification.
          </p>
          <div className="pt-2 flex justify-center gap-4 font-mono text-xs">
            <button
              onClick={() => setPage('create-tag')}
              className="py-3 px-6 rounded-[4px] bg-[#111111] hover:bg-[#2E2E2E] text-white font-semibold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Create an Agreement →
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-[#F7F7F4] border-t border-[#DCDCD6] text-xs font-mono text-[#6B6B67]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-[#111111] font-semibold">TRUSTTAG // EVIDENCE VERIFICATION SYSTEM</span>
          <span>© 2026 TrustTag Systems. Built for high-trust commercial accountability.</span>
        </div>
      </footer>
    </div>
  );
};
