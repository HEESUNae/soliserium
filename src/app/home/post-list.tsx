'use client';

import { PostListType, useGetAllPost } from '@/entities';
import { Tab } from '@/widgets';
import { PostItem } from './post-item';
import styles from './post-list.module.css';

const tabBtns = [
  { id: 1, title: '전체 고민' },
  { id: 2, title: '내가 작성한 고민' },
];

export const PostList = () => {
  const { allPostList, myPostList } = useGetAllPost();

  if (!allPostList) return <></>;

  return (
    <>
      <Tab tabBtns={tabBtns}>
        <>
          {allPostList?.length ? (
            <div className={`${styles.listWrap} listWrap`}>
              <ul>
                {allPostList?.map((list: PostListType) => (
                  <PostItem data={list} key={list.id} />
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
                  <PostItem data={list} key={list.id} />
                ))}
              </ul>
            </div>
          ) : (
            <NotData />
          )}
        </>
      </Tab>
    </>
  );
};

function NotData() {
  return (
    <div className={styles.notData}>
      작성된 글이 없습니다.
      <br /> 첫번째 작성자가 되어주세요.
    </div>
  );
}
