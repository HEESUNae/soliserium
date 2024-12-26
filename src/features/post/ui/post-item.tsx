'use client';

import styles from './post-item.module.css';
import { getDayjsTime } from '@/shared';
import { ProfilePhoto } from '@/widgets';
import { DocumentData } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

interface PostListProps {
  data: DocumentData;
}

export const PostItem = ({ data }: PostListProps) => {
  const router = useRouter();

  // 선택한 포스트로 이동
  const handlePost = (id: string) => {
    router.push(`/post?id=${id}`);
  };

  return (
    <li className={styles.postList} key={data.id} onClick={() => handlePost(data.id)}>
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
