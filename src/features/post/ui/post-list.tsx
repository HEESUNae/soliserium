import { useMemo } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
import styles from './post-list.module.css';
import { PostListType } from '@/entities';
import { ProfilePhoto } from '@/widgets';

interface PostListProps {
  data: PostListType;
}

export const PostList = ({ data }: PostListProps) => {
  // 리스트 몇분전.. 쓰자
  dayjs.extend(relativeTime);
  dayjs.locale('ko');

  //TODO: 초 단위 계산 작업하기
  const listSecond = useMemo(() => {
    const iosDate = dayjs(data.createAt).toISOString(); // 작성일자
    return dayjs(iosDate).fromNow();
    // console.log(postDate.fromNow());
    // const diffInSeconds = now.diff(pastDate, 'second'); // 초 단위 차이 계산
    // return postDate.fromNow();
  }, [data]);

  return (
    <li className={styles.postList} key={data.id}>
      <figure>
        <ProfilePhoto src={data.photoUrl} alt="" width={36} height={36} />
      </figure>
      <div className={styles.postContent}>
        <div className={styles.listTitle}>
          <h3>{data.name}</h3>
          <p className={styles.date}>{listSecond}</p>
        </div>
        <div className={styles.content}>
          <p>{data.content}</p>
        </div>
      </div>
    </li>
  );
};
