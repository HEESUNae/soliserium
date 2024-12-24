'use client';

import { fetchAddPost, useUserAuthStore } from '@/entities';
import { useOpenPostAddStore } from '../../../features/post/model/open-post-add-store';
import { useState } from 'react';
import dayjs from 'dayjs';
import { fetchUpdatePost } from '@/entities/post/api/update-post';
import { DocumentData } from 'firebase/firestore';
import { usePathname, useRouter } from 'next/navigation';

export const usePostWrite = (postData: DocumentData, mode: string) => {
  const { setIsOpen } = useOpenPostAddStore();
  const { userAuth } = useUserAuthStore();
  const [textareaValue, setTextareaValue] = useState<string>('');
  const router = useRouter();
  const path = usePathname();

  const handleTextareaValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(e.target.value);
  };

  // 포스트 작성
  const handleAddPost = async () => {
    if (!textareaValue) return alert('내용을 작성해주세요');
    const now = dayjs();
    const createTimestemp = dayjs(now).valueOf();
    try {
      const data = {
        uid: userAuth.uid,
        name: userAuth.name,
        photoUrl: userAuth.photoURL,
        createAt: createTimestemp,
        content: textareaValue,
      };
      await fetchAddPost(data, 'posts');
      setIsOpen(false);
      if (path !== '/home') router.push('/home');
    } catch (e) {
      alert('포스트 작성에 실패했습니다. 다시 시도해주세요.');
      console.log(e);
    }
  };

  // 포스트 수정
  const handleUpdatePost = async () => {
    if (!textareaValue) return alert('내용을 작성해주세요');
    try {
      if (mode === 'update') {
        await fetchUpdatePost(postData.id, textareaValue);
      }
      if (mode === 'send') {
        const now = dayjs();
        const createTimestemp = dayjs(now).valueOf();
        const data = {
          sendUserUid: userAuth.uid,
          sendUserName: userAuth.name,
          sendPhotoUrl: userAuth.photoURL,
          receiveUserUid: postData.uid,
          receiveUserName: postData.name,
          content: textareaValue,
          createAt: createTimestemp,
          mailCheck: false,
        };
        await fetchAddPost(data, 'mail');
        alert('우편이 상대방에게 전송되었습니다.');
      }
      setIsOpen(false);
    } catch (e) {
      alert('포스트 수정에 실패했습니다. 다시 시도해주세요.');
      console.log(e);
    }
  };

  return { handleTextareaValue, handleUpdatePost, handleAddPost };
};
