import React from 'react';
import { ChatInput } from './chat-input';
import { ChatMessage } from './chat-message';
import { ChatHeader } from './header/chat-header';
import { ModelSelector } from './model-selector';
import { PersonalitySelector } from './personality-selector';
import { ToolSelector } from './tool-selector';

interface ChatInterfaceProps {
  messages: any[];
  onSendMessage: (message: string, files?: File[]) => void;
  onSelectModel: (model: string) => void;
  onSelectPersonality: (personality: string) => void;
  onSelectTools: (tools: string[]) => void;
  isProcessing?: boolean;
  selectedModel?: string;
  selectedPersonality?: string;
  selectedTools?: string[];
}

export function ChatInterface({
  messages,
  onSendMessage,
  onSelectModel,
  onSelectPersonality,
  onSelectTools,
  isProcessing = false,
  selectedModel = 'gpt-4o',
  selectedPersonality = 'default',
  selectedTools = [],
}: ChatInterfaceProps) {
  return (
    <div className="flex flex-col h-full bg-background">
      <ChatHeader 
        title="Nova conversa" 
        onRename={() => {}} 
        onShare={() => {}} 
        onExport={() => {}} 
      />
      
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map((message, index) => (
          <ChatMessage 
            key={index} 
            message={message} 
            onCopy={() => {}} 
            onRegenerate={message.role === 'assistant' ? () => {} : undefined} 
          />
        ))}
        
        {isProcessing && (
          <div className="flex items-center text-muted-foreground text-sm">
            <span className="animate-pulse mr-2">●</span>
            Processando...
          </div>
        )}
      </div>
      
      <div className="border-t p-4 space-y-4">
        <div className="flex flex-wrap gap-2">
          <ModelSelector 
            models={['gpt-3.5-turbo', 'gpt-4o', 'claude-3-opus']} 
            selectedModel={selectedModel} 
            onSelectModel={onSelectModel} 
          />
          
          <PersonalitySelector 
            personalities={['default', 'criativo', 'analítico', 'conciso']} 
            selectedPersonality={selectedPersonality} 
            onSelectPersonality={onSelectPersonality} 
          />
          
          <ToolSelector 
            tools={['web-search', 'code-interpreter', 'file-analysis']} 
            selectedTools={selectedTools} 
            onSelectTools={onSelectTools} 
          />
        </div>
        
        <ChatInput 
          onSendMessage={onSendMessage} 
          isDisabled={isProcessing} 
          placeholder="Digite sua mensagem aqui ou @ para chamar outro agente..." 
        />
      </div>
    </div>
  );
}
