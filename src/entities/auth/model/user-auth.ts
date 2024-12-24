import { User, sendEmailVerification } from 'firebase/auth';
import { fetchCreateUser } from '../api/create-user';
import { getProfileImg } from '@/features/join/api/upload-img';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/shared/providers/firebase';
import { FirebaseError } from 'firebase/app';

// 회원가입
export const updateUser = async (userId: string, userPW: string, userName: string, userProfile: File) => {
  try {
    const user = await fetchCreateUser(userId, userPW);

    if (user) {
      // 회원가입시 다른정보도 내용 저장
      await updateUserInfo(user, userName, userProfile);

      // 이메일 인증 링크 전송
      await sendEmailVerification(user);
      alert('회원가입이 완료되었습니다. 이메일 인증 링크를 인증후에 로그인 가능합니다.');
    }
  } catch (error) {
    if (error instanceof FirebaseError) {
      const errorMsg = getErrorMessage(error.code);
      alert(`${errorMsg}`);
    }
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
    isVote: false,
  });

  // 가입 메세지 발송
  // const now = dayjs();
  // const createTimestemp = dayjs(now).valueOf();
  // await setDoc(doc(db, 'mail', user.uid), {
  //   sendUserUid: 'master',
  //   sendUserName: 'Soliserium',
  //   sendPhotoUrl: '/photo-add.svg',
  //   receiveUserUid: user.uid,
  //   receiveUserName: userName,
  //   content:
  //     '안녕하세요! 저희 서비스에 가입해 주셔서 진심으로 감사드립니다.\n 앞으로 여러분의 여정을 함께하며, 최고의 경험을 제공하기 위해 노력하겠습니다.\n 저희와 함께하는 여정이 즐겁고 유익한 시간이 되기를 바랍니다.\n 다시 한번 가입을 환영합니다.',
  //   createAt: createTimestemp,
  //   mailCheck: false,
  // });
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

export function setCookie(cname: string, cvalue: string, exdays: number = 3600) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  const expires = 'expires=' + d.toUTCString();
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/' + ';' + 'Secure';
}

export function getCookie(cname: string) {
  const name = cname + '=';
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}
