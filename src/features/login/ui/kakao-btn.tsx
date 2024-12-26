'use client';

import { useUserAuthStore } from '@/entities';
import { Button } from '@/shared';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { getKakaoAuthCode, getKakaoToken } from '../api/kakao-login';
import styles from './kakao-btn.module.css';

export const KakaoBtn = () => {
  const code = useSearchParams().get('code') || '';
  const router = useRouter();
  const { setUserAuth } = useUserAuthStore();

  const handleUserAuth = async () => {
    if (code) {
      const data = await getKakaoToken(code);
      setUserAuth(data);
      router.push('/home');
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
