import { User, sendEmailVerification } from 'firebase/auth';
import { fetchCreateUser } from '../api/user-auth';
import { getProfileImg } from '@/features/join/api/upload-img';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/shared/providers/firebase';

// 회원가입
export const updateUser = async (userId: string, userPW: string, userName: string, userProfile: File) => {
  const user = await fetchCreateUser(userId, userPW);

  if (user) {
    // 회원가입시 다른정보도 내용 저장
    await updateUserInfo(user, userName, userProfile);

    // 이메일 인증 링크 전송
    await sendEmailVerification(user);
    alert('회원가입이 완료되었습니다. 이메일 인증 링크를 인증후에 로그인 가능합니다.');
  }
};

// 사용자 정보 가져오기
export const updateUserInfo = async (user: User, userName: string, userProfile: File) => {
  // 이미지 파일을 cloudinary 저장소에 저장하고 이미지 url 반환
  const profileImg = await getProfileImg(userProfile);

  // 회원 정보 저장
  await setDoc(doc(db, 'users', user.uid), {
    uid: user.uid,
    email: user.email,
    name: userName,
    photoURL: profileImg.url,
    providerId: user.providerId,
  });
};

// 파이어베이스 에러 실패 알림메세지
export const getErrorMessage = (code: string): string => {
  const messages: Record<string, string> = {
    'auth/email-already-in-use': '이미 가입되어 있는 이메일 입니다.',
    'Error: Email not verified': '이메일 인증을 완료한 후에 로그인 가능합니다.',
    'auth/invalid-email': '유효하지 않은 이메일 형식입니다.',
    'auth/weak-password': '비밀번호는 최소 6자 이상이어야 합니다.',
    'auth/operation-not-allowed': '이메일/비밀번호로 회원가입이 허용되지 않습니다.',
    default: '아이디 또는 비밀번호를 확인해주세요',
  };
  return messages[code] || messages.default;
};
