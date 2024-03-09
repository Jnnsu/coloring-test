import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import styles from './styles.module.css';
import { NameInput } from './NameInput';
import { AgeInput } from './AgeSelector';
import { GenderButtons } from './GenderButtons';
import { TestSelector } from './TestSelector';

export const UserLogin = () => {
  const [testValue, setTestValue] = useState('');
  const router = useRouter();

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    switch (testValue) {
      case 'test1':
        router.push('/text3');
        break;
      case 'test2':
        router.push('/voice');
        break;
      case 'test3':
        router.push('/text');
        break;
      default:
        alert('테스트를 선택해 주세요.');
        return;
    }
  };

  return (
    <form className={styles.form} onSubmit={handleFormSubmit}>
      <div className={styles.box}>
        <NameInput />
        <AgeInput />
        <GenderButtons />
        <TestSelector setTestValue={setTestValue} />
        <button className={styles.submitButton}>시작하기</button>
      </div>
    </form>
  );
};
