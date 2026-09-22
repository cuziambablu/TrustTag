import React, { useState, useEffect } from 'react';
import { TrustTagLogo } from '../branding/TrustTagLogo';
import { useTrustTagStore } from '../../store/trustTagStore';
import { Menu, X, ArrowRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { setPage } = useTrustTagStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`w-full sticky top-0 z-40 transition-all duration-200 ${
        scrolled
          ? 'bg-[#F7F8FA]/90 backdrop-blur-md border-b border-[#E4E7EC] shadow-[0_1px_3px_rgba(16,24,40,0.05)]'
          : 'bg-[#F7F8FA] border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Brand + Desktop Links */}
        <div className="flex items-center gap-8">
          <TrustTagLogo
            size="md"
            onClick={() => setPage('landing')}
          />

          <div className="hidden md:flex items-center gap-6 text-[13px] font-medium text-[#667085]">
            <button
              onClick={() => handleScrollTo('product')}
              className="hover:text-[#111318] transition-colors cursor-pointer py-1"
            >
              Product
            </button>
            <button
              onClick={() => handleScrollTo('how-it-works')}
              className="hover:text-[#111318] transition-colors cursor-pointer py-1"
            >
              How it works
            </button>
            <button
              onClick={() => handleScrollTo('solutions')}
              className="hover:text-[#111318] transition-colors cursor-pointer py-1"
            >
              Solutions
            </button>
            <button
              onClick={() => handleScrollTo('demo')}
              className="hover:text-[#111318] transition-colors cursor-pointer py-1 flex items-center gap-1.5"
            >
              <span>Demo</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#15803D] inline-block animate-pulse" />
            </button>
          </div>
        </div>

        {/* Right: Actions Desktop */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => setPage('login')}
            className="text-[13px] font-medium text-[#667085] hover:text-[#111318] px-3 py-2 transition-colors cursor-pointer"
          >
            Sign in
          </button>
          <button
            onClick={() => setPage('create-tag')}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[6px] bg-[#174EA6] hover:bg-[#133E85] text-white text-[13px] font-medium shadow-sm hover:shadow transition-all cursor-pointer"
          >
            <span>Get Started</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setPage('create-tag')}
            className="px-3 py-1.5 rounded-[5px] bg-[#174EA6] text-white text-xs font-medium"
          >
            Get Started
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-[6px] text-[#667085] hover:text-[#111318] hover:bg-[#E4E7EC]/50 transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#E4E7EC] bg-[#FFFFFF] px-4 pt-3 pb-6 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-2">
            <button
              onClick={() => handleScrollTo('product')}
              className="text-left text-sm font-medium text-[#111318] py-2.5 px-3 rounded-[6px] hover:bg-[#F7F8FA]"
            >
              Product
            </button>
            <button
              onClick={() => handleScrollTo('how-it-works')}
              className="text-left text-sm font-medium text-[#111318] py-2.5 px-3 rounded-[6px] hover:bg-[#F7F8FA]"
            >
              How it works
            </button>
            <button
              onClick={() => handleScrollTo('solutions')}
              className="text-left text-sm font-medium text-[#111318] py-2.5 px-3 rounded-[6px] hover:bg-[#F7F8FA]"
            >
              Solutions
            </button>
            <button
              onClick={() => handleScrollTo('demo')}
              className="text-left text-sm font-medium text-[#111318] py-2.5 px-3 rounded-[6px] hover:bg-[#F7F8FA] flex items-center justify-between"
            >
              <span>Interactive Demo</span>
              <span className="text-[11px] font-mono text-[#15803D] bg-[#F0FDF4] px-1.5 py-0.5 rounded border border-[#BBF7D0]">LIVE</span>
            </button>
            
            <div className="border-t border-[#E4E7EC] pt-3 mt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setPage('login');
                }}
                className="w-full text-center text-sm font-medium text-[#667085] py-2.5 border border-[#E4E7EC] rounded-[6px] bg-[#FFFFFF] hover:bg-[#F7F8FA]"
              >
                Sign in
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setPage('create-tag');
                }}
                className="w-full text-center text-sm font-medium text-white py-2.5 rounded-[6px] bg-[#174EA6] hover:bg-[#133E85] shadow-sm"
              >
                Create an Agreement
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
