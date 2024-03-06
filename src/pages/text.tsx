import styles from '@/styles/text.module.css';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { DEFAULT_PROMPT, PROMPT_TEST, PROMPT_TEST2 } from '@/constants/prompt';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { setImageUrl } from '../features/imageSlice';
import LoadingSpinner from '@/components/LoadingSpinner';

function Test3() {
  const [promptAValue, setPromptAValue] = useState('');
  const [promptBValue, setPromptBValue] = useState('');
  const [promptCValue, setPromptCValue] = useState('');
  const [promptDValue, setPromptDValue] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const handlePromptAChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPromptAValue(e.target.value);
  };

  const handlePromptBChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPromptBValue(e.target.value);
  };

  const handlePromptCChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPromptCValue(e.target.value);
  };

  const handlePromptDChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPromptDValue(e.target.value);
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) {
      return;
    }
    if (!promptAValue) {
      alert('도안을 먼저 작성해 주세요.');
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/images/generations',
        {
          model: 'dall-e-3',
          prompt: promptAValue + promptBValue + promptCValue + promptDValue,
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

  return (
    <div className={styles.background}>
      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={handleFormSubmit}>
          {!imageURL ? (
            !isLoading ? (
              <>
                <h1>프롬프트 테스트</h1>
                <div className={styles.inputContainer}>
                  <div className={styles.prompt}>
                    <label htmlFor="promptA">A</label>
                    <input
                      id="promptA"
                      type="text"
                      onChange={handlePromptAChange}
                      placeholder="이미지 설명을 입력하세요"
                      className={styles.input}
                      required
                    />
                  </div>
                  <div className={styles.prompt}>
                    <label htmlFor="promptB">B</label>
                    <input
                      id="promptB"
                      type="text"
                      onChange={handlePromptBChange}
                      placeholder="이미지 설명을 입력하세요"
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.prompt}>
                    <label htmlFor="promptC">C</label>
                    <input
                      id="promptC"
                      type="text"
                      onChange={handlePromptCChange}
                      placeholder="이미지 설명을 입력하세요"
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.prompt}>
                    <label htmlFor="promptD">D</label>
                    <input
                      id="promptD"
                      type="text"
                      onChange={handlePromptDChange}
                      placeholder="이미지 설명을 입력하세요"
                      className={styles.input}
                    />
                  </div>
                  <button type="submit" className={styles.submitButton}>
                    생성하기
                  </button>
                </div>
              </>
            ) : (
              <>
                <h1>프롬프트 테스트</h1>
                <LoadingSpinner />
              </>
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
        </form>
      </div>
    </div>
  );
}

export default Test3;
