'use client';

import styles from './page.module.css';
import { PostBtn, PostList, useOpenPostAddStore } from '@/features';
import { Tab } from '@/widgets';

const listData: any = [];
// const listData = [
//   {
//     id: 1,
//     photoUrl: '/icons/user-default.svg',
//     uid: '곰돌이',
//     content: '내용',
//   },
//   {
//     id: 2,
//     photoUrl: '/icons/user-default.svg',
//     uid: '토끼',
//     content: '내용2',
//   },
//   {
//     id: 3,
//     photoUrl: '/icons/user-default.svg',
//     uid: '토끼',
//     content: '내용2',
//   },
//   {
//     id: 4,
//     photoUrl: '/icons/user-default.svg',
//     uid: '토끼',
//     content: '내용2',
//   },
//   {
//     id: 5,
//     photoUrl: '/icons/user-default.svg',
//     uid: '토끼',
//     content: '내용2',
//   },
//   {
//     id: 6,
//     photoUrl: '/icons/user-default.svg',
//     uid: '토끼',
//     content: '내용2',
//   },
//   {
//     id: 7,
//     photoUrl: '/icons/user-default.svg',
//     uid: '토끼',
//     content: '내용2',
//   },
//   {
//     id: 8,
//     photoUrl: '/icons/user-default.svg',
//     uid: '토끼',
//     content: '내용2',
//   },
//   {
//     id: 9,
//     photoUrl: '/icons/user-default.svg',
//     uid: '토끼',
//     content: '내용2',
//   },
//   {
//     id: 10,
//     photoUrl: '/icons/user-default.svg',
//     uid: '토끼',
//     content: '내용2',
//   },
//   {
//     id: 11,
//     photoUrl: '/icons/user-default.svg',
//     uid: '토끼',
//     content: '내용2',
//   },
//   {
//     id: 12,
//     photoUrl: '/icons/user-default.svg',
//     uid: '토끼',
//     content: '내용2',
//   },
//   {
//     id: 13,
//     photoUrl: '/icons/user-default.svg',
//     uid: '토끼',
//     content: '내용2',
//   },
// ];

const tabBtns = [
  { id: 1, title: '전체 고민' },
  { id: 2, title: '내가 작성한 고민' },
];

export default function MainPage({}) {
  const { setIsOpen } = useOpenPostAddStore();

  return (
    <div className={styles.main}>
      <PostBtn onClick={() => setIsOpen(true)} />
      <Tab data={tabBtns}>
        <ul className={styles.listWrap}>
          {listData.map((list: any) => (
            <PostList data={list} key={list.id} />
          ))}
        </ul>
        <ul className={styles.listWrap}>
          {listData.map((list: any) => (
            <PostList data={list} key={list.id} />
          ))}
        </ul>
      </Tab>
    </div>
  );
}
