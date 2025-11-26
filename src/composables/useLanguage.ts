import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { supportedLocales, type SupportedLocale } from '@/i18n'

export function useLanguage() {
  const { locale } = useI18n()
  const route = useRoute()
  const router = useRouter()

  const setLocale = (newLocale: SupportedLocale) => {
    locale.value = newLocale

    const currentPath = route.path
    const pathSegments = currentPath.split('/').filter(Boolean)

    if (pathSegments.length > 0 && supportedLocales.includes(pathSegments[0] as SupportedLocale)) {
      pathSegments[0] = newLocale
    } else {
      pathSegments.unshift(newLocale)
    }

    const newPath = '/' + pathSegments.join('/')

    router.replace({
      path: newPath,
      query: route.query,
    })
  }

  return {
    locale,
    setLocale,
  }
}
