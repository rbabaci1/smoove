import { auth } from '@/firebase/firebase.config';
import { setUser } from '@/state/reduxSlices/authSlice';

const handleAuthStateChange = dispatch => {
  return auth.onAuthStateChanged(user => {
    if (user) {
      const {
        uid,
        accessToken,
        displayName,
        email,
        emailVerified,
        tenantId,
        phoneNumber,
      } = user;

      dispatch(
        setUser({
          uid,
          accessToken,
          displayName,
          email,
          emailVerified,
          tenantId,
          phoneNumber,
        })
      );
    } else {
      dispatch(setUser(null));
    }
  });
};

export default handleAuthStateChange;
