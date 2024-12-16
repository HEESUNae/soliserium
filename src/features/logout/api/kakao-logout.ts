import axios from 'axios';

export const kakaoLogout = async (token: string) => {
  try {
    await axios.post(
      'https://kapi.kakao.com/v1/user/logout',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.log('카카오 로그아웃 실패', error);
  }
};
