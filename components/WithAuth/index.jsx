import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const WithAuth = WrappedComponent => {
  const AuthWrapper = props => {
    const router = useRouter();
    const { user } = useSelector(state => state.auth);

    useEffect(() => {
      if (typeof window !== 'undefined' && !user) {
        // Redirect to login page if user is not authenticated
        router.replace('/login');
      }
    }, [user, router]);

    if (!user) {
      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100vw',
            height: '100vh',
          }}
        >
          <AiOutlineLoading3Quarters
            className='loading'
            style={{ fontSize: '2rem' }}
          />
        </div>
      );
    } else if (!user.displayName && !user.email) {
      // Redirect to profile info page if user has not completed profile info
      router.replace('/dashboard/profile-info');
    }

    // Render the wrapped component with authenticated user
    return <WrappedComponent {...props} />;
  };

  return AuthWrapper;
};

export default WithAuth;
