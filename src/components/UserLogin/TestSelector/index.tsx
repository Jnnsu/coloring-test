import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import styles from './styles.module.css';

interface Props {
  setTestValue: Dispatch<SetStateAction<string>>;
}

export const TestSelector = ({ setTestValue }: Props) => {
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
        setTestValue('');
        break;
    }
  };

  return (
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
  );
};
