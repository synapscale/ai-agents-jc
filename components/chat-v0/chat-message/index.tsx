import React from 'react';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CopyIcon, RefreshIcon, ThumbsUpIcon, ThumbsDownIcon } from 'lucide-react';

interface ChatMessageProps {
  message: {
    role: 'user' | 'assistant';
    content: string;
    timestamp?: Date;
  };
  onCopy: () => void;
  onRegenerate?: () => void;
}

export function ChatMessage({ message, onCopy, onRegenerate }: ChatMessageProps) {
  const isUser = message.role === 'user';
  const timestamp = message.timestamp || new Date();
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex gap-3 max-w-3xl ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        <Avatar className="h-8 w-8 mt-1">
          {isUser ? (
            <div className="bg-primary text-primary-foreground h-full w-full flex items-center justify-center text-sm font-medium">
              U
            </div>
          ) : (
            <div className="bg-muted h-full w-full flex items-center justify-center text-sm font-medium">
              A
            </div>
          )}
        </Avatar>
        
        <div className="space-y-2">
          <Card className={`p-4 ${isUser ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
            <div className="whitespace-pre-wrap">{message.content}</div>
          </Card>
          
          <div className="flex items-center text-xs text-muted-foreground">
            <span>
              {formatDistanceToNow(timestamp, { addSuffix: true, locale: ptBR })}
            </span>
            
            {!isUser && (
              <div className="flex items-center ml-auto gap-1">
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={onCopy}>
                  <CopyIcon className="h-3.5 w-3.5" />
                </Button>
                
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <ThumbsUpIcon className="h-3.5 w-3.5" />
                </Button>
                
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <ThumbsDownIcon className="h-3.5 w-3.5" />
                </Button>
                
                {onRegenerate && (
                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={onRegenerate}>
                    <RefreshIcon className="h-3.5 w-3.5" />
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
