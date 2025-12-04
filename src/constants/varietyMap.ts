export type VarietyTranslationKey =
  | 'caturra'
  | 'bourbon'
  | 'typica'
  | 'geisha'
  | 'mundoNovo'
  | 'catuai'
  | 'pacamara'
  | 'maragogype'
  | 'sl28'
  | 'sl34'
  | 'ruiru11'
  | 'ethiopianHeirloom'
  | 'sidamo'
  | 'yirgacheffe'
  | 'harrar'
  | 'java'
  | 'sumatra'
  | 'sulawesi'
  | 'blueMountain'
  | 'villaSarchi'

export type VarietyMap = Record<string, VarietyTranslationKey>

export const VARIETY_MAP: VarietyMap = {
  caturra: 'caturra',
  bourbon: 'bourbon',
  typica: 'typica',
  geisha: 'geisha',
  gesha: 'geisha',
  mundonovo: 'mundoNovo',
  catuai: 'catuai',
  pacamara: 'pacamara',
  maragogype: 'maragogype',
  sl28: 'sl28',
  sl34: 'sl34',
  ruiru11: 'ruiru11',
  ruiru: 'ruiru11',
  ethiopianheirloom: 'ethiopianHeirloom',
  heirloom: 'ethiopianHeirloom',
  sidamo: 'sidamo',
  yirgacheffe: 'yirgacheffe',
  harrar: 'harrar',
  java: 'java',
  sumatra: 'sumatra',
  sulawesi: 'sulawesi',
  bluemountain: 'blueMountain',
  villasarche: 'villaSarchi',
  villasarchi: 'villaSarchi',
} as const

export default VARIETY_MAP
