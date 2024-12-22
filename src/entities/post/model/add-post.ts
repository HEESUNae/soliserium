'use client';

import { fetchAddPost, useUserAuthStore } from '@/entities';
import { useOpenPostAddStore } from '../../../features/post/model/open-post-add-store';
import { useState } from 'react';
import dayjs from 'dayjs';
import { fetchUpdatePost } from '@/entities/post/api/update-post';
import { DocumentData } from 'firebase/firestore';

export const usePostWrite = (data: DocumentData) => {
  const { setIsOpen } = useOpenPostAddStore();
  const { userAuth } = useUserAuthStore();
  const [textareaValue, setTextareaValue] = useState<string>('');

  const handleTextareaValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(e.target.value);
  };

  // 포스트 작성
  const handleAddPost = async () => {
    if (!textareaValue) return alert('내용을 작성해주세요');
    const now = dayjs();
    const createTimestemp = dayjs(now).valueOf();
    try {
      const postData = {
        uid: userAuth.uid,
        name: userAuth.name,
        photoUrl: userAuth.photoURL,
        createAt: createTimestemp,
        content: textareaValue,
      };
      await fetchAddPost(postData);
      setIsOpen(false);
    } catch (e) {
      alert('포스트 작성에 실패했습니다. 다시 시도해주세요.');
      console.log(e);
    }
  };

  // 포스트 수정
  const handleUpdatePost = async () => {
    if (!textareaValue) return alert('내용을 작성해주세요');
    try {
      if (data) {
        await fetchUpdatePost(data.id, textareaValue);
        setIsOpen(false);
      }
    } catch (e) {
      alert('포스트 수정에 실패했습니다. 다시 시도해주세요.');
      console.log(e);
    }
  };

  return { handleTextareaValue, handleUpdatePost, handleAddPost };
};
