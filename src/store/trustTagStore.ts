import { useState, useEffect } from 'react';
import { TrustTag, Agreement, Evidence, Verification, ActivityItem, ToastMessage } from '../types/trustTag';
import { agreementService } from '../services/agreementService';
import { verificationService } from '../services/verificationService';

export type AppPage = 
  | 'landing'
  | 'login'
  | 'signup'
  | 'dashboard'
  | 'create-tag'
  | 'agreement-review'
  | 'evidence-upload'
  | 'verification-processing'
  | 'verification-result'
  | 'tag-details'
  | 'history'
  | 'activity'
  | 'settings';

export const INITIAL_TAGS: TrustTag[] = [
  {
    id: 'TT-1043',
    title: 'Apartment Painting',
    service: 'Apartment Painting',
    category: 'Home Services',
    provider: {
      name: 'Rahul Services',
      contact: '+91 98201 44820'
    },
    customer: {
      name: 'Irfan',
      contact: 'irfan@trusttag.ai'
    },
    createdAt: 'Sep 22, 2026',
    status: 'mismatch',
    agreement: {
      task: 'Paint bedroom walls white',
      category: 'Home Services',
      description: 'Full surface two-coat application of washable interior white paint.',
      color: 'White',
      price: '₹8,000',
      deadline: 'Friday, 6:00 PM',
      finish: 'Matte',
      notes: 'Ensure clean edges, trim masking, and floor tarping.',
      confidenceScore: 94,
      requirements: [
        { id: 'r1', type: 'color', label: 'White wall paint', agreedValue: 'White', detectedValue: 'Blue (#2563EB)', evidenceType: 'photo', status: 'mismatch', confidence: 94, explanation: 'Wall color appears significantly different from the agreed requirement.', impact: 'Primary aesthetic deviation from signed agreement.' },
        { id: 'r2', type: 'task', label: 'Two coats applied', agreedValue: '2 coats', detectedValue: 'Full coverage', evidenceType: 'photo', status: 'matched', confidence: 96, explanation: 'No underlying base primer visible.' },
        { id: 'r3', type: 'task', label: 'Bedroom perimeter covered', agreedValue: 'All 4 walls', detectedValue: 'Perimeter covered', evidenceType: 'photo', status: 'matched', confidence: 98, explanation: 'All visible elevations completed.' },
        { id: 'r4', type: 'deadline', label: 'Completion before Friday', agreedValue: 'Friday', detectedValue: 'Delivered Friday', evidenceType: 'photo', status: 'matched', confidence: 99, explanation: 'Timestamp confirms delivery on schedule.' }
      ]
    },
    evidence: {
      id: 'ev-1043',
      fileName: 'delivered_bedroom_photo.jpg',
      fileType: 'image',
      url: '/demo/blue-room.svg',
      uploadedAt: 'Sep 22, 2026 18:30',
      metadata: {
        dominantColorHex: '#2563EB',
        detectedColorName: 'Cobalt Blue',
        quality: 'Good'
      }
    },
    verification: {
      overallStatus: 'mismatch',
      matchedCount: 3,
      totalRequirements: 4,
      confidence: 92,
      summary: 'Requirement mismatch detected. The delivered wall color appears significantly different from the agreed white paint requirement.',
      observation: 'Spectrophotometric analysis indicates royal blue pigment across 84% of wall pixels, directly conflicting with agreed white.',
      discrepancyReason: 'Delivered wall appears blue/grey instead of contracted white.',
      evaluatedAt: '2026-09-22T19:00:00Z',
      dominantColorDiff: {
        agreed: 'White',
        agreedHex: '#F8FAFC',
        detected: 'Blue',
        detectedHex: '#2563EB'
      },
      findings: [
        {
          requirementId: 'r1',
          label: 'White wall paint',
          agreed: 'White',
          detected: 'Blue (#2563EB)',
          status: 'mismatch',
          confidence: 94,
          reasoning: 'Delivered wall appears blue/grey rather than contracted white.',
          impact: 'Critical finish variance requiring client review or repainting.'
        },
        {
          requirementId: 'r2',
          label: 'Two coats applied',
          agreed: '2 coats',
          detected: 'Full opaque coverage',
          status: 'matched',
          confidence: 96,
          reasoning: 'Smooth, even coat without patchiness.'
        },
        {
          requirementId: 'r3',
          label: 'Bedroom perimeter covered',
          agreed: 'All 4 walls',
          detected: 'Perimeter covered',
          status: 'matched',
          confidence: 98,
          reasoning: 'Architectural context matches residential bedroom perimeter.'
        },
        {
          requirementId: 'r4',
          label: 'Completion before Friday',
          agreed: 'Friday',
          detected: 'Friday delivery',
          status: 'matched',
          confidence: 99,
          reasoning: 'Delivered before Friday 6:00 PM.'
        }
      ]
    },
    timeline: [
      { id: 't1', date: 'Sep 22, 10:15 AM', title: 'Agreement Captured', description: 'Terms defined for bedroom painting', status: 'completed' },
      { id: 't2', date: 'Sep 22, 10:20 AM', title: 'TrustTag Locked', description: 'Dual confirmation established', status: 'completed' },
      { id: 't3', date: 'Sep 22, 06:30 PM', title: 'Evidence Uploaded', description: 'Provider uploaded delivery photograph', status: 'completed' },
      { id: 't4', date: 'Sep 22, 06:32 PM', title: 'Verification Evaluated', description: 'Mismatch flagged on wall color (White → Blue)', status: 'completed' }
    ]
  },
  {
    id: 'TT-1042',
    title: 'Website Development',
    service: 'Website Development',
    category: 'Digital Studio',
    provider: {
      name: 'WebCraft Studio',
      contact: 'dev@webcraft.io'
    },
    customer: {
      name: 'Irfan',
      contact: 'irfan@trusttag.ai'
    },
    createdAt: 'Sep 21, 2026',
    status: 'verified',
    agreement: {
      task: 'Build responsive landing page & checkout flow',
      category: 'Digital Studio',
      price: '₹35,000',
      deadline: 'Sep 21, 2026',
      confidenceScore: 96,
      requirements: [
        { id: 'w1', type: 'task', label: 'Responsive design', agreedValue: 'Mobile + Desktop', detectedValue: 'Verified responsive', evidenceType: 'document', status: 'matched', confidence: 98 },
        { id: 'w2', type: 'task', label: 'Payment integration', agreedValue: 'Stripe API live', detectedValue: 'Live API tested', evidenceType: 'document', status: 'matched', confidence: 99 },
        { id: 'w3', type: 'deadline', label: 'Delivery deadline', agreedValue: 'Sep 21', detectedValue: 'Delivered Sep 21', evidenceType: 'document', status: 'matched', confidence: 98 }
      ]
    },
    evidence: {
      id: 'ev-1042',
      fileName: 'web_deployment_audit.pdf',
      fileType: 'document',
      url: '/demo/white-room.svg',
      uploadedAt: 'Sep 21, 2026 14:00'
    },
    verification: {
      overallStatus: 'verified',
      matchedCount: 3,
      totalRequirements: 3,
      confidence: 96,
      summary: 'Delivery appears consistent with the agreed requirements. All 3 milestone deliverables match specification.',
      evaluatedAt: '2026-09-21T15:00:00Z',
      findings: [
        {
          requirementId: 'w1',
          label: 'Responsive design',
          agreed: 'Mobile + Desktop',
          detected: 'Matches design specifications',
          status: 'matched',
          confidence: 98,
          reasoning: 'All viewport breakpoints verified without styling regressions.'
        }
      ]
    },
    timeline: [
      { id: 't1', date: 'Sep 18, 09:00 AM', title: 'Milestone Agreed', description: 'Sprint scope locked', status: 'completed' },
      { id: 't2', date: 'Sep 21, 02:00 PM', title: 'Repository Deployed', description: 'Production URL submitted', status: 'completed' },
      { id: 't3', date: 'Sep 21, 02:05 PM', title: 'Verified Compliant', description: 'Milestone criteria certified', status: 'completed' }
    ]
  },
  {
    id: 'TT-1041',
    title: 'AC Installation & Valve Service',
    service: 'AC Installation',
    category: 'Commercial Trades',
    provider: {
      name: 'CoolFix Solutions',
      contact: '+91 99302 11942'
    },
    customer: {
      name: 'Irfan',
      contact: 'irfan@trusttag.ai'
    },
    createdAt: 'Sep 20, 2026',
    status: 'verified',
    agreement: {
      task: 'Install replacement copper refrigerant valve and test cooling',
      category: 'Commercial Trades',
      price: '₹4,500',
      deadline: 'Sep 20, 2026',
      finish: 'OEM Copper Valve',
      confidenceScore: 94,
      requirements: [
        { id: 'a1', type: 'task', label: 'OEM Copper valve replacement', agreedValue: 'OEM Copper Valve', detectedValue: 'New copper valve & seal', evidenceType: 'photo', status: 'matched', confidence: 97 },
        { id: 'a2', type: 'task', label: 'Pressure seal integrity verified', agreedValue: 'Pressure sealed', detectedValue: 'High-pressure tag intact', evidenceType: 'photo', status: 'matched', confidence: 96 },
        { id: 'a3', type: 'task', label: '22°C cooling test verified', agreedValue: '22°C reachable', detectedValue: 'Digital display reads 22°C', evidenceType: 'photo', status: 'matched', confidence: 98 },
        { id: 'a4', type: 'deadline', label: 'Completion before deadline', agreedValue: 'Sep 20', detectedValue: 'Completed Sep 20', evidenceType: 'photo', status: 'matched', confidence: 99 }
      ]
    },
    evidence: {
      id: 'ev-1041',
      fileName: 'ac_unit_serviced.jpg',
      fileType: 'image',
      url: '/demo/ac-repair.svg',
      uploadedAt: 'Sep 20, 2026 17:15',
      metadata: {
        quality: 'Good'
      }
    },
    verification: {
      overallStatus: 'verified',
      matchedCount: 4,
      totalRequirements: 4,
      confidence: 94,
      summary: 'Delivery appears consistent with the agreed requirements. Replacement valve, pressure seals, and cooling test match contractual specifications.',
      evaluatedAt: '2026-09-20T17:30:00Z',
      findings: [
        {
          requirementId: 'a1',
          label: 'OEM Copper valve replacement',
          agreed: 'OEM Copper Valve',
          detected: 'New copper valve & high-pressure seal detected',
          status: 'matched',
          confidence: 97,
          reasoning: 'Clean brazing joint and replacement valve tag clearly visible.'
        },
        {
          requirementId: 'a2',
          label: 'Pressure seal integrity verified',
          agreed: 'Pressure sealed',
          detected: 'Pressure seal verified',
          status: 'matched',
          confidence: 96,
          reasoning: 'Pressure gauge indicator confirms closed system.'
        },
        {
          requirementId: 'a3',
          label: '22°C cooling test verified',
          agreed: '22°C reachable',
          detected: 'Display shows 22°C cooling active',
          status: 'matched',
          confidence: 98,
          reasoning: 'Unit display reads 22°C steady output.'
        },
        {
          requirementId: 'a4',
          label: 'Completion before deadline',
          agreed: 'Sep 20',
          detected: 'Finished on Sep 20',
          status: 'matched',
          confidence: 99,
          reasoning: 'Submission timestamp within service window.'
        }
      ]
    },
    timeline: [
      { id: 't1', date: 'Sep 20, 11:00 AM', title: 'Work Order Tagged', description: 'Refrigerant service scope recorded', status: 'completed' },
      { id: 't2', date: 'Sep 20, 05:15 PM', title: 'Post-service Proof Submitted', description: 'Technician uploaded photograph of completed unit', status: 'completed' },
      { id: 't3', date: 'Sep 20, 05:20 PM', title: 'Verification Certified', description: '4/4 criteria validated successfully', status: 'completed' }
    ]
  },
  {
    id: 'TT-1040',
    title: 'Brand Identity & Logo Design',
    service: 'Logo Design',
    category: 'Creative Design',
    provider: {
      name: 'Studio Forma',
      contact: 'contact@studioforma.design'
    },
    customer: {
      name: 'Irfan',
      contact: 'irfan@trusttag.ai'
    },
    createdAt: 'Sep 19, 2026',
    status: 'pending',
    agreement: {
      task: 'Deliver brand guide and vector logo assets (SVG, AI, PNG)',
      category: 'Creative Design',
      price: '₹15,000',
      deadline: 'Sep 28, 2026',
      confidenceScore: 92,
      requirements: [
        { id: 'l1', type: 'task', label: 'Vector brand assets', agreedValue: 'SVG & AI formats', evidenceType: 'document', status: 'pending', confidence: 90 },
        { id: 'l2', type: 'task', label: 'Brand styleguide', agreedValue: 'PDF brand guide', evidenceType: 'document', status: 'pending', confidence: 92 }
      ]
    },
    timeline: [
      { id: 't1', date: 'Sep 19, 04:00 PM', title: 'Design Scope Locked', description: 'Deliverables and brand criteria registered', status: 'completed' }
    ]
  }
];

