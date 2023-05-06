import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const WithAuth = WrappedComponent => {
  const AuthWrapper = props => {
    const router = useRouter();
    const user = useSelector(state => state.auth.user);

    useEffect(() => {
      if (typeof window !== 'undefined' && !user) {
        // Redirect to login page if user is not authenticated
        router.push('/login');
      }
    }, [user, router]);

    if (!user) {
      // Render nothing on server-side until we know if user is authenticated
      return null;
    }

    // Render the wrapped component with authenticated user
    return <WrappedComponent {...props} />;
  };

  return AuthWrapper;
};

export default WithAuth;
