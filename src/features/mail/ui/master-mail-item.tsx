import Image from 'next/image';
import styles from '../style/mail-item.module.css';

interface MasterMailItemProps {
  onClick: (id: string, mode: string) => void;
}

export const MasterMailItem = ({ onClick }: MasterMailItemProps) => {
  return (
    <>
      <li>
        <div className={styles.mailList} onClick={() => onClick('master', 'send')}>
          <div className={styles.titleWrap}>
            <Image src={`/icons/mail/mail-master.svg`} alt="" width={20} height={20} />
            <h3>Soliserium</h3>
          </div>
          <p>
            안녕하세요! 저희 서비스에 가입해 주셔서 진심으로 감사드립니다. 앞으로 여러분의 여정을 함께하며, 최고의 경험을 제공하기 위해
            노력하겠습니다. 저희와 함께하는 여정이 즐겁고 유익한 시간이 되기를 바랍니다. 다시 한번 가입을 환영합니다.
          </p>
        </div>
      </li>
    </>
  );
};
