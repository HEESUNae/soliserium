import { fetchGetAllPost } from '@/entities';
import { Tab } from '@/widgets';
import { PostItem } from './post-item';
import styles from './post-list.module.css';
import { DocumentData } from 'firebase/firestore';
import { MyPostList } from './my-post';

const tabBtns = [
  { id: 1, title: '전체 고민' },
  { id: 2, title: '내가 작성한 고민' },
];

export const PostList = async () => {
  const allPostList = await fetchGetAllPost();

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
            <NotData />
          )}
          <MyPostList data={allPostList} />
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
