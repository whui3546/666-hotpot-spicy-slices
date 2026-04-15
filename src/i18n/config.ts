export type Locale = 'en' | 'zh' | 'es' | 'pt' | 'ar';

export const locales: Locale[] = ['en', 'zh', 'es', 'pt', 'ar'];

export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  zh: '中文',
  es: 'Español',
  pt: 'Português',
  ar: 'العربية',
};

export const localeFlags: Record<Locale, string> = {
  en: '🇺🇸',
  zh: '🇨🇳',
  es: '🇪🇸',
  pt: '🇵🇹',
  ar: '🇸🇦',
};

export const rtlLocales: Locale[] = ['ar'];
