import { getErrorMessage, updateUser } from '@/entities';
import { checkRegex } from '@/shared';
import { FirebaseError } from 'firebase/app';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useJoin = () => {
  const [disabled, setDisabled] = useState<boolean>(true);
  const [formChcek, setFormCheck] = useState<Record<string, boolean>>({ profile: false, uid: false, name: false, pw: false });
  const [uploadImg, setUploadImg] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const formSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const formData = new FormData(e.currentTarget);
      const userId = formData.get('uid')?.toString() ?? '';
      const userPW = formData.get('pw')?.toString() ?? '';
      const userName = formData.get('name')?.toString() ?? '';
      const userProfile = formData.get('profile') as File;

      await updateUser(userId, userPW, userName, userProfile);

      router.push('/login');
    } catch (error) {
      if (error instanceof FirebaseError) {
        const errorMsg = getErrorMessage(error.code);
        alert(`${errorMsg}`);
      }
      setDisabled(true);
      setUploadImg('');
      setFormCheck({ profile: false, uid: false, name: false, pw: false });
    } finally {
      setIsLoading(false);
    }
  };

  // 정규식 체크하기
  const handleUpdateCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    const isValid = checkRegex(name, value);
    setFormCheck((prev) => ({ ...prev, [name]: isValid }));
  };

  // 정규식 체크를 모두 통과하면 회원가입 버튼 활성화
  useEffect(() => {
    const allVaild = Object.values(formChcek).every(Boolean);
    setDisabled(!allVaild);
  }, [formChcek]);

  return {
    formSubmit,
    handleUpdateCheck,
    setUploadImg,
    disabled,
    uploadImg,
    isLoading,
    formChcek,
  };
};
