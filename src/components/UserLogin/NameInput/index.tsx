import styles from './styles.module.css';

export const NameInput = () => {
  return (
    <div className={styles.inputGroup}>
      <input
        className={styles.input}
        placeholder="성함을 입력해 주세요."
        type="text"
        id="username"
        required
      />
    </div>
  );
};
