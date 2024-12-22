'use client';

import styles from './my-post.module.css';
import { DocumentData } from 'firebase/firestore';
import { PostItem } from './post-item';
import { useUserAuthStore } from '@/entities';

interface MyPostListProps {
  data: DocumentData;
}

export const MyPostList = ({ data }: MyPostListProps) => {
  const { userAuth } = useUserAuthStore();
  const myPosts = data.filter((item: DocumentData) => item.uid === userAuth.uid);
  return (
    <>
      {myPosts?.length ? (
        <div className={`${styles.listWrap} listWrap`}>
          <ul>
            {myPosts.map((list: DocumentData) => (
              <PostItem data={list} key={list.id} />
            ))}
          </ul>
        </div>
      ) : (
        <NotData />
      )}
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
