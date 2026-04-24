/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  years_of_experience: number;
  current_location: string;
  primary_role: string;
  skills: string[];
  current_status: 'Screening' | 'Interviewing' | 'Technical Test' | 'Offered' | 'Hired' | 'Rejected';
  source: string;
  notes: string;
  applied_date: string;
}

export interface FilterState {
  search: string;
  status: string[];
  minExperience: number;
  skills: string[];
}
