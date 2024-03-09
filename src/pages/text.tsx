import styles from '@/styles/text.module.css';
import { PromptTester } from '@/components/PromptCreator/PromptTest';

function TestPrompt() {
  return (
    <div className={styles.background}>
      <PromptTester />
    </div>
  );
}

export default TestPrompt;
