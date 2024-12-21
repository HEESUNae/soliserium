'use client';

import styles from './post-list.module.css';
import { useRouter } from 'next/navigation';
import { getDayjsTime } from '@/shared';
import { PostListType } from '@/entities';
import { ProfilePhoto } from '@/widgets';

interface PostListProps {
  data: PostListType;
}

export const PostList = ({ data }: PostListProps) => {
  const router = useRouter();

  const handlePost = (id: string) => {
    router.push(`/post?id=${id}`);
  };

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
