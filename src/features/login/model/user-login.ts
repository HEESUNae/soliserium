import { useEffect, useState } from 'react';
import { useIdSaveStore } from './id-save-store';
import { getErrorMessage, useUserAuthStore } from '@/entities';
import { useRouter } from 'next/navigation';
import { getCheckUser } from './auth-login';
import { FirebaseError } from 'firebase/app';

export const userUserLogin = () => {
  const { savedId, setSavedId } = useIdSaveStore();
  const [idValue, setIdValue] = useState<string>('');
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const { setUserAuth } = useUserAuthStore();
  const router = useRouter();

  // 로그인
  const formSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      const userId = formData.get('uid')?.toString() || '';
      const userPw = formData.get('pw')?.toString() || '';

      // 기존 가입자 유저인지 확인
      const user = await getCheckUser(userId, userPw);
      if (user) {
        setUserAuth(user);
        saveUserId(userId);
        router.push('/home');
      }
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        const errorMsg = getErrorMessage(error.code);
        alert(`${errorMsg}`);
      }
    }
  };

  // 아이디저장 혹은 저장값 삭제
  const saveUserId = (userId: string) => {
    if (isChecked) {
      setSavedId(userId);
    } else {
      useIdSaveStore.persist.clearStorage();
    }
  };

  // 이메일저장 체크박스 핸들러
  const handleCheckboxChange = (checked: boolean) => {
    setIsChecked(checked);
  };

  // 페이지 진입시 이메일저장 확인 여부
  useEffect(() => {
    setIsChecked(!!savedId);
    setIdValue(savedId || '');
  }, [savedId]);

  return {
    formSubmit,
    handleCheckboxChange,
    idValue,
    isChecked,
  };
};
