import { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getErrorMessage } from '@/features';
import { auth } from '@/shared';

// 회원 생성
export const fetchCreateUser = async (userId: string, userPw: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, userId, userPw);
    const user = userCredential.user;
    return user;
  } catch (error) {
    if (error instanceof FirebaseError) {
      const errorMsg = getErrorMessage(error.code);
      alert(`${errorMsg}`);
    }
  }
};
