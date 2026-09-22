import React, { useState } from 'react';
import { TrustTagLogo } from '../components/branding/TrustTagLogo';
import { useTrustTagStore } from '../store/trustTagStore';
import { authService } from '../services/authService';
import { ArrowRight, Lock } from 'lucide-react';

interface AuthPageProps {
  initialMode?: 'login' | 'signup';
}

export const AuthPage: React.FC<AuthPageProps> = ({ initialMode = 'login' }) => {
  const { setPage } = useTrustTagStore();
  const [isLogin, setIsLogin] = useState(initialMode === 'login');
  const [name, setName] = useState('Irfan');
  const [email, setEmail] = useState('irfan@trusttag.ai');
  const [password, setPassword] = useState('••••••••••••');
  const [confirmPassword, setConfirmPassword] = useState('••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (isLogin) {
      await authService.login(email, password);
    } else {
      await authService.signup(name, email);
    }

    setIsLoading(false);
    setPage('dashboard');
  };

  const handleGoogle = async () => {
    setIsLoading(true);
    await authService.login('irfan@trusttag.ai', 'google');
    setIsLoading(false);
    setPage('dashboard');
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA] flex flex-col justify-center items-center p-4 sm:p-6 font-sans text-[#111318]">
      <div className="w-full max-w-md bg-[#FFFFFF] border border-[#E4E7EC] rounded-[8px] p-8 shadow-sm">
        {/* Brand */}
        <div className="mb-6 border-b border-[#E4E7EC] pb-4 flex items-center justify-between">
          <TrustTagLogo size="md" onClick={() => setPage('landing')} />
          <span className="text-[10px] font-mono text-[#667085] uppercase">SYS // AUTH</span>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-extrabold tracking-tight text-[#111318]">
            {isLogin ? 'Sign in to TrustTag' : 'Create an Account'}
          </h2>
          <p className="text-xs text-[#667085] mt-1">
            {isLogin
              ? 'Access verified service case files and active contracts.'
              : 'Establish verifiable agreements for commercial and trade services.'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {!isLogin && (
            <div>
              <label className="text-[11px] font-semibold text-[#111318] block mb-1">
                FULL NAME
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#FFFFFF] border border-[#E4E7EC] rounded-[6px] px-3.5 py-2 text-[#111318] focus:outline-none focus:border-[#174EA6]"
              />
            </div>
          )}

          <div>
            <label className="text-[11px] font-semibold text-[#111318] block mb-1">
              EMAIL ADDRESS
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#FFFFFF] border border-[#E4E7EC] rounded-[6px] px-3.5 py-2 text-[#111318] focus:outline-none focus:border-[#174EA6]"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[11px] font-semibold text-[#111318]">
                PASSWORD
              </label>
              {isLogin && (
                <span className="text-[11px] text-[#174EA6] hover:underline cursor-pointer">
                  Forgot?
                </span>
              )}
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#FFFFFF] border border-[#E4E7EC] rounded-[6px] px-3.5 py-2 text-[#111318] focus:outline-none focus:border-[#174EA6]"
            />
          </div>

          {!isLogin && (
            <div>
              <label className="text-[11px] font-semibold text-[#111318] block mb-1">
                CONFIRM PASSWORD
              </label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-[#FFFFFF] border border-[#E4E7EC] rounded-[6px] px-3.5 py-2 text-[#111318] focus:outline-none focus:border-[#174EA6]"
              />
            </div>
          )}

          {isLogin && (
            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded accent-[#174EA6] w-4 h-4 cursor-pointer"
              />
              <label htmlFor="remember" className="text-[11px] text-[#667085] cursor-pointer">
                Remember this device
              </label>
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 rounded-[6px] bg-[#174EA6] hover:bg-[#133E85] text-white font-semibold text-xs transition-colors cursor-pointer shadow-xs flex items-center justify-center gap-1.5"
            >
              <span>{isLoading ? 'Processing...' : isLogin ? 'Sign In' : 'Create Account'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>

        <div className="relative flex items-center justify-center my-5">
          <div className="border-t border-[#E4E7EC] w-full" />
          <span className="bg-[#FFFFFF] px-2 text-[10px] font-mono text-[#98A2B3] uppercase">
            OR
          </span>
        </div>

        <button
          type="button"
          onClick={handleGoogle}
          className="w-full py-2 px-3 rounded-[6px] bg-[#FFFFFF] hover:bg-[#F2F4F7] border border-[#E4E7EC] text-[#111318] text-xs font-semibold transition-colors cursor-pointer shadow-2xs"
        >
          Continue with Google
        </button>

        <div className="mt-6 text-center text-xs text-[#667085]">
          {isLogin ? (
            <span>
              New organization?{' '}
              <button
                onClick={() => setIsLogin(false)}
                className="text-[#174EA6] hover:underline font-semibold cursor-pointer"
              >
                Sign up
              </button>
            </span>
          ) : (
            <span>
              Existing account?{' '}
              <button
                onClick={() => setIsLogin(true)}
                className="text-[#174EA6] hover:underline font-semibold cursor-pointer"
              >
                Sign in
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
