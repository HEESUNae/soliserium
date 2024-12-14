'use client';

import Script from 'next/script';
import { useRouter } from 'next/navigation';
import { useUserAuthStore } from '@/entities';
import { PostBtn } from '@/features/post/ui/post-btn';

export default function MainPage() {
  const { userAuth, setUserAuth } = useUserAuthStore();

  const handleLogout = async () => {
    if (userAuth.providerId === 'kakao') {
      // await window.Kakao.Auth.logout();
      await window.Kakao.API.request({
        url: '/v1/user/unlink',
      });
    }
    useUserAuthStore.persist.clearStorage();
    setUserAuth({});
    // router.push('/login');
  };

  return (
    <main>
      <div onClick={handleLogout}>Logout</div>
      <PostBtn />
      <Script src="https://developers.kakao.com/sdk/js/kakao.js" />
    </main>
  );
}
