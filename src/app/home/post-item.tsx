'use client';

import styles from './post-item.module.css';
import { getDayjsTime } from '@/shared';
import { PostListType, useGetPost } from '@/entities';
import { ProfilePhoto } from '@/widgets';

interface PostListProps {
  data: PostListType;
}

export const PostItem = ({ data }: PostListProps) => {
  const { handlePost } = useGetPost();

  return (
    <li className={styles.postList} key={data.id} onClick={() => handlePost(data.id!)}>
      <figure>
        <ProfilePhoto src={data.photoUrl} alt="" width={36} height={36} />
      </figure>
      <div className={styles.postContent}>
        <div className={styles.listTitle}>
          <h3>{data.name}</h3>
          <p className={styles.date}>{getDayjsTime(data.createAt)}</p>
        </div>
        <div className={styles.content}>
          <p>{data.content}</p>
        </div>
      </div>
    </li>
  );
};
