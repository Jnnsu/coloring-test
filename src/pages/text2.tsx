import styles from '@/styles/text.module.css';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import {
  DEFAULT_PROMPT,
  PROMPT_TEST,
  PROMPT_TEST2,
} from '@/constants/constants';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { setImageUrl } from '../features/imageSlice';
import LoadingSpinner from '@/components/LoadingSpinner';

function Test3() {
  const [inputValue, setInputValue] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) {
      return;
    }
    if (!inputValue) {
      alert('도안을 먼저 작성해 주세요.');
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

  return (
    <div className={styles.background}>
      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={handleFormSubmit}>
          {!imageURL ? (
            !isLoading ? (
              <>
                <h1>당신의 예술 작품을 만드세요!</h1>
                <div className={styles.inputContainer}>
                  <input
                    type="text"
                    onChange={handleChange}
                    placeholder="이미지 설명을 입력하세요"
                    className={styles.input}
                  />
                  <button type="submit" className={styles.submitButton}>
                    생성하기
                  </button>
                </div>
              </>
            ) : (
              <>
                <h1>당신의 예술 작품을 만드세요!</h1>
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
