import styles from '@/styles/voice.module.css';
import { VoicePromptCreator } from '@/components/PromptCreator/Voice';

const Voice = () => {
  return (
    <div className={styles.background}>
      <VoicePromptCreator />
    </div>
  );
};

export default Voice;
