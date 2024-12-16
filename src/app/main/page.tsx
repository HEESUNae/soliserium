'use client';

import { useUserAuthStore } from '@/entities';
import { kakaoLogout } from '@/features/logout/api/kakao-logout';
import { PostBtn } from '@/features/post/ui/post-btn';
import { useRouter } from 'next/navigation';

export default function MainPage() {
  const { userAuth } = useUserAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    // 카카오일때
    if (userAuth.accessToken && userAuth.providerId === 'kakao') {
      kakaoLogout(userAuth.accessToken);
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
