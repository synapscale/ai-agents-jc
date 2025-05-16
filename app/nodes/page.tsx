import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function NodesPage() {
  return (
    <div className="flex-1 bg-white p-4 flex flex-col">
      <div className="flex justify-end mb-4">
        <div className="flex items-center space-x-2 bg-white rounded-md border px-2 py-1">
          {/* ...botões de ação e tema... */}
          <button className="flex items-center space-x-1 px-2 py-1 hover:bg-gray-100 rounded text-sm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 3V5M12 19V21M5 12H3M21 12H19M18.364 5.63604L16.95 7.04999M7.05 16.95L5.636 18.364M16.95 16.95L18.364 18.364M7.05 7.04999L5.636 5.63604" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Tema: Padrão</span>
          </button>
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-2">Canvas Vazio</h2>
        <p className="text-gray-500">Arraste e solte nodes da sidebar para começar a construir seu fluxo.</p>
      </div>
    </div>
  );
}
