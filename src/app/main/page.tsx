'use client';

import Script from 'next/script';
import { useUserAuthStore } from '@/entities';
import { PostBtn } from '@/features/post/ui/post-btn';
import { useRouter } from 'next/navigation';

export default function MainPage() {
  const { userAuth } = useUserAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    // 카카오일때
    if (userAuth.providerId === 'kakao') {
      if (window.Kakao && !window.Kakao.isInitialized()) {
        window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_KEY!);
      }
      if (window.Kakao.Auth.getAccessToken()) {
        window.Kakao.Auth.logout(() => {
          console.log(window.Kakao.Auth.getAccessToken());
        });
      }
    }
    useUserAuthStore.persist.clearStorage();
    router.push('/login');
  };

  return (
    <main>
      <div onClick={handleLogout}>Logout</div>
      <PostBtn />
      <Script src="https://developers.kakao.com/sdk/js/kakao.js" />
    </main>
  );
}
