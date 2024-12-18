import { auth } from '@/shared';
import { db } from '@/shared/providers/firebase';
import { User, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

// 파이어베이스 회원가입 실패 알림메세지
export const getErrorMessage = (code: string): string => {
  const messages: Record<string, string> = {
    'auth/invalid-email': '아이디 또는 비밀번호를 확인해주세요',
    default: '아이디 또는 비밀번호를 확인해주세요',
  };
  return messages[code] || messages.default;
};

// 로그인시 기존 회원인지 체크
export const getCheckUser = async (userId: string, userPw: string) => {
  const userCredential = await signInWithEmailAndPassword(auth, userId, userPw);
  const user = userCredential.user as User;

  const accessToken = await user.getIdToken();
  const userInfo = await getUserInfo(user.uid);

  if (!accessToken || !userInfo) return;
  return { accessToken, ...userInfo };
};

// 기존 유저 정보 가져오기
export const getUserInfo = async (userId: string) => {
  const docSnap = await getDoc(doc(db, 'users', userId));
  if (!docSnap.exists()) return;
  return docSnap.data();
};
