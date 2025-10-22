import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Database, DollarSign, Settings, Wrench, Globe, Users, Leaf, Briefcase, LucideIcon } from 'lucide-react';
import { Domain } from '../types';
import { cn } from './ui/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';

const iconMap: Record<string, LucideIcon> = {
  Database,
  DollarSign,
  Settings,
  Wrench,
  Globe,
  Users,
  Leaf,
  Briefcase
};

interface SidebarProps {
  domains: Domain[];
  currentDomain?: string;
}

export function Sidebar({ domains, currentDomain }: SidebarProps) {
  const navigate = useNavigate();

  const handleDomainClick = (domainId: string) => {
    navigate(`/${domainId}`);
  };

  return (
    <TooltipProvider>
      <div className="h-full w-16 bg-white border-r border-slate-200 flex flex-col">
        <div className="flex-1 overflow-y-auto py-4">
          {domains.map((domain) => {
            const isActive = currentDomain === domain.id;
            const IconComponent = iconMap[domain.icon];

            return (
              <div key={domain.id} className="mb-1">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => handleDomainClick(domain.id)}
                      className={cn(
                        "w-full flex items-center justify-center px-4 py-3 transition-colors hover:bg-slate-50",
                        isActive && "bg-blue-50 border-l-3 border-[#1e3a5f]"
                      )}
                    >
                      {IconComponent && <IconComponent className="h-5 w-5 text-slate-600" />}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="ml-4">
                    <p>{domain.name}</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            );
          })}
        </div>
      </div>
    </TooltipProvider>
  );
}
