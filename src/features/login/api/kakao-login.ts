import { UserInfoType } from '@/entities';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const REDIRECT_URI = `${process.env.NEXT_PUBLIC_HOST_URL}/login`;

interface KakaoJwtPayload {
  sub: string;
  nickname: string;
  picture: string;
  email: string;
}

// 인가코드 가져오기
export const getKakaoAuthCode = async () => {
  const KAKAO_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_KEY}&redirect_uri=${REDIRECT_URI}&prompt=login`;
  window.location.href = KAKAO_URL;
};

// 토큰으로 사용자 정보 가져오기
export const getKakaoToken = async (code: string): Promise<UserInfoType> => {
  try {
    const { data } = await axios.post(
      `https://kauth.kakao.com/oauth/token`,
      {
        grant_type: 'authorization_code',
        client_id: process.env.NEXT_PUBLIC_KAKAO_KEY,
        redirect_uri: REDIRECT_URI,
        code: code,
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      }
    );

    const user = jwtDecode<KakaoJwtPayload>(data.id_token);
    const userData = {
      accessToken: data.access_token,
      uid: user.sub,
      name: user.nickname,
      email: user.email,
      photoURL: user.picture,
      providerId: 'kakao',
    };
    return userData;
  } catch (e) {
    console.log(e);
    return {};
  }
};
