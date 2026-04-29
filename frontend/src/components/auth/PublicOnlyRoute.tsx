import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from './AuthProvider';

export default function PublicOnlyRoute() {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();
  const from = location.state?.from;
  const target = from
    ? `${from.pathname ?? ''}${from.search ?? ''}${from.hash ?? ''}`
    : '/history';

  if (loading) {
    return null;
  }

  if (isAuthenticated) {
    return <Navigate to={target} replace />;
  }

  return <Outlet />;
}
