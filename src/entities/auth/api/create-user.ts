import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/shared';

// 회원 생성
export const fetchCreateUser = async (userId: string, userPw: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, userId, userPw);
  const user = userCredential.user;
  return user;
};
