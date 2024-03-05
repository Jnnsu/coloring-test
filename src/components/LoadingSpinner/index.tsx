import Image from 'next/image';
import styles from './styles.module.css';

export default function LoadingSpinner() {
  return (
    <div className={styles.spinner}>
      <Image
        width={70}
        height={70}
        src={`/images/spinner.gif`}
        alt="로딩 스피너 이미지"
      />
      <p>도안 생성 중...</p>
    </div>
  );
}
