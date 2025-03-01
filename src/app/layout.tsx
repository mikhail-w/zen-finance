import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Zen Finance | Less Stress, More Clarity',
  description: 'Minimalism meets modern finance for a seamless experience.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600&display=swap"
          rel="stylesheet"
        />
        <link rel="shortcut icon" href="/img/icon.png" type="image/png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
