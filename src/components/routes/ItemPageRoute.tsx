import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DashboardView } from '../DashboardView';
import { AppView } from '../AppView';
import { domains } from '../../data/domains';

export function ItemPageRoute() {
  const { domainId, itemId } = useParams<{ domainId: string; itemId: string }>();
  const navigate = useNavigate();

  const domain = domains.find(d => d.id === domainId);
  const item = domain?.items.find(i => i.id === itemId);

  if (!domain || !item) {
    return (
      <div className="p-8 bg-slate-50">
        <div className="text-center">
          <h1 className="text-2xl text-slate-900 mb-4">Item Not Found</h1>
          <p className="text-slate-600">
            The requested item "{itemId}" in domain "{domainId}" does not exist.
          </p>
        </div>
      </div>
    );
  }

  if (item.type === 'dashboard') {
    return (
      <DashboardView
        title={item.name}
        embedUrl={item.embedUrl || ''}
      />
    );
  } else {
    return <AppView item={item} />;
  }
}
