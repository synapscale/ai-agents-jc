import React from 'react';
import { Sidebar } from '@/components/sidebar';
import { ChatInterface } from '@/components/chat-interativo/chat-interface';

export default function Layout({ children }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-hidden">
        {children}
      </main>
    </div>
  );
}