export const INITIAL_ACTIVITY: ActivityItem[] = [
  {
    id: 'act-1',
    timestamp: '2 mins ago',
    trustTagId: 'TT-1043',
    serviceName: 'Apartment Painting',
    action: 'Mismatch Flagged',
    detail: 'Wall color blue detected vs white agreed (92% confidence)',
    status: 'mismatch'
  },
  {
    id: 'act-2',
    timestamp: '1 hour ago',
    trustTagId: 'TT-1042',
    serviceName: 'Website Development',
    action: 'Audit Certified',
    detail: 'All milestone acceptance criteria validated',
    status: 'verified'
  },
  {
    id: 'act-3',
    timestamp: 'Yesterday',
    trustTagId: 'TT-1041',
    serviceName: 'AC Installation',
    action: 'Evidence Verified',
    detail: 'OEM valve and cooling readout confirmed',
    status: 'verified'
  },
  {
    id: 'act-4',
    timestamp: '3 days ago',
    trustTagId: 'TT-1040',
    serviceName: 'Logo Design',
    action: 'Agreement Established',
    detail: 'Registered ₹15,000 deliverable scope with Studio Forma',
    status: 'info'
  }
];

class TrustTagState {
  private tags: TrustTag[] = INITIAL_TAGS;
  private activities: ActivityItem[] = INITIAL_ACTIVITY;
  private activePage: AppPage = 'landing';
  private selectedTagId: string = 'TT-1043';
  private currentStep: number = 1;
  private currentDraftAgreement: Agreement | null = null;
  private currentDraftEvidence: Evidence | null = null;
  private currentDraftVerification: Verification | null = null;
  private isProcessingAI: boolean = false;
  private toasts: ToastMessage[] = [];
  private listeners: Array<() => void> = [];

