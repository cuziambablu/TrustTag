import React, { useState } from 'react';
import { useTrustTagStore } from '../store/trustTagStore';
import { StatusBadge } from '../components/common/StatusBadge';
import { Search, Plus, Filter, ArrowUpDown } from 'lucide-react';

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
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E4E7EC] pb-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#174EA6] block font-semibold">
            VERIFICATION LEDGER
          </span>
          <h1 className="text-2xl font-extrabold tracking-tight text-[#111318] mt-1">
            Agreements & Case Files
          </h1>
          <p className="text-xs text-[#667085] mt-0.5">
            Audit history, active contracts, and verification outcomes.
          </p>
        </div>

        <button
          onClick={() => setPage('create-tag')}
          className="inline-flex items-center gap-1.5 py-2 px-3.5 rounded-[6px] bg-[#174EA6] hover:bg-[#133E85] text-white text-xs font-semibold shadow-xs transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>New Agreement</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        {/* Search */}
        <div className="w-full sm:w-80 relative">
          <Search className="w-4 h-4 text-[#98A2B3] absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by ID, task, provider..."
            className="w-full bg-[#FFFFFF] border border-[#E4E7EC] rounded-[6px] pl-9 pr-3 py-2 text-xs text-[#111318] focus:outline-none focus:border-[#174EA6]"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1 border border-[#E4E7EC] rounded-[6px] p-1 bg-[#FFFFFF] self-stretch sm:self-auto shadow-2xs">
          {(['all', 'verified', 'mismatch', 'pending'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setFilter(mode)}
              className={`px-3 py-1 rounded-[4px] uppercase font-mono font-medium text-[11px] transition-colors cursor-pointer ${
                filter === mode
                  ? 'bg-[#174EA6] text-white'
                  : 'text-[#667085] hover:text-[#111318]'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Data Table */}
      <div className="border border-[#E4E7EC] rounded-[8px] bg-[#FFFFFF] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#F7F8FA] border-b border-[#E4E7EC] text-[#667085] font-mono text-[11px] uppercase">
                <th
                  onClick={() => {
                    setSortField('id');
                    setSortAsc(!sortAsc);
                  }}
                  className="py-2.5 px-4 font-semibold cursor-pointer hover:text-[#111318]"
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
                  className="py-2.5 px-4 font-semibold cursor-pointer hover:text-[#111318]"
                >
                  Date {sortField === 'date' ? (sortAsc ? '▲' : '▼') : ''}
                </th>
                <th className="py-2.5 px-4 font-semibold">Result</th>
                <th
                  onClick={() => {
                    setSortField('confidence');
                    setSortAsc(!sortAsc);
                  }}
                  className="py-2.5 px-4 font-semibold text-right cursor-pointer hover:text-[#111318]"
                >
                  Confidence {sortField === 'confidence' ? (sortAsc ? '▲' : '▼') : ''}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E7EC]">
              {filteredTags.length > 0 ? (
                filteredTags.map((tag) => (
                  <tr
                    key={tag.id}
                    onClick={() => handleRowClick(tag.id)}
                    className="hover:bg-[#F7F8FA] transition-colors cursor-pointer group"
                  >
                    <td className="py-3 px-4 font-mono font-medium text-[#111318]">
                      {tag.id}
                    </td>
                    <td className="py-3 px-4 font-medium text-[#111318]">
                      {tag.service}
                    </td>
                    <td className="py-3 px-4 text-[#667085]">
                      {tag.provider.name}
                    </td>
                    <td className="py-3 px-4 text-[#667085] font-mono text-[11px]">
                      {tag.createdAt}
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge status={tag.status} size="sm" />
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-[#111318]">
                      {tag.verification ? `${tag.verification.confidence}%` : `${tag.agreement.confidenceScore}%`}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-16 text-center">
                    <span className="text-sm font-bold text-[#111318] block mb-1">
                      No agreements found
                    </span>
                    <p className="text-xs text-[#667085] mb-4">
                      No agreements match the selected search or filter criteria.
                    </p>
                    <button
                      onClick={() => setPage('create-tag')}
                      className="py-1.5 px-3 rounded-[6px] bg-[#174EA6] text-white text-xs font-semibold cursor-pointer"
                    >
                      Create Agreement
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
