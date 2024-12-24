import { db } from '@/shared/providers/firebase';
import { doc, updateDoc } from 'firebase/firestore';

// 포스트 업데이트
export const fetchUpdateMail = async (mailId: string, mailCheck: boolean) => {
  const washingtonRef = doc(db, 'mail', mailId);
  await updateDoc(washingtonRef, {
    mailCheck,
  });
};
