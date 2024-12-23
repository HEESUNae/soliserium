'use client';
import { fetchGetAllPost, useUserAuthStore } from '@/entities';
import { Tab } from '@/widgets';
import { PostItem } from './post-item';
import styles from './post-list.module.css';
import { DocumentData } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useOpenPostAddStore } from '@/features';
import { NotData } from '@/widgets/not-data';

const tabBtns = [
  { id: 1, title: '전체 고민' },
  { id: 2, title: '내가 작성한 고민' },
];

export const PostList = () => {
  const [allPostList, setAllPostList] = useState<null | DocumentData>(null);
  const [myPosts, setMyPosts] = useState<null | DocumentData>(null);
  const { userAuth } = useUserAuthStore();
  const { isOpen } = useOpenPostAddStore();

  useEffect(() => {
    const getAllpost = async () => {
      const data = await fetchGetAllPost();
      setAllPostList(data);
      if (data) {
        const myPostData = data.filter((item: DocumentData) => item.uid === userAuth.uid);
        setMyPosts(myPostData);
      }
    };
    getAllpost();
  }, [isOpen]);

  if (!allPostList) return <></>;

  return (
    <>
      <Tab tabBtns={tabBtns}>
        <>
          {allPostList?.length ? (
            <div className={`${styles.listWrap} listWrap`}>
              <ul>
                {allPostList?.map((list: DocumentData) => (
                  <PostItem data={list} key={list.id} />
                ))}
              </ul>
            </div>
          ) : (
            <NotData>
              작성된 글이 없습니다.
              <br /> 첫번째 작성자가 되어주세요.
            </NotData>
          )}
          {myPosts?.length ? (
            <div className={`${styles.listWrap} listWrap`}>
              <ul>
                {myPosts.map((list: DocumentData) => (
                  <PostItem data={list} key={list.id} />
                ))}
              </ul>
            </div>
          ) : (
            <NotData>
              작성된 글이 없습니다.
              <br /> 첫번째 작성자가 되어주세요.
            </NotData>
          )}
        </>
      </Tab>
    </>
  );
};
