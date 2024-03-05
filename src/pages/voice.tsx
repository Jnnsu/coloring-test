import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import styles from '@/styles/voice.module.css';
import { useSpeachToText } from '@/hooks/useSpeachToText';
import Image from 'next/image';
import axios from 'axios';
import { DEFAULT_PROMPT, PROMPT_TEST } from '@/constants/prompt';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { setImageUrl } from '../features/imageSlice';
import LoadingSpinner from '@/components/LoadingSpinner';

const Voice = () => {
  const [inputValue, setInputValue] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { transcript, listening, toggleListening } = useSpeachToText();
  const router = useRouter();
  const dispatch = useDispatch();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) {
      return;
    }
    if (!inputValue) {
      alert('도안을 먼저 말씀해 주세요.');
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/images/generations',
        {
          model: 'dall-e-3',
          prompt: PROMPT_TEST + inputValue,
          n: 1,
          size: '1024x1024',
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
          },
        },
      );
      const generatedImageURL = response.data.data[0].url;
      setImageURL(generatedImageURL);
      dispatch(setImageUrl(generatedImageURL));
    } catch (error) {
      console.error('Image generation failed:', error);
      alert('이미지 생성 실패. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (listening && transcript) {
      setInputValue(transcript);
    }
  }, [transcript, listening]);

  return (
    <div className={styles.background}>
      <div className={styles.formContainer}>
        {!imageURL ? (
          !isLoading ? (
            <form className={styles.form} onSubmit={handleFormSubmit}>
              <div className={styles['input-container']}>
                <label htmlFor="voice-input" className={styles.inputText}>
                  원하는 도안을 말씀해 주세요.
                </label>
                <button
                  onClick={() => toggleListening()}
                  type="button"
                  className={styles.voiceButton}
                >
                  {listening ? (
                    <Image
                      width={130}
                      height={130}
                      src="/images/record.png"
                      alt="녹음 아이콘"
                      className={styles.voiceIcon}
                    />
                  ) : (
                    <Image
                      width={130}
                      height={130}
                      src="/images/record.png"
                      alt="녹음 아이콘"
                      className={styles.voiceIcon}
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
                  onChange={handleInputChange}
                  value={inputValue}
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
            </form>
          ) : (
            <div className={styles.form}>
              <label htmlFor="voice-input" className={styles.inputText}>
                잠시만 기다려주세요.
              </label>
              <LoadingSpinner />
            </div>
          )
        ) : (
          <div className={styles.imageContainer}>
            <Image
              width={400}
              height={400}
              src={imageURL}
              alt="gpt가 생성한 이미지"
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
        )}
      </div>
    </div>
  );
};

export default Voice;
