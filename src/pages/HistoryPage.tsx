import React, { useState } from 'react';
import { useTrustTagStore } from '../store/trustTagStore';
import { StatusBadge } from '../components/common/StatusBadge';

export const HistoryPage: React.FC = () => {
  const { tags, setPage, selectTag } = useTrustTagStore();
  const [filter, setFilter] = useState<'all' | 'verified' | 'mismatch' | 'pending'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<'id' | 'date' | 'confidence'>('date');
  const [sortAsc, setSortAsc] = useState(false);

  const filteredTags = tags
    .filter((tag) => {
      const matchesFilter =
        filter === 'all'
          ? true
          : filter === 'verified'
          ? tag.status === 'verified'
          : filter === 'mismatch'
          ? tag.status === 'mismatch'
          : tag.status === 'pending' || tag.status === 'active';

      const matchesSearch =
        tag.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tag.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tag.provider.name.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesFilter && matchesSearch;
    })
    .sort((a, b) => {
      if (sortField === 'id') {
        return sortAsc ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id);
      }
      if (sortField === 'confidence') {
        const confA = a.verification?.confidence || a.agreement.confidenceScore;
        const confB = b.verification?.confidence || b.agreement.confidenceScore;
        return sortAsc ? confA - confB : confB - confA;
      }
      return sortAsc ? a.createdAt.localeCompare(b.createdAt) : b.createdAt.localeCompare(a.createdAt);
    });

  const handleRowClick = (id: string) => {
    selectTag(id);
    const tag = tags.find((t) => t.id === id);
    if (tag?.status === 'mismatch' || tag?.status === 'verified') {
      setPage('verification-result');
    } else {
      setPage('tag-details');
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16 font-sans">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#DCDCD6] pb-4">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#6B6B67] block font-semibold">
            VERIFICATION LEDGER
          </span>
          <h1 className="text-2xl font-extrabold tracking-tight text-[#171717] mt-0.5">
            Audit history & cases.
          </h1>
        </div>

        <button
          onClick={() => setPage('create-tag')}
          className="py-1.5 px-3 rounded-[3px] bg-[#171717] hover:bg-[#2E2E2E] text-white font-mono text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer self-start sm:self-auto"
        >
          + New TrustTag
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
        {/* Search */}
        <div className="w-full sm:w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search TrustTags (ID, service, vendor)..."
            className="w-full bg-[#FFFFFF] border border-[#DCDCD6] rounded-[3px] px-3 py-1.5 text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1 border border-[#DCDCD6] rounded-[3px] p-0.5 bg-[#FFFFFF] self-stretch sm:self-auto">
          {(['all', 'verified', 'mismatch', 'pending'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setFilter(mode)}
              className={`px-3 py-1 rounded-[2px] uppercase font-semibold text-[11px] transition-colors cursor-pointer ${
                filter === mode
                  ? 'bg-[#171717] text-white'
                  : 'text-[#6B6B67] hover:text-[#171717]'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Data Table */}
      <div className="border border-[#DCDCD6] rounded-[4px] bg-[#FFFFFF] overflow-hidden">
        <table className="w-full text-left text-xs font-mono">
          <thead>
            <tr className="bg-[#F7F7F4] border-b border-[#DCDCD6] text-[#6B6B67] text-[10px] uppercase">
              <th
                onClick={() => {
                  setSortField('id');
                  setSortAsc(!sortAsc);
                }}
                className="py-2.5 px-4 font-semibold cursor-pointer hover:text-[#171717]"
              >
                TrustTag {sortField === 'id' ? (sortAsc ? '▲' : '▼') : ''}
              </th>
              <th className="py-2.5 px-4 font-semibold">Service</th>
              <th className="py-2.5 px-4 font-semibold">Counterparty</th>
              <th
                onClick={() => {
                  setSortField('date');
                  setSortAsc(!sortAsc);
                }}
                className="py-2.5 px-4 font-semibold cursor-pointer hover:text-[#171717]"
              >
                Date {sortField === 'date' ? (sortAsc ? '▲' : '▼') : ''}
              </th>
              <th className="py-2.5 px-4 font-semibold">Result</th>
              <th
                onClick={() => {
                  setSortField('confidence');
                  setSortAsc(!sortAsc);
                }}
                className="py-2.5 px-4 font-semibold text-right cursor-pointer hover:text-[#171717]"
              >
                Confidence {sortField === 'confidence' ? (sortAsc ? '▲' : '▼') : ''}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EBEBE6]">
            {filteredTags.length > 0 ? (
              filteredTags.map((tag) => (
                <tr
                  key={tag.id}
                  onClick={() => handleRowClick(tag.id)}
                  className="hover:bg-[#F7F7F4] transition-colors cursor-pointer"
                >
                  <td className="py-3 px-4 font-bold text-[#171717]">
                    {tag.id}
                  </td>
                  <td className="py-3 px-4 font-sans font-medium text-[#171717]">
                    {tag.service}
                  </td>
                  <td className="py-3 px-4 text-[#6B6B67]">
                    {tag.provider.name}
                  </td>
                  <td className="py-3 px-4 text-[#6B6B67]">
                    {tag.createdAt}
                  </td>
                  <td className="py-3 px-4">
                    <StatusBadge status={tag.status} size="sm" />
                  </td>
                  <td className="py-3 px-4 text-right font-bold text-[#171717]">
                    {tag.verification ? `${tag.verification.confidence}%` : `${tag.agreement.confidenceScore}%`}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-16 text-center font-mono">
                  <span className="text-xs font-bold text-[#171717] uppercase block mb-1">
                    NO TRUSTTAGS FOUND
                  </span>
                  <p className="text-xs text-[#6B6B67] mb-4">
                    No agreements match the selected search or filter criteria.
                  </p>
                  <button
                    onClick={() => setPage('create-tag')}
                    className="py-1.5 px-3 rounded-[3px] bg-[#171717] text-white text-xs uppercase cursor-pointer"
                  >
                    Create TrustTag
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
