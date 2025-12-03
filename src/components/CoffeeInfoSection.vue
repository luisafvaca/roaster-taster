<template>
  <div class="w-full" v-if="hasInfo">
    <div class="bg-secondary-100 rounded-lg p-6">
      <h4 class="text-lg font-bold text-secondary-800 mb-4">
        {{ $t('coffeeInfo.sectionTitle') }}
      </h4>
      <ul class="space-y-2 text-secondary-700">
        <li v-if="originInfo" class="flex flex-col items-start">
          <span class="font-semibold mr-2">{{ $t('coffeeInfo.origin.label') }}:</span>
          <span>{{ originInfo }}</span>
        </li>
        <li v-if="varietyInfo" class="flex flex-col items-start">
          <span class="font-semibold mr-2">{{ $t('coffeeInfo.variety.label') }}:</span>
          <span>{{ varietyInfo }}</span>
        </li>
        <li v-if="processInfo" class="flex flex-col items-start">
          <span class="font-semibold mr-2">{{ $t('coffeeInfo.process.label') }}:</span>
          <span>{{ processInfo }}</span>
        </li>
        <li v-if="roastLevelInfo" class="flex flex-col items-start">
          <span class="font-semibold mr-2">{{ $t('coffeeInfo.roastLevel.label') }}:</span>
          <span>{{ roastLevelInfo }}</span>
        </li>
        <li v-if="brewingMethodInfo" class="flex flex-col items-start">
          <span class="font-semibold mr-2">{{ $t('coffeeInfo.brewingMethod.label') }}:</span>
          <span>{{ brewingMethodInfo }}</span>
        </li>
        <li v-if="roastDateInfo" class="flex flex-col items-start">
          <span class="font-semibold mr-2">{{ $t('coffeeInfo.roastDate.label') }}:</span>
          <span>{{ roastDateInfo }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useCoffeeInfo } from '../composables/useCoffeeInfo'

const { t } = useI18n()
const { coffeeInfo } = useCoffeeInfo()

const originInfo = computed(() => {
  const origin = coffeeInfo.origin === 'other' ? coffeeInfo.originOther : coffeeInfo.origin
  if (!origin) return null

  const originText = origin.charAt(0).toUpperCase() + origin.slice(1).toLowerCase()
  const originChars = getOriginCharacteristics()

  if (originChars) {
    return `${originText} - ${originChars}`
  }
  return originText
})

const varietyInfo = computed(() => {
  const variety = coffeeInfo.variety === 'other' ? coffeeInfo.varietyOther : coffeeInfo.variety
  if (!variety || !variety.trim()) return null

  const varietyChars = getVarietyCharacteristics()
  if (varietyChars) {
    return `${variety} - ${varietyChars}`
  }
  return variety
})

const processInfo = computed(() => {
  if (!coffeeInfo.process) return null

  const processName = t(`coffeeInfo.process.${coffeeInfo.process}`)
  const processEffect = getProcessEffect()

  if (processEffect) {
    return `${processName} - ${processEffect}`
  }
  return processName
})

const roastLevelInfo = computed(() => {
  if (!coffeeInfo.roastLevel) return null

  const roastLevelName = t(`coffeeInfo.roastLevel.${coffeeInfo.roastLevel}`)
  const roastEffect = getRoastLevelEffect()

  if (roastEffect) {
    return `${roastLevelName} - ${roastEffect}`
  }
  return roastLevelName
})

const brewingMethodInfo = computed(() => {
  if (!coffeeInfo.brewingMethod) return null

  const methodName = t(`coffeeInfo.brewingMethod.${coffeeInfo.brewingMethod}`)
  const methodEffect = t(`insight.methodNote.${coffeeInfo.brewingMethod}`)

  return `${methodName} - ${methodEffect}`
})

const getRoastDateRange = (days: number): string => {
  if (days <= 3) return '0-3'
  if (days <= 10) return '4-10'
  if (days <= 20) return '11-20'
  if (days <= 30) return '21-30'
  return '30+'
}

const roastDateInfo = computed(() => {
  if (coffeeInfo.roastDate === null) return null

  const range = getRoastDateRange(coffeeInfo.roastDate)
  const rangeKey = `insight.coffeeContext.roastDate.ranges.${range}`

  try {
    const title = t(`${rangeKey}.title`)
    const description = t(`${rangeKey}.description`)
    return `${coffeeInfo.roastDate} ${t('coffeeInfo.roastDate.days')} - ${title}: ${description}`
  } catch {
    if (coffeeInfo.roastDate < 3) {
      return t('insight.coffeeContext.roastDate.veryFresh')
    }
    if (coffeeInfo.roastDate > 30) {
      return t('insight.coffeeContext.roastDate.aging')
    }
    return `${coffeeInfo.roastDate} ${t('coffeeInfo.roastDate.days')}`
  }
})

const hasInfo = computed(() => {
  return !!(
    originInfo.value ||
    varietyInfo.value ||
    processInfo.value ||
    roastLevelInfo.value ||
    brewingMethodInfo.value ||
    roastDateInfo.value
  )
})

// Helper functions (same as in useInsight)
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

  const varietyLower = variety.toLowerCase().replace(/\s+/g, '')

  // Mapeo de variedades a claves de traducción
  const varietyMap: Record<string, string> = {
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
  }

  const varietyKey = varietyMap[varietyLower]
  if (varietyKey) {
    return t(`insight.coffeeContext.variety.${varietyKey}`)
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
</script>
