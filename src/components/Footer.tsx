'use client';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="py-16 px-4 md:px-8 bg-[#37383d]">
      <div className="container mx-auto">
        <ul className="list-none flex flex-wrap justify-center gap-4 md:gap-8 mb-8 md:mb-12">
          <li>
            <Link
              href="#"
              className="text-base md:text-lg text-[#eee] no-underline hover:text-primary"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="text-base md:text-lg text-[#eee] no-underline hover:text-primary"
            >
              Pricing
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="text-base md:text-lg text-[#eee] no-underline hover:text-primary"
            >
              Terms of Use
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="text-base md:text-lg text-[#eee] no-underline hover:text-primary"
            >
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="text-base md:text-lg text-[#eee] no-underline hover:text-primary"
            >
              Careers
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="text-base md:text-lg text-[#eee] no-underline hover:text-primary"
            >
              Blog
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="text-base md:text-lg text-[#eee] no-underline hover:text-primary"
            >
              Contact Us
            </Link>
          </li>
        </ul>
        <div className="flex justify-center mb-8">
          <Image
            src="/img/icon.png"
            alt="Logo"
            className="h-12 w-auto"
            width={50}
            height={50}
          />
        </div>
        <p className="text-sm md:text-base text-[#aaa] text-center">
          &copy; Copyright by Zen Finance. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
