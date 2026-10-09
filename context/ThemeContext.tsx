"use client";

import { createContext, useContext, useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from 'react';
import { translations } from '@/data/translations';
import { Language } from '@/types';

interface ThemeContextType {
  darkMode: boolean;
  toggleDark: () => void;
  language: Language;
  changeLanguage: () => void;
  isChanging: boolean;
  t: typeof translations['es'];
}

const THEME_STORAGE_KEY = 'daniel-portfolio-theme';
const LANGUAGE_TRANSITION_MS = 180;
let sessionPreference: boolean | null = null;

function getThemeSnapshot() {
  if (sessionPreference !== null) return sessionPreference;
  try {
    const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === 'dark') return true;
    if (saved === 'light') return false;
  } catch {
    // The operating system preference is the fallback.
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function subscribeToTheme(callback: () => void) {
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  const notify = () => callback();
  const handleStorage = () => {
    sessionPreference = null;
    callback();
  };
  media.addEventListener('change', notify);
  window.addEventListener('storage', handleStorage);
  window.addEventListener('portfolio-theme-change', notify);
  return () => {
    media.removeEventListener('change', notify);
    window.removeEventListener('storage', handleStorage);
    window.removeEventListener('portfolio-theme-change', notify);
  };
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const darkMode = useSyncExternalStore(subscribeToTheme, getThemeSnapshot, () => false);
  const [language, setLanguage] = useState<Language>('es');
  const [isChanging, setIsChanging] = useState(false);
  const languageChangeTimer = useRef<number | undefined>(undefined);

  const toggleDark = () => {
    const next = !darkMode;
    sessionPreference = next;
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, next ? 'dark' : 'light');
    } catch {
      // The selected theme still applies for this session if storage is unavailable.
    }
    window.dispatchEvent(new Event('portfolio-theme-change'));
  };

  const changeLanguage = () => {
    setIsChanging(true);
    setLanguage(previous => previous === 'es' ? 'en' : 'es');
    window.clearTimeout(languageChangeTimer.current);
    languageChangeTimer.current = window.setTimeout(() => {
      setIsChanging(false);
      languageChangeTimer.current = undefined;
    }, LANGUAGE_TRANSITION_MS);
  };

  const t = translations[language];

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dataset.theme = darkMode ? 'dark' : 'light';
    document.documentElement.style.colorScheme = darkMode ? 'dark' : 'light';
  }, [darkMode, language]);

  useEffect(() => () => window.clearTimeout(languageChangeTimer.current), []);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDark, language, changeLanguage, isChanging, t }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used inside ThemeProvider');
  return context;
}
