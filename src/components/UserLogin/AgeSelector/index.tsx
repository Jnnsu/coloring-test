import styles from './styles.module.css';

export const AgeInput = () => {
  return (
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
  );
};
