import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <div className={styles.footer}>
      <ul>
        <li>About</li>
        <li>Contact Us</li>
        <li>About Us</li>
        <li>Careers</li>
      </ul>
      <ul>
        <li>Help</li>
        <li>Payments</li>
        <li>Shipping</li>
        <li>Cancellations & Returns</li>
      </ul>
      <ul>
        <li>Social</li>
        <li>Facebook</li>
        <li>Twitter</li>
        <li>Instagram</li>
        <li>Youtube</li>
      </ul>
    </div>
  );
};

export default Footer;
