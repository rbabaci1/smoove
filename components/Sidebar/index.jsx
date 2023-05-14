import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { Drawer, Divider } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';
import {
  RiMenuUnfoldLine,
  RiMenuFoldLine,
  RiUserSettingsLine,
} from 'react-icons/ri';
import { AiOutlineHome, AiOutlineOrderedList } from 'react-icons/ai';
import { GrInProgress } from 'react-icons/gr';
import { BiLogOutCircle } from 'react-icons/bi';
import { FaUserCircle } from 'react-icons/fa';

import { auth } from '@/firebase/firebase.config';
import styles from './styles.module.scss';

const Sidebar = () => {
  const router = useRouter();
  const [open, setOpen] = useState(true);
  const { status } = useSelector(state => state.order);
  const [active, setActive] = useState(status === 'draft' ? 0 : 1);
  const { displayName } = useSelector(state => state.auth.user);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const logOut = () => {
    router.replace('/login');
    auth.signOut();
  };

  const routeHome = () => {
    router.push('/');
  };

  return (
    <div className={styles.container}>
      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.iconContainer}
            initial={{ x: 0, opacity: 0 }}
            animate={{ x: 240, opacity: 1 }}
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
            initial={{ x: 240, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 240, opacity: 0 }}
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
        width={240}
        mask={false}
      >
        <div className='items'>
          <div className='btn-item'>
            <button onClick={() => router.push('/estimate')}>
              Book a move
            </button>
          </div>

          <Divider />

          {status === 'draft' && (
            <>
              <div className={`item ${active === 0 ? 'active-item' : ''}`}>
                <section onClick={() => setActive(0)}>
                  <GrInProgress />

                  <p>Current Move</p>
                </section>
              </div>

              <Divider />
            </>
          )}

          <div className='item'>
            <section onClick={routeHome}>
              <AiOutlineHome />
              <p>Home</p>
            </section>
          </div>

          <div className='item'>
            <section
              className={`${active === 1 ? 'active-item' : ''}`}
              onClick={() => setActive(1)}
            >
              <AiOutlineOrderedList />

              <p>My Moves</p>
            </section>
          </div>

          <div className='item'>
            <section
              className={`${active === 2 ? 'active-item' : ''}`}
              onClick={() => setActive(2)}
            >
              <RiUserSettingsLine />

              <p>My Account</p>
            </section>
          </div>

          <div className='item'>
            <section onClick={() => logOut()}>
              <BiLogOutCircle />

              <p>Log Out</p>
            </section>
          </div>
        </div>
      </Drawer>
    </div>
  );
};
export default Sidebar;
