import { I18nText, Language } from '@/types/pageConfig';


export const getLocalizedText = (
  textObj?: I18nText | string | null,
  currentLang: string = 'ru',
  fallbackLang: string = 'ru'
): string => {
  if (!textObj) {
    return '';
  }

  if (typeof textObj === 'string') {
    return textObj;
  }

  const normalizedCurrentLang = (currentLang.split('-')[0].toLowerCase() as Language);
  const normalizedFallbackLang = (fallbackLang.split('-')[0].toLowerCase() as Language);

  if (textObj[normalizedCurrentLang]) {
    return textObj[normalizedCurrentLang];
  }

  if (textObj[normalizedFallbackLang]) {
    return textObj[normalizedFallbackLang];
  }

  const availableLangs: Language[] = ['ru', 'uz', 'en'];
  for (const lang of availableLangs) {
    if (textObj[lang]) {
      return textObj[lang];
    }
  }

  return '';
};
