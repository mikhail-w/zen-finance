import React from 'react';
import { SignUp } from '@clerk/nextjs';

const SignUpPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Zen Finance</h1>
        <div className="bg-white p-8 rounded shadow">
          <SignUp
            appearance={{
              elements: {
                formButtonPrimary: 'text-lg py-3 w-full',
                formFieldInput: 'text-lg p-3 w-full',
                formFieldLabel: 'text-lg',
                headerTitle: 'text-2xl',
                headerSubtitle: 'text-lg',
                socialButtonsBlockButton: 'text-lg w-full',
                socialButtonsBlockButtonText: 'text-lg',
                formFieldAction: 'text-lg',
                footerActionLink: 'text-lg',
                footerActionText: 'text-lg',
                identityPreviewText: 'text-lg',
                card: 'w-full',
                rootBox: 'w-full',
              },
              layout: {
                socialButtonsPlacement: 'bottom',
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
