import { db } from '@/shared/providers/firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';

// 매일 모두 가져오기
export const fetchAllMail = async () => {
  try {
    const citiesRef = collection(db, 'mail');
    const q = query(citiesRef, orderBy('createAt', 'desc'));

    const querySnapshot = await getDocs(q);
    const posts = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return posts;
  } catch (e) {
    console.log(e);
    return null;
  }
};
