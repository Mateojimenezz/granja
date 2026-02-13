import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Granja SaaS',
  description: 'Plataforma SaaS agropecuaria modular',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
