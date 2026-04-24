/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import CandidateTable from './components/CandidateTable';
import CandidateDetailDrawer from './components/CandidateDetailDrawer';
import { Candidate, FilterState } from './types';
import mockData from './data/mockCandidates.json';
import { Search, Plus } from 'lucide-react';

export default function App() {
  const [candidates, setCandidates] = useState<Candidate[]>(mockData as Candidate[]);
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    status: [],
    minExperience: 0,
    skills: [],
  });

  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);

  const selectedCandidate = useMemo(() => 
    candidates.find(c => c.id === selectedCandidateId) || null
  , [candidates, selectedCandidateId]);

  // Extract all unique skills for filter list
  const allSkills = useMemo(() => {
    const skills = new Set<string>();
    candidates.forEach(c => c.skills.forEach(s => skills.add(s)));
    return Array.from(skills).sort();
  }, [candidates]);

  // Filter Logic
  const filteredCandidates = useMemo(() => {
    return candidates.filter(c => {
      const matchesSearch = c.name.toLowerCase().includes(filters.search.toLowerCase()) || 
                           c.email.toLowerCase().includes(filters.search.toLowerCase()) ||
                           c.primary_role.toLowerCase().includes(filters.search.toLowerCase());
      
      const matchesStatus = filters.status.length === 0 || 
                           filters.status.includes(c.current_status);
      
      const matchesExp = c.years_of_experience >= filters.minExperience;
      
      const matchesSkills = filters.skills.length === 0 || 
                           filters.skills.some(skill => c.skills.includes(skill));

      return matchesSearch && matchesStatus && matchesExp && matchesSkills;
    });
  }, [candidates, filters]);

  const handleUpdateCandidate = (updated: Candidate) => {
    setCandidates(prev => prev.map(c => c.id === updated.id ? updated : c));
  };

  const handleDeleteCandidate = (id: string) => {
    setCandidates(prev => prev.filter(c => c.id !== id));
    setSelectedCandidateId(null);
  };

  const handleAddCandidate = () => {
    const newId = `new-${Math.random().toString(36).substr(2, 9)}`;
    const newCandidate: Candidate = {
      id: newId,
      name: 'New Candidate',
      email: '',
      phone: '',
      years_of_experience: 0,
      current_location: '',
      primary_role: 'QA Engineer',
      skills: [],
      current_status: 'Screening',
      source: 'Manual entry',
      notes: '',
      applied_date: new Date().toISOString()
    };
    setCandidates(prev => [newCandidate, ...prev]);
    setSelectedCandidateId(newId);
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <Sidebar 
        filters={filters} 
        setFilters={setFilters} 
        allSkills={allSkills} 
      />

      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Header / Search Bar */}
        <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0">
          <div className="flex-1 max-w-xl relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search candidates by name, email, or role..."
              value={filters.search}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-400"
              id="search-input"
            />
          </div>

          <div className="flex items-center gap-6">
            <button 
              onClick={() => setFilters({ search: '', status: [], minExperience: 0, skills: [] })}
              className="text-[11px] font-bold text-slate-500 hover:text-indigo-600 transition-colors uppercase tracking-widest"
              id="reset-btn"
            >
              Reset Filters
            </button>
            <button 
              onClick={handleAddCandidate}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-indigo-700 transition-all shadow-sm flex items-center gap-2"
              id="add-candidate-btn"
            >
              <Plus className="w-3 h-3" />
              Add Candidate
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
          <div className="h-full flex flex-col">
            <div className="mb-6">
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                Talent Pipeline
              </h1>
              <p className="text-xs text-slate-500 font-medium">Viewing {filteredCandidates.length} potential matches for current roles</p>
            </div>

            <CandidateTable 
              candidates={filteredCandidates} 
              onSelect={(c) => setSelectedCandidateId(c.id)} 
            />
          </div>
        </div>
      </main>

      <CandidateDetailDrawer 
        candidate={selectedCandidate} 
        onClose={() => setSelectedCandidateId(null)} 
        onUpdate={handleUpdateCandidate}
        onDelete={handleDeleteCandidate}
      />
    </div>
  );
}
