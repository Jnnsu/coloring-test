import { useDispatch } from 'react-redux';
import styles from './styles.module.css';
import {
  setPromptDefault,
  setPromptA,
  setPromptB,
  setPromptC,
} from '@/features/testPromptsSlice';

export const TestPromptEnterArea = () => {
  const setCustomPrompts = [
    setPromptDefault,
    setPromptA,
    setPromptB,
    setPromptC,
  ];
  const dispatch = useDispatch();

  return (
    <div className={styles.inputContainer}>
      {setCustomPrompts.map((setPrompt) => (
        <input
          type="text"
          onChange={(e) => dispatch(setPrompt(e.target.value))}
          placeholder="이미지 설명을 입력하세요"
          className={styles.input}
        />
      ))}
      <button type="submit" className={styles.submitButton}>
        생성하기
      </button>
    </div>
  );
};
