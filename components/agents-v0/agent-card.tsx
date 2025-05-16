import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontalIcon, EditIcon, TrashIcon } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface AgentCardProps {
  agent: {
    id: string;
    name: string;
    description: string;
    model: string;
    type: string;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
  };
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onView: (id: string) => void;
}

export function AgentCard({ agent, onEdit, onDelete, onView }: AgentCardProps) {
  return (
    <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={() => onView(agent.id)}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-lg">{agent.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{agent.description}</p>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
            <Button variant="ghost" size="icon">
              <MoreHorizontalIcon className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={(e) => {
              e.stopPropagation();
              onView(agent.id);
            }}>
              Visualizar
            </DropdownMenuItem>
            <DropdownMenuItem onClick={(e) => {
              e.stopPropagation();
              onEdit(agent.id);
            }}>
              <EditIcon className="h-4 w-4 mr-2" />
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="text-destructive"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(agent.id);
              }}
            >
              <TrashIcon className="h-4 w-4 mr-2" />
              Excluir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <div className="mt-4 flex items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {agent.tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="secondary">{tag}</Badge>
          ))}
          {agent.tags.length > 3 && (
            <Badge variant="outline">+{agent.tags.length - 3}</Badge>
          )}
        </div>
        
        <div className="text-xs text-muted-foreground">
          {agent.model}
        </div>
      </div>
      
      <div className="mt-4 text-xs text-muted-foreground flex justify-between">
        <span>Criado: {agent.createdAt.toLocaleDateString()}</span>
        <span>Atualizado: {agent.updatedAt.toLocaleDateString()}</span>
      </div>
    </Card>
  );
}
