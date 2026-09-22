import React, { useState } from 'react';
import { TrustTagLogo } from '../components/branding/TrustTagLogo';
import { useTrustTagStore } from '../store/trustTagStore';
import { authService } from '../services/authService';

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
    <div className="min-h-screen bg-[#F7F7F4] flex flex-col justify-center items-center p-4 sm:p-6 font-sans text-[#171717]">
      <div className="w-full max-w-md bg-[#FFFFFF] border border-[#DCDCD6] rounded-[6px] p-8 shadow-sm">
        {/* Brand */}
        <div className="mb-8 border-b border-[#DCDCD6] pb-4 flex items-center justify-between">
          <TrustTagLogo size="md" onClick={() => setPage('landing')} />
          <span className="text-[10px] font-mono text-[#6B6B67] uppercase">AUTH // V1</span>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-extrabold tracking-tight text-[#171717]">
            {isLogin ? 'Sign in to TrustTag' : 'Create an Account'}
          </h2>
          <p className="text-xs text-[#6B6B67] mt-1">
            {isLogin
              ? 'Access verified service case files and active contracts.'
              : 'Establish verifiable agreements for commercial services.'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
          {!isLogin && (
            <div>
              <label className="text-[10px] uppercase text-[#6B6B67] block mb-1">
                FULL NAME
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#F7F7F4] border border-[#DCDCD6] rounded-[3px] px-3 py-2 text-[#171717] focus:outline-none focus:border-[#171717]"
              />
            </div>
          )}

          <div>
            <label className="text-[10px] uppercase text-[#6B6B67] block mb-1">
              EMAIL ADDRESS
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#F7F7F4] border border-[#DCDCD6] rounded-[3px] px-3 py-2 text-[#171717] focus:outline-none focus:border-[#171717]"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[10px] uppercase text-[#6B6B67]">
                PASSWORD
              </label>
              {isLogin && (
                <span className="text-[10px] text-[#1D4ED8] hover:underline cursor-pointer">
                  Forgot?
                </span>
              )}
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#F7F7F4] border border-[#DCDCD6] rounded-[3px] px-3 py-2 text-[#171717] focus:outline-none focus:border-[#171717]"
            />
          </div>

          {!isLogin && (
            <div>
              <label className="text-[10px] uppercase text-[#6B6B67] block mb-1">
                CONFIRM PASSWORD
              </label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-[#F7F7F4] border border-[#DCDCD6] rounded-[3px] px-3 py-2 text-[#171717] focus:outline-none focus:border-[#171717]"
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
                className="rounded-[2px] accent-[#171717]"
              />
              <label htmlFor="remember" className="text-[11px] text-[#6B6B67] cursor-pointer">
                Remember device for 30 days
              </label>
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 rounded-[4px] bg-[#171717] hover:bg-[#2E2E2E] text-white font-mono text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
            >
              {isLoading ? 'Processing...' : isLogin ? 'Sign In →' : 'Create Account →'}
            </button>
          </div>
        </form>

        <div className="relative flex items-center justify-center my-6">
          <div className="border-t border-[#DCDCD6] w-full" />
          <span className="bg-[#FFFFFF] px-2 text-[10px] font-mono text-[#8F8F89] uppercase">
            OR
          </span>
        </div>

        <button
          type="button"
          onClick={handleGoogle}
          className="w-full py-2 px-3 rounded-[4px] bg-[#F7F7F4] hover:bg-[#EBEBE6] border border-[#DCDCD6] text-[#171717] font-mono text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
        >
          Continue with Google
        </button>

        <div className="mt-6 text-center text-xs font-mono text-[#6B6B67]">
          {isLogin ? (
            <span>
              New organization?{' '}
              <button
                onClick={() => setIsLogin(false)}
                className="text-[#1D4ED8] hover:underline font-semibold cursor-pointer"
              >
                Sign up
              </button>
            </span>
          ) : (
            <span>
              Existing account?{' '}
              <button
                onClick={() => setIsLogin(true)}
                className="text-[#1D4ED8] hover:underline font-semibold cursor-pointer"
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
