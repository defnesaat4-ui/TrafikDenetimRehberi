import React, { useState, useEffect } from 'react';
import {
  TrafficViolation,
  CalculatedItem,
  DailyShiftActivity,
  TextSizeOption,
  AppTab,
  UnitContactConfig,
  DEFAULT_UNIT_CONTACT,
} from './types/traffic';
import { TRAFFIC_VIOLATIONS } from './data/trafficViolations';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeView } from './components/HomeView';
import { SearchView } from './components/SearchView';
import { CalculatorView } from './components/CalculatorView';
import { GuidesView } from './components/GuidesView';
import { ToolsView } from './components/ToolsView';
import { FavoritesView } from './components/FavoritesView';
import { ViolationDetailModal } from './components/ViolationDetailModal';
import { SettingsModal } from './components/SettingsModal';
import { TonajmatikView } from './components/TonajmatikView';
import { LegislationView } from './components/LegislationView';
import { SplashScreen } from './components/SplashScreen';

export default function App() {
  // Splash Screen opening animation state
  const [showSplash, setShowSplash] = useState(true);

  // Navigation tab state
  const [currentTab, setCurrentTab] = useState<AppTab>('home');

  // Search keyword handed over from home quick tags
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  // Selected violation for modal view
  const [selectedViolation, setSelectedViolation] = useState<TrafficViolation | null>(null);

  // Target article for legislation jump
  const [legislationTargetArticle, setLegislationTargetArticle] = useState<string | null>(null);

  // Settings modal open
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Dark mode state
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('trafik_theme_dark');
    if (saved !== null) {
      return saved === 'true';
    }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Text size state
  const [textSize, setTextSize] = useState<TextSizeOption>(() => {
    return (localStorage.getItem('trafik_text_size') as TextSizeOption) || 'normal';
  });

  // Favorites state (array of violation IDs)
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('trafik_favorites');
      return saved ? JSON.parse(saved) : ['ktk-48-5-1', 'ktk-36-3-a', 'ktk-91', 'ktk-34-a'];
    } catch {
      return [];
    }
  });

  // Recent violations history
  const [recentIds, setRecentIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('trafik_recent');
      return saved ? JSON.parse(saved) : ['ktk-48-5-1', 'ktk-36-3-a', 'ktk-23-5-b'];
    } catch {
      return [];
    }
  });

  // Calculator / Shift activity items state (with quantity)
  const [calculatorItems, setCalculatorItems] = useState<CalculatedItem[]>(() => {
    try {
      const saved = localStorage.getItem('trafik_calc_items');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Helper for current date string
  const getTodayDateString = () => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    return `${day}.${month}.${year}`;
  };

  // Daily Shift Activity Counters (Araç, Şahıs, UYAP, ASAL, Suç Eşyası)
  const [activity, setActivity] = useState<DailyShiftActivity>(() => {
    try {
      const saved = localStorage.getItem('manisa_otoyol_activity');
      if (saved) return JSON.parse(saved);
    } catch {}
    return {
      date: getTodayDateString(),
      teamName: 'Trafik Denetleme Ekibi',
      checkedVehicles: 0,
      checkedPersons: 0,
      capturedVehicles: 0,
      capturedPersonsUyap: 0,
      capturedPersonsAsal: 0,
      seizedCrimeGoods: 0,
    };
  });

  // Customizable Unit & Central Contact Info (Kullanıcı Talebi)
  const [unitContact, setUnitContact] = useState<UnitContactConfig>(() => {
    try {
      const saved = localStorage.getItem('trafik_unit_contact');
      if (saved) return JSON.parse(saved);
    } catch {}
    return DEFAULT_UNIT_CONTACT;
  });

  // Geri Tuşu (Android / Browser History) Yönetimi:
  // "Ceza maddesi açıldığında geri tuşuna basılınca uygulamadan çıkmayacak. Ana menüye gelecek. Ana menüdeyken geri tuşuna basılırsa kapanacak uygulama."
  useEffect(() => {
    window.history.replaceState({ appState: 'home' }, '');
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      // 1. Ceza maddesi detayı açıksa: modalı kapat ve uygulamada kal
      if (selectedViolation) {
        setSelectedViolation(null);
        return;
      }
      // 2. Ayarlar açıksa: ayarları kapat
      if (isSettingsOpen) {
        setIsSettingsOpen(false);
        return;
      }
      // 3. Ana menü dışında bir sekmedeyse: ana sayfaya dön
      if (currentTab !== 'home') {
        setCurrentTab('home');
        return;
      }
      // 4. Ana menüdeyse: browser/Android varsayılan geri tuşu uygulamadan çıkar!
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [selectedViolation, isSettingsOpen, currentTab]);

  // Apply dark theme class to root html
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('trafik_theme_dark', String(isDark));
  }, [isDark]);

  // Persist text size
  useEffect(() => {
    localStorage.setItem('trafik_text_size', textSize);
  }, [textSize]);

  // Persist favorites
  useEffect(() => {
    localStorage.setItem('trafik_favorites', JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  // Persist recents
  useEffect(() => {
    localStorage.setItem('trafik_recent', JSON.stringify(recentIds));
  }, [recentIds]);

  // Persist calculator items
  useEffect(() => {
    localStorage.setItem('trafik_calc_items', JSON.stringify(calculatorItems));
  }, [calculatorItems]);

  // Persist shift activity
  useEffect(() => {
    localStorage.setItem('manisa_otoyol_activity', JSON.stringify(activity));
  }, [activity]);

  // Persist unit contacts
  useEffect(() => {
    localStorage.setItem('trafik_unit_contact', JSON.stringify(unitContact));
  }, [unitContact]);

  // Toggle favorite
  const handleToggleFavorite = (id: string) => {
    setFavoriteIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Add violation to shift (increments count if already in list)
  const handleAddItemToCalculator = (violation: TrafficViolation) => {
    setCalculatorItems((prev) => {
      const index = prev.findIndex((item) => item.violation.id === violation.id);
      if (index >= 0) {
        const copy = [...prev];
        copy[index] = { ...copy[index], quantity: copy[index].quantity + 1 };
        return copy;
      }
      return [...prev, { violation, quantity: 1 }];
    });
  };

  const handleIncrementQuantity = (id: string) => {
    setCalculatorItems((prev) =>
      prev.map((item) =>
        item.violation.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrementQuantity = (id: string) => {
    setCalculatorItems((prev) =>
      prev
        .map((item) =>
          item.violation.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Toggle calculator
  const handleToggleCalculator = (violation: TrafficViolation) => {
    setCalculatorItems((prev) => {
      const exists = prev.some((item) => item.violation.id === violation.id);
      if (exists) {
        return prev.filter((item) => item.violation.id !== violation.id);
      } else {
        return [...prev, { violation, quantity: 1 }];
      }
    });
  };

  const handleRemoveItemFromCalculator = (id: string) => {
    setCalculatorItems((prev) => prev.filter((item) => item.violation.id !== id));
  };

  const handleClearCalculator = () => {
    setCalculatorItems([]);
  };

  // Select violation -> push history state and open modal
  const handleSelectViolation = (violation: TrafficViolation) => {
    window.history.pushState({ modal: 'violation', id: violation.id }, '');
    setSelectedViolation(violation);
    setRecentIds((prev) => {
      const filtered = prev.filter((id) => id !== violation.id);
      return [violation.id, ...filtered].slice(0, 15);
    });
  };

  // Tab switching with history integration
  const handleTabChange = (tab: AppTab) => {
    if (tab === 'search') setSearchKeyword('');
    if (currentTab === 'home' && tab !== 'home') {
      window.history.pushState({ tab }, '');
    }
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Navigate to legislation article
  const handleNavigateToLegislation = (article: string) => {
    setLegislationTargetArticle(article);
    handleTabChange('legislation');
  };

  // Open settings with history state
  const handleOpenSettings = () => {
    window.history.pushState({ modal: 'settings' }, '');
    setIsSettingsOpen(true);
  };

  // Reset all local storage data
  const handleResetAllData = () => {
    localStorage.removeItem('trafik_favorites');
    localStorage.removeItem('trafik_recent');
    localStorage.removeItem('trafik_calc_items');
    localStorage.removeItem('manisa_otoyol_activity');
    localStorage.removeItem('trafik_unit_contact');
    setFavoriteIds([]);
    setRecentIds([]);
    setCalculatorItems([]);
    setUnitContact(DEFAULT_UNIT_CONTACT);
    setActivity({
      date: getTodayDateString(),
      teamName: 'Trafik Denetleme Ekibi',
      checkedVehicles: 0,
      checkedPersons: 0,
      capturedVehicles: 0,
      capturedPersonsUyap: 0,
      capturedPersonsAsal: 0,
      seizedCrimeGoods: 0,
    });
    setIsSettingsOpen(false);
  };

  // Summary counts
  const totalPenaltiesCount = calculatorItems.reduce((sum, item) => sum + item.quantity, 0);

  // Map IDs to violation items
  const recentViolations = recentIds
    .map((id) => TRAFFIC_VIOLATIONS.find((v) => v.id === id))
    .filter((v): v is TrafficViolation => Boolean(v));
  const favoriteViolations = favoriteIds
    .map((id) => TRAFFIC_VIOLATIONS.find((v) => v.id === id))
    .filter((v): v is TrafficViolation => Boolean(v));

  const calculatorIds = calculatorItems.map((i) => i.violation.id);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-150">
      {/* Açılış Animasyonu (Splash Screen - Yasin SAAT tarafından hazırlanmıştır) */}
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}

      {/* Sticky Law Enforcement Header */}
      <Header
        isDark={isDark}
        onToggleTheme={() => setIsDark((prev) => !prev)}
        onOpenSettings={handleOpenSettings}
      />

      {/* Main Tab Screen Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-3 sm:px-4 pt-3 sm:pt-4">
        {currentTab === 'home' && (
          <HomeView
            onNavigateTab={handleTabChange}
            onSelectViolation={handleSelectViolation}
            onAddViolationToShift={handleAddItemToCalculator}
            allViolations={TRAFFIC_VIOLATIONS}
            calculatorIds={calculatorIds}
            favoriteIds={favoriteIds}
            onToggleFavorite={handleToggleFavorite}
            totalPenaltiesCount={totalPenaltiesCount}
            textSize={textSize}
            unitContact={unitContact}
          />
        )}

        {currentTab === 'search' && (
          <SearchView
            allViolations={TRAFFIC_VIOLATIONS}
            initialSearchQuery={searchKeyword}
            onSelectViolation={handleSelectViolation}
            onToggleFavorite={handleToggleFavorite}
            onToggleCalculator={handleToggleCalculator}
            favoriteIds={favoriteIds}
            calculatorIds={calculatorIds}
            textSize={textSize}
          />
        )}

        {currentTab === 'legislation' && (
          <LegislationView
            targetArticle={legislationTargetArticle}
            onSelectViolationByArticle={(art) => {
              const found = TRAFFIC_VIOLATIONS.find(
                (v) => v.article.toLowerCase() === art.toLowerCase() || v.article.startsWith(art)
              );
              if (found) {
                handleSelectViolation(found);
              }
            }}
            allViolations={TRAFFIC_VIOLATIONS}
          />
        )}

        {currentTab === 'calculator' && (
          <CalculatorView
            items={calculatorItems}
            allViolations={TRAFFIC_VIOLATIONS}
            activity={activity}
            onChangeActivity={setActivity}
            onAddItem={handleAddItemToCalculator}
            onIncrementQuantity={handleIncrementQuantity}
            onDecrementQuantity={handleDecrementQuantity}
            onRemoveItem={handleRemoveItemFromCalculator}
            onClear={handleClearCalculator}
            onSelectViolation={handleSelectViolation}
          />
        )}

        {currentTab === 'tonnage' && (
          <TonajmatikView
            onAddViolationToShift={handleAddItemToCalculator}
            allViolations={TRAFFIC_VIOLATIONS}
          />
        )}

        {currentTab === 'guides' && <GuidesView />}

        {currentTab === 'tools' && (
          <ToolsView unitContact={unitContact} onOpenSettings={handleOpenSettings} />
        )}

        {currentTab === 'favorites' && (
          <FavoritesView
            favoriteViolations={favoriteViolations}
            recentViolations={recentViolations}
            onSelectViolation={handleSelectViolation}
            onToggleFavorite={handleToggleFavorite}
            onToggleCalculator={handleToggleCalculator}
            onClearRecent={() => setRecentIds([])}
            onClearFavorites={() => setFavoriteIds([])}
            favoriteIds={favoriteIds}
            calculatorIds={calculatorIds}
            textSize={textSize}
          />
        )}
      </main>

      {/* Ergonomic Bottom Navigation Bar (6 Sekme: Ana Sayfa, Mevzuat, Faaliyet, Tonajmatik, Rehberler, Araçlar) */}
      <BottomNav
        currentTab={currentTab}
        onTabChange={handleTabChange}
        calculatorItemCount={totalPenaltiesCount}
      />

      {/* Detail Modal for Selected Violation */}
      <ViolationDetailModal
        violation={selectedViolation}
        isOpen={Boolean(selectedViolation)}
        onClose={() => setSelectedViolation(null)}
        isFavorite={selectedViolation ? favoriteIds.includes(selectedViolation.id) : false}
        isInCalculator={selectedViolation ? calculatorIds.includes(selectedViolation.id) : false}
        onToggleFavorite={handleToggleFavorite}
        onToggleCalculator={handleToggleCalculator}
        onNavigateToLegislation={handleNavigateToLegislation}
      />

      {/* Settings & Info Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        isDark={isDark}
        onToggleTheme={() => setIsDark((prev) => !prev)}
        textSize={textSize}
        onChangeTextSize={setTextSize}
        onResetAllData={handleResetAllData}
        unitContact={unitContact}
        onUpdateUnitContact={setUnitContact}
      />
    </div>
  );
}
