import { useParams, useNavigate } from 'react-router-dom';
import { DomainPage } from '../DomainPage';
import { domains } from '../../data/domains';

export function DomainPageRoute() {
  const { domainId } = useParams<{ domainId: string }>();
  const navigate = useNavigate();

  const domain = domains.find(d => d.id === domainId);

  if (!domain) {
    return (
      <div className="p-8 bg-slate-50">
        <div className="text-center">
          <h1 className="text-2xl text-slate-900 mb-4">Domain Not Found</h1>
          <p className="text-slate-600">The requested domain "{domainId}" does not exist.</p>
        </div>
      </div>
    );
  }

  const handleNavigateToItem = (itemId: string) => {
    navigate(`/${domainId}/${itemId}`);
  };

  return (
    <DomainPage
      domain={domain}
      onNavigateToItem={handleNavigateToItem}
    />
  );
}
