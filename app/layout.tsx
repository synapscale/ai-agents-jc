import React from 'react';
import Sidebar from '@/components/sidebar';
import { UnifiedProviders } from "@/contexts/unified-context";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <UnifiedProviders>
      <div className="flex h-screen">
        <Sidebar />
        <main className="flex-1 overflow-hidden">
          {children}
        </main>
      </div>
    </UnifiedProviders>
  );
}
