import React from 'react';
import styles from './AuthModal.module.css';

export const TermsContent: React.FC = () => (
  <div className={styles.termsContent}>
    <div className={styles.termsSection}>
      <h4>1. Membership Eligibility</h4>
      <p>To become a member of MKN, you must:</p>
      <ul>
        <li>Be at least 16 years of age, or have parental/guardian consent if younger</li>
        <li>Provide some form of personal identification</li>
        <li>If married, provide written consent from your spouse to join the religious community</li>
        <li>Complete the registration process</li>
        <li>Agree to abide by the organization's spiritual principles and guidelines</li>
      </ul>
    </div>

    <div className={styles.termsSection}>
      <h4>2. Membership Responsibilities</h4>
      <p>As a member, you are expected to:</p>
      <ul>
        <li>Maintain accurate personal information</li>
        <li>Participate in spiritual activities and gatherings</li>
        <li>Adhere to the spiritual code of conduct</li>
        <li>Respect fellow members and spiritual leadership</li>
        <li>Support the community through voluntary contributions as able</li>
      </ul>
    </div>

    <div className={styles.termsSection}>
      <h4>3. Data Privacy</h4>
      <p>We are committed to protecting your personal information:</p>
      <ul>
        <li>Your data will be used solely for organizational and spiritual purposes</li>
        <li>We implement security measures to protect your information</li>
        <li>You may request access to your personal data</li>
        <li>Data will not be shared with third parties without consent</li>
      </ul>
    </div>

    <div className={styles.termsSection}>
      <h4>4. Spiritual Code of Conduct</h4>
      <p>Members must maintain spiritual and ethical behavior:</p>
      <ul>
        <li>Respect diversity and inclusion within our spiritual community</li>
        <li>Maintain confidentiality of spiritual and organizational matters</li>
        <li>Uphold the spiritual values and teachings of MKN</li>
        <li>Participate in good faith in all spiritual activities</li>
      </ul>
    </div>

    <div className={styles.termsSection}>
      <h4>5. Membership Termination</h4>
      <p>Membership may be terminated under the following circumstances:</p>
      <ul>
        <li>Repeated violation of spiritual principles and community guidelines</li>
        <li>Behavior that disrupts the spiritual harmony of the community</li>
        <li>At the member's request for personal or spiritual reasons</li>
        <li>By mutual agreement for the benefit of the individual and community</li>
      </ul>
    </div>

    <div className={styles.termsSection}>
      <h4>6. Amendments</h4>
      <p>The organization reserves the right to:</p>
      <ul>
        <li>Modify these terms with proper notice to the community</li>
        <li>Update spiritual guidelines as inspired by divine guidance</li>
        <li>Change organizational policies to better serve the spiritual mission</li>
      </ul>
      <p>Members will be notified of any changes to these terms and conditions.</p>
    </div>
  </div>
);
