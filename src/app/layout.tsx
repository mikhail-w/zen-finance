import './globals.css';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { QueryProvider } from '@/providers/query-provider';
import { Toaster } from '@/components/ui/sonner';
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';
import { Geist, Geist_Mono } from 'next/font/google';
import SheetPovider from '@/providers/sheet-provider';

// Configure the font
const poppins = Poppins({
  weight: ['300', '400', '500', '600'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Zen Finance | Less Stress, More Clarity',
  description: 'Minimalism meets modern finance for a seamless experience.',
  icons: {
    icon: '/favicon.ico?v=2',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={poppins.className}>
          <QueryProvider>
            <SheetPovider />
            <Toaster />
            {children}
          </QueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
