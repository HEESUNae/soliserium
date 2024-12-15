'use client';
import { Button, Input, auth } from '@/shared';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useActionState, useEffect } from 'react';
import { authJoinAction } from '../actions/auth-join-action';
import styles from './join-form.module.css';
import { join } from 'path';

export const JoinForm = () => {
  const [joinData, formAction] = useActionState(authJoinAction, null);

  useEffect(() => {
    if (joinData?.status && joinData.data) {
      authJoin(joinData.data?.userId, joinData.data?.userPW);
    }
  }, [joinData]);

  // 회원가입
  const authJoin = async (id: string, pw: string) => {
    createUserWithEmailAndPassword(auth, id, pw)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('user', user);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  return (
    <div className={styles.joinFormWrap}>
      <form action={formAction}>
        <Input placeholder="ID" name="id" regexp={/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/} errorMsg="This is not an email format." />
        <Input placeholder="PW" name="pw" regexp={/^[A-Za-z0-9]{6,}$/} errorMsg="Please enter at least 6 characters in English or numbers." />
        <Button type="submit" className="fill">
          Sign Up
        </Button>
      </form>
    </div>
  );
};
