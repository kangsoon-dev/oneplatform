import React, { useState } from 'react';
import { Search, Bell, User, Settings, LogOut } from 'lucide-react';
import { Badge } from './ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './ui/popover';
import { BreadcrumbNav } from './BreadcrumbNav';
import { Domain, DomainItem } from '../types';

interface TopNavProps {
  currentDomain?: Domain;
  currentItem?: DomainItem;
  allDomains: Domain[];
  onSearch: (query: string) => void;
  onNavigateHome: () => void;
  onNavigate: (domainId: string, itemId?: string) => void;
}

export function TopNav({ currentDomain, currentItem, allDomains, onSearch, onNavigateHome, onNavigate }: TopNavProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications] = useState([
    {
      id: '1',
      title: 'System Update',
      message: 'Platform will undergo maintenance tonight at 10 PM',
      timestamp: new Date(),
      read: false
    },
    {
      id: '2',
      title: 'New Dashboard Available',
      message: 'Market Insights dashboard has been updated',
      timestamp: new Date(Date.now() - 3600000),
      read: false
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <div className="h-16 bg-[#1e3a5f] flex items-center justify-between px-6">
      {/* Left side - Logo and Breadcrumbs */}
      <div className="flex items-center gap-6">
        <button
          onClick={onNavigateHome}
          className="flex items-center gap-4 hover:opacity-80 transition-opacity"
        >
          <img
            src="https://www.bwlpg.com/wp-content/uploads/2021/08/bwlpg-brand-white-2x.png"
            alt="BW LPG"
            className="h-10"
          />
          <div className="text-white text-xl">
            ONE Platform
          </div>
        </button>

        {currentDomain && (
          <div className="ml-4">
            <BreadcrumbNav
              currentDomain={currentDomain}
              currentItem={currentItem}
              allDomains={allDomains}
              onNavigate={onNavigate}
            />
          </div>
        )}
      </div>

      {/* Right side - Search, Notifications, User Menu */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <form onSubmit={handleSearchSubmit} className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search apps, dashboards, data..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-1.5 w-64 bg-white/10 border border-white/20 rounded text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
          />
        </form>

        {/* Notifications */}
        <Popover>
          <PopoverTrigger asChild>
            <button className="relative p-2 hover:bg-white/10 rounded transition-colors">
              <Bell className="h-4 w-4 text-white" />
              {unreadCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-[10px] bg-red-500">
                  {unreadCount}
                </Badge>
              )}
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="end">
            <div className="space-y-2">
              <div className="pb-2 border-b">
                <h3 className="font-semibold">Notifications</h3>
              </div>
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="p-3 rounded-md hover:bg-slate-50 cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <p className="text-sm">{notification.title}</p>
                      <p className="text-xs text-slate-500 mt-1">{notification.message}</p>
                    </div>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-1"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 p-1.5 hover:bg-white/10 rounded transition-colors">
              <div className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <div className="px-2 py-1.5">
              <p className="text-sm">John Anderson</p>
              <p className="text-xs text-slate-500">john.anderson@bwlpg.com</p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
