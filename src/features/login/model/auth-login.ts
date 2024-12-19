import { User, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/shared/providers/firebase';
import { auth } from '@/shared';

// 파이어베이스 회원가입 실패 알림메세지
export const getErrorMessage = (code: string): string => {
  const messages: Record<string, string> = {
    'auth/email-already-in-use': '이미 가입한 기록이 있는 이메일 입니다.',
    'Error: Email not verified': '이메일 인증을 완료한 후에 로그인 가능합니다.',
    'auth/invalid-email': '아이디 또는 비밀번호를 확인해주세요',
    default: '아이디 또는 비밀번호를 확인해주세요',
  };
  return messages[code] || messages.default;
};

// 로그인시 기존 회원인지 체크
export const getCheckUser = async (userId: string, userPw: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, userId, userPw);
    const user = userCredential.user as User;

    // 이메일 인증 안된 계정은 로그인 못함
    if (!user.emailVerified) {
      throw new Error('Email not verified');
    }
    const accessToken = await user.getIdToken();
    const userInfo = await getUserInfo(user);

    return { accessToken, ...userInfo };
  } catch (error) {
    const errorMsg = getErrorMessage(error as string);
    alert(`${errorMsg}`);
    console.log('로그인 실패:', error);
  }
};

// 기존 유저 정보 가져오기
export const getUserInfo = async (user: User) => {
  const docSnap = await getDoc(doc(db, 'users', user.uid));
  if (docSnap.exists()) {
    return docSnap.data();
  }
};
