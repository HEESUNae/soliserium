import { db } from '@/shared/providers/firebase';
import { doc, getDoc } from 'firebase/firestore';

// 포스트 하나만 가져오기
export const fetchGetMail = async (id: string) => {
  const docRef = doc(db, 'mail', id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { ...docSnap.data(), id };
  } else {
    return null;
  }
};
