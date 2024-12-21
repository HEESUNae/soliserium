import { db } from '@/shared/providers/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { UserInfoType } from '@/entities';

// 포스트 작성
export const fetchAddPost = async (data: UserInfoType) => {
  try {
    await addDoc(collection(db, 'posts'), data);
  } catch (error: unknown) {
    console.log(error);
  }
};
