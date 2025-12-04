export type OriginTranslationKey =
  | 'colombia'
  | 'ethiopia'
  | 'brazil'
  | 'costaRica'
  | 'guatemala'
  | 'kenya'
  | 'peru'

export type OriginMap = Record<string, OriginTranslationKey>

export const ORIGIN_MAP: OriginMap = {
  colombia: 'colombia',
  etiopía: 'ethiopia',
  ethiopia: 'ethiopia',
  brasil: 'brazil',
  brazil: 'brazil',
  'costa rica': 'costaRica',
  costarica: 'costaRica',
  guatemala: 'guatemala',
  kenia: 'kenya',
  kenya: 'kenya',
  perú: 'peru',
  peru: 'peru',
} as const

export default ORIGIN_MAP
