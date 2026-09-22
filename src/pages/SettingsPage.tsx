import React, { useState } from 'react';
import { authService } from '../services/authService';

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
      <div className="border-b border-[#DCDCD6] pb-4">
        <span className="text-[11px] font-mono uppercase tracking-widest text-[#6B6B67] block font-semibold">
          SYSTEM CONFIGURATION
        </span>
        <h1 className="text-2xl font-extrabold tracking-tight text-[#171717] mt-0.5">
          Account & Calibration Settings.
        </h1>
      </div>

      <form onSubmit={handleSave} className="space-y-6 font-mono text-xs">
        {/* Profile Card */}
        <div className="bg-[#FFFFFF] border border-[#DCDCD6] rounded-[6px] p-6 space-y-4">
          <span className="text-[11px] uppercase tracking-wider text-[#171717] block font-bold border-b border-[#DCDCD6] pb-2">
            ORGANIZATION & USER
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] uppercase text-[#6B6B67] block mb-1">
                OPERATOR NAME
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#F7F7F4] border border-[#DCDCD6] rounded-[3px] px-3 py-2 text-[#171717] focus:outline-none focus:border-[#171717]"
              />
            </div>

            <div>
              <label className="text-[10px] uppercase text-[#6B6B67] block mb-1">
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#F7F7F4] border border-[#DCDCD6] rounded-[3px] px-3 py-2 text-[#171717] focus:outline-none focus:border-[#171717]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-[10px] uppercase text-[#6B6B67] block mb-1">
                COMMERCIAL ENTITY / COMPANY
              </label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full bg-[#F7F7F4] border border-[#DCDCD6] rounded-[3px] px-3 py-2 text-[#171717] focus:outline-none focus:border-[#171717]"
              />
            </div>
          </div>
        </div>

        {/* AI Calibration */}
        <div className="bg-[#FFFFFF] border border-[#DCDCD6] rounded-[6px] p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#DCDCD6] pb-2">
            <span className="text-[11px] uppercase tracking-wider text-[#171717] font-bold">
              AI VERIFICATION SENSITIVITY CALIBRATION
            </span>
            <span className="text-[#1D4ED8] font-bold">
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
              className="w-full accent-[#171717] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#6B6B67]">
              <span>60% (Lenient tolerance)</span>
              <span>88% (Standard default)</span>
              <span>98% (Strict commercial precision)</span>
            </div>
          </div>
        </div>

        {/* API Credentials */}
        <div className="bg-[#FFFFFF] border border-[#DCDCD6] rounded-[6px] p-6 space-y-4">
          <span className="text-[11px] uppercase tracking-wider text-[#171717] block font-bold border-b border-[#DCDCD6] pb-2">
            API ACCESS TOKEN
          </span>

          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={user.apiKey}
              className="flex-1 bg-[#F7F7F4] border border-[#DCDCD6] rounded-[3px] px-3 py-2 text-[#171717] select-all"
            />
            <button
              type="button"
              onClick={handleCopyKey}
              className="py-2 px-3 rounded-[3px] bg-[#F7F7F4] hover:bg-[#EBEBE6] border border-[#DCDCD6] text-[#171717] font-semibold text-[11px] uppercase cursor-pointer"
            >
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>

        {/* Alert preferences */}
        <div className="bg-[#FFFFFF] border border-[#DCDCD6] rounded-[6px] p-6 space-y-4">
          <span className="text-[11px] uppercase tracking-wider text-[#171717] block font-bold border-b border-[#DCDCD6] pb-2">
            AUDIT DISPATCH HOOKS
          </span>

          <div className="space-y-3">
            <label className="flex items-center justify-between p-3 border border-[#DCDCD6] rounded-[3px] bg-[#F7F7F4] cursor-pointer">
              <div>
                <span className="font-bold text-[#171717] block">Immediate Discrepancy Alerts</span>
                <span className="text-[10px] text-[#6B6B67]">Email operator when ΔE chromaticity or task parameter fails verification.</span>
              </div>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="rounded-[2px] accent-[#171717]"
              />
            </label>

            <label className="flex items-center justify-between p-3 border border-[#DCDCD6] rounded-[3px] bg-[#F7F7F4] cursor-pointer">
              <div>
                <span className="font-bold text-[#171717] block">Webhook Event Streaming</span>
                <span className="text-[10px] text-[#6B6B67]">Dispatch signed verification certificate payloads upon completion.</span>
              </div>
              <input
                type="checkbox"
                checked={mismatchWebhooks}
                onChange={(e) => setMismatchWebhooks(e.target.checked)}
                className="rounded-[2px] accent-[#171717]"
              />
            </label>
          </div>
        </div>

        {/* Save button */}
        <div className="flex items-center justify-between pt-2">
          {saved ? (
            <span className="text-[#15803D] font-bold">
              ✓ Settings saved and persisted.
            </span>
          ) : (
            <span className="text-[#8F8F89]">
              All calibration is saved to local storage.
            </span>
          )}

          <button
            type="submit"
            className="py-2.5 px-6 rounded-[4px] bg-[#171717] hover:bg-[#2E2E2E] text-white font-mono text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
          >
            Save Configuration
          </button>
        </div>
      </form>
    </div>
  );
};
