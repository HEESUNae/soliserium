import styles from './style.module.css';

interface LogoProps {
  size?: 'medium' | 'big';
}

export const Logo = ({ size = 'medium' }: LogoProps) => {
  return <div className={size === 'medium' ? styles.logo : styles.bigLogo}>Soliserium</div>;
};
