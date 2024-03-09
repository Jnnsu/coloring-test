import styles from './styles.module.css';

export const GenderButtons = () => {
  return (
    <div className={styles.genderButtons}>
      <div className={styles.genderButton}>
        <label htmlFor="gender-male" className={styles.genderButtonInput}>
          <input type="radio" id="gender-male" name="gender" value="male" />
          <span>남성</span>
        </label>
      </div>
      <div className={styles.genderButton}>
        <label htmlFor="gender-female" className={styles.genderButtonInput}>
          <input type="radio" id="gender-female" name="gender" value="female" />
          <span>여성</span>
        </label>
      </div>
    </div>
  );
};
