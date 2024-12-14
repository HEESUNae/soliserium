'use client';

import Image from 'next/image';
import styles from './kakao-btn.module.css';
import { useKakaoAuth } from '../hooks/kakao-auth';
import { Button } from '@/shared';
import { Loading } from '@/widgets';

export const KakaoBtn = () => {
  const { isLoading, kakaoLogin } = useKakaoAuth();

  if (isLoading) return <Loading />;

  return (
    <>
      <Button onClick={kakaoLogin}>
        <div className={styles.kakaoBtn}>
          <Image src="/icons/logo-kakao.svg" alt="" width={20} height={20} />
          <p>Sign in with Kakao</p>
        </div>
      </Button>
    </>
  );
};
