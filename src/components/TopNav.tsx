import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetIdentity, useLogout } from '@refinedev/core';
import { useKBar } from '@refinedev/kbar';
import { Search, Bell, User, Settings, LogOut, Command } from 'lucide-react';
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
}

export function TopNav({ currentDomain, currentItem, allDomains }: TopNavProps) {
  const navigate = useNavigate();
  const { query } = useKBar();
  const { data: user } = useGetIdentity<{
    id: string;
    name: string;
    email: string;
    avatar?: string;
  }>();
  const { mutate: logout } = useLogout();

  // Detect if user is on Mac or Windows for keyboard shortcut display
  const isMac = typeof navigator !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  const shortcutKey = isMac ? '⌘' : 'Ctrl';

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

  return (
    <div className="h-16 bg-[#1e3a5f] flex items-center justify-between px-6">
      {/* Left side - Logo and Breadcrumbs */}
      <div className="flex items-center gap-6">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-4 hover:opacity-80 transition-opacity"
        >
          <img
            src="https://www.bwlpg.com/wp-content/uploads/2021/08/bwlpg-brand-white-2x.png"
            alt="BW LPG"
            className="h-10"
          />
          <div className="text-white text-xl font-medium">
            ONE Platform
          </div>
        </button>

        {currentDomain && (
          <div className="ml-4">
            <BreadcrumbNav
              currentDomain={currentDomain}
              currentItem={currentItem}
              allDomains={allDomains}
            />
          </div>
        )}
      </div>

      {/* Right side - Search, Notifications, User Menu */}
      <div className="flex items-center gap-4">
        {/* Command Palette Trigger */}
        <button
          onClick={() => query.toggle()}
          className="flex items-center gap-3 px-4 py-2 w-72 bg-white/10 rounded-md hover:bg-white/15 transition-colors group h-10"
        >
          <Search className="h-5 w-5 text-white" />
          <span className="flex-1 text-left text-base text-white group-hover:text-white">Search..</span>
          <kbd className="hidden sm:inline-flex text-white items-center gap-1 px-2 py-1 text-sm font-mono bg-white/10 rounded text-white/50 mr-0.">
            {shortcutKey} K
          </kbd>
        </button>

        {/* Notifications */}
        <Popover>
          <PopoverTrigger asChild>
            <button className="relative p-2.5 hover:bg-white/10 rounded transition-colors">
              <Bell className="h-5 w-5 text-white" />
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
            <button className="flex items-center gap-2 p-2 hover:bg-white/10 rounded transition-colors">
              <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <div className="px-2 py-1.5">
              <p className="text-sm font-medium">{user?.name || 'User'}</p>
              <p className="text-xs text-slate-500">{user?.email || 'user@bwlpg.com'}</p>
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
            <DropdownMenuItem onClick={() => logout()}>
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
