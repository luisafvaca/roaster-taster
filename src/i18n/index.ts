import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import es from './locales/es.json'
import it from './locales/it.json'
import pt from './locales/pt.json'

const supportedLocales = ['en', 'es', 'it', 'pt'] as const
type SupportedLocale = (typeof supportedLocales)[number]

function detectLocaleFromURL(): SupportedLocale {
  const pathSegments = window.location.pathname.split('/').filter(Boolean)
  if (pathSegments.length > 0) {
    const firstSegment = pathSegments[0]
    if (supportedLocales.includes(firstSegment as SupportedLocale)) {
      return firstSegment as SupportedLocale
    }
  }

  const browserLang = navigator.language.split('-')[0]
  if (supportedLocales.includes(browserLang as SupportedLocale)) {
    return browserLang as SupportedLocale
  }

  return 'es'
}

const initialLocale = detectLocaleFromURL()

const i18n = createI18n({
  legacy: false,
  locale: initialLocale,
  fallbackLocale: 'en',
  messages: {
    en,
    es,
    it,
    pt,
  },
})

export default i18n
export { supportedLocales, type SupportedLocale }
