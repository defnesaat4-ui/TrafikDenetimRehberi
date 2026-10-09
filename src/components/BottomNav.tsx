import React from 'react';
import { Home, Calculator, BookOpen, Compass, Scale, FileText } from 'lucide-react';
import { AppTab } from '../types/traffic';

interface BottomNavProps {
  currentTab: AppTab;
  onTabChange: (tab: AppTab) => void;
  calculatorItemCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onTabChange,
  calculatorItemCount,
}) => {
  // 6 Sekme: Ana Sayfa, Mevzuat (Kullanıcı talebi), Faaliyet, Tonajmatik, Rehberler, Araçlar
  const tabs = [
    {
      id: 'home' as AppTab,
      label: 'Ana Sayfa',
      icon: Home,
    },
    {
      id: 'legislation' as AppTab,
      label: 'Mevzuat',
      icon: FileText,
    },
    {
      id: 'calculator' as AppTab,
      label: 'Faaliyet',
      icon: Calculator,
      badge: calculatorItemCount > 0 ? calculatorItemCount : undefined,
    },
    {
      id: 'tonnage' as AppTab,
      label: 'Tonajmatik',
      icon: Scale,
    },
    {
      id: 'guides' as AppTab,
      label: 'Rehberler',
      icon: BookOpen,
    },
    {
      id: 'tools' as AppTab,
      label: 'Araçlar',
      icon: Compass,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-slate-900 border-t border-slate-800 text-slate-400 pb-[env(safe-area-inset-bottom,0px)] shadow-2xl">
      <div className="max-w-xl mx-auto grid grid-cols-6 h-16">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`relative flex flex-col items-center justify-center space-y-1 transition-colors px-0.5 cursor-pointer ${
                isActive
                  ? 'text-blue-400 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'scale-110 text-blue-400' : ''} transition-transform`} />
                {tab.badge && (
                  <span className="absolute -top-1.5 -right-2.5 min-w-4 h-4 px-1 rounded-full bg-red-600 text-white text-[9px] font-black flex items-center justify-center">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[9px] sm:text-[10px] tracking-tight truncate w-full text-center">
                {tab.label}
              </span>
              {isActive && (
                <span className="absolute bottom-1 w-5 h-0.5 bg-blue-500 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
