import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PaperclipIcon, SendIcon } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string, files?: File[]) => void;
  isDisabled?: boolean;
  placeholder?: string;
}

export function ChatInput({
  onSendMessage,
  isDisabled = false,
  placeholder = 'Digite sua mensagem aqui...'
}: ChatInputProps) {
  const [message, setMessage] = React.useState('');
  const [files, setFiles] = React.useState<File[]>([]);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleSendMessage = () => {
    if (message.trim() || files.length > 0) {
      onSendMessage(message, files.length > 0 ? files : undefined);
      setMessage('');
      setFiles([]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex items-end gap-2">
      <div className="relative flex-1">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={isDisabled}
          className="pr-10 py-6 resize-none"
        />
        <Button
          size="icon"
          variant="ghost"
          className="absolute right-2 bottom-1.5"
          onClick={handleFileButtonClick}
          disabled={isDisabled}
        >
          <PaperclipIcon className="h-5 w-5" />
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          multiple
        />
      </div>
      <Button
        size="icon"
        onClick={handleSendMessage}
        disabled={isDisabled || (!message.trim() && files.length === 0)}
      >
        <SendIcon className="h-5 w-5" />
      </Button>
    </div>
  );
}
