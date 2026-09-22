import { UserProfile } from '../types/trustTag';

export class AuthService {
  private currentUser: UserProfile = {
    name: 'Irfan',
    email: 'irfan@trusttag.ai',
    role: 'Principal Verifier',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256',
    company: 'TrustTag Autonomous Systems',
    verifiedCount: 8,
    totalCount: 12,
    apiKey: 'tt_live_948f93e1a0b38c01',
    aiSensitivity: 88,
    emailAlerts: true,
    mismatchWebhooks: true
  };

  private isAuthenticated: boolean = true;

  public getUser(): UserProfile {
    return this.currentUser;
  }

  public isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  public async login(email: string, _pass: string): Promise<UserProfile> {
    await new Promise((r) => setTimeout(r, 600));
    this.isAuthenticated = true;
    this.currentUser.email = email;
    if (email.includes('@')) {
      const prefix = email.split('@')[0];
      this.currentUser.name = prefix.charAt(0).toUpperCase() + prefix.slice(1);
    }
    return this.currentUser;
  }

  public async signup(name: string, email: string): Promise<UserProfile> {
    await new Promise((r) => setTimeout(r, 600));
    this.isAuthenticated = true;
    this.currentUser.name = name;
    this.currentUser.email = email;
    return this.currentUser;
  }

  public logout(): void {
    this.isAuthenticated = false;
  }

  public updateSettings(settings: Partial<UserProfile>): UserProfile {
    this.currentUser = { ...this.currentUser, ...settings };
    return this.currentUser;
  }
}

export const authService = new AuthService();
