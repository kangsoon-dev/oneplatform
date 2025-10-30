import React from 'react';

export const SchedulesDashboard = () => {
  const embedUrl = 'https://app.powerbi.com/reportEmbed?reportId=974270fe-d113-4ed8-9264-b78cb3408d12&autoAuth=true&navContentPaneEnabled=false&filterPaneEnabled=false&pageName=ReportSection4c3cc1e7a26101937aeb&ctid=56b05694-5615-4d39-b006-94e7626bb046';

  return (
    <div className="h-full w-full">
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden h-full w-full">
        <iframe
          title="Drydock Schedules Power BI Dashboard"
          src={embedUrl}
          frameBorder="0"
          allowFullScreen={true}
          className="w-full h-full block"
        />
      </div>
    </div>
  );
};
