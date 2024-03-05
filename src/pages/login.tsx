import styles from '@/styles/login.module.css';
import Image from 'next/image';

const Login = () => {
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.box}>
          <div className={styles['input-box']}>
            <Image
              className={styles.image}
              width={14}
              height={14}
              src=""
              alt="이름 입력 아이콘"
            />
            <input
              className={styles.input}
              placeholder="성함을 입력해 주세요."
            />
          </div>

          <div className={styles['input-box']}>
            <Image
              className={styles.image}
              width={14}
              height={14}
              src=""
              alt="나이 입력 아이콘"
            />
            <select
              id="age"
              name="age"
              className="border border-gray-300 rounded-md"
            >
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
              <option value="40s">100세 이상</option>
            </select>
          </div>

          <div className={styles['button-box']}>
            <div className={styles.genderButtons}>
              <input
                type="radio"
                id="gender-male"
                name="gender"
                value="male"
                className={styles.genderButton}
              />
              <label htmlFor="gender-male">남성</label>
            </div>
            <div className={styles.genderButtons}>
              <input
                type="radio"
                id="gender-female"
                name="gender"
                value="female"
                className={styles.genderButton}
              />
              <label htmlFor="gender-female">여성</label>
            </div>
          </div>

          <div className={styles['input-box']}>
            <Image
              className={styles.image}
              width={14}
              height={14}
              src=""
              alt="테스트 선택 아이콘"
            />

            <select
              id="test"
              name="test"
              className="border border-gray-300 rounded-md"
            >
              <option value="">테스트를 선택해 주세요.</option>
              <option value="20s">Test 1</option>
              <option value="30s">Test 2</option>
              <option value="40s">Test 3</option>
            </select>
          </div>

          <button className={styles.button}>시작하기</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
