import { db } from '@/shared/providers/firebase';
import { DocumentData, doc, updateDoc } from 'firebase/firestore';

// 투표 업데이트
export const fetchUpdateVote = async (voteId: string, option: DocumentData) => {
  const washingtonRef = doc(db, 'vote', voteId);
  await updateDoc(washingtonRef, option);
};
