'use client';

import { useUserAuthStore } from '@/entities';
import { PostBtn } from '@/features/post/ui/post-btn';
import { useRouter } from 'next/navigation';

export default function MainPage() {
  const router = useRouter();
  const handleLogout = async () => {
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
