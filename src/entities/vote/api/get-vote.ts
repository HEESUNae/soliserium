import { db } from '@/shared/providers/firebase';
import { collection, getDocs } from 'firebase/firestore';

// 트펴 전체 가져오기
export const fetchGetAllVote = async () => {
  try {
    const citiesRef = collection(db, 'vote');
    const querySnapshot = await getDocs(citiesRef);
    const posts = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return posts;
  } catch (e) {
    console.log(e);
    return [];
  }
};
