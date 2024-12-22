'use client';

import { Button } from '@/shared';
import Image from 'next/image';
import { useEffect } from 'react';
import { getKakaoAuthCode } from '../api/kakao-login';
import { useKakaoLogin } from '../model/kakao-login';
import styles from './kakao-btn.module.css';

export const KakaoBtn = () => {
  const { handleUserAuth } = useKakaoLogin();

  useEffect(() => {
    handleUserAuth();
  }, []);

  return (
    <Button onClick={getKakaoAuthCode}>
      <div className={styles.kakaoBtn}>
        <Image src="/icons/logo/kakao.svg" alt="" width={20} height={20} />
        <p>Sign in with Kakao</p>
      </div>
    </Button>
  );
};
