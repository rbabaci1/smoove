import { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { Drawer, Divider } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';
import {
  RiMenuUnfoldLine,
  RiMenuFoldLine,
  RiUserSettingsLine,
} from 'react-icons/ri';
import { AiOutlineHome, AiOutlineOrderedList } from 'react-icons/ai';
import { BiLogOutCircle } from 'react-icons/bi';
import { FaUserCircle } from 'react-icons/fa';

import { auth } from '@/firebase/firebase.config';
import { setUser } from '@/state/reduxSlices/authSlice';
import styles from './styles.module.scss';

const sidebarItems = [
  {
    title: <p>Home</p>,
    icon: <AiOutlineHome />,
    action: fc => fc(),
  },
  {
    title: <p>My Moves</p>,
    icon: <AiOutlineOrderedList />,
    action: fc => fc(),
  },
  {
    title: <p>My Account</p>,
    icon: <RiUserSettingsLine />,
    action: fc => fc(),
  },

  {
    title: <p>Log Out</p>,
    icon: <BiLogOutCircle />,
    action: fc => fc(),
  },
];

const Sidebar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(1);
  const { displayName } = useSelector(state => state.auth.user);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const setContainer = () => {
    console.log('setContainer');
  };

  const logOut = () => {
    console.log('logOut');
    // router.push('/login');
    // auth.signOut();
    // dispatch(setUser(null));
  };

  const routeHome = () => {
    console.log('routeHome');
    // router.push('/');
  };

  return (
    <div className={styles.container}>
      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.iconContainer}
            initial={{ x: 0, opacity: 0 }}
            animate={{ x: 250, opacity: 1 }}
            exit={{ x: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <RiMenuFoldLine
              onClick={toggleDrawer}
              className={styles.closeIcon}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!open && (
          <motion.div
            className={styles.iconContainer}
            initial={{ x: 250, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 250, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <RiMenuUnfoldLine
              className={styles.openIcon}
              onClick={toggleDrawer}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <Drawer
        title={
          <div className='title'>
            <FaUserCircle size={35} color='green' />
            <p>Hello, {displayName ? displayName : 'there!'}</p>
          </div>
        }
        className={styles.drawer}
        placement='left'
        closable={false}
        onClose={toggleDrawer}
        open={open}
        key='left'
        width={250}
        mask={false}
      >
        <div className='items'>
          <div className='btn-item'>
            <button onClick={() => router.push('/estimate')}>
              Book a move
            </button>
          </div>

          <Divider />

          {sidebarItems.map((item, index) => (
            <div key={index}>
              {index === 3 && <Divider />}

              <div
                onClick={() => {
                  setActive(index);
                  item.action(
                    index === 3
                      ? logOut
                      : index === 0
                      ? routeHome
                      : setContainer
                  );
                }}
                className={`item ${index === active ? 'active-item' : ''}`}
              >
                {item.icon}
                {item.title}
              </div>
            </div>
          ))}
        </div>
      </Drawer>
    </div>
  );
};
export default Sidebar;
