import './globals.css';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';

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
    <html lang="en" className={poppins.className}>
      <body>{children}</body>
    </html>
  );
}
