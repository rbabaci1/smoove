import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const user = useAuth();

  useEffect(() => {
    if (!user) {
      router.replace('/login');
    }
  }, [router, user]);

  return <>{user ? children : null}</>;
};

export default ProtectedRoute;
