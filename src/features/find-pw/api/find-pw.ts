import { auth } from '@/shared';
import { sendPasswordResetEmail } from 'firebase/auth';

// 비밀번호 찾기
export const fetchFindPw = async (userId: string) => {
  await sendPasswordResetEmail(auth, userId);
};
