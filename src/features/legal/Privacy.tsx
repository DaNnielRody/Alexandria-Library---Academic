import styles from './Legal.module.css';

export function Privacy() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Privacy Policy</h1>
      <p className={styles.lastUpdated}>Last updated: April 2026</p>

      <section className={styles.section}>
        <h2>1. Introduction</h2>
        <p>
          The Library of Alexandria ("we", "our", or "us") is committed to protecting your privacy.
          This Privacy Policy explains how we collect, use, disclose, and safeguard your information
          when you use our digital library service.
        </p>
      </section>

      <section className={styles.section}>
        <h2>2. Information We Collect</h2>
        <h3>2.1 Information You Provide</h3>
        <ul>
          <li><strong>Account Information:</strong> When you create an account, we collect your name and email address</li>
          <li><strong>Wishlist Data:</strong> Information about books you save to your wishlist</li>
          <li><strong>Loan Records:</strong> Information about books you borrow through our service</li>
          <li><strong>Communications:</strong> Any information you provide when contacting us</li>
        </ul>

        <h3>2.2 Information Collected Automatically</h3>
        <ul>
          <li><strong>Usage Data:</strong> Pages visited, time spent on site, click patterns</li>
          <li><strong>Device Information:</strong> Browser type, operating system, device identifiers</li>
          <li><strong>Cookies:</strong> Essential cookies for authentication and preferences</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>3. How We Use Your Information</h2>
        <p>We use collected information to:</p>
        <ul>
          <li>Provide and maintain our library service</li>
          <li>Manage your account and provide customer support</li>
          <li>Track your borrowed and wishlisted books</li>
          <li>Improve and optimize our service</li>
          <li>Send service-related notifications</li>
          <li>Detect and prevent fraud or abuse</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>4. Information Sharing</h2>
        <p>We do not sell your personal information. We may share information with:</p>
        <ul>
          <li><strong>Service Providers:</strong> Third parties who help us operate our service (e.g., Open Library API)</li>
          <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
          <li><strong>Business Transfers:</strong> In case of a merger or acquisition</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>5. Data Retention</h2>
        <p>
          We retain your account information for as long as your account is active or as needed to
          provide services. You may request deletion of your account and associated data at any time.
        </p>
      </section>

      <section className={styles.section}>
        <h2>6. Your Rights</h2>
        <p>Depending on your location, you may have the right to:</p>
        <ul>
          <li><strong>Access:</strong> Request a copy of your personal data</li>
          <li><strong>Correction:</strong> Request correction of inaccurate data</li>
          <li><strong>Deletion:</strong> Request deletion of your data</li>
          <li><strong>Portability:</strong> Receive your data in a structured format</li>
          <li><strong>Object:</strong> Object to certain processing of your data</li>
        </ul>
        <p>
          To exercise these rights, please contact us at daniel.rody@jala.university.
        </p>
      </section>

      <section className={styles.section}>
        <h2>7. Data Security</h2>
        <p>
          We implement appropriate technical and organizational measures to protect your personal data
          against unauthorized access, alteration, disclosure, or destruction. However, no method of
          transmission over the Internet is 100% secure.
        </p>
      </section>

      <section className={styles.section}>
        <h2>8. Cookies Policy</h2>
        <p>
          We use essential cookies necessary for the service to function properly, including
          authentication and security cookies. These cookies do not collect personal data beyond
          what is necessary for the service to work.
        </p>
      </section>

      <section className={styles.section}>
        <h2>9. Children's Privacy</h2>
        <p>
          Our service is not intended for users under 18 years of age. We do not knowingly collect
          personal information from children. If you believe we have collected information from a
          child, please contact us immediately.
        </p>
      </section>

      <section className={styles.section}>
        <h2>10. Third-Party Services</h2>
        <p>
          Our service integrates with Open Library API. We are not responsible for the privacy
          practices of third-party services. We encourage you to review their privacy policies.
        </p>
      </section>

      <section className={styles.section}>
        <h2>11. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify you of any material
          changes by posting the new policy on this page and updating the "Last updated" date.
        </p>
      </section>

      <section className={styles.section}>
        <h2>12. Contact Us</h2>
        <p>
          If you have questions or concerns about this Privacy Policy, please contact us at:
        </p>
        <p className={styles.contact}>
          <strong>Email:</strong> daniel.rody@jala.university
        </p>
      </section>
    </div>
  );
}

export default Privacy;