import { useState, useEffect } from 'react';
import { TrustTag, Agreement, Evidence, Verification } from '../types/trustTag';
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
  | 'settings';

export const INITIAL_TAGS: TrustTag[] = [
  {
    id: 'TT-1042',
    title: 'Room Painting Service',
    service: 'Room Painting',
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
      task: 'Paint bedroom',
      color: 'White',
      price: '₹8,000',
      deadline: 'Friday, 6:00 PM',
      finish: 'Matte',
      notes: 'Use washable interior paint. Two coats required.',
      confidenceScore: 94,
      requirements: [
        { id: 'r1', type: 'task', label: 'Service Scope', agreedValue: 'Paint bedroom', status: 'matched', confidence: 98 },
        { id: 'r2', type: 'color', label: 'Wall Color', agreedValue: 'White', detectedValue: 'Blue', status: 'mismatch', confidence: 94 },
        { id: 'r3', type: 'finish', label: 'Surface Finish', agreedValue: 'Matte', status: 'matched', confidence: 89 },
        { id: 'r4', type: 'price', label: 'Total Compensation', agreedValue: '₹8,000', status: 'matched', confidence: 99 }
      ]
    },
    evidence: {
      id: 'ev-1042',
      fileName: 'delivered_bedroom_view.svg',
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
      summary: 'The submitted evidence appears to show a blue wall, while the agreement specifies white. The task and finish appear consistent with the agreement.',
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
          label: 'Service Task',
          agreed: 'Paint bedroom',
          detected: 'Room Painting Completed',
          status: 'matched',
          confidence: 96,
          reasoning: 'Visual inspection confirms full wall surface repainting has been completed.'
        },
        {
          requirementId: 'r2',
          label: 'Wall Color',
          agreed: 'White',
          detected: 'Blue (#2563EB)',
          status: 'mismatch',
          confidence: 94,
          reasoning: 'Surface spectral analysis detected deep blue pigments across all primary wall elevations.'
        },
        {
          requirementId: 'r3',
          label: 'Finish',
          agreed: 'Matte',
          detected: 'Matte finish',
          status: 'matched',
          confidence: 90,
          reasoning: 'Specular reflectivity matches low-sheen interior emulsion.'
        },
        {
          requirementId: 'r4',
          label: 'Evidence Quality',
          agreed: 'High Resolution Proof',
          detected: 'Clear interior photography',
          status: 'matched',
          confidence: 97,
          reasoning: 'Full room perspective with sufficient ambient daylight.'
        }
      ]
    },
    timeline: [
      { id: 't1', date: 'Sep 22, 10:15 AM', title: 'Verbal Agreement Captured', description: 'Audio agreement transcribed and structured into 4 criteria', status: 'completed' },
      { id: 't2', date: 'Sep 22, 10:20 AM', title: 'TrustTag Created & Locked', description: 'Dual-confirmation signed with Rahul Services', status: 'completed' },
      { id: 't3', date: 'Sep 22, 6:30 PM', title: 'Evidence Uploaded by Provider', description: 'Delivered bedroom photographic proof submitted', status: 'completed' },
      { id: 't4', date: 'Sep 22, 6:32 PM', title: 'AI Verification Completed', description: 'Color mismatch detected between White and Blue', status: 'completed' }
    ]
  },
  {
    id: 'TT-1041',
    title: 'Website Development Sprint',
    service: 'Website Development',
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
      task: 'Build responsive landing page & checkout integration',
      price: '₹35,000',
      deadline: 'Sep 21, 2026',
      confidenceScore: 97,
      requirements: [
        { id: 'w1', type: 'task', label: 'Design System', agreedValue: 'Dark SaaS Theme', status: 'matched', confidence: 96 },
        { id: 'w2', type: 'task', label: 'Payment Gateway', agreedValue: 'Stripe API live', status: 'matched', confidence: 99 },
        { id: 'w3', type: 'deadline', label: 'Delivery', agreedValue: 'Sep 21', status: 'matched', confidence: 98 }
      ]
    },
    evidence: {
      id: 'ev-1041',
      fileName: 'white-room.svg',
      fileType: 'image',
      url: '/demo/white-room.svg',
      uploadedAt: 'Sep 21, 2026 14:00'
    },
    verification: {
      overallStatus: 'verified',
      matchedCount: 3,
      totalRequirements: 3,
      confidence: 97,
      summary: 'Delivered code repository and deployed preview match all specified deliverables and acceptance criteria.',
      evaluatedAt: '2026-09-21T15:00:00Z',
      findings: [
        {
          requirementId: 'w1',
          label: 'Design System',
          agreed: 'Dark SaaS Theme',
          detected: 'Dark SaaS Theme matches design tokens',
          status: 'matched',
          confidence: 98,
          reasoning: 'Component styling aligns with designated color tokens and typography.'
        }
      ]
    },
    timeline: [
      { id: 't1', date: 'Sep 18, 09:00 AM', title: 'Sprint Agreement Finalized', description: 'Requirements converted to verifiable git milestone', status: 'completed' },
      { id: 't2', date: 'Sep 21, 02:00 PM', title: 'Repository Evidence Pushed', description: 'Live deployment URL and Lighthouse report uploaded', status: 'completed' },
      { id: 't3', date: 'Sep 21, 02:05 PM', title: 'AI Verification Succeeded', description: 'All 3 functional acceptance criteria verified', status: 'completed' }
    ]
  },
  {
    id: 'TT-1040',
    title: 'AC Inverter Coil & Valve Repair',
    service: 'AC Repair',
    provider: {
      name: 'CoolFix Services',
      contact: '+91 99302 11942'
    },
    customer: {
      name: 'Irfan',
      contact: 'irfan@trusttag.ai'
    },
    createdAt: 'Sep 20, 2026',
    status: 'verified',
    agreement: {
      task: 'Replace refrigerant copper valve and service compressor coil',
      price: '₹3,200',
      deadline: 'Sep 20, 2026',
      finish: 'OEM Copper Parts',
      confidenceScore: 95,
      requirements: [
        { id: 'a1', type: 'task', label: 'Valve Replacement', agreedValue: 'OEM Copper Valve', status: 'matched', confidence: 97 },
        { id: 'a2', type: 'task', label: 'Cooling Test', agreedValue: 'Target 22°C reachable', status: 'matched', confidence: 95 }
      ]
    },
    evidence: {
      id: 'ev-1040',
      fileName: 'ac_serviced_unit.svg',
      fileType: 'image',
      url: '/demo/ac-repair.svg',
      uploadedAt: 'Sep 20, 2026 17:15',
      metadata: {
        quality: 'Good',
        detectedObjects: ['Air conditioner', 'Pressure valve', 'Copper tube']
      }
    },
    verification: {
      overallStatus: 'verified',
      matchedCount: 4,
      totalRequirements: 4,
      confidence: 95,
      summary: 'Evidence appears consistent with agreed repair. Replacement copper tube, pressure gauge seal, and working digital 22°C display detected.',
      evaluatedAt: '2026-09-20T17:30:00Z',
      findings: [
        {
          requirementId: 'a1',
          label: 'Copper Valve Replacement',
          agreed: 'OEM Copper Valve',
          detected: 'New copper valve & high-pressure seal detected',
          status: 'matched',
          confidence: 96,
          reasoning: 'Clean brazing joint and replacement valve tag clearly visible.'
        },
        {
          requirementId: 'a2',
          label: 'Operating Temperature',
          agreed: '22°C',
          detected: 'Display shows 22°C active cooling mode',
          status: 'matched',
          confidence: 98,
          reasoning: 'Digital LED reads 22°C with green status indicator.'
        }
      ]
    },
    timeline: [
      { id: 't1', date: 'Sep 20, 11:00 AM', title: 'Work Order Tagged', description: 'Refrigerant service scope recorded', status: 'completed' },
      { id: 't2', date: 'Sep 20, 05:15 PM', title: 'Post-service Proof Submitted', description: 'Technician uploaded photograph of completed unit', status: 'completed' },
      { id: 't3', date: 'Sep 20, 05:20 PM', title: 'Verification Certified', description: '100% criteria validated successfully', status: 'completed' }
    ]
  }
];

