import React, { useMemo, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { Refine, Authenticated } from '@refinedev/core';
import { RefineKbar, RefineKbarProvider, useRegisterActions } from '@refinedev/kbar';
import routerProvider from '@refinedev/react-router';
import { Sidebar } from './components/Sidebar';
import { TopNav } from './components/TopNav';
import { HomePage } from './components/routes/HomePage';
import { DomainPageRoute } from './components/routes/DomainPageRoute';
import { ItemPageRoute } from './components/routes/ItemPageRoute';
import { LoginPage } from './components/routes/LoginPage';
import { authProvider } from './providers/authProvider';
import { apiDataProvider } from './providers/dataProvider';
import { domains } from './data/domains';

// Inner component to register actions after KBar is initialized
function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();

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

  // Generate KBar actions from domains data
  const kbarActions = useMemo(() => {
    const actions: any[] = [];

    // Add home action
    actions.push({
      id: 'home',
      name: 'Home',
      section: 'Navigation',
      perform: () => navigate('/'),
      keywords: 'home dashboard main',
    });

    // Add actions for each domain and their items
    domains.forEach((domain) => {
      const domainId = `domain-${domain.id}`;

      // Add domain action
      actions.push({
        id: domainId,
        name: domain.name,
        section: 'Domains',
        subtitle: domain.description,
        perform: () => navigate(`/${domain.id}`),
        keywords: `${domain.name.toLowerCase()} ${domain.description.toLowerCase()}`,
      });

      // Add actions for each item in the domain as children (hidden until searched)
      domain.items.forEach((domainItem) => {
        actions.push({
          id: `item-${domain.id}-${domainItem.id}`,
          name: domainItem.name,
          parent: domainId, // Make items children of domain
          subtitle: domainItem.description || `${domainItem.type} in ${domain.name}`,
          perform: () => navigate(`/${domain.id}/${domainItem.id}`),
          keywords: `${domainItem.name.toLowerCase()} ${(domainItem.description || '').toLowerCase()} ${domainItem.type} ${domain.name.toLowerCase()}`,
        });
      });
    });

    return actions;
  }, [navigate]);

  // Register actions with KBar
  useRegisterActions(kbarActions, [kbarActions]);

  return (
    <Refine
      authProvider={authProvider}
      dataProvider={apiDataProvider}
      routerProvider={routerProvider}
      resources={[]}
      options={{
        syncWithLocation: true,
        warnWhenUnsavedChanges: true,
        disableTelemetry: true,
      }}
    >
      <Routes>
        {/* Public route - Login */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected routes */}
        <Route
          path="*"
          element={
            <Authenticated
              key="authenticated-routes"
              fallback={<Navigate to="/login" replace />}
            >
              <div className="h-screen flex flex-col overflow-hidden">
                {/* Top Navigation */}
                <TopNav
                  currentDomain={domain || undefined}
                  currentItem={item || undefined}
                  allDomains={domains}
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
            </Authenticated>
          }
        />
      </Routes>

      {/* Command Palette (Cmd/Ctrl + K) */}
      <RefineKbar />
    </Refine>
  );
}

// Main App component with providers
export default function App() {
  return (
    <RefineKbarProvider>
      <AppContent />
    </RefineKbarProvider>
  );
}
