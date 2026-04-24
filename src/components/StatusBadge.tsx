/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

const statusStyles = {
  Screening: 'bg-blue-100 text-blue-800',
  Interviewing: 'bg-purple-100 text-purple-800',
  'Technical Test': 'bg-amber-100 text-amber-800',
  Offered: 'bg-emerald-100 text-emerald-800',
  Hired: 'bg-green-100 text-green-800',
  Rejected: 'bg-slate-200 text-slate-600',
};

export default function StatusBadge({ status }: { status: keyof typeof statusStyles }) {
  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${statusStyles[status]}`}>
      {status}
    </span>
  );
}
