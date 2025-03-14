
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import UserDashboard from './UserDashboard';
import ProviderDashboard from './ProviderDashboard';
import { Loader2 } from 'lucide-react';

const Dashboard = () => {
  const { isAuthenticated, user, loading, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        navigate('/login');
      } else if (isAdmin) {
        navigate('/admin');
      }
    }
  }, [isAuthenticated, loading, navigate, isAdmin]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-doit-400" />
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null; // Will redirect to login via useEffect
  }

  // If admin, this will only briefly show before redirecting
  if (isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen pt-20 bg-muted/50">
      {user.role === 'provider' ? <ProviderDashboard /> : <UserDashboard />}
    </div>
  );
};

export default Dashboard;
