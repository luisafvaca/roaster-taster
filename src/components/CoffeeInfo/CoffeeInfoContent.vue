<template>
  <ul class="space-y-2 text-primary-500 grid grid-cols-2 gap-2">
    <li v-for="item in coffeeInfoItems" :key="item.labelKey" class="flex flex-col items-start mb-2">
      <span class="font-semibold mr-2">{{ $t(item.labelKey) }}:</span>
      <span class="flex items-center gap-1">
        {{ item.info.name }}
        <div v-if="item.info.tooltip" class="tooltip tooltip-right" :data-tip="item.info.tooltip">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 text-secondary-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </span>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useCoffeeInfo } from '../../composables/useCoffeeInfo'
import { useCoffeeCharacteristics } from '../../composables/useCoffeeCharacteristics'

const { t } = useI18n()
const { coffeeInfo } = useCoffeeInfo()
const {
  getOriginCharacteristics,
  getVarietyCharacteristics,
  getProcessEffect,
  getRoastLevelEffect,
  getRoastDateInfo,
} = useCoffeeCharacteristics()

const originInfo = computed(() => {
  const origin = coffeeInfo.origin === 'other' ? coffeeInfo.originOther : coffeeInfo.origin
  if (!origin) return null

  const originText = origin.charAt(0).toUpperCase() + origin.slice(1).toLowerCase()
  const originChars = getOriginCharacteristics()

  return {
    name: originText,
    tooltip: originChars || null,
  }
})

const altitudeInfo = computed(() => {
  if (!coffeeInfo.altitude || coffeeInfo.altitude === '') return null

  const category = coffeeInfo.altitude

  return {
    name: t(`coffeeInfo.altitude.ranges.${category}`),
    tooltip: t(`coffeeInfo.altitude.categories.${category}.description`),
  }
})

const varietyInfo = computed(() => {
  const variety = coffeeInfo.variety === 'other' ? coffeeInfo.varietyOther : coffeeInfo.variety
  if (!variety || !variety.trim()) return null

  const varietyChars = getVarietyCharacteristics()

  return {
    name: variety,
    tooltip: varietyChars || null,
  }
})

const processInfo = computed(() => {
  if (!coffeeInfo.process) return null

  const processName = t(`coffeeInfo.process.${coffeeInfo.process}`)
  const processEffect = getProcessEffect()

  return {
    name: processName,
    tooltip: processEffect || null,
  }
})

const roastLevelInfo = computed(() => {
  if (!coffeeInfo.roastLevel) return null

  const roastLevelName = t(`coffeeInfo.roastLevel.${coffeeInfo.roastLevel}`)
  const roastEffect = getRoastLevelEffect()

  return {
    name: roastLevelName,
    tooltip: roastEffect || null,
  }
})

const brewingMethodInfo = computed(() => {
  if (!coffeeInfo.brewingMethod) return null

  const methodName = t(`coffeeInfo.brewingMethod.${coffeeInfo.brewingMethod}`)
  const methodEffect = t(`insight.methodNote.${coffeeInfo.brewingMethod}`)

  return {
    name: methodName,
    tooltip: methodEffect || null,
  }
})

const roastDateInfo = computed(() => getRoastDateInfo())

const coffeeInfoItems = computed(() => {
  const items = [
    {
      labelKey: 'coffeeInfo.origin.label',
      info: originInfo.value,
    },
    {
      labelKey: 'coffeeInfo.altitude.label',
      info: altitudeInfo.value,
    },
    {
      labelKey: 'coffeeInfo.variety.label',
      info: varietyInfo.value,
    },
    {
      labelKey: 'coffeeInfo.process.label',
      info: processInfo.value,
    },
    {
      labelKey: 'coffeeInfo.roastLevel.label',
      info: roastLevelInfo.value,
    },
    {
      labelKey: 'coffeeInfo.brewingMethod.label',
      info: brewingMethodInfo.value,
    },
    {
      labelKey: 'coffeeInfo.roastDate.label',
      info: roastDateInfo.value,
    },
  ]

  return items.filter(
    (item): item is { labelKey: string; info: { name: string; tooltip: string | null } } =>
      item.info !== null,
  )
})
</script>
