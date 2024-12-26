import { db } from '@/shared/providers/firebase';
import { doc, deleteDoc } from 'firebase/firestore';

// 메일 삭제
export const fetchDeleteMail = async (mailId: string) => {
  await deleteDoc(doc(db, 'mail', mailId));
};
