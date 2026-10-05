import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Archivo_Black, Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
});

const archivoBlack = Archivo_Black({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'Barber House',
  description:
    'Barbería masculina de alta precisión en Lima. Cortes de autor, ritual de barba y grooming premium.'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${archivoBlack.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
