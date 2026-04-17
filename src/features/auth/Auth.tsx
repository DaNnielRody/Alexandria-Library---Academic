import { SignIn, SignUp } from '@clerk/react-router';
import styles from './Auth.module.css';

export function SignInPage() {
  return (
    <div className={styles.container}>
      <SignIn routing="path" path="/sign-in" />
    </div>
  );
}

export function SignUpPage() {
  return (
    <div className={styles.container}>
      <SignUp routing="path" path="/sign-up" />
    </div>
  );
}