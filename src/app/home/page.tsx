import { PostBtn } from '@/features';
import styles from './page.module.css';
import { PostList } from '@/features';

export default function MainPage() {
  return (
    <div className={styles.main}>
      <PostBtn />
      <PostList />
    </div>
  );
}
