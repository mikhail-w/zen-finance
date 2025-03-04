import Image from 'next/image';
import { Loader2 } from 'lucide-react';
import { SignUp, ClerkLoaded, ClerkLoading } from '@clerk/nextjs';

const SignUpPage = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-gradient-to-br from-white to-green-50">
      {/* Left side - Sign up form (visible on all screen sizes) */}
      <div className="h-full flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="text-center space-y-4 mb-10">
            <h1 className="font-bold text-4xl text-gray-800 mb-2">
              Join Zen Finance
            </h1>
            <p className="text-lg text-gray-600">
              Create an account to start managing your finances with ease
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-xl p-6">
            <ClerkLoaded>
              <SignUp
                appearance={{
                  elements: {
                    formButtonPrimary:
                      'bg-green-600 hover:bg-green-700 text-lg py-3',
                    formFieldInput:
                      'text-lg py-3 border-gray-300 focus:border-green-500 focus:ring-green-500',
                    footerActionLink:
                      'text-green-600 hover:text-green-700 text-lg',
                    headerTitle: 'text-2xl text-gray-800',
                    headerSubtitle: 'text-lg text-gray-600',
                    formFieldLabel: 'text-lg text-gray-700',
                    socialButtonsBlockButton:
                      'border-gray-300 text-lg py-3 hover:bg-gray-50',
                    socialButtonsIconButton:
                      'text-lg p-3 border-gray-300 hover:bg-gray-50',
                    otpCodeFieldInput:
                      'text-2xl border-gray-300 focus:border-green-500 focus:ring-green-500',
                    card: 'shadow-none',
                    navbar: 'hidden',
                    dividerLine: 'border-t-2 border-gray-200',
                    dividerText: 'text-lg text-gray-500 bg-white',
                    identityPreviewEditButton:
                      'text-green-600 hover:text-green-700 text-lg',
                    formResendCodeLink:
                      'text-green-600 hover:text-green-700 text-lg',
                    identityPreviewText: 'text-lg',
                    formFieldAction:
                      'text-green-600 hover:text-green-700 text-lg',
                    footerActionText: 'text-lg text-gray-600',
                    rootBox: 'w-full',
                  },
                  layout: {
                    socialButtonsPlacement: 'bottom',
                  },
                }}
              />
            </ClerkLoaded>
            <ClerkLoading>
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-10 w-10 animate-spin text-green-600" />
              </div>
            </ClerkLoading>
          </div>
        </div>
      </div>

      {/* Right side - Image (hidden on mobile, visible on desktop) */}
      <div className="hidden lg:flex items-center justify-center p-12">
        <Image
          src="/img/signup.svg"
          alt="Zen Finance Illustration"
          width={650}
          height={500}
          priority
          className="max-w-2xl w-full h-auto drop-shadow-xl"
        />
      </div>
    </div>
  );
};

export default SignUpPage;
