import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Scores } from './useCalculator'
import qualityCategories from '../constants/qualityCategories'

export function useStats(scores: { value: Scores }) {
  const { t } = useI18n()

  const qualityAttributes = computed(() => {
    return qualityCategories.map((cat) => ({
      key: cat.key,
      label: cat.labelKey,
      value: scores.value[cat.key],
    }))
  })

  const strongestAttribute = computed(() => {
    const attributes = qualityAttributes.value
    if (attributes.length === 0) {
      return { key: 'overall', label: 'calculator.overall', value: 0 }
    }
    const max = Math.max(...attributes.map((a) => a.value))
    const found = attributes.find((a) => a.value === max)
    return found ?? attributes[0]
  })

  const weakestAttribute = computed(() => {
    const attributes = qualityAttributes.value
    if (attributes.length === 0) {
      return { key: 'overall', label: 'calculator.overall', value: 0 }
    }
    const min = Math.min(...attributes.map((a) => a.value))
    const found = attributes.find((a) => a.value === min)
    return found ?? attributes[0]
  })

  // Calcular desviación estándar
  const calculateStandardDeviation = (values: number[]): number => {
    const mean = values.reduce((sum, val) => sum + val, 0) / values.length
    const squaredDiffs = values.map((val) => Math.pow(val - mean, 2))
    const avgSquaredDiff = squaredDiffs.reduce((sum, val) => sum + val, 0) / values.length
    return Math.sqrt(avgSquaredDiff)
  }

  // Detectar si todos los atributos son iguales
  const allEqual = computed(() => {
    const values = qualityAttributes.value.map((a) => a.value)
    if (values.length === 0) return false
    return values.every((v) => v === values[0])
  })

  // Balance general
  const balance = computed(() => {
    const values = qualityAttributes.value.map((a) => a.value)
    const stdDev = calculateStandardDeviation(values)

    // Categorizar basándose en la desviación estándar
    if (stdDev < 1.2) {
      return { level: 'balanced', levelKey: 'stats.balanceLevel.balanced', stdDev }
    }
    if (stdDev <= 2.0) {
      return {
        level: 'moderatelyBalanced',
        levelKey: 'stats.balanceLevel.moderatelyBalanced',
        stdDev,
      }
    }
    return { level: 'unbalanced', levelKey: 'stats.balanceLevel.unbalanced', stdDev }
  })

  return {
    strongestAttribute,
    weakestAttribute,
    balance,
    allEqual,
  }
}
