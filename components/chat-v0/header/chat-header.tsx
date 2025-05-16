import React from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { MoreHorizontalIcon, ShareIcon, DownloadIcon, PencilIcon } from 'lucide-react';

interface ChatHeaderProps {
  title: string;
  onRename: () => void;
  onShare: () => void;
  onExport: () => void;
}

export function ChatHeader({ title, onRename, onShare, onExport }: ChatHeaderProps) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedTitle, setEditedTitle] = React.useState(title);
  
  const handleRename = () => {
    setIsEditing(true);
  };
  
  const handleSave = () => {
    if (editedTitle.trim()) {
      onRename();
      setIsEditing(false);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setEditedTitle(title);
      setIsEditing(false);
    }
  };
  
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center gap-2">
        {isEditing ? (
          <Input
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            className="w-64"
            autoFocus
          />
        ) : (
          <>
            <h2 className="text-lg font-medium">{title}</h2>
            <Button variant="ghost" size="icon" onClick={handleRename}>
              <PencilIcon className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>
      
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={onShare}>
          <ShareIcon className="h-5 w-5" />
        </Button>
        
        <Button variant="ghost" size="icon" onClick={onExport}>
          <DownloadIcon className="h-5 w-5" />
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontalIcon className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onRename}>Renomear</DropdownMenuItem>
            <DropdownMenuItem onClick={onShare}>Compartilhar</DropdownMenuItem>
            <DropdownMenuItem onClick={onExport}>Exportar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
