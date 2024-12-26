'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './style.module.css';
import { usePostModelStore } from '@/features';

export const BottomNav = () => {
  const { setIsOpen } = usePostModelStore();
  const path = usePathname();

  return (
    <nav className={styles.nav}>
      {bottomNavs.map((nav) => (
        <Link
          href={nav.href ?? ''}
          key={nav.title}
          onClick={() => nav.name === 'write' && setIsOpen(true)}
          className={path === nav.href ? styles.active : ''}
        >
          <Image src={`/icons/nav/${nav.name}.svg`} alt="" width={nav.size} height={nav.size} />
          <p>{nav.title}</p>
        </Link>
      ))}
    </nav>
  );
};
const bottomNavs = [
  {
    title: '홈',
    name: 'home',
    size: 24,
    href: '/home',
  },
  {
    title: '뮤직',
    name: 'music',
    size: 22,
    href: '/music',
  },
  {
    title: null,
    name: 'write',
    size: 20,
    href: null,
  },
  {
    title: '우편함',
    name: 'mail',
    size: 22,
    href: '/mail',
  },
  {
    title: '투표',
    name: 'vote',
    size: 24,
    href: '/vote',
  },
];
