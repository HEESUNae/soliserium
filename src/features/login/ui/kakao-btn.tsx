'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import styles from './kakao-btn.module.css';
import { Button } from '@/shared';
import { getKakaoAuthCode, getKakaoToken } from '../api/kakao-login';
import { useSearchParams } from 'next/navigation';
import { useUserAuthStore } from '@/entities';

export const KakaoBtn = () => {
  const code = useSearchParams().get('code') || '';
  const { setUserAuth } = useUserAuthStore();

  const handleUserAuth = async () => {
    if (code) {
      const data = await getKakaoToken(code);
      setUserAuth(data);
    }
  };

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
