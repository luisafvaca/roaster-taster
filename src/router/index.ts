import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LocaleWrapper from '../components/LocaleWrapper.vue'
import i18n from '../i18n'
import { supportedLocales } from '../i18n'
import type { SupportedLocale } from '../i18n'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:locale',
      component: LocaleWrapper,
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView,
        },
      ],
    },
    {
      path: '/',
      redirect: (to) => {
        const detectedLocale = i18n.global.locale.value as SupportedLocale
        return `/${detectedLocale}`
      },
    },
  ],
})

router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    const detectedLocale = i18n.global.locale.value as SupportedLocale
    return next(`/${detectedLocale}`)
  }

  const locale = to.params.locale as string
  if (locale && supportedLocales.includes(locale as SupportedLocale)) {
    i18n.global.locale.value = locale as SupportedLocale
    next()
  } else if (locale) {
    const detectedLocale = i18n.global.locale.value as SupportedLocale
    const pathSegments = to.path.split('/').filter(Boolean)
    if (pathSegments.length > 1) {
      pathSegments[0] = detectedLocale
      return next('/' + pathSegments.join('/'))
    }
    return next(`/${detectedLocale}`)
  } else {
    const detectedLocale = i18n.global.locale.value as SupportedLocale
    return next(`/${detectedLocale}${to.path === '/' ? '' : to.path}`)
  }
})

export default router
