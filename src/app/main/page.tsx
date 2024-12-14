'use client';

import { useUserAuthStore } from '@/entities';
import { PostBtn } from '@/features/post/ui/post-btn';
import { useRouter } from 'next/navigation';

export default function MainPage() {
  const { userAuth } = useUserAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    // 카카오일때
    if (userAuth.providerId === 'kakao') {
      const { Kakao } = window;
      // kakao sdk 리셋
      if (Kakao && !Kakao.isInitialized()) {
        Kakao.init(process.env.NEXT_PUBLIC_KAKAO_KEY!);
      }
      // 엑세스 토큰이 존재할 경우 로그아웃
      if (Kakao.Auth.getAccessToken()) {
        Kakao.Auth.logout(() => {
          console.log(Kakao.Auth.getAccessToken()); // 로그아웃시 null
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
    </main>
  );
}
