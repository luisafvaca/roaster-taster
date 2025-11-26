export type QualityKey =
  | 'fragrance'
  | 'aroma'
  | 'flavor'
  | 'aftertaste'
  | 'acidity'
  | 'sweetness'
  | 'mouthfeel'
  | 'overall'

export const qualityCategories: Array<{ key: QualityKey; labelKey: string }> = [
  { key: 'fragrance', labelKey: 'calculator.fragrance' },
  { key: 'aroma', labelKey: 'calculator.aroma' },
  { key: 'flavor', labelKey: 'calculator.flavor' },
  { key: 'aftertaste', labelKey: 'calculator.aftertaste' },
  { key: 'acidity', labelKey: 'calculator.acidity' },
  { key: 'sweetness', labelKey: 'calculator.sweetness' },
  { key: 'mouthfeel', labelKey: 'calculator.mouthfeel' },
  { key: 'overall', labelKey: 'calculator.overall' },
]

export default qualityCategories
