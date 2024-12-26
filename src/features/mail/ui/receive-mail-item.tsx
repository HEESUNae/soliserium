import { DocumentData } from 'firebase/firestore';
import Image from 'next/image';
import styles from '../style/mail-item.module.css';

interface ReceiveMailItemProps {
  data: DocumentData;
  onClick: (id: string) => void;
}

export const ReceiveMailItem = ({ data, onClick }: ReceiveMailItemProps) => {
  return (
    <li>
      <div className={styles.mailList} onClick={() => onClick(data.id)}>
        <div className={styles.titleWrap}>
          <Image src={`/icons/mail/mail-${data.mailCheck ? 'open' : 'close'}.svg`} alt="" width={20} height={20} />
          <h3>{data.sendUserName}</h3>
        </div>
        <p>{data.content}</p>
      </div>
    </li>
  );
};
