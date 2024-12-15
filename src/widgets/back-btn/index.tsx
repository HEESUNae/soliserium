'use client';

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
      <img src="/icons/arrow-back.svg" alt="뒤로가기" />
    </Button>
  );
};
