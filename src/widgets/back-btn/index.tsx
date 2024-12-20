'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '../../shared/ui/button';

interface BackBtnProps {
  onClick?: () => void | string;
}

export const BackBtn = ({ onClick }: BackBtnProps) => {
  const router = useRouter();

  const handleBack = () => {
    if (onClick) onClick();
    else router.back();
  };

  return (
    <Button className="back" onClick={handleBack}>
      <Image src="/icons/shared/arrow-back.svg" alt="뒤로가기" width={24} height={24} />
    </Button>
  );
};
