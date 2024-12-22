import { db } from '@/shared/providers/firebase';
import { doc, updateDoc } from 'firebase/firestore';

// 포스트 업데이트
export const fetchUpdatePost = async (postId: string, content: string) => {
  const washingtonRef = doc(db, 'posts', postId);
  await updateDoc(washingtonRef, {
    content,
  });
};
