import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { CanteenProvider } from '@/context/CanteenContext';
import { FirebaseClientProvider } from '@/firebase';

export const metadata: Metadata = {
  title: 'Achariya College Canteen',
  description: 'Manage your canteen with ease.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=PT+Sans:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <FirebaseClientProvider>
          <CanteenProvider>
            {children}
            <Toaster />
          </CanteenProvider>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
