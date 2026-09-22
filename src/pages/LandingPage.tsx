import React from 'react';
import { Navbar } from '../components/layout/Navbar';
import { useTrustTagStore } from '../store/trustTagStore';
import { StatusBadge } from '../components/common/StatusBadge';

export const LandingPage: React.FC = () => {
  const { setPage, launchHackathonMismatchDemo } = useTrustTagStore();

  return (
    <div className="min-h-screen bg-[#F7F7F4] text-[#171717] flex flex-col font-sans">
      <Navbar />

      {/* Hero Section: Split Editorial Layout */}
      <section className="pt-16 pb-20 md:pt-24 md:pb-28 border-b border-[#DCDCD6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Editorial Copy (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#6B6B67] block font-semibold">
                AGREEMENT VERIFICATION / 01
              </span>

              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#171717] leading-[1.08]">
                Make every agreement <br />
                verifiable.
              </h1>

              <p className="text-base sm:text-lg text-[#6B6B67] max-w-xl leading-relaxed">
                TrustTag turns spoken agreements into structured requirements, then checks completed work against the original terms.
              </p>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setPage('create-tag')}
                  className="py-3 px-6 rounded-[4px] bg-[#171717] hover:bg-[#2E2E2E] text-white font-mono text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer"
                >
                  Create a TrustTag
                </button>

                <button
                  onClick={() => launchHackathonMismatchDemo()}
                  className="py-3 px-6 rounded-[4px] bg-[#FFFFFF] hover:bg-[#F0F0EB] text-[#171717] border border-[#DCDCD6] font-mono text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer"
                >
                  View demonstration
                </button>
              </div>

              {/* Sub-metrics strip */}
              <div className="pt-8 border-t border-[#DCDCD6] grid grid-cols-3 gap-6 max-w-md font-mono text-xs">
                <div>
                  <span className="text-lg font-bold text-[#171717] block">94.2%</span>
                  <span className="text-[10px] text-[#6B6B67] uppercase">Spectral Precision</span>
                </div>
                <div>
                  <span className="text-lg font-bold text-[#171717] block">0 SHA</span>
                  <span className="text-[10px] text-[#6B6B67] uppercase">Audit Tampering</span>
                </div>
                <div>
                  <span className="text-lg font-bold text-[#171717] block">100%</span>
                  <span className="text-[10px] text-[#6B6B67] uppercase">Impartial Logic</span>
                </div>
              </div>
            </div>

            {/* Right: Actual TrustTag Verification Document (5 cols) */}
            <div className="lg:col-span-5">
              <div className="bg-[#FFFFFF] border border-[#DCDCD6] rounded-[6px] p-6 shadow-sm font-mono text-xs">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-[#DCDCD6] pb-3 mb-4">
                  <div>
                    <span className="text-[10px] text-[#6B6B67] uppercase block">RECORD ID</span>
                    <span className="font-bold text-sm text-[#171717]">TT-1043</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-[#6B6B67] uppercase block">CATEGORY</span>
                    <span className="font-semibold text-[#171717]">ROOM PAINTING</span>
                  </div>
                </div>

                {/* Agreement Specifications */}
                <div className="space-y-2 mb-6">
                  <span className="text-[10px] uppercase text-[#6B6B67] block font-semibold">
                    AGREEMENT SPECIFICATION
                  </span>
                  <div className="divide-y divide-[#EBEBE6] border-t border-b border-[#EBEBE6]">
                    <div className="py-1.5 flex justify-between">
                      <span className="text-[#6B6B67]">Task:</span>
                      <span className="text-[#171717]">Paint bedroom</span>
                    </div>
                    <div className="py-1.5 flex justify-between">
                      <span className="text-[#6B6B67]">Color:</span>
                      <span className="text-[#171717]">White</span>
                    </div>
                    <div className="py-1.5 flex justify-between">
                      <span className="text-[#6B6B67]">Price:</span>
                      <span className="text-[#171717]">₹8,000</span>
                    </div>
                    <div className="py-1.5 flex justify-between">
                      <span className="text-[#6B6B67]">Deadline:</span>
                      <span className="text-[#171717]">Friday, 6:00 PM</span>
                    </div>
                  </div>
                </div>

                {/* Photo Preview inside document */}
                <div className="mb-6">
                  <span className="text-[10px] uppercase text-[#6B6B67] block font-semibold mb-2">
                    EVIDENCE SUBMISSION
                  </span>
                  <div className="aspect-[16/10] w-full rounded-[4px] overflow-hidden border border-[#DCDCD6] bg-[#151515] relative">
                    <img
                      src="/demo/blue-room.svg"
                      alt="Delivered evidence"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 right-2 bg-[#171717]/90 text-white font-mono text-[9px] px-1.5 py-0.5 border border-[#2E2E2E]">
                      EXTRACT: #2563EB
                    </div>
                  </div>
                </div>

                {/* Verification section */}
                <div className="space-y-2 border-t border-[#DCDCD6] pt-4">
                  <span className="text-[10px] uppercase text-[#6B6B67] block font-semibold">
                    VERIFICATION FINDING
                  </span>

                  <div className="p-3 bg-[#FEF2F2] border border-[#FECACA] rounded-[4px] text-xs">
                    <div className="flex items-center justify-between font-bold text-[#991B1B] mb-1">
                      <span>STATUS: MISMATCH DETECTED</span>
                      <span>92% CONF</span>
                    </div>
                    <div className="text-[11px] text-[#6B6B67] space-y-0.5">
                      <div>AGREED COLOR: <strong className="text-[#171717]">WHITE</strong></div>
                      <div>DETECTED COLOR: <strong className="text-[#1D4ED8]">BLUE (#2563EB)</strong></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: "From words to evidence." Process */}
      <section id="how-it-works" className="py-20 border-b border-[#DCDCD6] bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#6B6B67] block font-semibold mb-2">
              METHODOLOGY
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-[#171717]">
              From words to evidence.
            </h2>
            <p className="text-sm text-[#6B6B67] mt-1">
              A transparent verification process with zero marketplace bias.
            </p>
          </div>

          {/* Horizontal Process with Thin Connecting Lines */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            <div className="space-y-3">
              <span className="font-mono text-sm font-bold text-[#1D4ED8] block">
                01
              </span>
              <h3 className="font-mono text-xs uppercase tracking-wider font-bold text-[#171717]">
                AGREEMENT
              </h3>
              <p className="text-xs text-[#6B6B67] leading-relaxed">
                Capture what was said through voice recording, audio file upload, or chat transcript.
              </p>
            </div>

            <div className="space-y-3">
              <span className="font-mono text-sm font-bold text-[#1D4ED8] block">
                02
              </span>
              <h3 className="font-mono text-xs uppercase tracking-wider font-bold text-[#171717]">
                STRUCTURE
              </h3>
              <p className="text-xs text-[#6B6B67] leading-relaxed">
                Convert conversational context into unambiguous, measurable criteria: task, color, price, and deadline.
              </p>
            </div>

            <div className="space-y-3">
              <span className="font-mono text-sm font-bold text-[#1D4ED8] block">
                03
              </span>
              <h3 className="font-mono text-xs uppercase tracking-wider font-bold text-[#171717]">
                EVIDENCE
              </h3>
              <p className="text-xs text-[#6B6B67] leading-relaxed">
                Upload photographic or video proof of the completed service directly to the TrustTag case file.
              </p>
            </div>

            <div className="space-y-3">
              <span className="font-mono text-sm font-bold text-[#1D4ED8] block">
                04
              </span>
              <h3 className="font-mono text-xs uppercase tracking-wider font-bold text-[#171717]">
                VERIFY
              </h3>
              <p className="text-xs text-[#6B6B67] leading-relaxed">
                Multimodal computer vision cross-references the submitted evidence against original specifications.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Real Product Preview */}
      <section id="product" className="py-20 border-b border-[#DCDCD6] bg-[#F7F7F4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#6B6B67] block font-semibold mb-2">
                SYSTEM INTERFACE
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight text-[#171717]">
                The TrustTag verification ledger.
              </h2>
            </div>
            <button
              onClick={() => setPage('dashboard')}
              className="font-mono text-xs font-semibold text-[#1D4ED8] hover:underline"
            >
              Open Live Dashboard →
            </button>
          </div>

          {/* Browser-like Product Preview Container */}
          <div className="border border-[#DCDCD6] rounded-[6px] bg-[#FFFFFF] shadow-sm overflow-hidden">
            {/* Browser Header Bar */}
            <div className="bg-[#F0F0EB] px-4 py-2.5 border-b border-[#DCDCD6] flex items-center justify-between text-xs font-mono text-[#6B6B67]">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#DCDCD6]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#DCDCD6]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#DCDCD6]" />
                <span className="ml-3 text-[11px]">https://trusttag.sys/ledger</span>
              </div>
              <span className="text-[10px] uppercase">READ-ONLY AUDIT STREAM</span>
            </div>

            {/* Dashboard Content Mockup */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Compact Information Strip */}
              <div className="grid grid-cols-3 border border-[#DCDCD6] rounded-[4px] p-4 bg-[#F7F7F4] text-center font-mono">
                <div>
                  <span className="text-2xl font-bold text-[#171717] block">12</span>
                  <span className="text-[10px] text-[#6B6B67] uppercase">ACTIVE</span>
                </div>
                <div className="border-x border-[#DCDCD6]">
                  <span className="text-2xl font-bold text-[#15803D] block">8</span>
                  <span className="text-[10px] text-[#6B6B67] uppercase">VERIFIED</span>
                </div>
                <div>
                  <span className="text-2xl font-bold text-[#B91C1C] block">1</span>
                  <span className="text-[10px] text-[#6B6B67] uppercase">MISMATCH</span>
                </div>
              </div>

              {/* Table */}
              <div className="border border-[#DCDCD6] rounded-[4px] overflow-hidden">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="bg-[#F7F7F4] border-b border-[#DCDCD6] text-[#6B6B67] text-[10px] uppercase">
                      <th className="py-2.5 px-4">RECORD</th>
                      <th className="py-2.5 px-4">SERVICE</th>
                      <th className="py-2.5 px-4">STATUS</th>
                      <th className="py-2.5 px-4 text-right">TIMESTAMP</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EBEBE6]">
                    <tr className="hover:bg-[#F7F7F4] cursor-pointer" onClick={() => setPage('verification-result')}>
                      <td className="py-3 px-4 font-bold text-[#171717]">TT-1043</td>
                      <td className="py-3 px-4">Room Painting</td>
                      <td className="py-3 px-4">
                        <StatusBadge status="mismatch" size="sm" />
                      </td>
                      <td className="py-3 px-4 text-right text-[#6B6B67]">2 min ago</td>
                    </tr>
                    <tr className="hover:bg-[#F7F7F4] cursor-pointer" onClick={() => setPage('tag-details')}>
                      <td className="py-3 px-4 font-bold text-[#171717]">TT-1042</td>
                      <td className="py-3 px-4">Website Development</td>
                      <td className="py-3 px-4">
                        <StatusBadge status="verified" size="sm" />
                      </td>
                      <td className="py-3 px-4 text-right text-[#6B6B67]">Yesterday</td>
                    </tr>
                    <tr className="hover:bg-[#F7F7F4] cursor-pointer" onClick={() => setPage('tag-details')}>
                      <td className="py-3 px-4 font-bold text-[#171717]">TT-1041</td>
                      <td className="py-3 px-4">AC Repair</td>
                      <td className="py-3 px-4">
                        <StatusBadge status="verified" size="sm" />
                      </td>
                      <td className="py-3 px-4 text-right text-[#6B6B67]">Yesterday</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Realistic Use Cases */}
      <section id="use-cases" className="py-20 border-b border-[#DCDCD6] bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#6B6B67] block font-semibold mb-2">
              APPLICATIONS
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-[#171717]">
              Built for commercial service transactions.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
            <div className="p-5 border border-[#DCDCD6] rounded-[4px] bg-[#F7F7F4] space-y-2">
              <span className="text-[10px] text-[#6B6B67] uppercase block">CONTRACT CLASS A</span>
              <h3 className="font-bold text-sm text-[#171717] font-sans">Residential Services</h3>
              <p className="text-[#6B6B67] leading-relaxed">
                Painting, plumbing, electrical installations, and renovations. Verifies paint color tones, pipe replacements, and fixture specifications.
              </p>
            </div>

            <div className="p-5 border border-[#DCDCD6] rounded-[4px] bg-[#F7F7F4] space-y-2">
              <span className="text-[10px] text-[#6B6B67] uppercase block">CONTRACT CLASS B</span>
              <h3 className="font-bold text-sm text-[#171717] font-sans">Digital & Creative Studios</h3>
              <p className="text-[#6B6B67] leading-relaxed">
                Web development sprints, graphic branding, video editing. Verifies responsive deliverables against acceptance criteria.
              </p>
            </div>

            <div className="p-5 border border-[#DCDCD6] rounded-[4px] bg-[#F7F7F4] space-y-2">
              <span className="text-[10px] text-[#6B6B67] uppercase block">CONTRACT CLASS C</span>
              <h3 className="font-bold text-sm text-[#171717] font-sans">Commercial Trades & Vendors</h3>
              <p className="text-[#6B6B67] leading-relaxed">
                Custom printing runs, equipment fabrication, HVAC maintenance. Verifies physical component models and pressure gauge readings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-[#F7F7F4] text-xs font-mono text-[#6B6B67]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-[#171717] font-semibold">TRUSTTAG // EVIDENCE VERIFICATION SYSTEM</span>
          <span>© 2026 TrustTag Systems. Built for high-trust commercial accountability.</span>
        </div>
      </footer>
    </div>
  );
};
