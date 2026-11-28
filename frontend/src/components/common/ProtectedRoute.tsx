import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Loader from './Loader';

interface ProtectedRouteProps {
  allowedTypes?: string[];
}

export default function ProtectedRoute({ allowedTypes }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <Loader label="Verificando sesión..." fullScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // El login actual no incluye el tipo/rol en su respuesta.
  // No se debe inventar ni inferir un permiso administrativo.
  if (allowedTypes && allowedTypes.length > 0) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
