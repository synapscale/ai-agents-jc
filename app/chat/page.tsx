import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChatInterface } from '@/components/chat-interativo/chat-interface';

export default function ChatPage() {
  return (
    <div className="h-full">
      <ChatInterface />
    </div>
  );
}
