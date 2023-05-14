import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

const NoAuthRender = WrappedComponent => {
  const AuthWrapper = props => {
    const router = useRouter();
    const { user } = useSelector(state => state.auth);

    useEffect(() => {
      if (typeof window !== 'undefined' && user) {
        // Redirect to login page if user is not authenticated

        router.replace('/dashboard');
      }
    }, [user, router]);

    if (user) {
      // Render nothing on server-side until we know if user is authenticated
      return null;
    }

    // Render the wrapped component with authenticated user
    return <WrappedComponent {...props} />;
  };

  return AuthWrapper;
};

export default NoAuthRender;
