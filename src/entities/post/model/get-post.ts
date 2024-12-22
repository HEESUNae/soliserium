'use client';

import { useRouter } from 'next/navigation';

export const useGetPost = () => {
  const router = useRouter();

  // 선택한 포스트로 이동
  const handlePost = (id: string) => {
    router.push(`/post?id=${id}`);
  };

  return {
    handlePost,
  };
};
