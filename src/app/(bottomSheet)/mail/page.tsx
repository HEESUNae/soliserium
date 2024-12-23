'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.css';
import { Tab } from '@/widgets';
import Image from 'next/image';
import { DocumentData } from 'firebase/firestore';
import { fetchAllMail } from '@/entities/mail/api/get-all-mail';
import { useUserAuthStore } from '@/entities';
import { useRouter } from 'next/navigation';
import { NotData } from '@/widgets/not-data';
import { Button } from '@/shared';

const tabBtns = [
  { id: 1, title: '받은 우편함' },
  { id: 2, title: '보낸 우편함' },
];

export default function MailPage() {
  const [receiveMail, setReceiveMail] = useState<null | DocumentData>(null);
  const [sendMail, setSendMail] = useState<null | DocumentData>(null);
  const { userAuth } = useUserAuthStore();
  const router = useRouter();

  const handleOpenMail = (id: string) => {
    router.push(`/mail/view?id=${id}`);
  };

  useEffect(() => {
    // 이메일 가져오기
    const getSendMail = async () => {
      const data = await fetchAllMail();
      if (data) {
        const receiveData = data?.filter((item: DocumentData) => item.receiveUserUid === userAuth.uid);
        const sendData = data?.filter((item: DocumentData) => item.sendUserUid === userAuth.uid);
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
              <li key={item.id}>
                <div className={styles.mailList} onClick={() => handleOpenMail(item.id)}>
                  <div className={styles.titleWrap}>
                    <Image src={`/icons/mail/mail-${item.mailCheck ? 'open' : 'close'}.svg`} alt="" width={20} height={20} />
                    <h3>{item.sendUserName}</h3>
                  </div>
                  <p>{item.content}</p>
                </div>
              </li>
            ))}
            <li>
              <div className={styles.mailList} onClick={() => handleOpenMail('master')}>
                <div className={styles.titleWrap}>
                  <Image src={`/icons/mail/mail-close.svg`} alt="" width={20} height={20} />
                  <h3>Soliserium</h3>
                </div>
                <p>
                  안녕하세요! 저희 서비스에 가입해 주셔서 진심으로 감사드립니다. 앞으로 여러분의 여정을 함께하며, 최고의 경험을 제공하기 위해
                  노력하겠습니다. 저희와 함께하는 여정이 즐겁고 유익한 시간이 되기를 바랍니다. 다시 한번 가입을 환영합니다.
                </p>
              </div>
            </li>
          </ul>
        </div>
        <div className={`${styles.listWrap}`}>
          <ul>
            {sendMail.length ? (
              <>
                {sendMail.map((item: DocumentData) => (
                  <li key={item.id}>
                    <div className={styles.mailList} onClick={() => handleOpenMail(item.id)}>
                      <div className={styles.titleWrap}>
                        <Image src={`/icons/mail/mail-send.svg`} alt="" width={20} height={20} />
                        <h3>{item.receiveUserName}</h3>
                      </div>
                      <p>{item.content}</p>
                    </div>
                  </li>
                ))}
              </>
            ) : (
              <NotData>
                보낸 메일이 없습니다.
                <br />
                사람들에게 메일을 보내 조언을 해보세요.
                <Button className="fill">홈으로 조언하러 가기</Button>
              </NotData>
            )}
          </ul>
        </div>
      </Tab>
    </>
  );
}
