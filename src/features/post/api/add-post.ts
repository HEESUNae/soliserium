import { db } from '@/shared/providers/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { UserInfoType } from '@/shared';

interface PostType extends UserInfoType {
  sendUserUid?: string | number;
  sendUserName?: string;
  sendPhotoUrl?: string;
  receiveUserUid?: string;
  receiveUserName?: string;
  mailCheck?: boolean;
}

// 포스트 작성
export const fetchAddPost = async (data: PostType, name: string) => {
  await addDoc(collection(db, name), data);
};
