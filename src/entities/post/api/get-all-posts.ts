import { db } from '@/shared/providers/firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';

// 포스트 리스트 전체 가져오기
export const fetchGetAllPost = async () => {
  try {
    const citiesRef = collection(db, 'posts');
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
