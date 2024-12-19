import styles from './post-list.module.css';
import { ProfilePhoto } from '@/widgets/profile-photo';

interface PostListProps {
  data: {
    content: string;
    id: number;
    photoUrl: string;
    uid: string;
  };
}

export const PostList = ({ data }: PostListProps) => {
  return (
    <li className={styles.postList}>
      <figure>
        <ProfilePhoto src={'/images/user-default.png'} alt="" width={36} height={36} />
      </figure>
      <div>
        <h3>{data.uid}</h3>
        <div className={styles.content}>
          <p>{data.content}</p>
        </div>
      </div>
    </li>
  );
};
