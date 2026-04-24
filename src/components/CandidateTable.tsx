/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Candidate } from '../types';
import StatusBadge from './StatusBadge';
import { MapPin, Briefcase, ChevronRight, Mail, Phone } from 'lucide-react';

interface CandidateTableProps {
  candidates: Candidate[];
  onSelect: (candidate: Candidate) => void;
}

export default function CandidateTable({ candidates, onSelect }: CandidateTableProps) {
  if (candidates.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-20 text-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200" id="empty-state">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <Briefcase className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900">No candidates found</h3>
        <p className="text-gray-500 mt-2 max-w-sm">Try adjusting your filters or search criteria to find who you're looking for.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full" id="candidate-table-container">
      <table className="w-full text-left text-sm border-collapse" id="candidate-table">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200">
            <th className="px-4 py-3 font-semibold text-slate-500 text-[11px] uppercase tracking-wider w-12 text-center">ID</th>
            <th className="px-4 py-3 font-semibold text-slate-500 text-[11px] uppercase tracking-wider font-bold">Candidate</th>
            <th className="px-4 py-3 font-semibold text-slate-500 text-[11px] uppercase tracking-wider">Primary Role</th>
            <th className="px-4 py-3 font-semibold text-slate-500 text-[11px] uppercase tracking-wider text-center">Exp</th>
            <th className="px-4 py-3 font-semibold text-slate-500 text-[11px] uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {candidates.map((candidate) => (
            <tr 
              key={candidate.id}
              onClick={() => onSelect(candidate)}
              className="hover:bg-slate-50 transition-all cursor-pointer group"
              id={`candidate-row-${candidate.id}`}
            >
              <td className="px-4 py-4 font-mono text-[10px] text-slate-400 text-center">
                #{candidate.id.slice(0, 4)}
              </td>
              <td className="px-4 py-4">
                <div className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">{candidate.name}</div>
                <div className="text-xs text-slate-500">{candidate.email}</div>
              </td>
              <td className="px-4 py-4 text-slate-600">
                {candidate.primary_role}
              </td>
              <td className="px-4 py-4 text-center font-medium text-slate-700">
                {candidate.years_of_experience}y
              </td>
              <td className="px-4 py-4">
                <StatusBadge status={candidate.current_status as any} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Table Footer Mock */}
      <div className="mt-auto border-t border-slate-200 px-4 py-3 flex items-center justify-between bg-slate-50">
        <p className="text-[11px] text-slate-500">Showing <span className="font-semibold text-slate-900">{candidates.length}</span> candidates</p>
        <div className="flex gap-2">
          <button className="px-3 py-1 bg-white border border-slate-200 rounded text-[11px] font-semibold text-slate-600 disabled:opacity-50">Previous</button>
          <button className="px-3 py-1 bg-white border border-slate-200 rounded text-[11px] font-semibold text-slate-600">Next</button>
        </div>
      </div>
    </div>
  );
}
