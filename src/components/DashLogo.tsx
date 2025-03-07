import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const DashLogo = () => {
  return (
    <Link href={'/'}>
      {' '}
      <div className="items-center hidden custom:flex">
        <Image
          src="/img/logo.svg"
          alt="Zen Finance logo"
          width={40}
          height={40}
        />
        <p className="font-semibold text-white text-2xl ml-2.5">Zen Finance</p>
      </div>
    </Link>
  );
};

export default DashLogo;
