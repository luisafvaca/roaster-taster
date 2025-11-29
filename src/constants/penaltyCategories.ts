export type PenaltyKey = 'nonUniformCups' | 'defectiveCups'

const penaltyCategories: Array<{ key: PenaltyKey; labelKey: string }> = [
  { key: 'nonUniformCups', labelKey: 'calculator.nonUniformCups' },
  { key: 'defectiveCups', labelKey: 'calculator.defectiveCups' },
]

export default penaltyCategories
