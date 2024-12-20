'use client';

import { useEffect, useState } from 'react';
import { DocumentData } from 'firebase/firestore';
import styles from './page.module.css';
import { PostListType } from '@/entities';
import { PostBtn, PostList, useOpenPostAddStore, fetchGetAllPost } from '@/features';
import { Tab } from '@/widgets';

const listData = [{ id: '1', name: 'sss', photoUrl: '/images/user-default.svg', content: '123', uid: '123', createAt: '2024-12-12' }];

const tabBtns = [
  { id: 1, title: '전체 고민' },
  { id: 2, title: '내가 작성한 고민' },
];

export default function MainPage({}) {
  const { isOpen, setIsOpen } = useOpenPostAddStore();
  const [allPostList, setAllPostList] = useState<null | DocumentData>(null);

  // 리스트 표출
  useEffect(() => {
    const getPost = async () => {
      const posts = await fetchGetAllPost();
      if (posts) setAllPostList(posts);
    };
    getPost();
  }, [isOpen]);

  return (
    <div className={styles.main}>
      <PostBtn onClick={() => setIsOpen(true)} />
      <Tab data={tabBtns}>
        <>
          {allPostList?.length ? (
            <ul className={styles.listWrap}>
              {allPostList?.map((list: PostListType) => (
                <PostList data={list} key={list.id} />
              ))}
            </ul>
          ) : (
            <NotData />
          )}

          {listData.length ? (
            <ul className={styles.listWrap}>
              {listData.map((list: PostListType) => (
                <PostList data={list} key={list.id} />
              ))}
            </ul>
          ) : (
            <NotData />
          )}
        </>
      </Tab>
    </div>
  );
}

function NotData() {
  return (
    <div className={styles.notData}>
      작성된 글이 없습니다.
      <br /> 첫번째 작성자가 되어주세요.
    </div>
  );
}
