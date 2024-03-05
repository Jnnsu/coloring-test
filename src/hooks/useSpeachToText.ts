import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';

export const useSpeachToText = () => {
  const { transcript, listening } = useSpeechRecognition();

  const toggleListening = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      SpeechRecognition.startListening({
        language: 'ko-KR',
        continuous: false,
      });
    }
  };

  return { transcript, listening, toggleListening };
};
