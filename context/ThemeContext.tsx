"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
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
    bg: '#0f0e13', bgAlt: '#131219', surface: '#17161d',
    border: '#2d2b38', borderLight: '#24222d',
    text: '#eceaf2', textMuted: '#b4b0c0', textSoft: '#a5a2b2',
    pill:         { bg: '#211d2d', border: '#393149', color: '#c7b2ff' },
    chip:         { bg: '#211d2d', border: '#393149', color: '#c7b2ff' },
    card:         { bg: '#17161d', border: '#2d2b38' },
    navBg: '#0f0e13eF', footer: '#0b0a0f',
    badge:        { bg: '#211d2d', border: '#393149', color: '#c7b2ff' },
    skillCard:    { bg: '#17161d', border: '#2d2b38' },
    contactInput: { bg: '#131219', border: '#393743' },
    timelineLine: '#393743',
    aboutGrad: 'linear-gradient(to top, #0f0e13 0%, transparent 70%)',
    tagBg: '#211d2d', tagColor: '#c7b2ff', tagBorder: '#393149',
    socialBtn:    { bg: '#211d2d', border: '#393149', color: '#c7b2ff' },
    langBtn:      { bg: '#211d2d', border: '#393149', color: '#c7b2ff' },
    iconCircle: '#211d2d', dotNode: '#211d2d',
    expBadge:     { bg: '#211d2d', border: '#393149' },
    blobOpacity: 0.22, sectionDivider: 'transparent',
  } : {
    bg: '#f4f2ee', bgAlt: '#efede8', surface: '#ffffff',
    border: '#d9d5ce', borderLight: '#e8e5df',
    text: '#16151a', textMuted: '#5c5966', textSoft: '#5c5966',
    pill:         { bg: '#eee8f8', border: '#d7c8ed', color: '#5b21b6' },
    chip:         { bg: '#f4f2ee', border: '#d9d5ce', color: '#5b21b6' },
    card:         { bg: '#ffffff', border: '#d9d5ce' },
    navBg: '#f4f2eeed', footer: '#eeece7',
    badge:        { bg: '#eee8f8', border: '#d7c8ed', color: '#5b21b6' },
    skillCard:    { bg: '#ffffff', border: '#d9d5ce' },
    contactInput: { bg: '#f8f7f4', border: '#d9d5ce' },
    timelineLine: '#d9d5ce',
    aboutGrad: 'linear-gradient(to top, #f4f2ee 0%, transparent 70%)',
    tagBg: '#eee8f8', tagColor: '#5b21b6', tagBorder: '#d7c8ed',
    socialBtn:    { bg: '#ffffff', border: '#d9d5ce', color: '#5b21b6' },
    langBtn:      { bg: '#ffffff', border: '#d9d5ce', color: '#5b21b6' },
    iconCircle: '#eee8f8', dotNode: '#eee8f8',
    expBadge:     { bg: '#eee8f8', border: '#d7c8ed' },
    blobOpacity: 1, sectionDivider: '#d9d5ce',
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
  const T    = 'color 180ms ease, background-color 180ms ease, border-color 180ms ease';

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dataset.theme = darkMode ? 'dark' : 'light';
    document.documentElement.style.colorScheme = darkMode ? 'dark' : 'light';
  }, [darkMode, language]);

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
