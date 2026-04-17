import styles from './Legal.module.css';

export function Terms() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Terms of Service</h1>
      <p className={styles.lastUpdated}>Last updated: April 2026</p>

      <section className={styles.section}>
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing and using The Library of Alexandria, you agree to be bound by these Terms of Service.
          If you do not agree to these terms, please do not use our service.
        </p>
      </section>

      <section className={styles.section}>
        <h2>2. Description of Service</h2>
        <p>
          The Library of Alexandria is a digital library platform that provides access to books and
          literary content through the Open Library API. We do not own the rights to the books displayed
          on our platform.
        </p>
      </section>

      <section className={styles.section}>
        <h2>3. User Accounts</h2>
        <p>When you create an account with us, you agree to:</p>
        <ul>
          <li>Provide accurate, complete, and current information</li>
          <li>Maintain and update your information to keep it accurate</li>
          <li>Keep your password secure and confidential</li>
          <li>Notify us immediately of any unauthorized use of your account</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>4. Intellectual Property</h2>
        <p>
          The books available through our platform are provided by Open Library and are subject to their
          respective copyright terms. We claim no ownership over these works.
        </p>
        <p>
          The content on this website, including but not limited to text, graphics, logos, and software,
          is the property of The Library of Alexandria and is protected by applicable laws.
        </p>
      </section>

      <section className={styles.section}>
        <h2>5. Acceptable Use</h2>
        <p>You agree not to use the service to:</p>
        <ul>
          <li>Violate any applicable laws or regulations</li>
          <li>Infringe on the intellectual property rights of others</li>
          <li>Distribute malicious code or attempt to gain unauthorized access</li>
          <li>Harass, abuse, or harm other users</li>
          <li>Spam or scrape content for commercial purposes</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>6. Termination</h2>
        <p>
          We reserve the right to terminate or suspend your account and access to the service at our
          sole discretion, without prior notice, for any reason, including but not limited to a breach
          of these Terms.
        </p>
      </section>

      <section className={styles.section}>
        <h2>7. Disclaimer of Warranties</h2>
        <p>
          THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER
          EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY,
          FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
        </p>
      </section>

      <section className={styles.section}>
        <h2>8. Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by law, The Library of Alexandria shall not be liable for any
          indirect, incidental, special, consequential, or punitive damages resulting from your use of
          or inability to use the service.
        </p>
      </section>

      <section className={styles.section}>
        <h2>9. Governing Law</h2>
        <p>
          These Terms shall be governed by and construed in accordance with applicable laws, without
          regard to its conflict of law provisions.
        </p>
      </section>

      <section className={styles.section}>
        <h2>10. Changes to Terms</h2>
        <p>
          We reserve the right to modify these Terms at any time. We will provide notice of material
          changes by posting the updated terms on this page with a new "Last updated" date.
        </p>
      </section>

      <section className={styles.section}>
        <h2>11. Contact Us</h2>
        <p>
          If you have any questions about these Terms of Service, please contact us at:
        </p>
        <p className={styles.contact}>
          <strong>Email:</strong> daniel.rody@jala.university
        </p>
      </section>
    </div>
  );
}

export default Terms;