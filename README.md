# TrustTag System (SYS-TT)

> **Proof that the work matches the promise.**  
> An autonomous agreement structuring and multimodal evidence verification engine for physical and digital service transactions.

[![Status](https://img.shields.io/badge/status-production--ready-15803D.svg?style=flat-square)](#)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-1D4ED8.svg?style=flat-square)](#)
[![React](https://img.shields.io/badge/React-19.0-171717.svg?style=flat-square)](#)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38BDF8.svg?style=flat-square)](#)
[![License](https://img.shields.io/badge/license-MIT-71717A.svg?style=flat-square)](#)

---

## 1. Problem Space

Informal and high-stakes service transactions across trades, contracting, home improvement, creative design, and technical delivery suffer from structural fragility:

1. **Vague Verbal & Conversational Agreements**: Promises are made over phone calls, WhatsApp messages, or quick in-person discussions (*"Paint my room white for ₹8,000 by Friday"*).
2. **Subjective Scope Creep & Misalignment**: What one party calls "complete", the other calls "substandard" or "the wrong color".
3. **Evidence Asymmetry**: Photos and deliverables are presented after the fact without reference to binding baseline parameters.
4. **Acrimonious Disputes**: When milestones fail, both parties lack an immutable audit log, leading to unpaid invoices, withheld deposits, chargebacks, and small-claims litigation.

---

## 2. The TrustTag Solution

**TrustTag is not a marketplace, an escrow bank, or a chat app.**  
It is an **autonomous evidence and agreement verification engine**.

```
┌─────────────────────────────────┐       ┌─────────────────────────────────┐
│       1. INGEST & STRUCTURE     │       │        2. LOCK TRUSTTAG         │
│  Spoken audio or conversation   │  ──▶  │  Measurable clauses decomposed  │
│  "Paint room white, ₹8,000"     │       │  Immutable SHA-256 case lock    │
└─────────────────────────────────┘       └─────────────────────────────────┘
                                                           │
                                                           ▼
┌─────────────────────────────────┐       ┌─────────────────────────────────┐
│     4. VERIFICATION REPORT      │       │       3. MULTIMODAL AUDIT       │
│  MATCH / MISMATCH / REVIEW      │  ◀──  │  High-res photo / asset upload  │
│  Audit log & Certificate export │       │  Computer vision telemetry      │
└─────────────────────────────────┘       └─────────────────────────────────┘
```

1. **Structured Requirement Decomposition**: Converts raw speech or text into quantifiable atomic requirements:
   - Task & Scope
   - Technical Specifications (Hex color, surface area, material, count)
   - Agreed Price & Payment Milestone
   - Exact Deadline & Completion Criteria
2. **Dual-Party Cryptographic Seal**: Once locked, the baseline cannot be secretly altered or backdated.
3. **Multimodal Evidence Analysis**: Evaluates submitted photographic or document proof against every locked clause.
4. **Definitive Tri-State Verdict**:
   - `VERIFIED` — All verifiable clauses satisfied within confidence tolerance.
   - `MISMATCH DETECTED` — Specific deviation identified with side-by-side comparative evidence.
   - `NEEDS REVIEW` — Ambient optical conditions (lighting, glare, angle) insufficient for conclusive verdict.

---

## 3. Product Architecture

### Frontend Design System
Designed with institutional fintech restraint, mathematical clarity, and high-density information architecture:
- **Palette**: Neutral background (`#F7F8FA`), solid white cards (`#FFFFFF`), primary text (`#111318`), secondary text (`#667085`), primary brand cobalt (`#174EA6`), dark sections (`#0B1220`), verified green (`#15803D`), caution amber (`#B45309`), danger red (`#B42318`), and subtle borders (`#E4E7EC`).
- **Typography**: Inter / Geist / system sans-serif for clean interface hierarchy; IBM Plex Mono for hash fingerprints, telemetry metrics, and ISO timestamps.
- **Form Factor**: Zero AI-generated clichés (no floating purple blobs, no pillowy rounded cards, no decorative low-contrast gradients). Strict 4px–8px border radii, razor-thin borders, and high-density contrast.

### Verification Engine State Machine
```typescript
type VerificationStatus = 'VERIFIED' | 'MISMATCH_DETECTED' | 'NEEDS_REVIEW';

interface Requirement {
  id: string;
  field: string;
  agreed: string;
  detected?: string;
  status: 'MATCH' | 'MISMATCH' | 'UNVERIFIED';
  confidence: number;
}
```

---

## 4. Hackathon Evaluation Scenarios

TrustTag includes an embedded **Interactive Judge Controller** mounted at the top of the interface for instantaneous, one-click evaluation across all three core verification states:

| Scenario | Case Reference | Input Evidence | Result Verdict | Key Features Demonstrated |
| :--- | :--- | :--- | :--- | :--- |
| **1. Perfect Match** | `TT-1043` (Apartment Painting) | Clean interior white walls | `VERIFIED` (94% confidence) | 4/4 parameters green, certificate generation, cryptographic audit seal. |
| **2. Mismatch Detected** | `TT-1043` (Apartment Painting) | Soft blue/grey interior walls | `MISMATCH DETECTED` (96% confidence) | Direct chromatic deviation flag, delta analysis, "Request Clarification" dispute modal. |
| **3. Insufficient Evidence** | `TT-1041` (Plumbing & Ceiling) | Blurry, glare-impaired camera capture | `NEEDS REVIEW` (41% confidence) | Quality gate failure, optical failure rationale, "Request New Evidence" prompt. |

---

## 5. Key System Capabilities

- **Institutional Landing Presentation**: Real-world value proposition, live problem/solution matrix, 4-step workflow, and realistic case breakdown.
- **Command Dashboard**: Live operational metrics (`Active Tags`, `Awaiting Evidence`, `Verified`, `Needs Review`), telemetry timeline, and case file navigation.
- **5-Step Agreement Creation Console**:
  - `01 Category`: Residential & Commercial Trade Services
  - `02 Parties & Scope`: Provider, Customer, agreed milestone value, deadline
  - `03 Structured Clauses`: Atomic requirement parameters (Color, Finish, Coats, Cleanliness)
  - `04 Review & Hash`: SHA-256 fingerprint preview and counterparty terms
  - `05 Lock TrustTag`: Cryptographically sealed case creation
- **Multimodal Evidence Upload**: Supports local file uploads or one-click preset test cases (White Room, Blue Room, Blurry Camera Capture, AC Compressor Unit).
- **Vision Scanner Telemetry**: Dual split-screen comparison, scanning beam animation, real-time bounding overlays, and parameter comparison matrix.
- **Formal Verification Certificate**: Cryptographically verifiable case certificate modal with JSON schema download.
- **Audit Activity Ledger**: Monospace event stream recording every creation, upload, match, and dispute resolution.

---

## 6. Tech Stack

- **Framework**: [React 19](https://react.dev/) + [TypeScript 5.8](https://www.typescriptlang.org/)
- **Bundler & Tooling**: [Vite 6](https://vite.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Code Quality**: Oxlint

---

## 7. Getting Started

### Prerequisites
- Node.js (version 18 or higher recommended)
- npm or pnpm

### Installation
```bash
# Clone the repository
git clone https://github.com/cuziambablu/TrustTag.git

# Navigate into the project directory
cd TrustTag

# Install dependencies
npm install
```

### Local Development
```bash
# Start Vite development server
npm run dev
```
Open your browser at `http://localhost:5173`.

### Production Build & Preview
```bash
# Compile and bundle for production
npm run build

# Preview production build locally
npm run preview
```

---

## 8. Repository Structure

```
TrustTag/
├── public/
│   ├── demo/
│   │   ├── blue-room.svg          # Mismatch evidence asset
│   │   ├── white-room.svg         # Verified evidence asset
│   │   ├── blurry-ceiling.svg     # Needs-review evidence asset
│   │   └── ac-repaired.svg        # Equipment service evidence
│   └── favicon.svg                # Minimal geometric shield logo
├── src/
│   ├── components/
│   │   ├── branding/
│   │   │   └── TrustTagLogo.tsx   # Precision vector logo mark
│   │   ├── common/
│   │   │   ├── StatusBadge.tsx    # Monospace status badges
│   │   │   └── ToastContainer.tsx # Global notification engine
│   │   ├── layout/
│   │   │   ├── AppHeader.tsx      # Authenticated shell header
│   │   │   ├── DemoBanner.tsx     # 1-Click hackathon evaluator bar
│   │   │   ├── Navbar.tsx         # Public marketing navigation
│   │   │   └── Sidebar.tsx        # Institutional navigation drawer
│   │   └── ui/
│   │       ├── AudioWaveform.tsx  # Agreement speech recording console
│   │       ├── ComparisonDiff.tsx # Side-by-side parameter matrix
│   │       ├── ReportModal.tsx    # Formal verification certificate
│   │       ├── Stepper.tsx        # Progress stepper
│   │       └── VisionScanner.tsx  # Multimodal CV telemetry console
│   ├── pages/
│   │   ├── ActivityPage.tsx       # Audit log ledger
│   │   ├── AgreementReviewPage.tsx# Pre-lock agreement preview
│   │   ├── AuthPage.tsx           # Authentication screen
│   │   ├── CreateTagPage.tsx      # 5-step agreement creator
│   │   ├── DashboardPage.tsx      # Operations overview
│   │   ├── EvidenceUploadPage.tsx # Multimodal evidence uploader
│   │   ├── HistoryPage.tsx        # Case file directory
│   │   ├── LandingPage.tsx        # High-conversion public interface
│   │   ├── SettingsPage.tsx       # Calibration & API settings
│   │   ├── TagDetailsPage.tsx     # Digital case file view
│   │   ├── VerificationProcessingPage.tsx # Analysis progression
│   │   └── VerificationResultPage.tsx     # Tri-state verdict screen
│   ├── store/
│   │   └── trustTagStore.ts       # Central reactive state & demo logic
│   ├── types/
│   │   └── trustTag.ts            # Domain entity definitions
│   ├── App.tsx                    # Root routing controller
│   ├── index.css                  # Design tokens & typography
│   └── main.tsx                   # Application entry point
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

---

## 9. Design Principles

- **Precision Over Flair**: Density of valuable information over empty white space.
- **Clarity Over Obfuscation**: Plain English explanations backed by verifiable data points.
- **Accountability First**: Every state change has a timestamp, an actor, and an cryptographic identifier.
- **No Hallucinations**: When image data is inconclusive, the system explicitly reports `NEEDS REVIEW` rather than guessing.

---

## 10. License

Distributed under the MIT License. See `LICENSE` for more information.
