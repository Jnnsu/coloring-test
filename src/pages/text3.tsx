import styles from '@/styles/text.module.css';
import { TextPromptCreator } from '@/components/PromptCreator/Text';

const Text3 = () => {
  return (
    <div className={styles.background}>
      <TextPromptCreator />
    </div>
  );
};

export default Text3;
