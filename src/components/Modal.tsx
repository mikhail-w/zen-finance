'use client';

import { useEffect, useState } from 'react';

export default function Modal() {
  // Prefix with underscore to indicate intentionally unused variable
  // This will prevent ESLint from flagging it
  const [_isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const modal = document.querySelector('.modal');
    const overlay = document.querySelector('.overlay');
    const btnCloseModal = document.querySelector('.btn--close-modal');
    const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

    const openModal = function (e: Event) {
      e.preventDefault();
      setIsModalOpen(true);
      modal?.classList.remove('hidden');
      overlay?.classList.remove('hidden');
    };

    const closeModal = function () {
      setIsModalOpen(false);
      modal?.classList.add('hidden');
      overlay?.classList.add('hidden');
    };

    btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
    btnCloseModal?.addEventListener('click', closeModal);
    overlay?.addEventListener('click', closeModal);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !modal?.classList.contains('hidden')) {
        closeModal();
      }
    });

    return () => {
      // Cleanup event listeners
      btnsOpenModal.forEach(btn => btn.removeEventListener('click', openModal));
      btnCloseModal?.removeEventListener('click', closeModal);
      overlay?.removeEventListener('click', closeModal);
      document.removeEventListener('keydown', () => {});
    };
  }, []);

  return (
    <>
      <div className="modal hidden">
        <button className="btn--close-modal">&times;</button>
        <h2 className="modal__header">
          Open your account <br />
          in just <span className="highlight">5 minutes</span>
        </h2>
        <form className="modal__form">
          <label>First Name</label>
          <input type="text" />
          <label>Last Name</label>
          <input type="text" />
          <label>Email Address</label>
          <input type="email" />
          <button className="btn">Next step &rarr;</button>
        </form>
      </div>
      <div className="overlay hidden"></div>
    </>
  );
}
