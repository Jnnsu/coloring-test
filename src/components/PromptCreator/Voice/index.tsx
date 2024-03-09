import { FormEvent, useState } from 'react';
import { VoiceRecoder } from './VoiceRecorder';
import { CreatedImageArea } from '../CreatedImageArea';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { generateImage } from '@/utils/generateImage';
import { setImageURL } from '@/features/imageSlice';
import LoadingSpinner from '@/components/LoadingSpinner';
import styles from './styles.module.css';

export const VoicePromptCreator = () => {
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
      alert(`도안을 먼저 작성해 주세요. prompt: ${promptA}`);
      return;
    }
    setIsLoading(true);
    const generatedImageURL = await generateImage(promptA);
    dispatch(setImageURL(generatedImageURL));
    setIsLoading(false);
  };

  return (
    <form className={styles.form} onSubmit={handleFormSubmit}>
      {!imageURL ? (
        !isLoading ? (
          <VoiceRecoder />
        ) : (
          <LoadingSpinner />
        )
      ) : (
        <CreatedImageArea />
      )}
    </form>
  );
};
