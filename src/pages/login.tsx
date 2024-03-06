import styles from '@/styles/login.module.css';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useState } from 'react';

const Login = () => {
  const [testValue, setTestValue] = useState<string | null>(null);
  const router = useRouter();

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;

    switch (selectedValue) {
      case 'test1':
        setTestValue(selectedValue);
        break;
      case 'test2':
        setTestValue(selectedValue);
        break;
      case 'test3':
        setTestValue(selectedValue);
        break;
      default:
        setTestValue(null);
        break;
    }
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    switch (testValue) {
      case 'test1':
        router.push('/text3');
        break;
      case 'test2':
        router.push('/voice');
        break;
      default:
        alert('테스트를 선택해 주세요.');
        return;
    }
  };

  const handleTest1Click = () => {
    setTestValue('test1');
  };
  const handleTest2Click = () => {
    setTestValue('test2');
  };
  const handleTest3Click = () => {
    setTestValue('test3');
  };

  return (
    <div className={styles.background}>
      <form className={styles.form} onSubmit={handleFormSubmit}>
        <div className={styles.box}>
          <div className={styles.inputGroup}>
            <input
              className={styles.input}
              placeholder="성함을 입력해 주세요."
              type="text"
              id="username"
              required
            />
          </div>

          <select id="age" name="age" className={styles.selector}>
            <option value="">나이를 선택해 주세요.</option>
            <option value="40s">10대</option>
            <option value="20s">20대</option>
            <option value="30s">30대</option>
            <option value="40s">40대</option>
            <option value="40s">50대</option>
            <option value="40s">60대</option>
            <option value="40s">70대</option>
            <option value="40s">80대</option>
            <option value="40s">90대</option>
            <option value="40s">100세 ~</option>
          </select>

          <div className={styles.genderButtons}>
            <div className={styles.genderButton}>
              <label htmlFor="gender-male" className={styles.genderButtonInput}>
                <input
                  type="radio"
                  id="gender-male"
                  name="gender"
                  value="male"
                />
                <span>남성</span>
              </label>
            </div>
            <div className={styles.genderButton}>
              <label
                htmlFor="gender-female"
                className={styles.genderButtonInput}
              >
                <input
                  type="radio"
                  id="gender-female"
                  name="gender"
                  value="female"
                />
                <span>여성</span>
              </label>
            </div>
          </div>

          <div className={styles.input}>
            <select
              id="test"
              name="test"
              className={styles.selector}
              onChange={handleSelectChange}
            >
              <option value="">테스트를 선택해 주세요.</option>
              <option value="test1">Test 1</option>
              <option value="test2">Test 2</option>
              <option value="test3">Test 3</option>
            </select>
          </div>

          <button className={styles.submitButton}>시작하기</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
