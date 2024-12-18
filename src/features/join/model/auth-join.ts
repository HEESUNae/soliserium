import { auth } from '@/shared';
import { db } from '@/shared/providers/firebase';
import { User, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { getProfileImg } from '../api/upload-img';

// 파이어베이스 회원가입 실패 알림메세지
export const getErrorMessage = (code: string): string => {
  const messages: Record<string, string> = {
    'auth/email-already-in-use': '이미 사용 중인 이메일입니다.',
    'auth/invalid-email': '유효하지 않은 이메일 형식입니다.',
    'auth/weak-password': '비밀번호는 최소 6자 이상이어야 합니다.',
    'auth/operation-not-allowed': '이메일/비밀번호로 회원가입이 허용되지 않습니다.',
    default: '회원가입 중 오류가 발생했습니다. 다시 시도해주세요.',
  };
  return messages[code] || messages.default;
};

// 정규식 체크
export const checkRegex = (name: string, value: string) => {
  let isValid = false;
  if (name === 'id') {
    isValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value); // 이메일
  } else if (name === 'name') {
    isValid = /^(?! )[a-zA-Z가-힣 ]+$/.test(value); // 영문 + 숫자 포함
  } else if (name === 'pw') {
    isValid = /^[A-Za-z0-9]{6,}$/.test(value); // 6자 이상, 영문 + 숫자 포함
  } else {
    isValid = true;
  }
  return isValid;
};

// 회원가입
export const updateUser = async (userId: string, userPW: string, userName: string, userProfile: File) => {
  // 회원 생성
  const userCredential = await createUserWithEmailAndPassword(auth, userId, userPW);
  const user = userCredential.user;

  // 회원가입시 다른정보도 내용 저장
  await updateUserInfo(user, userName, userProfile);

  // 이메일 인증 링크 전송
  auth.languageCode = 'kr';
  await sendEmailVerification(user);
  alert('회원가입이 완료되었습니다. 이메일 인증 링크를 인증후에 로그인 가능합니다.');
};

// 사용자
export const updateUserInfo = async (user: User, userName: string, userProfile: File) => {
  // 이미지 파일을 cloudinary 저장소에 저장하고 이미지 url 반환
  const profileImg = await getProfileImg(userProfile);

  // 회원 정보 저장
  await setDoc(doc(db, 'users', user.uid), {
    id: user.uid,
    email: user.email,
    name: userName,
    photoURL: profileImg.url,
    providerId: user.providerId,
  });
};
