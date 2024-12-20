'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';
import styles from './styles.module.css';
import { Button } from '@/shared';

interface TabProps {
  tabBtns: { id: number; title: string }[];
  children?: ReactNode;
  onClick?: () => void;
}

export const Tab = ({ tabBtns, children, onClick }: TabProps) => {
  const [selectedTab, setSelectedTab] = useState(1);
  const selectedTabRef = useRef<null | HTMLDivElement>(null);

  // 탭 변경시 좌우 컨텐츠 이동
  useEffect(() => {
    if (selectedTabRef.current) {
      const bodyWidth = document.querySelector('body')?.getBoundingClientRect().width;
      selectedTabRef.current.style.transform = `translateX(${selectedTab === 1 ? '0px' : `-${bodyWidth}px`})`;
    }
  }, [selectedTab]);

  const handleTabBtn = (tabId: number) => {
    setSelectedTab(tabId);

    // 탭을 클릭했을때 탭버튼 위치로 스크롤 변경
    onClick?.();
  };

  return (
    <>
      <div className={styles.nav}>
        <div className={styles.tabWrap}>
          {tabBtns.map((item) => (
            <Button key={item.id} className={item.id === selectedTab ? 'bottomLine' : ''} onClick={() => handleTabBtn(item.id)}>
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
