import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

interface DashboardViewProps {
  title: string;
  embedUrl: string;
}

export function DashboardView({ title, embedUrl }: DashboardViewProps) {
  return (
    <div className="h-full flex flex-col bg-slate-50">
      <div className="p-6 border-b border-slate-200 bg-white">
        <h2 className="text-xl text-slate-900">{title}</h2>
      </div>

      <div className="flex-1 p-6">
        <Alert className="max-w-2xl mx-auto border-blue-200 bg-blue-50">
          <AlertCircle className="h-4 w-4 text-blue-600" />
          <AlertTitle className="text-blue-900">Power BI Dashboard</AlertTitle>
          <AlertDescription className="text-blue-800">
            In production, this area would display an embedded Power BI dashboard.
            <br />
            <span className="text-xs text-blue-600 mt-2 block">Embed URL: {embedUrl}</span>
          </AlertDescription>
        </Alert>

        {/* Placeholder for Power BI iframe */}
        <div className="mt-6 bg-white rounded border border-slate-200 h-[600px] flex items-center justify-center">
          <div className="text-center text-slate-400">
            <div className="text-5xl mb-3">📊</div>
            <p className="text-slate-600">Power BI Dashboard: {title}</p>
            <p className="text-xs text-slate-500 mt-2">This would be an embedded iframe in production</p>
          </div>
        </div>
      </div>
    </div>
  );
}
