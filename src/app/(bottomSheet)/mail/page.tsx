'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import { DocumentData } from 'firebase/firestore';
import { useUserAuthStore } from '@/entities';
import { NotData, Tab } from '@/widgets';
import { Button, useAlramStore } from '@/shared';
import { fetchUpdateMail, ReceiveMailItem, MasterMailItem, SendMailItem, fetchAllMail } from '@/features';

const tabBtns = [
  { id: 1, title: '받은 우편함' },
  { id: 2, title: '보낸 우편함' },
];

export default function MailPage() {
  const [receiveMail, setReceiveMail] = useState<null | DocumentData>(null);
  const [sendMail, setSendMail] = useState<null | DocumentData>(null);
  const { userAuth } = useUserAuthStore();
  const { setIsAlram } = useAlramStore();
  const router = useRouter();

  const handleOpenMail = async (id: string, mode?: string) => {
    try {
      // 메일 확인 여부 업데이트
      if (mode !== 'send') {
        await fetchUpdateMail(id, true);
      }
      router.push(`/mail/view?id=${id}`);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    // 이메일 가져오기
    const getSendMail = async () => {
      const data = await fetchAllMail();
      if (data) {
        const receiveData = data?.filter((item: DocumentData) => item.receiveUserUid === userAuth.uid);
        const sendData = data?.filter((item: DocumentData) => item.sendUserUid === userAuth.uid);
        const isAlram = receiveData.some((item: DocumentData) => item.mailCheck === false);
        setIsAlram(isAlram);
        setReceiveMail(receiveData);
        setSendMail(sendData);
      }
    };
    getSendMail();
  }, [userAuth]);

  if (!receiveMail || !sendMail) return <></>;

  return (
    <>
      <Tab tabBtns={tabBtns}>
        <div className={`${styles.listWrap}`}>
          <ul>
            {receiveMail.map((item: DocumentData) => (
              <ReceiveMailItem data={item} onClick={() => handleOpenMail(item.id)} key={item.id} />
            ))}
            <MasterMailItem onClick={() => handleOpenMail('master', 'send')} />
          </ul>
        </div>
        <div className={`${styles.listWrap}`}>
          <ul>
            {sendMail.length ? (
              <>
                {sendMail.map((item: DocumentData) => (
                  <SendMailItem data={item} onClick={() => handleOpenMail(item.id, 'send')} key={item.id} />
                ))}
              </>
            ) : (
              <NotData>
                보낸 메일이 없습니다.
                <br />
                사람들에게 메일을 보내 조언을 해보세요.
                <Button className="fill" onClick={() => router.push('/home')}>
                  홈으로 조언하러 가기
                </Button>
              </NotData>
            )}
          </ul>
        </div>
      </Tab>
    </>
  );
}
