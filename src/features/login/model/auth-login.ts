import { User, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/shared';
import { getErrorMessage, setCookie, fetchUserInfo } from '@/entities';

interface UserType extends User {
  stsTokenManager: {
    accessToken: string;
    expirationTime: number;
    refreshToken: string;
  };
}

// 로그인시 기존 회원인지 체크
export const getCheckUser = async (userId: string, userPw: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, userId, userPw);
    const user = userCredential.user as UserType;

    // 이메일 인증 안된 계정은 로그인 못함
    if (!user.emailVerified) {
      throw new Error('Email not verified');
    }
    const accessToken = await user.getIdToken();
    const userInfo = await fetchUserInfo(user);
    setCookie('accessToken', accessToken, user.stsTokenManager.expirationTime);
    return userInfo;
  } catch (error) {
    const errorMsg = getErrorMessage(error as string);
    alert(`${errorMsg}`);
    console.log('로그인 실패:', error);
  }
};
