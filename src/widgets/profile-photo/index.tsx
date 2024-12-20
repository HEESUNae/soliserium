import Image from 'next/image';
import styles from './style.module.css';

interface ProfilePhotoProps {
  src: string;
  alt?: string;
  width: number;
  height: number;
}

export const ProfilePhoto = ({ src, alt = '', width = 40, height = 40 }: ProfilePhotoProps) => {
  return (
    <div className={styles.profile}>
      <Image src={src} alt={alt} width={width} height={height} />
    </div>
  );
};