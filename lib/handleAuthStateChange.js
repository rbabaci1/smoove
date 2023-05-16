import { auth } from '@/firebase/firebase.config';
import { setUser } from '@/state/reduxSlices/authSlice';

const handleAuthStateChange = dispatch => {
  return auth.onAuthStateChanged(user => {
    if (!user) {
      dispatch(setUser(null));
    }
  });
};

export default handleAuthStateChange;
