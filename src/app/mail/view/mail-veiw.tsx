'use client';

import styles from './mail-view.module.css';
import { useUserAuthStore } from '@/entities';
import { fetchGetMail } from '@/entities/mail/api/get-mail';
import { Button, getDayjsTime } from '@/shared';
import { ProfilePhoto } from '@/widgets';
import { DocumentData } from 'firebase/firestore';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export const MailView = () => {
  const mailId = useSearchParams().get('id') || '';
  const [mailList, setMailList] = useState<null | DocumentData>(null);
  const { userAuth } = useUserAuthStore();

  useEffect(() => {
    const getMail = async () => {
      if (mailId === 'master') {
        const mailMaster = {
          content: `안녕하세요!\n\n저희 서비스에 가입해 주셔서 진심으로 감사드립니다.\n앞으로 여러분의 여정을 함께하며, 최고의 경험을 제공하기 위해 노력하겠습니다.\n\n저희와 함께하는 여정이 즐겁고 유익한 시간이 되기를 바랍니다.\n\n다시 한번 가입을 환영합니다.`,
          createAt: 0,
          id: '999',
          receiveUserName: userAuth.name,
          receiveUserUid: userAuth.uid,
          sendPhotoUrl: '/images/user-default.png',
          sendUserName: 'Soliserium',
          sendUserUid: 'master',
          mailCheck: false,
        };
        setMailList(mailMaster);
      } else {
        const mails = await fetchGetMail(mailId);
        setMailList(mails);
      }
    };
    getMail();
  }, [mailId, userAuth]);

  if (!mailList) return <></>;

  return (
    <>
      <div className={styles.content}>
        <div className={styles.titleWrap}>
          <ProfilePhoto src={mailList?.sendPhotoUrl} alt="" width={20} height={20} />
          <h3>{mailList?.sendUserName}</h3>
          <p className={styles.date}>{mailList.createAt ? getDayjsTime(mailList.createAt) : ''}</p>
        </div>
        <div className={styles.contentWrap}>
          <p className={styles.receiveUserName}>TO. {mailList?.receiveUserName}</p>
          <p>{mailList?.content}</p>
        </div>
      </div>
      <div className={styles.bottomBtns}>
        {mailId !== 'master' && <Button className="outline">삭제</Button>}
        <Button className="fill">
          <Link href={'/mail'}>목록으로</Link>
        </Button>
      </div>
    </>
  );
};