import { useI18n } from 'vue-i18n'
import { useCoffeeInfo } from './useCoffeeInfo'
import { ORIGIN_MAP } from '../constants/originMap'
import { VARIETY_MAP } from '../constants/varietyMap'

export function useCoffeeCharacteristics() {
  const { t } = useI18n()
  const { coffeeInfo } = useCoffeeInfo()

  const getOriginCharacteristics = (): string => {
    const origin = coffeeInfo.origin === 'other' ? coffeeInfo.originOther : coffeeInfo.origin
    if (!origin) return ''

    const originLower = origin.toLowerCase()
    const originKey = ORIGIN_MAP[originLower]

    if (originKey) {
      return t(`insight.coffeeContext.origin.${originKey}`)
    }

    // Fallback: check if origin name contains any of the mapped keys
    for (const [key, translationKey] of Object.entries(ORIGIN_MAP)) {
      if (originLower.includes(key)) {
        return t(`insight.coffeeContext.origin.${translationKey}`)
      }
    }

    return ''
  }

  const getVarietyCharacteristics = (): string => {
    const variety = coffeeInfo.variety === 'other' ? coffeeInfo.varietyOther : coffeeInfo.variety
    if (!variety || !variety.trim()) return ''

    const varietyLower = variety.toLowerCase().replace(/\s+/g, '')
    const varietyKey = VARIETY_MAP[varietyLower]

    if (varietyKey) {
      return t(`insight.coffeeContext.variety.${varietyKey}`)
    }

    return ''
  }

  const getProcessEffect = (): string => {
    if (!coffeeInfo.process) return ''
    return t(`insight.coffeeContext.process.${coffeeInfo.process}`)
  }

  const getRoastLevelEffect = (): string => {
    if (!coffeeInfo.roastLevel) return ''
    return t(`insight.coffeeContext.roastLevel.${coffeeInfo.roastLevel}`)
  }

  const getRoastDateRange = (days: number): string => {
    if (days <= 3) return '0-3'
    if (days <= 10) return '4-10'
    if (days <= 20) return '11-20'
    if (days <= 30) return '21-30'
    return '30+'
  }

  const getRoastDateInfo = (): { name: string; tooltip: string | null } | null => {
    if (coffeeInfo.roastDate === null) return null

    const range = getRoastDateRange(coffeeInfo.roastDate)
    const rangeKey = `insight.coffeeContext.roastDate.ranges.${range}`

    try {
      const title = t(`${rangeKey}.title`)
      const description = t(`${rangeKey}.description`)
      return {
        name: `${coffeeInfo.roastDate} ${t('coffeeInfo.roastDate.days')} - ${title}`,
        tooltip: description,
      }
    } catch {
      let name = ''
      let tooltip = ''

      if (coffeeInfo.roastDate < 3) {
        name = `${coffeeInfo.roastDate} ${t('coffeeInfo.roastDate.days')}`
        tooltip = t('insight.coffeeContext.roastDate.veryFresh')
      } else if (coffeeInfo.roastDate > 30) {
        name = `${coffeeInfo.roastDate} ${t('coffeeInfo.roastDate.days')}`
        tooltip = t('insight.coffeeContext.roastDate.aging')
      } else {
        name = `${coffeeInfo.roastDate} ${t('coffeeInfo.roastDate.days')}`
        tooltip = ''
      }

      return {
        name,
        tooltip: tooltip || null,
      }
    }
  }

  return {
    getOriginCharacteristics,
    getVarietyCharacteristics,
    getProcessEffect,
    getRoastLevelEffect,
    getRoastDateInfo,
  }
}
