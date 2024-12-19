'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './page.module.css';
import { PostBtn, PostAdd, PostList } from '@/features';
import { Button } from '@/shared';
import { AnimatePresence } from 'motion/react';

const listData = [
  {
    id: 1,
    photoUrl: '/icons/user-default.svg',
    uid: '곰돌이',
    content: '내용',
  },
  {
    id: 2,
    photoUrl: '/icons/user-default.svg',
    uid: '토끼',
    content: '내용2',
  },
  {
    id: 3,
    photoUrl: '/icons/user-default.svg',
    uid: '토끼',
    content: '내용2',
  },
  {
    id: 4,
    photoUrl: '/icons/user-default.svg',
    uid: '토끼',
    content: '내용2',
  },
  {
    id: 5,
    photoUrl: '/icons/user-default.svg',
    uid: '토끼',
    content: '내용2',
  },
  {
    id: 6,
    photoUrl: '/icons/user-default.svg',
    uid: '토끼',
    content: '내용2',
  },
  {
    id: 7,
    photoUrl: '/icons/user-default.svg',
    uid: '토끼',
    content: '내용2',
  },
  {
    id: 8,
    photoUrl: '/icons/user-default.svg',
    uid: '토끼',
    content: '내용2',
  },
  {
    id: 9,
    photoUrl: '/icons/user-default.svg',
    uid: '토끼',
    content: '내용2',
  },
  {
    id: 10,
    photoUrl: '/icons/user-default.svg',
    uid: '토끼',
    content: '내용2',
  },
  {
    id: 11,
    photoUrl: '/icons/user-default.svg',
    uid: '토끼',
    content: '내용2',
  },
];

export default function MainPage() {
  const [isOpenPostAdd, setIsOpenPostAdd] = useState(false);
  const handleOpenPostAdd = () => {
    setIsOpenPostAdd(!isOpenPostAdd);
  };

  const selectedTabRef = useRef<null | HTMLDivElement>(null);

  const tabs = [
    { id: 1, title: '전체 고민' },
    { id: 2, title: '내가 작성한 고민' },
  ];
  const [selectedTab, setSelectedTab] = useState(1);

  // 탭 변경시 좌우 컨텐츠 이동
  useEffect(() => {
    if (selectedTabRef.current) {
      const bodyWidth = document.querySelector('body')?.getBoundingClientRect().width;
      selectedTabRef.current.style.transform = `translateX(${selectedTab === 1 ? '0px' : `-${bodyWidth}px`})`;
    }
  }, [selectedTab]);

  return (
    <div className={styles.main}>
      <PostBtn onClick={handleOpenPostAdd} />
      <nav>
        <div className={styles.tabWrap}>
          {tabs.map((item) => (
            <Button key={item.id} className={item.id === selectedTab ? 'bottomLine' : ''} onClick={() => setSelectedTab(item.id)}>
              {item.title}
            </Button>
          ))}
        </div>
      </nav>
      <div ref={selectedTabRef} className={styles.tabContent}>
        <ul className={styles.listWrap}>
          {listData.map((list) => (
            <PostList data={list} key={list.id} />
          ))}
        </ul>
        <ul className={styles.listWrap}>
          {listData.map((list) => (
            <PostList data={list} key={list.id} />
          ))}
        </ul>
      </div>
      <AnimatePresence>{isOpenPostAdd && <PostAdd onClick={handleOpenPostAdd} />}</AnimatePresence>
    </div>
  );
}
