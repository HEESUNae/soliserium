'use client';

import { fetchGetAllPost, useUserAuthStore } from '@/entities';
import { useOpenPostAddStore } from '@/features';
import { DocumentData } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export const useGetAllPost = () => {
  const [allPostList, setAllPostList] = useState<null | DocumentData>(null);
  const [myPostList, setMyPostList] = useState<null | DocumentData>(null);
  const { isOpen } = useOpenPostAddStore();
  const { userAuth } = useUserAuthStore();

  // 리스트 표출
  useEffect(() => {
    const getPostList = async () => {
      const posts = await fetchGetAllPost();
      if (posts) {
        setAllPostList(posts);

        const myPosts = posts.filter((item: DocumentData) => item.uid === userAuth.uid);
        setMyPostList(myPosts);
      }
    };
    getPostList();
  }, [isOpen, userAuth]);

  return { allPostList, myPostList };
};
