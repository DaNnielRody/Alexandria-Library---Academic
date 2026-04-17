import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.copyright}>
          © {currentYear} The Library of Alexandria. All rights reserved.
        </p>
        <div className={styles.legal}>
          <Link to="/terms" className={styles.legalLink}>Terms of Service</Link>
          <span className={styles.separator}>|</span>
          <Link to="/privacy" className={styles.legalLink}>Privacy Policy</Link>
        </div>
      </div>
    </footer>

  );
}
