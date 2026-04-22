"use client";

import { createContext, useContext, useState, ReactNode } from 'react';
import { translations } from '@/data/translations';
import { Language } from '@/types';

interface ThemeContextType {
  darkMode: boolean;
  toggleDark: () => void;
  language: Language;
  changeLanguage: () => void;
  isChanging: boolean;
  t: typeof translations['es'];
  c: ReturnType<typeof buildColors>;
  T: string;
}

function buildColors(darkMode: boolean) {
  return darkMode ? {
    bg: '#0b0b16', bgAlt: '#0b0b16', surface: '#13131f',
    border: '#2a2a45', borderLight: '#1e1e38',
    text: '#f0eeff', textMuted: '#9090b0', textSoft: '#7070a0',
    pill:         { bg: '#1e1e38', border: '#3a3a60', color: '#c4b5fd' },
    chip:         { bg: '#1e1e38', border: '#3a3a60', color: '#a78bfa' },
    card:         { bg: '#16162a', border: '#2a2a45' },
    navBg: '#0b0b16dd', footer: '#08080f',
    badge:        { bg: '#1e1e38', border: '#3a3a60', color: '#a78bfa' },
    skillCard:    { bg: '#16162a', border: '#2a2a45' },
    contactInput: { bg: '#13131f', border: '#2a2a45' },
    timelineLine: '#2a2a45',
    aboutGrad: 'linear-gradient(to top, #0b0b16f0 0%, transparent 55%)',
    tagBg: '#1e1e38', tagColor: '#a78bfa', tagBorder: '#3a3a60',
    socialBtn:    { bg: '#1e1e38', border: '#3a3a60', color: '#a78bfa' },
    langBtn:      { bg: '#1e1e38', border: '#3a3a60', color: '#a78bfa' },
    iconCircle: '#1e1e38', dotNode: '#1e1e38',
    expBadge:     { bg: '#1e1e38', border: '#3a3a60' },
    blobOpacity: 0.22, sectionDivider: 'transparent',
  } : {
    bg: '#f5f3ff', bgAlt: '#f5f3ff', surface: '#ffffff',
    border: '#e8e4fc', borderLight: '#f0eeff',
    text: '#1a1a2e', textMuted: '#9090b0', textSoft: '#6868a0',
    pill:         { bg: '#ede9fe', border: '#c4b5fd55', color: '#7c3aed' },
    chip:         { bg: '#f5f3ff', border: '#e8e4fc',   color: '#7c3aed' },
    card:         { bg: '#ffffff', border: '#e8e4fc' },
    navBg: '#f5f3ffdd', footer: '#f0eeff',
    badge:        { bg: '#ede9fe', border: '#c4b5fd55', color: '#7c3aed' },
    skillCard:    { bg: '#ffffff', border: '#e8e4fc' },
    contactInput: { bg: '#f9f8ff', border: '#e8e4fc' },
    timelineLine: '#e8e4fc',
    aboutGrad: 'linear-gradient(to top, #f5f3fff0 0%, transparent 55%)',
    tagBg: '#f5f3ffee', tagColor: '#7c3aed', tagBorder: '#a855f755',
    socialBtn:    { bg: '#ede9fe', border: '#c4b5fd55', color: '#7c3aed' },
    langBtn:      { bg: '#ede9fe', border: '#c4b5fd55', color: '#7c3aed' },
    iconCircle: '#ede9fe', dotNode: '#ede9fe',
    expBadge:     { bg: '#ede9fe', border: '#c4b5fd55' },
    blobOpacity: 1, sectionDivider: '#e8e4fc',
  };
}

export { buildColors };

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [darkMode, setDarkMode]       = useState(false);
  const [language, setLanguage]       = useState<Language>('es');
  const [isChanging, setIsChanging]   = useState(false);

  const toggleDark = () => setDarkMode(prev => !prev);

  const changeLanguage = () => {
    setIsChanging(true);
    setTimeout(() => {
      setLanguage(prev => prev === 'es' ? 'en' : 'es');
      setIsChanging(false);
    }, 250);
  };

  const t    = translations[language];
  const c    = buildColors(darkMode);
  const T    = 'all 0.4s ease';

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDark, language, changeLanguage, isChanging, t, c, T }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
  return ctx;
}