
import { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Mascot } from './Mascot';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="relative z-10">
        <Navbar />
        <main className="container mx-auto px-4 py-6 pb-20">
          {children}
        </main>
        <Mascot />
      </div>
    </div>
  );
};
