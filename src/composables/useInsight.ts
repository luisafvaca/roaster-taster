import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Scores } from './useCalculator'

export function useInsight(scores: { value: Scores }) {
  const { t } = useI18n()

  const getSweetnessDesc = (value: number): string => {
    if (value >= 7) return t('insight.sweetness.outstanding')
    if (value >= 4) return t('insight.sweetness.medium')
    return t('insight.sweetness.low')
  }

  const getAcidityDesc = (value: number): string => {
    if (value >= 7) return t('insight.acidity.high')
    if (value >= 5) return t('insight.acidity.medium')
    if (value >= 3) return t('insight.acidity.low')
    return t('insight.acidity.veryLow')
  }

  const getFragranceDesc = (value: number): string => {
    if (value >= 7) return t('insight.fragrance.high')
    if (value >= 5) return t('insight.fragrance.medium')
    return t('insight.fragrance.low')
  }

  const getAftertasteDesc = (value: number): string => {
    if (value >= 7) return t('insight.aftertaste.long')
    if (value >= 5) return t('insight.aftertaste.medium')
    if (value >= 3) return t('insight.aftertaste.short')
    return t('insight.aftertaste.veryShort')
  }

  const getAromaDesc = (value: number): string => {
    if (value >= 7) return t('insight.aroma.intense')
    if (value >= 5) return t('insight.aroma.moderate')
    return t('insight.aroma.soft')
  }

  const getFlavorDesc = (value: number): string => {
    if (value >= 7) return t('insight.flavor.complex')
    if (value >= 5) return t('insight.flavor.balanced')
    return t('insight.flavor.simple')
  }

  const getMouthfeelDesc = (value: number): string => {
    if (value >= 7) return t('insight.mouthfeel.full')
    if (value >= 5) return t('insight.mouthfeel.medium')
    return t('insight.mouthfeel.light')
  }

  const getInterpretation = (scores: Scores): string => {
    const avgQuality =
      (scores.fragrance +
        scores.aroma +
        scores.flavor +
        scores.aftertaste +
        scores.acidity +
        scores.sweetness +
        scores.mouthfeel +
        scores.overall) /
      8

    if (avgQuality >= 7) {
      return t('insight.interpretation.highQuality')
    }
    if (avgQuality >= 5) {
      return t('insight.interpretation.balanced')
    }
    return t('insight.interpretation.needsAttention')
  }

  const getMethodSuggestion = (scores: Scores): string => {
    const { acidity, sweetness, mouthfeel } = scores

    if (acidity >= 7 && sweetness >= 6) {
      return t('insight.method.aciditySweetness')
    }
    if (sweetness >= 7 && mouthfeel >= 6) {
      return t('insight.method.sweetnessBody')
    }
    if (acidity >= 7) {
      return t('insight.method.acidity')
    }
    if (mouthfeel >= 7) {
      return t('insight.method.body')
    }
    return t('insight.method.versatile')
  }

  const insight = computed(() => {
    const s = scores.value

    const sweetnessDesc = getSweetnessDesc(s.sweetness)
    const acidityDesc = getAcidityDesc(s.acidity)
    const fragranceDesc = getFragranceDesc(s.fragrance)
    const aftertasteDesc = getAftertasteDesc(s.aftertaste)
    const interpretation = getInterpretation(s)
    const methodSuggestion = getMethodSuggestion(s)

    return t('insight.template', {
      sweetness: sweetnessDesc,
      acidity: acidityDesc,
      fragrance: fragranceDesc,
      aftertaste: aftertasteDesc,
      interpretation,
      method: methodSuggestion,
    })
  })

  return {
    insight,
  }
}
