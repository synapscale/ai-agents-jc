import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { StarIcon, DownloadIcon, InfoIcon } from 'lucide-react';

interface NodeTemplateCardProps {
  template: {
    id: string;
    name: string;
    description: string;
    category: string;
    author: string;
    downloads: number;
    rating: number;
    tags: string[];
    isInstalled?: boolean;
  };
  onInstall: (id: string) => void;
  onView: (id: string) => void;
}

export function NodeTemplateCard({ template, onInstall, onView }: NodeTemplateCardProps) {
  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium">{template.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{template.description}</p>
        </div>
        
        <Button
          variant={template.isInstalled ? "secondary" : "default"}
          size="sm"
          onClick={() => onInstall(template.id)}
        >
          {template.isInstalled ? 'Instalado' : 'Instalar'}
        </Button>
      </div>
      
      <div className="mt-3 flex flex-wrap gap-2">
        {template.tags.map((tag, index) => (
          <Badge key={index} variant="outline">{tag}</Badge>
        ))}
      </div>
      
      <div className="mt-4 flex items-center justify-between text-sm">
        <div className="flex items-center gap-1 text-muted-foreground">
          <span>Por: {template.author}</span>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <StarIcon className="h-4 w-4 text-yellow-500" />
            <span>{template.rating.toFixed(1)}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <DownloadIcon className="h-4 w-4 text-muted-foreground" />
            <span>{template.downloads}</span>
          </div>
          
          <Button variant="ghost" size="icon" onClick={() => onView(template.id)}>
            <InfoIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
