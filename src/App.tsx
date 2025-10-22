import { useState, useMemo } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopNav } from './components/TopNav';
import { WelcomePage } from './components/WelcomePage';
import { DomainPage } from './components/DomainPage';
import { DashboardView } from './components/DashboardView';
import { AppView } from './components/AppView';
import { domains } from './data/domains';

export default function App() {
  const [currentDomain, setCurrentDomain] = useState<string | null>(null);
  const [currentItem, setCurrentItem] = useState<string | null>(null);

  // Get current domain and item objects
  const domain = useMemo(
    () => domains.find(d => d.id === currentDomain),
    [currentDomain]
  );

  const item = useMemo(
    () => domain?.items.find(i => i.id === currentItem),
    [domain, currentItem]
  );

  // Navigation handlers
  const handleNavigate = (domainId: string, itemId?: string) => {
    setCurrentDomain(domainId);
    setCurrentItem(itemId || null);
  };

  const handleNavigateToItem = (itemId: string) => {
    setCurrentItem(itemId);
  };

  const handleNavigateHome = () => {
    setCurrentDomain(null);
    setCurrentItem(null);
  };

  const handleSearch = (query: string) => {
    console.log('Search query:', query);
    // In production, this would trigger a global search across apps, dashboards, and data
  };

  // Render main content based on current state
  const renderContent = () => {
    // Show specific item (dashboard or app)
    if (item && domain) {
      if (item.type === 'dashboard') {
        return <DashboardView title={item.name} embedUrl={item.embedUrl || ''} />;
      } else {
        return <AppView item={item} />;
      }
    }

    // Show domain page
    if (domain) {
      return (
        <DomainPage
          domain={domain}
          onNavigateToItem={handleNavigateToItem}
        />
      );
    }

    // Show welcome page
    return <WelcomePage onNavigate={handleNavigate} />;
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Top Navigation */}
      <TopNav
        currentDomain={domain}
        currentItem={item}
        allDomains={domains}
        onSearch={handleSearch}
        onNavigateHome={handleNavigateHome}
        onNavigate={handleNavigate}
      />

      {/* Main Layout: Sidebar + Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          domains={domains}
          currentDomain={currentDomain || undefined}
          currentItem={currentItem || undefined}
          onNavigate={handleNavigate}
        />

        {/* Main Content Area */}
        <div className="flex-1 overflow-auto bg-slate-50">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
