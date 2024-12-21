import { motion } from 'motion/react';
import { ReactNode } from 'react';
import { Header } from '..';
import styles from './style.module.css';

interface BottomSheetProps {
  children: ReactNode;
  title?: string;
  left?: ReactNode;
  right?: ReactNode;
}

export const BottomSheet = ({ children, title, left, right }: BottomSheetProps) => {
  return (
    <div className={styles.bottomSheet} key="modal">
      <motion.div className={styles.backdrop} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}></motion.div>
      <motion.div
        className={styles.bottomSheetBox}
        initial={{ transform: `translateY(700px)` }}
        animate={{ transform: 'translateY(0px)' }}
        transition={{ ease: 'easeOut', duration: 0.3 }}
        exit={{ transform: `translateY(700px)` }}
      >
        <Header>
          {left}
          <h2>{title}</h2>
          {right ? right : <div className={styles.visibility}></div>}
        </Header>
        <div className={styles.content}>{children}</div>
      </motion.div>
    </div>
  );
};
