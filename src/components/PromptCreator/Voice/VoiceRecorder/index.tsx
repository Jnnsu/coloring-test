import { useSpeachToText } from '@/hooks/useSpeachToText';
import { useEffect } from 'react';
import { setPromptA } from '@/features/promptsSlice';
import Image from 'next/image';
import styles from './styles.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';

export const VoiceRecoder = () => {
  const { transcript, listening, toggleListening } = useSpeachToText();
  const promptA = useSelector((state: RootState) => state.prompts.promptA);
  const dispatch = useDispatch();

  useEffect(() => {
    if (listening && transcript) {
      dispatch(setPromptA(transcript));
    }
  }, [transcript, listening]);

  return (
    <>
      <div className={styles.inputContainer}>
        <h1 className={styles.header}>원하는 도안을 말씀해 주세요.</h1>
        <button
          onClick={() => toggleListening()}
          type="button"
          className={styles.recordButtons}
        >
          {listening ? (
            <Image
              width={120}
              height={120}
              src="/images/record.png"
              alt="녹음 아이콘"
              className={styles.recordButton}
            />
          ) : (
            <Image
              width={120}
              height={120}
              src="/images/record.png"
              alt="녹음 아이콘"
              className={styles.recordButton}
            />
          )}
        </button>
        {listening ? (
          <span className={styles.recording}>음성인식 활성화 중..</span>
        ) : null}
        <input
          className={styles['voice-input']}
          placeholder="꽃밭, 산책하는 고양이, 바다 경치..."
          id="voice-input"
          onChange={(e) => dispatch(setPromptA(e.target.value))}
          value={promptA}
        />{' '}
      </div>
      <div className={styles.submitButtons}>
        {listening ? (
          <button
            className={styles.submitButton}
            type="button"
            onClick={() => toggleListening()}
          >
            중지하기
          </button>
        ) : (
          <button
            className={styles.submitButton}
            type="button"
            onClick={() => toggleListening()}
          >
            다시 말하기
          </button>
        )}
        <button className={styles.submitButton} type="submit">
          생성하기
        </button>
      </div>
    </>
  );
};
