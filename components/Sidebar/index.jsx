import { useState } from 'react';
import { Drawer } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';
import { RiMenuUnfoldLine, RiMenuFoldLine } from 'react-icons/ri';

import styles from './styles.module.scss';

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    console.log('first');
    setOpen(true);
  };
  const hideDrawer = () => {
    setOpen(false);
  };

  return (
    <div className={styles.container}>
      {open ? (
        <RiMenuFoldLine onClick={hideDrawer} className={styles.closeIcon} />
      ) : (
        <RiMenuUnfoldLine className={styles.openIcon} onClick={showDrawer} />
      )}

      <Drawer
        title='Drawer'
        placement='left'
        closable={false}
        onClose={hideDrawer}
        open={open}
        key='left'
        width={280}
        mask={false}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </div>
  );
};
export default Sidebar;
