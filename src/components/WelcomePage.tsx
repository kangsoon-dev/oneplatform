import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { domains } from '../data/domains';
import { Database, DollarSign, Settings, Wrench, Globe, Users, Leaf, Briefcase, LucideIcon, BarChart3 } from 'lucide-react';

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

interface WelcomePageProps {
  onNavigate: (domainId: string) => void;
}

export function WelcomePage({ onNavigate }: WelcomePageProps) {
  return (
    <div className="p-8 bg-slate-50">
      <div className="mb-6">
        <h1 className="text-3xl text-slate-900 mb-2">Welcome to ONE Platform</h1>
        <p className="text-base text-slate-600">
          Your unified digital ecosystem for data, insights, and applications in BW LPG.
        </p>
      </div>

      {/* Quick Access to Domains */}
      <div className="mb-6">
        <h2 className="text-xl text-slate-900 mb-4">Quick Access</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {domains.filter(d => d.items.length > 0).map((domain) => {
            const IconComponent = iconMap[domain.icon];
            return (
              <Card
                key={domain.id}
                className="cursor-pointer hover:shadow-md transition-all border-slate-200 bg-white"
                onClick={() => onNavigate(domain.id)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    {IconComponent && <IconComponent className="h-6 w-6 text-slate-600" />}
                    <div>
                      <CardTitle className="text-base text-slate-900">{domain.name}</CardTitle>
                      <CardDescription className="text-xs text-slate-600">
                        {domain.items.length} {domain.items.length === 1 ? 'item' : 'items'}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-xl text-slate-900 mb-4">Recent Activity</h2>
        <Card className="border-slate-200">
          <CardContent className="py-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-slate-50 rounded flex items-center justify-center">
                    <BarChart3 className="h-5 w-5 text-slate-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-900">Viewed Speed and Fuel Consumption</p>
                    <p className="text-xs text-slate-500">Technical · 2 hours ago</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-slate-50 rounded flex items-center justify-center">
                    <DollarSign className="h-5 w-5 text-slate-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-900">Accessed Running Cost Dashboard</p>
                    <p className="text-xs text-slate-500">Finance · Yesterday</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-slate-50 rounded flex items-center justify-center">
                    <Globe className="h-5 w-5 text-slate-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-900">Reviewed Market Insights</p>
                    <p className="text-xs text-slate-500">Market · 2 days ago</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