  constructor() {
    try {
      const saved = localStorage.getItem('trusttag_store_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.tags && parsed.tags.length) {
          this.tags = parsed.tags;
        }
      }
    } catch {
      // fallback
    }
  }

  private notify() {
    try {
      localStorage.setItem('trusttag_store_v2', JSON.stringify({ tags: this.tags }));
    } catch {
      // ignore
    }
    this.listeners.forEach((l) => l());
  }

  public subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  public getState() {
    return {
      tags: this.tags,
      activities: this.activities,
      activePage: this.activePage,
      selectedTagId: this.selectedTagId,
      currentStep: this.currentStep,
      currentDraftAgreement: this.currentDraftAgreement,
      currentDraftEvidence: this.currentDraftEvidence,
      currentDraftVerification: this.currentDraftVerification,
      isProcessingAI: this.isProcessingAI,
      toasts: this.toasts,
      selectedTag: this.tags.find((t) => t.id === this.selectedTagId) || this.tags[0]
    };
  }

  public addToast(title: string, description?: string, type: ToastMessage['type'] = 'info') {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const newToast: ToastMessage = { id, title, description, type };
    this.toasts = [...this.toasts, newToast];
    this.notify();

    setTimeout(() => {
      this.removeToast(id);
    }, 4000);
  }

  public removeToast(id: string) {
    this.toasts = this.toasts.filter((t) => t.id !== id);
    this.notify();
  }

  public setPage(page: AppPage) {
    this.activePage = page;
    this.notify();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  public selectTag(id: string) {
    this.selectedTagId = id;
    this.notify();
  }

  public setStep(step: number) {
    this.currentStep = step;
    this.notify();
  }

  public setDraftAgreement(agreement: Agreement | null) {
    this.currentDraftAgreement = agreement;
    this.notify();
  }

  public setDraftEvidence(evidence: Evidence | null) {
    this.currentDraftEvidence = evidence;
    this.notify();
  }

  public setDraftVerification(verification: Verification | null) {
    this.currentDraftVerification = verification;
    this.notify();
  }

  public updateDraftRequirement(id: string, updated: Partial<Agreement['requirements'][0]>) {
    if (!this.currentDraftAgreement) return;
    this.currentDraftAgreement = {
      ...this.currentDraftAgreement,
      requirements: this.currentDraftAgreement.requirements.map((r) =>
        r.id === id ? { ...r, ...updated } : r
      )
    };
    this.notify();
  }

  /**
   * 3 PREPARED DEMO SCENARIOS FOR HACKATHON JUDGES
   */
  public async launchDemoScenario(scenario: 'perfect_match' | 'mismatch_detected' | 'insufficient_evidence') {
    this.resetToDraft();

    if (scenario === 'perfect_match') {
      // Scenario 1: AC Installation (Verified 4/4)
      this.selectTag('TT-1041');
      this.currentDraftAgreement = this.tags.find((t) => t.id === 'TT-1041')?.agreement || null;
      this.currentDraftEvidence = this.tags.find((t) => t.id === 'TT-1041')?.evidence || null;
      this.currentDraftVerification = this.tags.find((t) => t.id === 'TT-1041')?.verification || null;
      this.setPage('verification-result');
      this.addToast('Demo Loaded: Perfect Match (4/4 Verified)', 'All contractual terms confirmed', 'success');
    } else if (scenario === 'mismatch_detected') {
      // Scenario 2: Apartment Painting (Mismatch White vs Blue)
      this.selectTag('TT-1043');
      this.currentDraftAgreement = this.tags.find((t) => t.id === 'TT-1043')?.agreement || null;
      this.currentDraftEvidence = this.tags.find((t) => t.id === 'TT-1043')?.evidence || null;
      this.currentDraftVerification = this.tags.find((t) => t.id === 'TT-1043')?.verification || null;
      this.setPage('verification-result');
      this.addToast('Demo Loaded: Mismatch Detected', 'White paint agreed vs Blue paint delivered', 'danger');
    } else {
      // Scenario 3: Insufficient Evidence (Needs Review)
      const reviewAgreement: Agreement = {
        task: 'Living Room Painting & Ceiling Coating',
        category: 'Home Services',
        description: 'Two coats of matte paint applied to living room walls and ceiling.',
        color: 'Off-White',
        price: '₹12,500',
        deadline: 'September 25, 2026',
        finish: 'Matte',
        confidenceScore: 78,
        requirements: [
          { id: 'ir1', type: 'task', label: 'Matte paint finish on walls', agreedValue: 'Matte finish', detectedValue: 'Matte finish verified', evidenceType: 'photo', status: 'matched', confidence: 92 },
          { id: 'ir2', type: 'task', label: 'Clean masking along trim', agreedValue: 'Taped trim edges', detectedValue: 'Clean baseboards', evidenceType: 'photo', status: 'matched', confidence: 91 },
          { id: 'ir3', type: 'task', label: 'Ceiling coating coverage', agreedValue: 'Full ceiling coverage', detectedValue: 'Occluded by glare / missing angle', evidenceType: 'photo', status: 'warning', confidence: 48, explanation: 'Evidence quality is insufficient to confidently verify the ceiling finish.' },
          { id: 'ir4', type: 'deadline', label: 'Completed by September 25', agreedValue: 'Sep 25', detectedValue: 'Delivered Sep 24', evidenceType: 'photo', status: 'matched', confidence: 99 }
        ]
      };

      const reviewEvidence: Evidence = {
        id: 'ev-review-1',
        fileName: 'living_room_ceiling_dim.jpg',
        fileType: 'image',
        url: '/demo/blurry-ceiling.svg',
        uploadedAt: 'Sep 24, 2026 16:45',
        metadata: {
          resolution: '320p',
          quality: 'Insufficient'
        }
      };

      const reviewVerification: Verification = {
        overallStatus: 'needs_review',
        matchedCount: 3,
        totalRequirements: 4,
        confidence: 74,
        summary: 'Human review recommended. Evidence quality is insufficient to confidently verify the ceiling coating requirement.',
        observation: 'Severe lens flare occlusion and 320p resolution prevent automated confirmation of the ceiling plane.',
        discrepancyReason: 'Evidence quality is insufficient to confidently verify the wall/ceiling coverage.',
        evaluatedAt: new Date().toISOString(),
        findings: [
          {
            requirementId: 'ir1',
            label: 'Matte paint finish on walls',
            agreed: 'Matte finish',
            detected: 'Matte finish verified',
            status: 'matched',
            confidence: 92,
            reasoning: 'Visible lower elevations exhibit diffuse matte finish.'
          },
          {
            requirementId: 'ir2',
            label: 'Clean masking along trim',
            agreed: 'Taped trim edges',
            detected: 'Clean baseboards',
            status: 'matched',
            confidence: 91,
            reasoning: 'Edges are straight without spatter.'
          },
          {
            requirementId: 'ir3',
            label: 'Ceiling coating coverage',
            agreed: 'Full ceiling coverage',
            detected: 'Occluded by glare / missing angle',
            status: 'warning',
            confidence: 48,
            reasoning: 'Evidence quality is insufficient to confidently verify the wall color or ceiling coverage (glare and low resolution).'
          },
          {
            requirementId: 'ir4',
            label: 'Completed by September 25',
            agreed: 'Sep 25',
            detected: 'Delivered Sep 24',
            status: 'matched',
            confidence: 99,
            reasoning: 'Delivered prior to target deadline.'
          }
        ]
      };

      this.currentDraftAgreement = reviewAgreement;
      this.currentDraftEvidence = reviewEvidence;
      this.currentDraftVerification = reviewVerification;
      this.setPage('verification-result');
      this.addToast('Demo Loaded: Insufficient Evidence', 'Human review recommended (glare / low-res)', 'warning');
    }
  }

  public async submitEvidenceAndVerify(evidencePreset: 'blue-room' | 'white-room' | 'ac-repair' | 'blurry-ceiling') {
    let evidenceObj: Evidence;

    if (evidencePreset === 'blue-room') {
      evidenceObj = {
        id: `ev-${Date.now()}`,
        fileName: 'bedroom_final_delivered.jpg',
        fileType: 'image',
        url: '/demo/blue-room.svg',
        uploadedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        metadata: {
          dominantColorHex: '#2563EB',
          detectedColorName: 'Royal Blue',
          quality: 'Good'
        }
      };
    } else if (evidencePreset === 'white-room') {
      evidenceObj = {
        id: `ev-${Date.now()}`,
        fileName: 'bedroom_white_compliant.jpg',
        fileType: 'image',
        url: '/demo/white-room.svg',
        uploadedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        metadata: {
          dominantColorHex: '#FFFFFF',
          detectedColorName: 'White',
          quality: 'Good'
        }
      };
    } else if (evidencePreset === 'blurry-ceiling') {
      evidenceObj = {
        id: `ev-${Date.now()}`,
        fileName: 'ceiling_dim_inspection.jpg',
        fileType: 'image',
        url: '/demo/blurry-ceiling.svg',
        uploadedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        metadata: {
          quality: 'Insufficient'
        }
      };
    } else {
      evidenceObj = {
        id: `ev-${Date.now()}`,
        fileName: 'ac_compressor_serviced.jpg',
        fileType: 'image',
        url: '/demo/ac-repair.svg',
        uploadedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        metadata: {
          quality: 'Good'
        }
      };
    }

    this.currentDraftEvidence = evidenceObj;
    this.setStep(4);
    this.setPage('verification-processing');

    const agreementToVerify = this.currentDraftAgreement || this.tags[0].agreement;

    if (evidencePreset === 'blurry-ceiling') {
      // Simulate Insufficient Evidence / Review State
      await new Promise((r) => setTimeout(r, 2000));
      const reviewResult: Verification = {
        overallStatus: 'needs_review',
        matchedCount: 3,
        totalRequirements: 4,
        confidence: 74,
        summary: 'Human review recommended. Evidence quality is insufficient to confidently verify the wall color or ceiling finish.',
        observation: 'Severe lighting glare and low resolution prevent algorithmic verification.',
        discrepancyReason: 'Evidence quality is insufficient to confidently verify the wall color.',
        evaluatedAt: new Date().toISOString(),
        findings: [
          {
            requirementId: 'f1',
            label: 'Task Execution',
            agreed: agreementToVerify.task,
            detected: 'Task partially visible',
            status: 'matched',
            confidence: 88,
            reasoning: 'Primary room space visible.'
          },
          {
            requirementId: 'f2',
            label: 'Surface Color',
            agreed: agreementToVerify.color || 'White',
            detected: 'Occluded by glare',
            status: 'warning',
            confidence: 52,
            reasoning: 'Evidence quality is insufficient to confidently verify the wall color.'
          },
          {
            requirementId: 'f3',
            label: 'Surface Finish',
            agreed: agreementToVerify.finish || 'Matte',
            detected: 'Matte texture visible in unoccluded areas',
            status: 'matched',
            confidence: 86,
            reasoning: 'Low sheen detected in shadow.'
          },
          {
            requirementId: 'f4',
            label: 'Evidence Quality',
            agreed: 'Clear photographic proof',
            detected: 'Low (Glare occlusion)',
            status: 'warning',
            confidence: 60,
            reasoning: 'High contrast glare impairs edge segmentation.'
          }
        ]
      };

      this.currentDraftVerification = reviewResult;
      this.setPage('verification-result');
      this.addToast('Verification Finished: Human Review Recommended', 'Evidence resolution is low', 'warning');
      return;
    }

    const verificationResult = await verificationService.verifyEvidence(agreementToVerify, evidenceObj);
    this.currentDraftVerification = verificationResult;

    const newTagId = `TT-${Math.floor(1044 + Math.random() * 50)}`;
    const isMismatch = verificationResult.overallStatus === 'mismatch';

    const newTrustTag: TrustTag = {
      id: newTagId,
      title: agreementToVerify.task,
      service: agreementToVerify.task,
      category: agreementToVerify.category || 'General Service',
      provider: {
        name: 'Rahul Services',
        contact: '+91 98201 44820'
      },
      customer: {
        name: 'Irfan',
        contact: 'irfan@trusttag.ai'
      },
      createdAt: 'Just now',
      status: isMismatch ? 'mismatch' : 'verified',
      agreement: agreementToVerify,
      evidence: evidenceObj,
      verification: verificationResult,
      timeline: [
        { id: 't1', date: 'Just now', title: 'Agreement Logged', description: 'Terms structured and agreed', status: 'completed' },
        { id: 't2', date: 'Just now', title: 'Evidence Submitted', description: 'Delivery photograph uploaded', status: 'completed' },
        { id: 't3', date: 'Just now', title: 'Verification Completed', description: verificationResult.summary, status: 'completed' }
      ]
    };

    this.tags = [newTrustTag, ...this.tags];
    this.selectedTagId = newTagId;
    this.setPage('verification-result');

    this.activities = [
      {
        id: `act-${Date.now()}`,
        timestamp: 'Just now',
        trustTagId: newTagId,
        serviceName: agreementToVerify.task,
        action: isMismatch ? 'Mismatch Detected' : 'Verified Compliant',
        detail: verificationResult.summary,
        status: isMismatch ? 'mismatch' : 'verified'
      },
      ...this.activities
    ];

    this.addToast(
      isMismatch ? 'Verification Complete: Mismatch Detected' : 'Verification Complete: Verified',
      verificationResult.summary,
      isMismatch ? 'danger' : 'success'
    );
  }

  public resetToDraft() {
    this.currentDraftAgreement = null;
    this.currentDraftEvidence = null;
    this.currentDraftVerification = null;
    this.currentStep = 1;
    this.notify();
  }

  public launchHackathonMismatchDemo() {
    this.launchDemoScenario('mismatch_detected');
  }

  public confirmDraftAgreementAndProceed() {
    this.setStep(3);
    this.setPage('evidence-upload');
    this.addToast('Agreement Baseline Locked', 'Requirements locked into SHA-256 case baseline.', 'info');
  }
}

