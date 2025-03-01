'use client';

import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="footer">
      <ul className="footer__nav">
        <li className="footer__item">
          <a className="footer__link" href="#">
            About
          </a>
        </li>
        <li className="footer__item">
          <a className="footer__link" href="#">
            Pricing
          </a>
        </li>
        <li className="footer__item">
          <a className="footer__link" href="#">
            Terms of Use
          </a>
        </li>
        <li className="footer__item">
          <a className="footer__link" href="#">
            Privacy Policy
          </a>
        </li>
        <li className="footer__item">
          <a className="footer__link" href="#">
            Careers
          </a>
        </li>
        <li className="footer__item">
          <a className="footer__link" href="#">
            Blog
          </a>
        </li>
        <li className="footer__item">
          <a className="footer__link" href="#">
            Contact Us
          </a>
        </li>
      </ul>
      <Image
        src="/img/icon.png"
        alt="Logo"
        className="footer__logo"
        width={50}
        height={50}
      />
      <p className="footer__copyright">
        &copy; Copyright {new Date().getFullYear()} Zen Finance. All rights
        reserved.
      </p>
    </footer>
  );
}
