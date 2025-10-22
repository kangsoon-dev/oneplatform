import { useNavigate } from 'react-router-dom';
import { WelcomePage } from '../WelcomePage';

export function HomePage() {
  const navigate = useNavigate();

  const handleNavigate = (domainId: string, itemId?: string) => {
    if (itemId) {
      navigate(`/${domainId}/${itemId}`);
    } else {
      navigate(`/${domainId}`);
    }
  };

  return <WelcomePage onNavigate={handleNavigate} />;
}
