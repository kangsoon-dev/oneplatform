import { useState, useMemo } from 'react';
import { Domain } from '../types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { Database, DollarSign, Settings, Wrench, Globe, Users, Leaf, Briefcase, LucideIcon } from 'lucide-react';

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => (
            <Card
              key={item.id}
              className="cursor-pointer hover:shadow-md transition-all border-slate-200 bg-white"
              onClick={() => onNavigateToItem(item.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-base text-slate-900">{item.name}</CardTitle>
                  <Badge
                    variant={item.type === 'dashboard' ? 'default' : 'secondary'}
                    className={item.type === 'dashboard' ? 'bg-[#1e3a5f]' : ''}
                  >
                    {item.name.toLowerCase().includes('chatbot') ? 'Chatbot' : item.type === 'dashboard' ? 'Dashboard' : 'App'}
                  </Badge>
                </div>
                {item.description && (
                  <CardDescription className="text-xs text-slate-600 mt-1">{item.description}</CardDescription>
                )}
              </CardHeader>
              {item.pages && item.pages.length > 0 && (
                <CardContent className="pt-0">
                  <div className="flex flex-wrap gap-1.5">
                    {item.pages.map((page, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs font-normal border-slate-300 text-slate-600">
                        {page}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
