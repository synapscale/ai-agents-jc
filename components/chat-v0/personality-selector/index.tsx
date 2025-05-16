import React from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { CheckIcon, ChevronDownIcon } from 'lucide-react';

interface PersonalitySelectorProps {
  personalities: string[];
  selectedPersonality: string;
  onSelectPersonality: (personality: string) => void;
}

export function PersonalitySelector({ 
  personalities, 
  selectedPersonality, 
  onSelectPersonality 
}: PersonalitySelectorProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 gap-1">
          <span>Personalidade: {selectedPersonality}</span>
          <ChevronDownIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {personalities.map((personality) => (
          <DropdownMenuItem
            key={personality}
            onClick={() => onSelectPersonality(personality)}
            className="flex items-center justify-between"
          >
            <span>{personality}</span>
            {personality === selectedPersonality && <CheckIcon className="h-4 w-4 ml-2" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
