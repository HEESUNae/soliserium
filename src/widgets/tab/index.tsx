'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';
import styles from './styles.module.css';
import { Button } from '@/shared';

interface TabProps {
  data: { id: number; title: string }[];
  children?: ReactNode;
}

export const Tab = ({ data, children }: TabProps) => {
  const [selectedTab, setSelectedTab] = useState(1);
  const selectedTabRef = useRef<null | HTMLDivElement>(null);

  // 탭 변경시 좌우 컨텐츠 이동
  useEffect(() => {
    if (selectedTabRef.current) {
      const bodyWidth = document.querySelector('body')?.getBoundingClientRect().width;
      selectedTabRef.current.style.transform = `translateX(${selectedTab === 1 ? '0px' : `-${bodyWidth}px`})`;
    }
  }, [selectedTab]);

  return (
    <>
      <div className={styles.nav}>
        <div className={styles.tabWrap}>
          {data.map((item) => (
            <Button key={item.id} className={item.id === selectedTab ? 'bottomLine' : ''} onClick={() => setSelectedTab(item.id)}>
              {item.title}
            </Button>
          ))}
        </div>
      </div>
      <div className={styles.tabContent}>
        <div ref={selectedTabRef} className={styles.tabRoller}>
          {children}
        </div>
      </div>
    </>
  );
};
