import React, { useState } from 'react';
import { useTrustTagStore } from './store/trustTagStore';
import { DemoBanner } from './components/layout/DemoBanner';
import { Sidebar } from './components/layout/Sidebar';
import { AppHeader } from './components/layout/AppHeader';

import { LandingPage } from './pages/LandingPage';
import { AuthPage } from './pages/AuthPage';
import { DashboardPage } from './pages/DashboardPage';
import { CreateTagPage } from './pages/CreateTagPage';
import { AgreementReviewPage } from './pages/AgreementReviewPage';
import { EvidenceUploadPage } from './pages/EvidenceUploadPage';
import { VerificationProcessingPage } from './pages/VerificationProcessingPage';
import { VerificationResultPage } from './pages/VerificationResultPage';
import { TagDetailsPage } from './pages/TagDetailsPage';
import { HistoryPage } from './pages/HistoryPage';
import { ActivityPage } from './pages/ActivityPage';
import { SettingsPage } from './pages/SettingsPage';
import { ToastContainer } from './components/common/ToastContainer';

export function App() {
  const { activePage } = useTrustTagStore();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Standalone public pages
  if (activePage === 'landing') {
    return (
      <div className="min-h-screen bg-[#F7F7F4] text-[#171717] flex flex-col font-sans">
        <DemoBanner />
        <LandingPage />
        <ToastContainer />
      </div>
    );
  }

  if (activePage === 'login') {
    return (
      <div className="min-h-screen bg-[#F7F7F4] text-[#171717] flex flex-col font-sans">
        <DemoBanner />
        <AuthPage initialMode="login" />
        <ToastContainer />
      </div>
    );
  }

  if (activePage === 'signup') {
    return (
      <div className="min-h-screen bg-[#F7F7F4] text-[#171717] flex flex-col font-sans">
        <DemoBanner />
        <AuthPage initialMode="signup" />
        <ToastContainer />
      </div>
    );
  }

  // Dashboard / Authenticated Application Shell
  return (
    <div className="min-h-screen bg-[#F7F7F4] text-[#171717] flex flex-col font-sans">
      {/* Persistent Judge Demo Bar */}
      <DemoBanner />

      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block shrink-0">
          <Sidebar />
        </div>

        {/* Mobile Sidebar Overlay */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <div className="relative z-10 w-72 h-full bg-[#FFFFFF] shadow-2xl">
              <Sidebar onMobileClose={() => setMobileSidebarOpen(false)} />
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          <AppHeader onToggleMobileSidebar={() => setMobileSidebarOpen(true)} />

          <main className="flex-1 px-4 sm:px-8 py-6 sm:py-8 max-w-7xl mx-auto w-full">
            {activePage === 'dashboard' && <DashboardPage />}
            {activePage === 'create-tag' && <CreateTagPage />}
            {activePage === 'agreement-review' && <AgreementReviewPage />}
            {activePage === 'evidence-upload' && <EvidenceUploadPage />}
            {activePage === 'verification-processing' && <VerificationProcessingPage />}
            {activePage === 'verification-result' && <VerificationResultPage />}
            {activePage === 'tag-details' && <TagDetailsPage />}
            {activePage === 'history' && <HistoryPage />}
            {activePage === 'activity' && <ActivityPage />}
            {activePage === 'settings' && <SettingsPage />}
          </main>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default App;
