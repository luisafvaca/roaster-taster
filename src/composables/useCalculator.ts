import { ref, computed } from 'vue'
import qualityCategories from '../constants/qualityCategories'
import qualityValueMap from '../constants/qualityValueMap'
import type { QualityKey } from '../constants/qualityCategories'
import type { PenaltyKey } from '../constants/penaltyCategories'

interface Scores {
  fragrance: number
  aroma: number
  flavor: number
  aftertaste: number
  acidity: number
  sweetness: number
  mouthfeel: number
  overall: number
  nonUniformCups: number
  defectiveCups: number
}

const BASE_SCORE = 50.0
const MAX_SCORE = 100.0

export function useCalculator() {
  const scores = ref<Scores>({
    fragrance: 1,
    aroma: 1,
    flavor: 1,
    aftertaste: 1,
    acidity: 1,
    sweetness: 1,
    mouthfeel: 1,
    overall: 1,
    nonUniformCups: 0,
    defectiveCups: 0,
  })

  const getQualityScore = (key: QualityKey): number => {
    return scores.value[key]
  }

  const getPenaltyScore = (key: PenaltyKey): number => {
    return scores.value[key]
  }

  const updateQualityScore = (key: QualityKey, value: number) => {
    scores.value[key] = value
  }

  const updatePenaltyScore = (key: PenaltyKey, value: number) => {
    scores.value[key] = value
  }

  const calculateScore = (): number => {
    const qualitySum = qualityCategories.reduce((sum, category) => {
      const scoreValue = scores.value[category.key]
      const mappedValue = qualityValueMap[scoreValue] ?? 1.0
      return sum + mappedValue
    }, 0)

    const nonUniformPenalty = scores.value.nonUniformCups * 2.0
    const defectivePenalty = scores.value.defectiveCups * 4.0
    const totalPenalty = nonUniformPenalty + defectivePenalty

    const theoreticalScore = BASE_SCORE + qualitySum - totalPenalty

    return Math.min(theoreticalScore, MAX_SCORE)
  }

  const affectiveScore = computed(() => calculateScore())

  return {
    scores,
    getQualityScore,
    getPenaltyScore,
    updateQualityScore,
    updatePenaltyScore,
    affectiveScore,
  }
}
