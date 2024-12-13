'use client';
import { useUserAuthStore } from '@/entities';
import { PostBtn } from '@/features/post/ui/post-btn';
import { useRouter } from 'next/navigation';
import { googleLogout } from '@react-oauth/google';

export default function MainPage() {
  const router = useRouter();
  const handleLogout = async () => {
    googleLogout();
    useUserAuthStore.persist.clearStorage();
    router.push('/login');
  };
  return (
    <main>
      <div onClick={handleLogout}>로그이웃</div>
      <PostBtn />
    </main>
  );
}
