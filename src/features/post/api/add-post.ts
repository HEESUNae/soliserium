import { UserInfoType, getErrorMessage } from '@/entities';
import { db } from '@/shared/providers/firebase';
import { error } from 'console';
import { FirebaseError } from 'firebase/app';
import { doc, setDoc } from 'firebase/firestore';

export const fetchAddPost = async (userId: string, data: UserInfoType) => {
  try {
    await setDoc(doc(db, 'posts', userId), data);
    alert('작성이 완료되었습니다.');
  } catch (e) {
    if (error instanceof FirebaseError) {
      console.log(error.code);
      // const errorMsg = getErrorMessage(error.code);
      // alert(`${errorMsg}`);
    }
  }
};
