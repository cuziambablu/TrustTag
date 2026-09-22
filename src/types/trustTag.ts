export type TrustTagStatus = 'active' | 'verified' | 'mismatch' | 'pending' | 'review';

export type RequirementType = 
  | 'task' 
  | 'color' 
  | 'price' 
  | 'deadline' 
  | 'finish' 
  | 'material' 
  | 'custom';

export type RequirementStatus = 'matched' | 'mismatch' | 'warning' | 'pending';

export interface Requirement {
  id: string;
  type: RequirementType;
  label: string;
  agreedValue: string;
  detectedValue?: string;
  status: RequirementStatus;
  confidence: number; // percentage 0-100
  explanation?: string;
}

export interface Agreement {
  task: string;
  price: string;
  deadline: string;
  color?: string;
  finish?: string;
  notes?: string;
  requirements: Requirement[];
  rawInput?: string;
  inputType?: 'audio' | 'transcript' | 'manual';
  confidenceScore: number;
}

export interface Evidence {
  id: string;
  fileName: string;
  fileType: 'image' | 'video' | 'document';
  url: string;
  uploadedAt: string;
  fileSize?: string;
  thumbnailUrl?: string;
  metadata?: {
    dominantColorHex?: string;
    detectedColorName?: string;
    detectedObjects?: string[];
    resolution?: string;
    quality?: 'Good' | 'Moderate' | 'Low';
  };
}

export interface VerificationFinding {
  requirementId: string;
  label: string;
  agreed: string;
  detected: string;
  status: 'matched' | 'mismatch' | 'warning';
  confidence: number;
  reasoning: string;
}

export interface Verification {
  overallStatus: 'verified' | 'mismatch' | 'needs_review';
  matchedCount: number;
  totalRequirements: number;
  confidence: number;
  findings: VerificationFinding[];
  summary: string;
  evaluatedAt: string;
  dominantColorDiff?: {
    agreed: string;
    agreedHex: string;
    detected: string;
    detectedHex: string;
  };
}

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  status: 'completed' | 'in_progress' | 'failed' | 'upcoming';
}

export interface TrustTag {
  id: string;
  title: string;
  service: string;
  provider: {
    name: string;
    contact?: string;
    avatar?: string;
  };
  customer: {
    name: string;
    contact?: string;
    avatar?: string;
  };
  createdAt: string;
  status: TrustTagStatus;
  agreement: Agreement;
  evidence?: Evidence;
  verification?: Verification;
  timeline: TimelineEvent[];
}

export interface UserProfile {
  name: string;
  email: string;
  role: string;
  avatar: string;
  company?: string;
  verifiedCount: number;
  totalCount: number;
  apiKey: string;
  aiSensitivity: number; // 50 - 99%
  emailAlerts: boolean;
  mismatchWebhooks: boolean;
}
