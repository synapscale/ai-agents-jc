import React from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { CheckIcon, ChevronDownIcon, PlusIcon, XIcon } from 'lucide-react';

interface ToolSelectorProps {
  tools: string[];
  selectedTools: string[];
  onSelectTools: (tools: string[]) => void;
}

export function ToolSelector({ tools, selectedTools, onSelectTools }: ToolSelectorProps) {
  const toggleTool = (tool: string) => {
    if (selectedTools.includes(tool)) {
      onSelectTools(selectedTools.filter(t => t !== tool));
    } else {
      onSelectTools([...selectedTools, tool]);
    }
  };

  const removeTool = (tool: string) => {
    onSelectTools(selectedTools.filter(t => t !== tool));
  };

  return (
    <div className="flex flex-wrap gap-2 items-center">
      {selectedTools.map(tool => (
        <Badge key={tool} variant="secondary" className="gap-1">
          {tool}
          <Button
            variant="ghost"
            size="icon"
            className="h-4 w-4 p-0"
            onClick={() => removeTool(tool)}
          >
            <XIcon className="h-3 w-3" />
          </Button>
        </Badge>
      ))}
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-8 gap-1">
            <PlusIcon className="h-4 w-4" />
            <span>Ferramentas</span>
            <ChevronDownIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {tools.map((tool) => (
            <DropdownMenuItem
              key={tool}
              onClick={() => toggleTool(tool)}
              className="flex items-center justify-between"
            >
              <span>{tool}</span>
              {selectedTools.includes(tool) && <CheckIcon className="h-4 w-4 ml-2" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
