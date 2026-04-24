/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Phone, MapPin, Calendar, Tag, ChevronRight, Edit3, Save, Trash2 } from 'lucide-react';
import { Candidate } from '../types';
import StatusBadge from './StatusBadge';

interface CandidateDetailDrawerProps {
  candidate: Candidate | null;
  onClose: () => void;
  onUpdate: (candidate: Candidate) => void;
  onDelete: (id: string) => void;
}

export default function CandidateDetailDrawer({ candidate, onClose, onUpdate, onDelete }: CandidateDetailDrawerProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Candidate | null>(null);

  useEffect(() => {
    if (candidate) {
      setFormData(candidate);
      // Automatically enter edit mode for brand new candidates
      if (candidate.id.startsWith('new-')) {
        setIsEditing(true);
      } else {
        setIsEditing(false);
      }
    }
  }, [candidate]);

  if (!candidate || !formData) return null;

  const handleSave = () => {
    onUpdate(formData);
    setIsEditing(false);
  };

  const handleChange = (field: keyof Candidate, value: any) => {
    setFormData(prev => prev ? { ...prev, [field]: value } : null);
  };

  const statuses = ['Screening', 'Interviewing', 'Technical Test', 'Offered', 'Hired', 'Rejected'];

  return (
    <AnimatePresence>
      {candidate && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-screen w-full max-w-sm bg-white shadow-2xl z-50 flex flex-col border-l border-slate-200"
            id="candidate-detail-drawer"
          >
            <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
              {isEditing ? (
                <button 
                  onClick={handleSave}
                  className="p-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-full transition-all shadow-md"
                  title="Save Changes"
                  id="save-candidate-btn"
                >
                  <Save className="w-4 h-4" />
                </button>
              ) : (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="p-2 bg-slate-100 text-slate-600 hover:bg-slate-200 rounded-full transition-all"
                  title="Edit Candidate"
                  id="edit-candidate-btn"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              )}
              <button 
                onClick={onClose}
                className="p-2 bg-slate-100 text-slate-400 hover:text-slate-600 rounded-full transition-all"
                id="close-drawer-btn"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
              <div className="mb-6 pt-4">
                <div className="h-16 w-16 bg-slate-50 rounded-full mb-4 border-2 border-indigo-50 flex items-center justify-center text-indigo-600 text-2xl font-bold shadow-inner uppercase">
                  {formData.name ? formData.name.split(' ').map(n => n[0]).join('') : '?'}
                </div>
                
                {isEditing ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      placeholder="Full Name"
                      className="w-full text-xl font-bold text-slate-900 bg-slate-50 border border-slate-200 rounded px-2 py-1 outline-none focus:border-indigo-500"
                    />
                    <input
                      type="text"
                      value={formData.current_location}
                      onChange={(e) => handleChange('current_location', e.target.value)}
                      placeholder="Location"
                      className="w-full text-sm text-slate-500 font-medium bg-slate-50 border border-slate-200 rounded px-2 py-1 outline-none"
                    />
                  </div>
                ) : (
                  <>
                    <h2 className="text-xl font-bold text-slate-900">{formData.name}</h2>
                    <p className="text-sm text-slate-500 font-medium">{formData.current_location}</p>
                  </>
                )}
                
                <div className="mt-3">
                  {isEditing ? (
                    <select
                      value={formData.current_status}
                      onChange={(e) => handleChange('current_status', e.target.value)}
                      className="text-[10px] font-bold uppercase tracking-wider bg-slate-50 border border-slate-200 rounded px-2 py-1"
                    >
                      {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  ) : (
                    <StatusBadge status={formData.current_status as any} />
                  )}
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 italic">Role & Experience</h3>
                  {isEditing ? (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={formData.primary_role}
                        onChange={(e) => handleChange('primary_role', e.target.value)}
                        placeholder="Role"
                        className="flex-1 text-sm bg-slate-50 border border-slate-200 rounded px-2 py-1"
                      />
                      <input
                        type="number"
                        value={formData.years_of_experience}
                        onChange={(e) => handleChange('years_of_experience', parseInt(e.target.value))}
                        placeholder="Yrs"
                        className="w-16 text-sm bg-slate-50 border border-slate-200 rounded px-2 py-1"
                      />
                    </div>
                  ) : (
                    <p className="text-sm text-slate-800 font-medium">{formData.primary_role} • {formData.years_of_experience}y Experience</p>
                  )}
                </div>

                <div>
                  <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Professional Note</h3>
                  {isEditing ? (
                    <textarea
                      value={formData.notes}
                      onChange={(e) => handleChange('notes', e.target.value)}
                      className="w-full h-24 text-xs italic text-slate-600 bg-slate-50 border border-slate-200 rounded-lg p-3 outline-none focus:border-indigo-500"
                      placeholder="Add recruiter notes..."
                    />
                  ) : (
                    <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                      <p className="text-xs italic text-slate-600 leading-relaxed font-medium">"{formData.notes || 'No notes available.'}"</p>
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Skills Inventory</h3>
                  {isEditing ? (
                    <input
                      type="text"
                      placeholder="Comma separated skills..."
                      value={formData.skills.join(', ')}
                      onChange={(e) => handleChange('skills', e.target.value.split(',').map((s: string) => s.trim()).filter((s: string) => s))}
                      className="w-full text-xs bg-slate-50 border border-slate-200 rounded px-2 py-1"
                    />
                  ) : (
                    <div className="flex flex-wrap gap-1.5">
                      {formData.skills.map((skill, idx) => (
                        <span 
                          key={idx}
                          className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase rounded border border-indigo-100"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-6 border-t border-slate-100 space-y-3">
                  <div className="flex items-center gap-3 text-xs">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    {isEditing ? (
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        placeholder="Email"
                        className="flex-1 bg-slate-50 border border-slate-200 rounded px-1"
                      />
                    ) : (
                      <span className="text-slate-600 font-medium">{formData.email}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        placeholder="Phone"
                        className="flex-1 bg-slate-50 border border-slate-200 rounded px-1"
                      />
                    ) : (
                      <span className="text-slate-600 font-medium">{formData.phone}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-slate-600 font-medium tracking-tight uppercase text-[10px]">
                      Applied {new Date(formData.applied_date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-6 border-t border-slate-100 bg-white">
              <div className="grid grid-cols-1 gap-2">
                {!isEditing && (
                  <button className="w-full py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all uppercase tracking-wider flex items-center justify-center gap-2">
                    Move Pipeline <ChevronRight className="w-3 h-3" />
                  </button>
                )}
                <button 
                  onClick={() => onDelete(formData.id)}
                  className="w-full py-2.5 bg-white border border-slate-200 text-slate-400 rounded-lg text-xs font-bold hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-all uppercase tracking-wider flex items-center justify-center gap-2"
                  id="delete-candidate-btn"
                >
                  <Trash2 className="w-3 h-3" />
                  Archive / Delete
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
