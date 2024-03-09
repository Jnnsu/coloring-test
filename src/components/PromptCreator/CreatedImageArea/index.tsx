import styles from './styles.module.css';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { setImageURL } from '@/features/imageSlice';
import { RootState } from '@/app/store';
import { useRouter } from 'next/router';

export const CreatedImageArea = () => {
  const imageURL = useSelector((state: RootState) => state.image.imageURL);
  const router = useRouter();

  return (
    <div className={styles.imageContainer}>
      <Image
        width={400}
        height={400}
        src={imageURL}
        alt="gpt가 생성한 이미지"
        className={styles.image}
      />
      <div className={styles.submitButtons}>
        <button
          className={styles.submitButton}
          type="button"
          onClick={() => setImageURL('')}
        >
          다시 생성하기
        </button>
        <button
          className={styles.submitButton}
          type="button"
          onClick={() => router.push('/coloring')}
        >
          색칠하러 가기
        </button>
      </div>
    </div>
  );
};
