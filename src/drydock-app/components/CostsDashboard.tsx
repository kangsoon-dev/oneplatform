import React from 'react';

interface CostsDashboardProps {
  reloadKey?: number;
}

export const CostsDashboard = ({ reloadKey = 0 }: CostsDashboardProps) => {
  const embedUrl = 'https://app.powerbi.com/reportEmbed?reportId=974270fe-d113-4ed8-9264-b78cb3408d12&autoAuth=true&navContentPaneEnabled=false&filterPaneEnabled=false&pageName=9b36a3821d0d32abd01b&ctid=56b05694-5615-4d39-b006-94e7626bb046';

  return (
    <div className="h-full w-full">
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden h-full w-full">
        <iframe
          title="Drydock Costs Power BI Dashboard"
          key={reloadKey}
          src={embedUrl}
          frameBorder="0"
          allowFullScreen={true}
          className="w-full h-full block"
        />
      </div>
    </div>
  );
};
