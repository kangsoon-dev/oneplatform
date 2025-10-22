import { useState } from 'react';
import { ChevronRight, Database, DollarSign, Settings, Wrench, Globe, Users, Leaf, Briefcase, LucideIcon } from 'lucide-react';
import { Domain } from '../types';
import { cn } from './ui/utils';

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
  currentItem?: string;
  onNavigate: (domainId: string, itemId?: string) => void;
}

export function Sidebar({ domains, currentDomain, currentItem, onNavigate }: SidebarProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedDomain, setExpandedDomain] = useState<string | null>(null);

  const handleDomainClick = (domainId: string) => {
    if (isExpanded) {
      if (expandedDomain === domainId) {
        // If clicking the same domain, navigate to it
        onNavigate(domainId);
        setExpandedDomain(null);
      } else {
        // Expand the domain to show its items
        setExpandedDomain(domainId);
      }
    } else {
      // If sidebar is collapsed, navigate directly
      onNavigate(domainId);
    }
  };

  return (
    <div
      className={cn(
        "h-full bg-white border-r border-slate-200 transition-all duration-300 ease-in-out flex flex-col",
        isExpanded ? "w-64" : "w-16"
      )}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => {
        setIsExpanded(false);
        setExpandedDomain(null);
      }}
    >
      <div className="flex-1 overflow-y-auto py-4">
        {domains.map((domain) => {
          const isActive = currentDomain === domain.id;
          const isOpen = expandedDomain === domain.id;
          const IconComponent = iconMap[domain.icon];

          return (
            <div key={domain.id} className="mb-1">
              <button
                onClick={() => handleDomainClick(domain.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 transition-colors hover:bg-slate-50",
                  isActive && "bg-blue-50 border-l-3 border-[#1e3a5f]"
                )}
              >
                {IconComponent && <IconComponent className="h-5 w-5 flex-shrink-0 text-slate-600" />}
                {isExpanded && (
                  <>
                    <span className="flex-1 text-left text-sm text-slate-700">{domain.name}</span>
                    {domain.items.length > 0 && (
                      <ChevronRight
                        className={cn(
                          "h-4 w-4 text-slate-400 transition-transform",
                          isOpen && "rotate-90"
                        )}
                      />
                    )}
                  </>
                )}
              </button>

              {isExpanded && isOpen && domain.items.length > 0 && (
                <div className="bg-slate-50 py-1">
                  {domain.items.map((item) => (
                    <button
                      key={item.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigate(domain.id, item.id);
                      }}
                      className={cn(
                        "w-full text-left px-4 py-2 pl-12 text-sm text-slate-600 transition-colors hover:bg-slate-100",
                        currentItem === item.id && "bg-blue-50 text-[#1e3a5f]"
                      )}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
