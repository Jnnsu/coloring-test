import styles from './styles.module.css';
import { FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingSpinner from '@/components/LoadingSpinner';
import { RootState } from '@/app/store';
import { generateImage } from '@/utils/generateImage';
import { PromptEnterArea } from './PromptEnterArea';
import { CreatedImageArea } from '../CreatedImageArea';
import { setImageURL } from '@/features/imageSlice';

export const TextPromptCreator = () => {
  const [isLoading, setIsLoading] = useState(false);
  const imageURL = useSelector((state: RootState) => state.image.imageURL);
  const promptA = useSelector((state: RootState) => state.prompts.promptA);
  const dispatch = useDispatch();

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) {
      return;
    }
    if (!promptA) {
      alert('도안을 먼저 작성해 주세요.');
      return;
    }
    setIsLoading(true);
    const generatedImageURL = await generateImage(promptA);
    dispatch(setImageURL(generatedImageURL));
    setIsLoading(false);
  };

  return (
    <div>
      <form className={styles.form} onSubmit={handleFormSubmit}>
        {!imageURL ? (
          !isLoading ? (
            <>
              <h1>당신의 예술 작품을 만드세요!</h1>
              <PromptEnterArea />
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
