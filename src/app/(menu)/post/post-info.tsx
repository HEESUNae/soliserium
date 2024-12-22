'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { DocumentData } from 'firebase/firestore';
import styles from './page.module.css';
import { BottomSheet, ProfilePhoto } from '@/widgets';
import { Button, getDayjsTime } from '@/shared';
import { fetchGetPost, useUserAuthStore } from '@/entities';
import { PostWrite } from '@/features/post/ui/post-write';
import { useOpenPostAddStore } from '@/features';
import { fetchDeletePost } from '@/entities/post/api/delete-post';
import { useRouter } from 'next/navigation';

export const PostInfo = () => {
  const { isOpen, setIsOpen } = useOpenPostAddStore();
  const postId = useSearchParams().get('id') || '';
  const [postList, setPostList] = useState<null | DocumentData>(null);
  const { userAuth } = useUserAuthStore();
  const router = useRouter();

  // 포스트 삭제
  const handleDeletePost = async (postId: string) => {
    try {
      await fetchDeletePost(postId);
      router.push('/home');
    } catch (e) {
      console.log(e);
      alert('포스트 삭제에 실패했습니다. 다시 시도해주세요.');
    }
  };

  useEffect(() => {
    const getPost = async () => {
      const posts = await fetchGetPost(postId as string);
      setPostList(posts);
    };
    getPost();
  }, [postId, isOpen]);

  if (!postList) return <></>;

  return (
    <>
      <div className={styles.content}>
        <div className={styles.titleWrap}>
          <ProfilePhoto src={postList?.photoUrl} alt="" width={20} height={20} />
          <h3>{postList?.name}</h3>
          <p className={styles.date}>{getDayjsTime(postList.createAt)}</p>
        </div>
        <div className={styles.contentWrap}>
          <p>{postList?.content}</p>
        </div>
      </div>
      <div className={styles.bottomBtns}>
        {postList.uid !== userAuth.uid ? (
          <Button className="fill">
            <Image src="/icons/mail/mail-close.svg" alt="" width={20} height={20} />
            우편 보내기
          </Button>
        ) : (
          <div className={styles.editBtnWrap}>
            <Button className="outline" onClick={() => handleDeletePost(postList.id)}>
              삭제
            </Button>
            <Button className="fill" onClick={() => setIsOpen(true)}>
              수정
            </Button>
          </div>
        )}
      </div>
      {isOpen && (
        <BottomSheet title="포스트 수정하기" left={<Button onClick={() => setIsOpen(false)}>취소</Button>}>
          <PostWrite data={postList} />
        </BottomSheet>
      )}
    </>
  );
};
