'use client';

import { useEffect, useState } from 'react';
import { DocumentData } from 'firebase/firestore';
import styles from './page.module.css';
import { PostListType, useUserAuthStore, fetchGetAllPost } from '@/entities';
import { PostBtn, useOpenPostAddStore } from '@/features';
import { Loading, Tab } from '@/widgets';
import { PostList } from './post-list';

const tabBtns = [
  { id: 1, title: '전체 고민' },
  { id: 2, title: '내가 작성한 고민' },
];

export default function MainPage() {
  const { isOpen, setIsOpen } = useOpenPostAddStore();
  const [allPostList, setAllPostList] = useState<null | DocumentData>(null);
  const [myPostList, setMyPostList] = useState<null | DocumentData>(null);
  const { userAuth } = useUserAuthStore();

  // 리스트 표출
  useEffect(() => {
    const getPostList = async () => {
      const posts = await fetchGetAllPost();
      if (posts) {
        setAllPostList(posts);
        const myPosts = posts.filter((item: DocumentData) => item.uid === userAuth.uid);
        setMyPostList(myPosts);
      }
    };
    getPostList();
  }, [isOpen, userAuth]);

  if (!allPostList) return <Loading />;

  return (
    <div className={styles.main}>
      <PostBtn onClick={() => setIsOpen(true)} />
      <Tab tabBtns={tabBtns}>
        <>
          {allPostList?.length ? (
            <div className={`${styles.listWrap} listWrap`}>
              <ul>
                {allPostList?.map((list: PostListType) => (
                  <PostList data={list} key={list.id} />
                ))}
              </ul>
            </div>
          ) : (
            <NotData />
          )}
          {myPostList?.length ? (
            <div className={`${styles.listWrap} listWrap`}>
              <ul>
                {myPostList.map((list: PostListType) => (
                  <PostList data={list} key={list.id} />
                ))}
              </ul>
            </div>
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
