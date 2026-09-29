import React from 'react';
import { BookOpen, FolderKanban, Calendar, TrendingUp, Users } from 'lucide-react';

export type NavTab = 'pedagogie' | 'resurse' | 'calendar' | 'progres' | 'despre';

interface BottomNavProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const tabs = [
    {
      id: 'pedagogie' as const,
      label: 'Pedagogie',
      icon: BookOpen,
    },
    {
      id: 'resurse' as const,
      label: 'Resurse',
      icon: FolderKanban,
    },
    {
      id: 'calendar' as const,
      label: 'Calendar',
      icon: Calendar,
    },
    {
      id: 'progres' as const,
      label: 'Progres',
      icon: TrendingUp,
    },
    {
      id: 'despre' as const,
      label: 'Despre',
      icon: Users,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#0c0e14] border-t border-[#1e2433] transition-colors">
      <div className="max-w-xl mx-auto px-2 h-16 flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              type="button"
              key={tab.id}
              onClick={(e) => {
                e.preventDefault();
                setActiveTab(tab.id);
              }}
              className={`flex flex-col items-center justify-center flex-1 py-1 cursor-pointer select-none transition-colors ${
                isActive
                  ? 'text-emerald-400'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div
                className={`w-12 h-8 rounded-xl flex items-center justify-center transition-colors ${
                  isActive
                    ? 'bg-emerald-950/70 text-emerald-400 border border-emerald-800/50'
                    : 'hover:bg-slate-900/60'
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>

              <span
                className={`text-[10px] tracking-tight mt-1 transition-colors ${
                  isActive ? 'text-white font-semibold' : 'text-slate-400 font-normal'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
