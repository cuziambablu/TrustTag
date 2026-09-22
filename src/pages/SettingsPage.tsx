import React, { useState } from 'react';
import { authService } from '../services/authService';
import { Check, Copy, Sliders, Key, Bell, Shield } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const [user, setUser] = useState(authService.getUser());
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [company, setCompany] = useState(user.company || 'TrustTag Enterprise');
  const [sensitivity, setSensitivity] = useState(user.aiSensitivity || 88);
  const [emailAlerts, setEmailAlerts] = useState(user.emailAlerts);
  const [mismatchWebhooks, setMismatchWebhooks] = useState(user.mismatchWebhooks);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = authService.updateSettings({
      name,
      email,
      company,
      aiSensitivity: sensitivity,
      emailAlerts,
      mismatchWebhooks
    });
    setUser(updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleCopyKey = () => {
    navigator.clipboard.writeText(user.apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-16 font-sans">
      <div className="border-b border-[#E4E7EC] pb-4">
        <span className="text-xs font-mono uppercase tracking-widest text-[#174EA6] block font-semibold">
          SYSTEM CONFIGURATION
        </span>
        <h1 className="text-2xl font-extrabold tracking-tight text-[#111318] mt-1">
          Account & Calibration Settings
        </h1>
        <p className="text-xs text-[#667085] mt-0.5">
          Configure model tolerances, organization details, and API credentials.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6 text-xs">
        {/* Profile Card */}
        <div className="bg-[#FFFFFF] border border-[#E4E7EC] rounded-[8px] p-6 space-y-4 shadow-xs">
          <span className="text-xs uppercase tracking-wider text-[#111318] block font-bold font-mono border-b border-[#E4E7EC] pb-2">
            ORGANIZATION & USER
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] font-semibold text-[#111318] block mb-1">
                OPERATOR NAME
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#FFFFFF] border border-[#E4E7EC] rounded-[6px] px-3 py-2 text-[#111318] focus:outline-none focus:border-[#174EA6]"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-[#111318] block mb-1">
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#FFFFFF] border border-[#E4E7EC] rounded-[6px] px-3 py-2 text-[#111318] focus:outline-none focus:border-[#174EA6]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-[11px] font-semibold text-[#111318] block mb-1">
                COMMERCIAL ENTITY / COMPANY
              </label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full bg-[#FFFFFF] border border-[#E4E7EC] rounded-[6px] px-3 py-2 text-[#111318] focus:outline-none focus:border-[#174EA6]"
              />
            </div>
          </div>
        </div>

        {/* AI Calibration */}
        <div className="bg-[#FFFFFF] border border-[#E4E7EC] rounded-[8px] p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-[#E4E7EC] pb-2">
            <span className="text-xs uppercase tracking-wider text-[#111318] font-bold font-mono">
              AI VERIFICATION SENSITIVITY CALIBRATION
            </span>
            <span className="text-[#174EA6] font-bold font-mono text-xs">
              {sensitivity}% THRESHOLD
            </span>
          </div>

          <div className="space-y-3">
            <input
              type="range"
              min={60}
              max={98}
              value={sensitivity}
              onChange={(e) => setSensitivity(Number(e.target.value))}
              className="w-full accent-[#174EA6] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-[#667085] font-mono">
              <span>60% (Lenient tolerance)</span>
              <span>88% (Standard default)</span>
              <span>98% (Strict commercial precision)</span>
            </div>
          </div>
        </div>

        {/* API Credentials */}
        <div className="bg-[#FFFFFF] border border-[#E4E7EC] rounded-[8px] p-6 space-y-4 shadow-xs">
          <span className="text-xs uppercase tracking-wider text-[#111318] block font-bold font-mono border-b border-[#E4E7EC] pb-2">
            API ACCESS TOKEN
          </span>

          <div className="flex items-center gap-2 font-mono">
            <input
              type="text"
              readOnly
              value={user.apiKey}
              className="flex-1 bg-[#F7F8FA] border border-[#E4E7EC] rounded-[6px] px-3 py-2 text-[#111318] select-all text-xs"
            />
            <button
              type="button"
              onClick={handleCopyKey}
              className="inline-flex items-center gap-1.5 py-2 px-3 rounded-[6px] bg-[#FFFFFF] hover:bg-[#F2F4F7] border border-[#E4E7EC] text-[#111318] font-semibold text-xs cursor-pointer shadow-2xs"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#15803D]" /> : <Copy className="w-3.5 h-3.5 text-[#667085]" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Alert preferences */}
        <div className="bg-[#FFFFFF] border border-[#E4E7EC] rounded-[8px] p-6 space-y-4 shadow-xs">
          <span className="text-xs uppercase tracking-wider text-[#111318] block font-bold font-mono border-b border-[#E4E7EC] pb-2">
            AUDIT DISPATCH HOOKS
          </span>

          <div className="space-y-3">
            <label className="flex items-center justify-between p-3 border border-[#E4E7EC] rounded-[6px] bg-[#F7F8FA] cursor-pointer">
              <div>
                <span className="font-semibold text-[#111318] block text-xs">Immediate Discrepancy Alerts</span>
                <span className="text-[11px] text-[#667085]">Email operator when ΔE chromaticity or task parameter fails verification.</span>
              </div>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="rounded accent-[#174EA6] w-4 h-4 cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-3 border border-[#E4E7EC] rounded-[6px] bg-[#F7F8FA] cursor-pointer">
              <div>
                <span className="font-semibold text-[#111318] block text-xs">Webhook Event Streaming</span>
                <span className="text-[11px] text-[#667085]">Dispatch signed verification certificate payloads upon completion.</span>
              </div>
              <input
                type="checkbox"
                checked={mismatchWebhooks}
                onChange={(e) => setMismatchWebhooks(e.target.checked)}
                className="rounded accent-[#174EA6] w-4 h-4 cursor-pointer"
              />
            </label>
          </div>
        </div>

        {/* Save button */}
        <div className="flex items-center justify-between pt-2">
          {saved ? (
            <span className="text-[#15803D] font-semibold text-xs flex items-center gap-1.5">
              <Check className="w-4 h-4" />
              <span>Settings saved and persisted.</span>
            </span>
          ) : (
            <span className="text-[#98A2B3] text-xs">
              All calibration is saved locally.
            </span>
          )}

          <button
            type="submit"
            className="py-2.5 px-6 rounded-[6px] bg-[#174EA6] hover:bg-[#133E85] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            Save Configuration
          </button>
        </div>
      </form>
    </div>
  );
};
