import { computed } from 'vue'
import type { Scores } from './useCalculator'

export function useInsight(scores: { value: Scores }) {
  const getSweetnessDesc = (value: number): string => {
    if (value >= 7) return 'dulzor destacado'
    if (value >= 4) return 'dulzor medio'
    return 'dulzor bajo'
  }

  const getAcidityDesc = (value: number): string => {
    if (value >= 7) return 'acidez alta'
    if (value >= 5) return 'acidez media'
    if (value >= 3) return 'acidez baja'
    return 'acidez muy baja'
  }

  const getFragranceDesc = (value: number): string => {
    if (value >= 7) return 'fragancia alta'
    if (value >= 5) return 'fragancia media'
    return 'fragancia baja'
  }

  const getAftertasteDesc = (value: number): string => {
    if (value >= 7) return 'regusto largo y persistente'
    if (value >= 5) return 'regusto medio'
    if (value >= 3) return 'regusto corto'
    return 'regusto muy corto'
  }

  const getAromaDesc = (value: number): string => {
    if (value >= 7) return 'aroma intenso'
    if (value >= 5) return 'aroma moderado'
    return 'aroma suave'
  }

  const getFlavorDesc = (value: number): string => {
    if (value >= 7) return 'sabor complejo'
    if (value >= 5) return 'sabor balanceado'
    return 'sabor simple'
  }

  const getMouthfeelDesc = (value: number): string => {
    if (value >= 7) return 'cuerpo completo'
    if (value >= 5) return 'cuerpo medio'
    return 'cuerpo ligero'
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
      return 'un perfil de alta calidad'
    }
    if (avgQuality >= 5) {
      return 'un perfil balanceado'
    }
    return 'un perfil que requiere atención'
  }

  const getMethodSuggestion = (scores: Scores): string => {
    const { acidity, sweetness, mouthfeel } = scores

    if (acidity >= 7 && sweetness >= 6) {
      return 'métodos que resalten la acidez y dulzor, como V60 o Chemex'
    }
    if (sweetness >= 7 && mouthfeel >= 6) {
      return 'métodos que potencien el cuerpo, como French Press o AeroPress'
    }
    if (acidity >= 7) {
      return 'métodos de filtro que resalten la acidez, como V60'
    }
    if (mouthfeel >= 7) {
      return 'métodos de inmersión como French Press o AeroPress'
    }
    return 'métodos versátiles como V60 o AeroPress'
  }

  const insight = computed(() => {
    const s = scores.value

    const sweetnessDesc = getSweetnessDesc(s.sweetness)
    const acidityDesc = getAcidityDesc(s.acidity)
    const fragranceDesc = getFragranceDesc(s.fragrance)
    const aftertasteDesc = getAftertasteDesc(s.aftertaste)
    const interpretation = getInterpretation(s)
    const methodSuggestion = getMethodSuggestion(s)

    return `Café con ${sweetnessDesc} y ${acidityDesc}. La ${fragranceDesc}, pero el ${aftertasteDesc}, lo que indica ${interpretation}. Ideal para ${methodSuggestion}.`
  })

  return {
    insight,
  }
}
