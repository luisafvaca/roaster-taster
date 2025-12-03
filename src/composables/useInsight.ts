import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Scores } from './useCalculator'
import { useCoffeeInfo } from './useCoffeeInfo'
import { useStats } from './useStats'

// Definición de tipo para las estadísticas de atributos
type AttributeKey = keyof Omit<
  Scores,
  'overall' | 'nonUniformCups' | 'defectiveCups' | 'totalScore'
>
type AttributeStat = {
  key: AttributeKey
  value: number
  label: string // Etiqueta traducida
}

export function useInsight(scores: { value: Scores }) {
  const { t } = useI18n()
  const { coffeeInfo } = useCoffeeInfo()
  const { strongestAttribute, weakestAttribute, balance } = useStats(scores)

  // --- Funciones de descripción (No cambiadas, son sólidas) ---

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

    if (avgQuality >= 7 && balance.value.level === 'balanced') {
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

  // --- Funciones de Contexto de Café (No cambiadas) ---

  const getOriginCharacteristics = (): string => {
    const origin = coffeeInfo.origin === 'other' ? coffeeInfo.originOther : coffeeInfo.origin
    if (!origin) return ''

    const originLower = origin.toLowerCase()
    if (originLower.includes('colombia')) {
      return t('insight.coffeeContext.origin.colombia')
    }
    if (originLower.includes('etiopía') || originLower.includes('ethiopia')) {
      return t('insight.coffeeContext.origin.ethiopia')
    }
    if (originLower.includes('brasil') || originLower.includes('brazil')) {
      return t('insight.coffeeContext.origin.brazil')
    }
    if (originLower.includes('costa rica') || originLower.includes('costarica')) {
      return t('insight.coffeeContext.origin.costaRica')
    }
    if (originLower.includes('guatemala')) {
      return t('insight.coffeeContext.origin.guatemala')
    }
    if (originLower.includes('kenia') || originLower.includes('kenya')) {
      return t('insight.coffeeContext.origin.kenya')
    }
    if (originLower.includes('perú') || originLower.includes('peru')) {
      return t('insight.coffeeContext.origin.peru')
    }
    return ''
  }

  const getVarietyCharacteristics = (): string => {
    const variety = coffeeInfo.variety === 'other' ? coffeeInfo.varietyOther : coffeeInfo.variety
    if (!variety || !variety.trim()) return ''

    const varietyLower = variety.toLowerCase()
    if (varietyLower.includes('caturra')) {
      return t('insight.coffeeContext.variety.caturra')
    }
    if (varietyLower.includes('bourbon')) {
      return t('insight.coffeeContext.variety.bourbon')
    }
    if (varietyLower.includes('typica')) {
      return t('insight.coffeeContext.variety.typica')
    }
    if (varietyLower.includes('geisha') || varietyLower.includes('gesha')) {
      return t('insight.coffeeContext.variety.geisha')
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

  const getProcessText = (): string => {
    if (!coffeeInfo.process) return t('insight.unknownProcess')
    return t(`coffeeInfo.process.${coffeeInfo.process}`).toLowerCase()
  }

  const getRoastLevelText = (): string => {
    if (!coffeeInfo.roastLevel) return t('insight.unknownRoastLevel')
    return t(`coffeeInfo.roastLevel.${coffeeInfo.roastLevel}`).toLowerCase()
  }

  const getRoastDateNote = (): string => {
    if (coffeeInfo.roastDate === null) return ''

    if (coffeeInfo.roastDate < 3) {
      return t('insight.coffeeContext.roastDate.veryFresh')
    }
    if (coffeeInfo.roastDate > 30) {
      return t('insight.coffeeContext.roastDate.aging')
    }
    return ''
  }

  const getPenaltiesNote = (scores: Scores): string => {
    const hasNonUniform = scores.nonUniformCups > 0
    const hasDefective = scores.defectiveCups > 0

    if (hasNonUniform && hasDefective) {
      return t('insight.coffeeContext.penalties.both')
    }
    if (hasNonUniform) {
      return t('insight.coffeeContext.penalties.nonUniform')
    }
    if (hasDefective) {
      return t('insight.coffeeContext.penalties.defective')
    }
    return ''
  }

  const hasCoffeeInfo = (): boolean => {
    return !!(
      coffeeInfo.origin ||
      coffeeInfo.variety ||
      coffeeInfo.process ||
      coffeeInfo.roastLevel ||
      coffeeInfo.brewingMethod ||
      coffeeInfo.roastDate !== null
    )
  }

  // --- Funciones de Atributos Refactorizadas (Retornan key/label para uso flexible) ---

  const getAttributesStats = (scores: Scores): AttributeStat[] => {
    return (
      [
        'fragrance',
        'aroma',
        'flavor',
        'aftertaste',
        'acidity',
        'sweetness',
        'mouthfeel',
      ] as AttributeKey[]
    ).map((key) => ({
      key: key,
      value: scores[key],
      label: t(`calculator.${key}`), // Etiqueta traducida
    }))
  }

  const getHighAttributes = (scores: Scores): AttributeStat[] => {
    // Atributos altos (>= 7)
    return getAttributesStats(scores).filter((a) => a.value >= 7)
  }

  const getLowAttributes = (scores: Scores): AttributeStat[] => {
    // Atributos bajos (<= 4)
    return getAttributesStats(scores).filter((a) => a.value <= 4)
  }

  // --- El COMPUTED principal con la nueva lógica de ensamblaje ---

  const insight = computed(() => {
    const s = scores.value

    const penaltiesNote = getPenaltiesNote(s)

    // Siempre retornamos el texto base del análisis
    const sweetnessDesc = getSweetnessDesc(s.sweetness)
    const acidityDesc = getAcidityDesc(s.acidity)
    const fragranceDesc = getFragranceDesc(s.fragrance)
    const aftertasteDesc = getAftertasteDesc(s.aftertaste)
    const interpretation = getInterpretation(s)
    const methodSuggestion = getMethodSuggestion(s)

    // Fortalezas (atributos más altos >= 7)
    const highAttributes = getHighAttributes(s)
    let strengthsText = ''
    if (highAttributes.length > 0) {
      const attributeLabels = highAttributes.map((a) => a.label.toLowerCase())
      strengthsText = 'Se destaca por '
      if (attributeLabels.length === 1) {
        strengthsText += attributeLabels[0]
      } else if (attributeLabels.length === 2) {
        strengthsText += `${attributeLabels[0]} y ${attributeLabels[1]}`
      } else {
        const last = attributeLabels[attributeLabels.length - 1]
        const rest = attributeLabels.slice(0, -1)
        strengthsText += `${rest.join(', ')} y ${last}`
      }
      strengthsText += ', lo que define gran parte de su carácter sensorial. '
    } else if (strongestAttribute.value) {
      const attrName = t(strongestAttribute.value.label)
      strengthsText = `Su punto más fuerte es ${attrName.toLowerCase()}, lo que define gran parte de su carácter sensorial. `
    }

    // Debilidad (atributo más bajo <= 4)
    let weaknessText = ''
    const lowAttributes = getLowAttributes(s)
    if (lowAttributes.length > 0) {
      const weakestAttr = lowAttributes.reduce((min, current) =>
        current.value < min.value ? current : min,
      )

      const weaknessInterpKey = weakestAttr.key
      const weaknessInterp = t(
        `insight.sections.weaknessInterpretation.${weaknessInterpKey}`,
        t('insight.sections.weaknessInterpretation.default'),
      )

      weaknessText =
        t('insight.sections.weakness', {
          attribute: weakestAttr.label.toLowerCase(),
          interpretation: weaknessInterp,
        }) + ' '
    }

    // Construir el texto base
    let text = t('insight.template', {
      sweetness: sweetnessDesc,
      acidity: acidityDesc,
      fragrance: fragranceDesc,
      aftertaste: aftertasteDesc,
      interpretation,
      method: methodSuggestion,
    })

    // Agregar fortalezas y debilidades si existen
    if (strengthsText) {
      text += ' ' + strengthsText
    }
    if (weaknessText) {
      text += weaknessText
    }

    // Agregar penalizaciones si existen
    if (penaltiesNote) {
      text += `\n\n${penaltiesNote}`
    }

    return text
  })

  return {
    insight,
  }
}