class TrustTagState {
  private tags: TrustTag[] = INITIAL_TAGS;
  private activePage: AppPage = 'landing';
  private selectedTagId: string = 'TT-1042';
  private currentStep: number = 1;
  private currentDraftAgreement: Agreement | null = null;
  private currentDraftEvidence: Evidence | null = null;
  private currentDraftVerification: Verification | null = null;
  private isProcessingAI: boolean = false;
  private listeners: Array<() => void> = [];

  constructor() {
    // Attempt local storage hydration
    try {
      const saved = localStorage.getItem('trusttag_store_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.tags && parsed.tags.length) {
          this.tags = parsed.tags;
        }
      }
    } catch {
      // fallback to initial
    }
  }

  private notify() {
    try {
      localStorage.setItem('trusttag_store_v1', JSON.stringify({ tags: this.tags }));
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
      activePage: this.activePage,
      selectedTagId: this.selectedTagId,
      currentStep: this.currentStep,
      currentDraftAgreement: this.currentDraftAgreement,
      currentDraftEvidence: this.currentDraftEvidence,
      currentDraftVerification: this.currentDraftVerification,
      isProcessingAI: this.isProcessingAI,
      selectedTag: this.tags.find((t) => t.id === this.selectedTagId) || this.tags[0]
    };
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
   * Prepares and launches the interactive Hackathon Mismatch Demo
   */
  public async launchHackathonMismatchDemo() {
    this.isProcessingAI = true;
    this.setPage('create-tag');
    this.setStep(1);

    const demoAgreementText = 'Paint my room white for ₹8,000 by Friday.';
    
    // Automatically trigger AI extraction
    const extracted = await agreementService.extractRequirements(demoAgreementText, 'audio');
    this.currentDraftAgreement = extracted;
    this.isProcessingAI = false;
    this.setStep(2);
    this.setPage('agreement-review');
    this.notify();
  }

  /**
   * Completes confirmation and moves to evidence upload
   */
  public confirmDraftAgreementAndProceed() {
    this.setStep(3);
    this.setPage('evidence-upload');
  }

  /**
   * Sets the uploaded evidence and triggers computer vision verification
   */
  public async submitEvidenceAndVerify(evidencePreset: 'blue-room' | 'white-room' | 'ac-repair') {
    let evidenceObj: Evidence;

    if (evidencePreset === 'blue-room') {
      evidenceObj = {
        id: `ev-${Date.now()}`,
        fileName: 'delivered_room_photo.jpg',
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
        fileName: 'delivered_white_room.jpg',
        fileType: 'image',
        url: '/demo/white-room.svg',
        uploadedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        metadata: {
          dominantColorHex: '#FFFFFF',
          detectedColorName: 'White',
          quality: 'Good'
        }
      };
    } else {
      evidenceObj = {
        id: `ev-${Date.now()}`,
        fileName: 'serviced_ac_unit.jpg',
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

    // Run verification service
    const agreementToVerify = this.currentDraftAgreement || this.tags[0].agreement;
    const verificationResult = await verificationService.verifyEvidence(agreementToVerify, evidenceObj);

    this.currentDraftVerification = verificationResult;

    // Create new TrustTag entry
    const newTagId = `TT-${Math.floor(1043 + Math.random() * 50)}`;
    const newTrustTag: TrustTag = {
      id: newTagId,
      title: agreementToVerify.task,
      service: 'Room Painting',
      provider: {
        name: 'Rahul Services',
        contact: '+91 98201 44820'
      },
      customer: {
        name: 'Irfan',
        contact: 'irfan@trusttag.ai'
      },
      createdAt: 'Just now',
      status: verificationResult.overallStatus === 'mismatch' ? 'mismatch' : 'verified',
      agreement: agreementToVerify,
      evidence: evidenceObj,
      verification: verificationResult,
      timeline: [
        { id: 't1', date: 'Just now', title: 'Verbal Agreement Captured', description: 'Transcribed from audio recording', status: 'completed' },
        { id: 't2', date: 'Just now', title: 'AI Requirements Extracted', description: '5 measurable criteria identified', status: 'completed' },
        { id: 't3', date: 'Just now', title: 'Agreement Confirmed', description: 'Locked with dual confirmation', status: 'completed' },
        { id: 't4', date: 'Just now', title: 'Evidence Uploaded', description: 'Photographic proof submitted', status: 'completed' },
        { id: 't5', date: 'Just now', title: 'Verification Completed', description: verificationResult.summary, status: 'completed' }
      ]
    };

    this.tags = [newTrustTag, ...this.tags];
    this.selectedTagId = newTagId;
    this.setPage('verification-result');
  }

  public resetToDraft() {
    this.currentDraftAgreement = null;
    this.currentDraftEvidence = null;
    this.currentDraftVerification = null;
    this.currentStep = 1;
    this.notify();
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
    launchHackathonMismatchDemo: () => trustTagStore.launchHackathonMismatchDemo(),
    confirmDraftAgreementAndProceed: () => trustTagStore.confirmDraftAgreementAndProceed(),
    submitEvidenceAndVerify: (preset: 'blue-room' | 'white-room' | 'ac-repair') =>
      trustTagStore.submitEvidenceAndVerify(preset),
    resetToDraft: () => trustTagStore.resetToDraft()
  };
}
