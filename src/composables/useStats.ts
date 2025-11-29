import { computed } from 'vue'
import type { Scores } from './useCalculator'
import qualityCategories from '../constants/qualityCategories'

export function useStats(scores: { value: Scores }) {
  // Obtener solo los atributos de calidad (excluyendo penalizaciones)
  const qualityAttributes = computed(() => {
    return qualityCategories.map((cat) => ({
      key: cat.key,
      label: cat.labelKey,
      value: scores.value[cat.key],
    }))
  })

  // Mayor fortaleza sensorial (max)
  const strongestAttribute = computed(() => {
    const attributes = qualityAttributes.value
    if (attributes.length === 0) {
      return { key: 'overall', label: 'calculator.overall', value: 0 }
    }
    const max = Math.max(...attributes.map((a) => a.value))
    const found = attributes.find((a) => a.value === max)
    return found ?? attributes[0]
  })

  // Punto débil (min)
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

  // Balance general
  const balance = computed(() => {
    const values = qualityAttributes.value.map((a) => a.value)
    const stdDev = calculateStandardDeviation(values)

    // Categorizar basándose en la desviación estándar
    if (stdDev < 1.2) {
      return { level: 'balanceado', stdDev }
    }
    if (stdDev <= 2.0) {
      return { level: 'medianamente balanceado', stdDev }
    }
    return { level: 'desbalanceado', stdDev }
  })

  return {
    strongestAttribute,
    weakestAttribute,
    balance,
  }
}
