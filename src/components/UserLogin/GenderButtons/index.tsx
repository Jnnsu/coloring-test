import styles from './styles.module.css';

export const GenderButtons = () => {
  return (
    <div className={styles.genderButtons}>
      <div className={styles.genderButton}>
        <label htmlFor="gender-male" className={styles.genderButtonInput}>
          <input type="radio" id="gender-male" name="gender" value="male" />
          남성
        </label>
      </div>
      <div className={styles.genderButton}>
        <label htmlFor="gender-female" className={styles.genderButtonInput}>
          <input type="radio" id="gender-female" name="gender" value="female" />
          여성
        </label>
      </div>
    </div>
  );
};
