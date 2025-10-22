import { ChevronDown, BarChart3, AppWindow, Bot } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Domain, DomainItem } from '../types';

interface BreadcrumbNavProps {
  currentDomain: Domain;
  currentItem: DomainItem;
  allDomains: Domain[];
}

export function BreadcrumbNav({ currentDomain, currentItem, allDomains }: BreadcrumbNavProps) {
  const navigate = useNavigate();
  // Get icon for item type
  const getTypeIcon = (type: 'dashboard' | 'app' | 'chatbot') => {
    if (type === 'dashboard') {
      return <BarChart3 className="h-4 w-4" />;
    }
    // For apps, check if it's a chatbot
    if (currentItem.name.toLowerCase().includes('chatbot')) {
      return <Bot className="h-4 w-4" />;
    }
    return <AppWindow className="h-4 w-4" />;
  };

  // Filter out current domain
  const otherDomains = allDomains.filter(d => d.id !== currentDomain.id);

  // Filter out current item
  const otherItems = currentDomain.items.filter(i => i.id !== currentItem.id);

  return (
    <div className="flex items-center gap-2">
      {/* Domain - Split into clickable label and dropdown */}
      <div className="flex items-center rounded-md bg-white/10 hover:bg-white/15 transition-colors overflow-hidden">
        <button
          onClick={() => navigate(`/${currentDomain.id}`)}
          className="px-3 py-1.5 text-white hover:bg-white/10 transition-colors"
        >
          <span className="text-sm">{currentDomain.name}</span>
        </button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="px-1.5 py-1.5 text-white hover:bg-white/10 transition-colors border-l border-white/10">
              <ChevronDown className="h-3.5 w-3.5 opacity-60" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            {otherDomains.map((domain) => (
              <DropdownMenuItem
                key={domain.id}
                onClick={() => navigate(`/${domain.id}`)}
                className="cursor-pointer"
              >
                <span>{domain.name}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <span className="text-white/40">/</span>

      {/* Item with Icon and Name - Split into clickable label and dropdown */}
      <div className="flex items-center rounded-md bg-white/10 hover:bg-white/15 transition-colors overflow-hidden">
        <button
          className="px-3 py-1.5 text-white hover:bg-white/10 transition-colors flex items-center gap-2"
        >
          {getTypeIcon(currentItem.type)}
          <span className="text-sm">{currentItem.name}</span>
        </button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="px-1.5 py-1.5 text-white hover:bg-white/10 transition-colors border-l border-white/10">
              <ChevronDown className="h-3.5 w-3.5 opacity-60" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            {otherItems.length > 0 ? (
              otherItems.map((item) => {
                const itemIcon = item.type === 'dashboard'
                  ? <BarChart3 className="h-4 w-4" />
                  : item.name.toLowerCase().includes('chatbot')
                    ? <Bot className="h-4 w-4" />
                    : <AppWindow className="h-4 w-4" />;

                return (
                  <DropdownMenuItem
                    key={item.id}
                    onClick={() => navigate(`/${currentDomain.id}/${item.id}`)}
                    className="cursor-pointer flex items-center gap-2"
                  >
                    {itemIcon}
                    <span>{item.name}</span>
                  </DropdownMenuItem>
                );
              })
            ) : (
              <DropdownMenuItem disabled>
                <span className="text-slate-400">No other items</span>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