export const trustTagStore = new TrustTagState();

export function useTrustTagStore() {
  const [state, setState] = useState(trustTagStore.getState());

  useEffect(() => {
    return trustTagStore.subscribe(() => {
      setState(trustTagStore.getState());
    });
  }, []);

  return {
    ...state,
    setPage: (page: AppPage) => trustTagStore.setPage(page),
    selectTag: (id: string) => trustTagStore.selectTag(id),
    setStep: (step: number) => trustTagStore.setStep(step),
    setDraftAgreement: (agr: Agreement | null) => trustTagStore.setDraftAgreement(agr),
    setDraftEvidence: (ev: Evidence | null) => trustTagStore.setDraftEvidence(ev),
    updateDraftRequirement: (id: string, updated: Partial<Agreement['requirements'][0]>) =>
      trustTagStore.updateDraftRequirement(id, updated),
    launchDemoScenario: (scenario: 'perfect_match' | 'mismatch_detected' | 'insufficient_evidence') =>
      trustTagStore.launchDemoScenario(scenario),
    launchHackathonMismatchDemo: () => trustTagStore.launchHackathonMismatchDemo(),
    confirmDraftAgreementAndProceed: () => trustTagStore.confirmDraftAgreementAndProceed(),
    submitEvidenceAndVerify: (preset: 'blue-room' | 'white-room' | 'ac-repair' | 'blurry-ceiling') =>
      trustTagStore.submitEvidenceAndVerify(preset),
    resetToDraft: () => trustTagStore.resetToDraft(),
    addToast: (title: string, description?: string, type?: ToastMessage['type']) =>
      trustTagStore.addToast(title, description, type),
    removeToast: (id: string) => trustTagStore.removeToast(id)
  };
}
