import { db } from '@/shared/providers/firebase';
import { doc, deleteDoc } from 'firebase/firestore';

// 포스트 삭제
export const fetchDeletePost = async (postId: string) => {
  await deleteDoc(doc(db, 'posts', postId));
};
