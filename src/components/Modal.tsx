'use client';

import { useState, useEffect } from 'react';

export default function Modal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const btnOpenModal = document.querySelector('.btn-open-account');
    const btnCloseModal = document.querySelector('.btn-close-modal');
    const overlay = document.querySelector('.overlay');

    const openModal = function (e: Event) {
      e.preventDefault();
      setIsOpen(true);
    };

    const closeModal = function () {
      setIsOpen(false);
    };

    const handleEscape = function (e: KeyboardEvent) {
      if (e.key === 'Escape' && isOpen) closeModal();
    };

    btnOpenModal?.addEventListener('click', openModal);
    btnCloseModal?.addEventListener('click', closeModal);
    overlay?.addEventListener('click', closeModal);
    document.addEventListener('keydown', handleEscape);

    return () => {
      btnOpenModal?.removeEventListener('click', openModal);
      btnCloseModal?.removeEventListener('click', closeModal);
      overlay?.removeEventListener('click', closeModal);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  return (
    <>
      <div
        className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-[60rem] bg-[#f3f3f3] p-[5rem_6rem] shadow-[0_4rem_6rem_rgba(0,0,0,0.3)] z-[1000] transition-all duration-500 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <button className="font-inherit text-inherit absolute top-[0.5rem] right-[2rem] text-[4rem] cursor-pointer border-none bg-none btn-close-modal">
          &times;
        </button>
        <h2 className="text-[3.25rem] mb-[4.5rem] leading-[1.5]">
          Open your bank account <br />
          in just <span className="text-primary">5 minutes</span>
        </h2>
        <form className="mx-[3rem] grid grid-cols-[1fr_2fr] items-center gap-[2.5rem]">
          <label className="text-[1.7rem] font-medium">First Name</label>
          <input
            type="text"
            className="text-[1.7rem] p-[1rem_1.5rem] border border-[#ddd] rounded-[0.5rem]"
          />
          <label className="text-[1.7rem] font-medium">Last Name</label>
          <input
            type="text"
            className="text-[1.7rem] p-[1rem_1.5rem] border border-[#ddd] rounded-[0.5rem]"
          />
          <label className="text-[1.7rem] font-medium">Email Address</label>
          <input
            type="email"
            className="text-[1.7rem] p-[1rem_1.5rem] border border-[#ddd] rounded-[0.5rem]"
          />
          <button className="col-span-2 justify-self-center mt-[1rem] inline-block bg-primary text-[1.6rem] font-medium border-none p-[1.25rem_4.5rem] rounded-[10rem] cursor-pointer transition-all duration-300 hover:bg-primary-darker">
            Next step &rarr;
          </button>
        </form>
      </div>
      <div
        className={`fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] backdrop-blur-[4px] z-[100] transition-all duration-500 overlay ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      ></div>
    </>
  );
}
