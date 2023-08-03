import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const NoAuthRender = WrappedComponent => {
  const NoAuthWrapper = props => {
    const router = useRouter();
    const { user } = useSelector(state => state.auth);

    useEffect(() => {
      if (typeof window !== 'undefined' && user) {
        if (user.displayName || user.email) {
          router.replace('/dashboard');
        } else {
          router.replace(`/dashboard/profile-info`);
        }
      }
    }, [user, router]);

    if (user) {
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
    }

    // Render the wrapped component with authenticated user
    return <WrappedComponent {...props} />;
  };

  return NoAuthWrapper;
};

export default NoAuthRender;
