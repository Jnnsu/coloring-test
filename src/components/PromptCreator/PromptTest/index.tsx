import styles from './styles.module.css';
import { FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingSpinner from '@/components/LoadingSpinner';
import { RootState } from '@/app/store';
import { generateImageTest } from '@/utils/generateImageTest';
import { CreatedImageArea } from '../CreatedImageArea';
import { TestPromptEnterArea } from './TestPromptEnterArea';
import { setImageURL } from '@/features/imageSlice';

export const PromptTester = () => {
  const [isLoading, setIsLoading] = useState(false);
  const imageURL = useSelector((state: RootState) => state.image.imageURL);
  const promptDefault = useSelector(
    (state: RootState) => state.testPrompts.promptDefault,
  );
  const promptA = useSelector((state: RootState) => state.testPrompts.promptA);
  const promptB = useSelector((state: RootState) => state.testPrompts.promptB);
  const promptC = useSelector((state: RootState) => state.testPrompts.promptC);
  const dispatch = useDispatch();

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) {
      return;
    }
    if (!promptDefault) {
      alert('도안을 먼저 작성해 주세요.');
      return;
    }
    setIsLoading(true);
    const customPrompts = promptA + promptB + promptC;
    const generatedImageURL = await generateImageTest(
      promptDefault,
      customPrompts,
    );
    dispatch(setImageURL(generatedImageURL));
    setIsLoading(false);
  };

  return (
    <div>
      <form className={styles.form} onSubmit={handleFormSubmit}>
        {!imageURL ? (
          !isLoading ? (
            <>
              <h1>프롬프트 테스트</h1>
              <TestPromptEnterArea />
            </>
          ) : (
            <LoadingSpinner />
          )
        ) : (
          <CreatedImageArea />
        )}
      </form>
    </div>
  );
};
