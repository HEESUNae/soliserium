'use client';

import { Button, File, Input } from '@/shared';
import { Loading } from '@/widgets';
import { useJoin } from '../model/join-form';
import styles from './join-form.module.css';

export const JoinForm = () => {
  const { isLoading, formSubmit, formChcek, handleUpdateCheck, uploadImg, setUploadImg, disabled } = useJoin();

  if (isLoading) return <Loading />;

  return (
    <div className={styles.joinFormWrap}>
      <form onSubmit={formSubmit}>
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
        <Input placeholder="이메일" name="uid" isVaild={formChcek.uid} onChange={handleUpdateCheck} errorMsg="이메일 형식이 아닙니다." />
        <Input
          type="password"
          placeholder="비밀번호 (영어 또는 숫자 6글자 이상)"
          name="pw"
          isVaild={formChcek.pw}
          onChange={handleUpdateCheck}
          errorMsg="영어, 숫자로 6글자 이상 입력해주세요."
        />
        <Button type="submit" className="fill" disabled={disabled}>
          가입하기
        </Button>
      </form>
    </div>
  );
};
