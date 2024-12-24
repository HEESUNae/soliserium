import { db } from '@/shared/providers/firebase';
import { doc, updateDoc } from 'firebase/firestore';

export const fetchUpdateUser = async (userId: string, isVote: boolean) => {
  const washingtonRef = doc(db, 'users', userId);
  await updateDoc(washingtonRef, {
    isVote,
  });
};
