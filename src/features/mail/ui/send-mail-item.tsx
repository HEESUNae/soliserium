import { DocumentData } from 'firebase/firestore';
import Image from 'next/image';
import styles from '../style/mail-item.module.css';

interface SendMailItemProps {
  data: DocumentData;
  onClick: (id: string, mode: string) => void;
}

export const SendMailItem = ({ data, onClick }: SendMailItemProps) => {
  return (
    <li>
      <div className={styles.mailList} onClick={() => onClick(data.id, 'send')}>
        <div className={styles.titleWrap}>
          <Image src={`/icons/mail/mail-send.svg`} alt="" width={20} height={20} />
          <h3>{data.receiveUserName}</h3>
        </div>
        <p>{data.content}</p>
      </div>
    </li>
  );
};
