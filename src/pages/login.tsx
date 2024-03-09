import { UserLogin } from '@/components/UserLogin';
import styles from '@/styles/login.module.css';

const Login = () => {
  return (
    <div className={styles.background}>
      <UserLogin />
    </div>
  );
};

export default Login;
