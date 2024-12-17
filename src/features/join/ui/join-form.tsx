'use client';

import { useActionState, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './join-form.module.css';
import { FirebaseError } from 'firebase/app';
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Button, Input, File } from '@/shared';
import { auth, db } from '@/shared/providers/firebase';
import { authJoinAction } from '../actions/auth-join-action';
import { getProfileImg } from '../api/upload-img';
import { checkRegex, getErrorMessage } from '../model/auth-join';

export const JoinForm = () => {
  const [formState, formAction] = useActionState(authJoinAction, null);
  const [disabled, setDisabled] = useState(true);
  const [formChcek, setFormCheck] = useState({ profile: false, id: false, name: false, pw: false });
  const [uploadImg, setUploadImg] = useState('');
  const router = useRouter();

  // 회원가입
  const formSubmit = async () => {
    try {
      if (formState?.status && formState.data) {
        // 회원 생성
        const userCredential = await createUserWithEmailAndPassword(auth, formState.data?.userId, formState.data?.userPW);
        const user = userCredential.user;

        // 이미지 파일을 cloudinary 저장소에 저장하고 이미지 url 반환
        const profileImg = await getProfileImg(formState.data?.userProile as File);

        // 회원 정보 저장
        await setDoc(doc(db, 'users', user.uid), {
          id: user.uid,
          email: user.email,
          name: formState.data.userName,
          photoURL: profileImg.url,
          providerId: user.providerId,
        });

        alert('회원가입에 성공했습니다.');
        router.push('/login');
      }
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        const errorMsg = getErrorMessage(error.code);
        alert(`회원가입에 실패했습니다. ${errorMsg}`);
        setDisabled(true);
        setUploadImg('');
        setFormCheck({ profile: false, id: false, name: false, pw: false });
      }
    }
  };

  // 정규식 체크하기
  const handleUpdateCheck = (name: string, value: string) => {
    const isValid = checkRegex(name, value);
    setFormCheck((prev) => ({ ...prev, [name]: isValid }));
  };

  // 정규식 체크를 모두 통과하면 회원가입 버튼 활성화
  useEffect(() => {
    const allVaild = Object.values(formChcek).every(Boolean);
    setDisabled(!allVaild);
  }, [formChcek]);

  // 폼 제출하면 파이어베이스 회원가입 진행
  useEffect(() => {
    if (formState) formSubmit();
  }, [formState]);

  return (
    <div className={styles.joinFormWrap}>
      <form action={formAction}>
        <div className={styles.profileWrap}>
          <File name="profile" isVaild={formChcek.profile} onChange={handleUpdateCheck} uploadImg={uploadImg} setUploadImg={setUploadImg} />
        </div>
        <Input
          placeholder="이름"
          name="name"
          isVaild={formChcek.name}
          onChange={handleUpdateCheck}
          errorMsg="영어, 한글 이름 형식으로 입력해주세요."
        />
        <Input placeholder="이메일" name="id" isVaild={formChcek.id} onChange={handleUpdateCheck} errorMsg="이메일 형식이 아닙니다." />
        <Input
          placeholder="비밀번호 (영어 또는 숫자 6글자 이상)"
          name="pw"
          isVaild={formChcek.pw}
          onChange={handleUpdateCheck}
          errorMsg="영어, 숫자로 6글자 이상 입력해주세요."
        />
        <Button type="submit" className="fill" disabled={disabled}>
          회원가입
        </Button>
      </form>
    </div>
  );
};
