'use client';

import { Button } from '@/shared';
import { BottomSheet } from '@/widgets';
import { useOpenPostAddStore } from '../model/open-post-add-store';
import { PostWrite } from './post-write';

export const PostAdd = () => {
  const { isOpen, setIsOpen } = useOpenPostAddStore();

  return (
    <>
      {isOpen && (
        <BottomSheet title="새로운 고민 작성" left={<Button onClick={() => setIsOpen(false)}>취소</Button>}>
          <PostWrite />
        </BottomSheet>
      )}
    </>
  );
};
