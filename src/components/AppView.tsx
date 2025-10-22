import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { DomainItem } from '../types';

interface AppViewProps {
  item: DomainItem;
}

export function AppView({ item }: AppViewProps) {
  const [activeTab, setActiveTab] = useState(item.pages?.[0] || '');

  return (
    <div className="h-full flex flex-col bg-slate-50">
      <div className="p-6 border-b border-slate-200 bg-white">
        <h2 className="text-xl text-slate-900">{item.name}</h2>
        {item.description && (
          <p className="text-sm text-slate-600 mt-1">{item.description}</p>
        )}
      </div>

      <div className="flex-1 p-6">
        {item.pages && item.pages.length > 0 ? (
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-white border border-slate-200">
              {item.pages.map((page) => (
                <TabsTrigger
                  key={page}
                  value={page}
                  className="data-[state=active]:bg-slate-100 text-slate-600"
                >
                  {page}
                </TabsTrigger>
              ))}
            </TabsList>

            {item.pages.map((page) => (
              <TabsContent key={page} value={page} className="mt-4">
                <Card className="border-slate-200">
                  <CardHeader className="bg-[#ddd6f3] border-b border-slate-200">
                    <CardTitle className="text-lg text-slate-900">{page}</CardTitle>
                    <CardDescription className="text-sm text-slate-600">
                      Application page for {item.name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="min-h-[400px] flex items-center justify-center bg-white">
                    <div className="text-center text-slate-400">
                      <div className="text-5xl mb-3">⚙️</div>
                      <p className="text-slate-600">Custom application content for {page}</p>
                      <p className="text-xs text-slate-500 mt-2">This would contain the actual application interface</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        ) : (
          <Card className="border-slate-200">
            <CardContent className="py-12 text-center">
              <div className="text-5xl mb-3">⚙️</div>
              <p className="text-sm text-slate-500">Application content goes here</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
