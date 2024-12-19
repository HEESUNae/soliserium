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
    id: user.uid,
    email: user.email,
    name: userName,
    photoURL: profileImg.url,
    providerId: user.providerId,
  });
};
