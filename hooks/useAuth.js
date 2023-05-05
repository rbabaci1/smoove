import { useSelector } from 'react-redux';
import { selectUser } from '@/reduxSlices/authSlice';

export const useAuth = () => {
  const user = useSelector(selectUser);

  return user;
};
