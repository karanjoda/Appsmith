/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { FilterState } from '../types';
import { Sliders, CheckCircle, Brain, Target, UserCheck, XCircle, Search } from 'lucide-react';

interface SidebarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  allSkills: string[];
}

export default function Sidebar({ filters, setFilters, allSkills }: SidebarProps) {
  const statuses: { label: string; icon: React.ReactNode }[] = [
    { label: 'Screening', icon: <Search className="w-3.5 h-3.5" /> },
    { label: 'Interviewing', icon: <Brain className="w-3.5 h-3.5" /> },
    { label: 'Technical Test', icon: <Target className="w-3.5 h-3.5" /> },
    { label: 'Offered', icon: <CheckCircle className="w-3.5 h-3.5" /> },
    { label: 'Hired', icon: <UserCheck className="w-3.5 h-3.5" /> },
    { label: 'Rejected', icon: <XCircle className="w-3.5 h-3.5" /> },
  ];

  const handleStatusToggle = (status: string) => {
    setFilters(prev => ({
      ...prev,
      status: prev.status.includes(status)
        ? prev.status.filter(s => s !== status)
        : [...prev.status, status]
    }));
  };

  const handleSkillToggle = (skill: string) => {
    setFilters(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  return (
    <div id="sidebar" className="w-64 border-r border-slate-200 bg-white h-screen flex flex-col p-6 gap-8 overflow-y-auto">
      <div>
        <div className="flex items-center gap-2 mb-6">
          <div className="h-6 w-6 bg-indigo-600 rounded flex items-center justify-center text-white text-[10px] font-bold">HF</div>
          <h1 className="text-xs font-bold tracking-tight uppercase text-slate-500">HireFlow CRM</h1>
        </div>
        
        {/* Status Filter */}
        <div className="mb-8">
          <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-4">Current Status</label>
          <div className="space-y-2">
            {statuses.map(s => (
              <button
                key={s.label}
                onClick={() => handleStatusToggle(s.label)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${
                  filters.status.includes(s.label)
                    ? 'bg-indigo-50 text-indigo-700 font-semibold'
                    : 'text-slate-500 hover:bg-slate-50'
                }`}
                id={`status-filter-${s.label.toLowerCase().replace(' ', '-')}`}
              >
                {s.icon}
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Experience Filter */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">Min Experience</label>
            <span className="text-xs font-mono text-indigo-600 font-bold">{filters.minExperience}+ Years</span>
          </div>
          <input
            type="range"
            min="0"
            max="15"
            step="1"
            value={filters.minExperience}
            onChange={(e) => setFilters(prev => ({ ...prev, minExperience: parseInt(e.target.value) }))}
            className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            id="experience-slider"
          />
        </div>

        {/* Skills Filter */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-3">Skills</label>
          <div className="flex flex-wrap gap-2">
            {allSkills.slice(0, 15).map(skill => (
              <button
                key={skill}
                onClick={() => handleSkillToggle(skill)}
                className={`px-2 py-1 rounded text-[10px] font-bold uppercase transition-all border ${
                  filters.skills.includes(skill)
                    ? 'bg-indigo-50 text-indigo-700 border-indigo-100'
                    : 'bg-slate-100 text-slate-600 border-slate-200 hover:border-slate-300'
                }`}
                id={`skill-filter-${skill.toLowerCase()}`}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={() => setFilters({ search: '', status: [], minExperience: 0, skills: [] })}
        className="mt-auto text-[11px] font-semibold text-slate-400 hover:text-indigo-600 transition-colors uppercase tracking-wider text-left"
        id="reset-filters"
      >
        Reset Filters
      </button>
    </div>
  );
}
