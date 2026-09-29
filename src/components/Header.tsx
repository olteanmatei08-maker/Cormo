import React from 'react';
import { CormorantEmblem } from './CormorantEmblem';

interface HeaderProps {
  onNavigateToCalendar?: () => void;
}

export const Header: React.FC<HeaderProps> = () => {
  return (
    <header className="sticky top-0 z-40 bg-[#0c0e14] border-b border-[#1e2433] transition-colors duration-150">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo & Denumire Patrulă */}
        <div className="flex items-center gap-3 select-none">
          <CormorantEmblem size="sm" />
          <span className="text-lg sm:text-xl font-bold font-serif-title tracking-tight text-white select-none">
            Patrula Cormoran
          </span>
        </div>
      </div>
    </header>
  );
};
