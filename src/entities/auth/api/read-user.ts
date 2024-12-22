import { db } from '@/shared/providers/firebase';
import { User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

// 기존 유저 정보 가져오기
export const fetchUserInfo = async (user: User) => {
  const docSnap = await getDoc(doc(db, 'users', user.uid));
  if (docSnap.exists()) {
    return docSnap.data();
  }
};
