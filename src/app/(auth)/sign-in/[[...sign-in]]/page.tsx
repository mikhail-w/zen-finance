import Image from 'next/image';
import { Loader2 } from 'lucide-react';
import { SignIn, ClerkLoaded, ClerkLoading } from '@clerk/nextjs';

const SignInPage = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-gradient-to-br from-white to-green-50">
      {/* Left side - Sign in form (visible on all screen sizes) */}
      <div className="h-full flex flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
        <div className="w-full max-w-md mx-auto">
          <div className="text-center space-y-3 sm:space-y-4 mb-6 sm:mb-10">
            <h1 className="font-bold text-3xl sm:text-4xl text-gray-800 mb-2">
              Welcome Back
            </h1>
            <p className="text-base sm:text-lg text-gray-600">
              Log in or create an account to access your Zen Finance dashboard
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-xl p-4 sm:p-6">
            <ClerkLoaded>
              <SignIn
                path="/sign-in"
                appearance={{
                  elements: {
                    formButtonPrimary:
                      'bg-green-600 hover:bg-green-700 text-base sm:text-lg py-2 sm:py-3',
                    formFieldInput:
                      'text-base sm:text-lg py-2 sm:py-3 border-gray-300 focus:border-green-500 focus:ring-green-500',
                    footerActionLink:
                      'text-green-600 hover:text-green-700 text-base sm:text-lg',
                    headerTitle: 'text-xl sm:text-2xl text-gray-800',
                    headerSubtitle: 'text-base sm:text-lg text-gray-600',
                    formFieldLabel: 'text-base sm:text-lg text-gray-700',
                    socialButtonsBlockButton:
                      'border-gray-300 text-base sm:text-lg py-2 sm:py-3 hover:bg-gray-50',
                    socialButtonsIconButton:
                      'text-base sm:text-lg p-2 sm:p-3 border-gray-300 hover:bg-gray-50',
                    otpCodeFieldInput:
                      'text-xl sm:text-2xl border-gray-300 focus:border-green-500 focus:ring-green-500',
                    card: 'shadow-none',
                    navbar: 'hidden',
                    dividerLine: 'border-t-2 border-gray-200',
                    dividerText: 'text-base sm:text-lg text-gray-500 bg-white',
                    identityPreviewEditButton:
                      'text-green-600 hover:text-green-700 text-base sm:text-lg',
                    formResendCodeLink:
                      'text-green-600 hover:text-green-700 text-base sm:text-lg',
                  },
                }}
              />
            </ClerkLoaded>
            <ClerkLoading>
              <div className="flex items-center justify-center py-8 sm:py-12">
                <Loader2 className="h-8 w-8 sm:h-10 sm:w-10 animate-spin text-green-600" />
              </div>
            </ClerkLoading>
          </div>
        </div>
      </div>

      {/* Right side - Image (hidden on mobile, visible on desktop) */}
      <div className="hidden lg:flex items-center justify-center p-6 sm:p-8 lg:p-12">
        <Image
          src="/img/signin.svg"
          alt="Zen Finance Illustration"
          width={650}
          height={500}
          priority
          className="w-full h-auto max-w-lg xl:max-w-2xl drop-shadow-xl"
        />
      </div>
    </div>
  );
};

export default SignInPage;
