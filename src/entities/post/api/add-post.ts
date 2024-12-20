import { db } from '@/shared/providers/firebase';
import { addDoc, collection, getDocs, orderBy, query } from 'firebase/firestore';
import { UserInfoType } from '@/entities';

// 포스트 작성
export const fetchAddPost = async (data: UserInfoType) => {
  try {
    await addDoc(collection(db, 'posts'), data);
  } catch (error: unknown) {
    console.log(error);
  }
};

// 포스트 리스트 가져오기
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
