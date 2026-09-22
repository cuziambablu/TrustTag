import React from 'react';
import { TrustTagLogo } from '../branding/TrustTagLogo';
import { useTrustTagStore } from '../../store/trustTagStore';

export const Navbar: React.FC = () => {
  const { setPage } = useTrustTagStore();

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="w-full bg-[#FFFFFF] border-b border-[#DCDCD6] sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        {/* Left: Brand */}
        <div className="flex items-center gap-8">
          <TrustTagLogo
            size="md"
            onClick={() => setPage('landing')}
          />

          <div className="hidden md:flex items-center gap-6 text-xs font-medium text-[#6B6B67]">
            <button
              onClick={() => handleScrollTo('product')}
              className="hover:text-[#171717] transition-colors cursor-pointer"
            >
              Product
            </button>
            <button
              onClick={() => handleScrollTo('how-it-works')}
              className="hover:text-[#171717] transition-colors cursor-pointer"
            >
              How it works
            </button>
            <button
              onClick={() => handleScrollTo('use-cases')}
              className="hover:text-[#171717] transition-colors cursor-pointer"
            >
              Use cases
            </button>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setPage('login')}
            className="text-xs font-medium text-[#6B6B67] hover:text-[#171717] px-2.5 py-1.5 transition-colors cursor-pointer"
          >
            Sign in
          </button>
          <button
            onClick={() => setPage('create-tag')}
            className="py-1.5 px-3.5 rounded-[4px] bg-[#171717] hover:bg-[#2E2E2E] text-white font-mono text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer"
          >
            Create TrustTag
          </button>
        </div>
      </div>
    </nav>
  );
};
