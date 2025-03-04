'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="py-[10rem] px-[3rem] bg-[#37383d]">
      <ul className="list-none flex justify-center mb-[5rem]">
        <li className="mr-[4rem]">
          <Link
            href="#"
            className="text-[1.6rem] text-[#eee] no-underline hover:text-primary"
          >
            About
          </Link>
        </li>
        <li className="mr-[4rem]">
          <Link
            href="#"
            className="text-[1.6rem] text-[#eee] no-underline hover:text-primary"
          >
            Pricing
          </Link>
        </li>
        <li className="mr-[4rem]">
          <Link
            href="#"
            className="text-[1.6rem] text-[#eee] no-underline hover:text-primary"
          >
            Terms of Use
          </Link>
        </li>
        <li className="mr-[4rem]">
          <Link
            href="#"
            className="text-[1.6rem] text-[#eee] no-underline hover:text-primary"
          >
            Privacy Policy
          </Link>
        </li>
        <li className="mr-[4rem]">
          <Link
            href="#"
            className="text-[1.6rem] text-[#eee] no-underline hover:text-primary"
          >
            Careers
          </Link>
        </li>
        <li className="mr-[4rem]">
          <Link
            href="#"
            className="text-[1.6rem] text-[#eee] no-underline hover:text-primary"
          >
            Blog
          </Link>
        </li>
        <li>
          <Link
            href="#"
            className="text-[1.6rem] text-[#eee] no-underline hover:text-primary"
          >
            Contact Us
          </Link>
        </li>
      </ul>
      <Image
        src="/img/icon.png"
        alt="Logo"
        className="h-[5rem] w-auto block mx-auto mb-[5rem]"
        width={50}
        height={50}
      />
      <p className="text-[1.4rem] text-[#aaa] text-center">
        &copy; Copyright by Zen Finance. All rights reserved.
      </p>
    </footer>
  );
}
