import styles from './styles.module.css';
import { useSpeachToText } from '@/hooks/useSpeachToText';

export default function VoiceMemo() {
  const { transcript, listening, toggleListening } = useSpeachToText();

  return (
    <div>
      <h1>Web Speech API</h1>
      <input className={styles.voiceBox} value={transcript} />
      {listening && <div>음성인식 활성화 중</div>}
      <button onClick={toggleListening}>
        {listening ? '🎤 음성인식 중지' : '🎤 음성인식 시작'}
      </button>
    </div>
  );
}
