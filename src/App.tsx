import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { TopNav } from './components/TopNav';
import { HomePage } from './components/routes/HomePage';
import { DomainPageRoute } from './components/routes/DomainPageRoute';
import { ItemPageRoute } from './components/routes/ItemPageRoute';
import { domains } from './data/domains';

export default function App() {
  const location = useLocation();

  // Extract current domain and item from URL
  const getCurrentState = () => {
    const pathSegments = location.pathname.split('/').filter(Boolean);

    if (pathSegments.length === 0) {
      return { domain: null, item: null };
    }

    if (pathSegments.length === 1) {
      const domain = domains.find(d => d.id === pathSegments[0]);
      return { domain, item: null };
    }

    if (pathSegments.length === 2) {
      const domain = domains.find(d => d.id === pathSegments[0]);
      const item = domain?.items.find(i => i.id === pathSegments[1]);
      return { domain, item };
    }

    return { domain: null, item: null };
  };

  const { domain, item } = getCurrentState();

  const handleSearch = (query: string) => {
    console.log('Search query:', query);
    // In production, this would trigger a global search across apps, dashboards, and data
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Top Navigation */}
      <TopNav
        currentDomain={domain || undefined}
        currentItem={item || undefined}
        allDomains={domains}
        onSearch={handleSearch}
      />

      {/* Main Layout: Sidebar + Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          domains={domains}
          currentDomain={domain?.id}
        />

        {/* Main Content Area */}
        <div className="flex-1 overflow-auto bg-slate-50">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/:domainId" element={<DomainPageRoute />} />
            <Route path="/:domainId/:itemId" element={<ItemPageRoute />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
