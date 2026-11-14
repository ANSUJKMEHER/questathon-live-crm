'use client';

import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { SourceModal } from '../shared/SourceModal';
import { EvidenceSource } from '@/lib/types/crm';

interface Props {
  children: React.ReactNode;
}

export const AppShell: React.FC<Props> = ({ children }) => {
  const [selectedSource, setSelectedSource] = useState<EvidenceSource | null>(null);

  return (
    <div className="flex min-h-screen bg-[#0b0f17] text-slate-100 font-sans antialiased selection:bg-indigo-500 selection:text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header onRefreshData={() => window.location.reload()} />
        <main className="flex-1 p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-8">
          {children}
        </main>
      </div>

      <SourceModal
        source={selectedSource}
        onClose={() => setSelectedSource(null)}
      />
    </div>
  );
};
