import { db } from '@/shared/providers/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { UserInfoType } from '@/entities';

// 포스트 작성
export const fetchAddPost = async (data: UserInfoType) => {
  await addDoc(collection(db, 'posts'), data);
};
