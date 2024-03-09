import { ColoringArea } from '@/components/Coloring';
import styles from '@/styles/coloring.module.css';

const Coloring = () => {
  return (
    <div className={styles.background}>
      <ColoringArea />
    </div>
  );
};

export default Coloring;
