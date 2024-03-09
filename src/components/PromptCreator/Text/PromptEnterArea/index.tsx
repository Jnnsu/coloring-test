import { useDispatch } from 'react-redux';
import { setPromptA } from '@/features/promptsSlice';
import styles from './styles.module.css';

export const PromptEnterArea = () => {
  const dispatch = useDispatch();

  return (
    <div className={styles.inputContainer}>
      <input
        type="text"
        onChange={(e) => dispatch(setPromptA(e.target.value))}
        placeholder="이미지 설명을 입력하세요"
        className={styles.input}
      />
      <button type="submit" className={styles.submitButton}>
        생성하기
      </button>
    </div>
  );
};
