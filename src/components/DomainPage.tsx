import React from 'react';
import { useState, useMemo } from 'react';
import { Domain } from '../types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { Database, DollarSign, Settings, Wrench, Globe, Users, Leaf, Briefcase, LucideIcon, BarChart3, AppWindow, Bot } from 'lucide-react';

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

const typeIconMap: Record<string, LucideIcon> = {
  dashboard: BarChart3,
  app: AppWindow,
  chatbot: Bot
};

const getTypeIconStyle = (type: string) => {
  switch (type) {
    case 'dashboard':
      return 'bg-green-500 text-white';
    case 'app':
      return 'bg-blue-500 text-white';
    case 'chatbot':
      return 'bg-slate-900 text-white';
    default:
      return 'bg-slate-500 text-white';
  }
};

const getStatusBadgeStyle = (status?: string) => {
  switch (status) {
    case 'live':
      return 'bg-white text-slate-900 border-slate-200';
    case 'beta':
      return 'bg-white text-slate-900 border-slate-200';
    case 'coming-soon':
      return 'bg-white text-slate-900 border-slate-200';
    default:
      return 'bg-slate-100 text-slate-600 border-slate-200';
  }
};

const getStatusDotColor = (status?: string) => {
  switch (status) {
    case 'live':
      return 'bg-green-500';
    case 'beta':
      return 'bg-yellow-500';
    case 'coming-soon':
      return 'bg-blue-500';
    default:
      return 'bg-slate-400';
  }
};

interface DomainPageProps {
  domain: Domain;
  onNavigateToItem: (itemId: string) => void;
}

export function DomainPage({ domain, onNavigateToItem }: DomainPageProps) {
  const IconComponent = iconMap[domain.icon];
  const [filter, setFilter] = useState<'all' | 'dashboards' | 'apps' | 'chatbots'>('all');

  // Filter items based on selected filter
  const filteredItems = useMemo(() => {
    if (filter === 'all') return domain.items;
    if (filter === 'dashboards') return domain.items.filter(item => item.type === 'dashboard');
    if (filter === 'chatbots') return domain.items.filter(item => item.name.toLowerCase().includes('chatbot'));
    if (filter === 'apps') return domain.items.filter(item => item.type === 'app' && !item.name.toLowerCase().includes('chatbot'));
    return domain.items;
  }, [domain.items, filter]);

  // Count items in each category
  const counts = useMemo(() => {
    const dashboards = domain.items.filter(item => item.type === 'dashboard').length;
    const chatbots = domain.items.filter(item => item.name.toLowerCase().includes('chatbot')).length;
    const apps = domain.items.filter(item => item.type === 'app' && !item.name.toLowerCase().includes('chatbot')).length;

    return {
      all: domain.items.length,
      dashboards,
      apps,
      chatbots
    };
  }, [domain.items]);

  return (
    <div className="p-8 bg-slate-50">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          {IconComponent && <IconComponent className="h-8 w-8 text-slate-700" />}
          <h1 className="text-2xl text-slate-900">{domain.name}</h1>
        </div>
        <p className="text-sm text-slate-600">{domain.description}</p>
      </div>

      {/* Filter Tabs */}
      {domain.items.length > 0 && (
        <div className="mb-6">
          <Tabs value={filter} onValueChange={(value) => setFilter(value as typeof filter)}>
            <TabsList className="bg-white border border-slate-200">
              <TabsTrigger value="all" className="data-[state=active]:bg-[#1e3a5f] data-[state=active]:text-white">
                All ({counts.all})
              </TabsTrigger>
              <TabsTrigger value="dashboards" className="data-[state=active]:bg-[#1e3a5f] data-[state=active]:text-white">
                Dashboards ({counts.dashboards})
              </TabsTrigger>
              <TabsTrigger value="apps" className="data-[state=active]:bg-[#1e3a5f] data-[state=active]:text-white">
                Apps ({counts.apps})
              </TabsTrigger>
              <TabsTrigger value="chatbots" className="data-[state=active]:bg-[#1e3a5f] data-[state=active]:text-white">
                Chatbots ({counts.chatbots})
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      )}

      {domain.items.length === 0 ? (
        <Card className="border-slate-200">
          <CardContent className="py-12 text-center">
            <p className="text-sm text-slate-500">No applications or dashboards available in this domain yet.</p>
          </CardContent>
        </Card>
      ) : filteredItems.length === 0 ? (
        <Card className="border-slate-200">
          <CardContent className="py-12 text-center">
            <p className="text-sm text-slate-500">No items match the selected filter.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredItems.map((item) => {
            const TypeIcon = typeIconMap[item.type] || BarChart3;
            const statusText = item.status === 'coming-soon' ? 'Coming Soon' :
              item.status === 'beta' ? 'Beta' :
                item.status === 'live' ? 'Live' : '';

            return (
              <Card
                key={item.id}
                className="cursor-pointer hover:shadow-lg transition-all duration-200 border-slate-200 bg-white overflow-hidden group w-full max-w-sm min-w-[280px] mx-auto relative"
                onClick={() => onNavigateToItem(item.id)}
              >
                {/* Status Badge - Top Right of Card */}
                {statusText && (
                  <div
                    className="absolute z-50 pointer-events-none"
                    style={{ top: '6px', right: '6px' }}
                  >
                    <Badge className={`${getStatusBadgeStyle(item.status)} text-sm font-medium px-2 py-1 flex items-center gap-2 shadow-lg pointer-events-auto`}>
                      {statusText}
                      <div className={`w-2 h-2 rounded-full ${getStatusDotColor(item.status)}`} />
                    </Badge>
                  </div>
                )}

                {/* Image Section with 16:9 aspect ratio */}
                <div className="aspect-video bg-slate-100 overflow-hidden">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={`${item.name} preview`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      onError={(e) => {
                        // Fallback to placeholder if image fails to load
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                      <TypeIcon className="h-8 w-8 text-slate-400" />
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <CardContent className="p-3">
                  <div className="flex items-start gap-2">
                    {/* Type Icon */}
                    <div className={`w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0 ${getTypeIconStyle(item.type)}`}>
                      <TypeIcon className="h-4 w-4" />
                    </div>

                    {/* Text Content */}
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-sm font-semibold text-slate-900 mb-1 line-clamp-1">
                        {item.name}
                      </CardTitle>
                      {item.description && (
                        <CardDescription className="text-xs text-slate-600 line-clamp-2">
                          {item.description}
                        </CardDescription>
                      )}
                    </div>
                  </div>

                  {/* Last Updated Timestamp - Right aligned */}
                  {item.lastUpdated && (
                    <div className="mt-2 text-right">
                      <span className="text-xs text-slate-500">
                        Last updated: {item.lastUpdated}
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
