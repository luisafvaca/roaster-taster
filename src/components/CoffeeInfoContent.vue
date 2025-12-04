<template>
  <ul class="space-y-2 text-primary-500 grid grid-cols-2 gap-2">
    <li v-if="originInfo" class="flex flex-col items-start">
      <span class="font-semibold mr-2">{{ $t('coffeeInfo.origin.label') }}:</span>
      <span class="flex items-center gap-1">
        {{ originInfo.name }}
        <div v-if="originInfo.tooltip" class="tooltip tooltip-right" :data-tip="originInfo.tooltip">
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
    <li v-if="altitudeInfo" class="flex flex-col items-start">
      <span class="font-semibold mr-2">{{ $t('coffeeInfo.altitude.label') }}:</span>
      <span class="flex items-center gap-1">
        {{ altitudeInfo.name }}
        <div
          v-if="altitudeInfo.tooltip"
          class="tooltip tooltip-right"
          :data-tip="altitudeInfo.tooltip"
        >
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
    <li v-if="varietyInfo" class="flex flex-col items-start">
      <span class="font-semibold mr-2">{{ $t('coffeeInfo.variety.label') }}:</span>
      <span class="flex items-center gap-1">
        {{ varietyInfo.name }}
        <div
          v-if="varietyInfo.tooltip"
          class="tooltip tooltip-right"
          :data-tip="varietyInfo.tooltip"
        >
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
    <li v-if="processInfo" class="flex flex-col items-start">
      <span class="font-semibold mr-2">{{ $t('coffeeInfo.process.label') }}:</span>
      <span class="flex items-center gap-1">
        {{ processInfo.name }}
        <div
          v-if="processInfo.tooltip"
          class="tooltip tooltip-right"
          :data-tip="processInfo.tooltip"
        >
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
    <li v-if="roastLevelInfo" class="flex flex-col items-start">
      <span class="font-semibold mr-2">{{ $t('coffeeInfo.roastLevel.label') }}:</span>
      <span class="flex items-center gap-1">
        {{ roastLevelInfo.name }}
        <div
          v-if="roastLevelInfo.tooltip"
          class="tooltip tooltip-right"
          :data-tip="roastLevelInfo.tooltip"
        >
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
    <li v-if="brewingMethodInfo" class="flex flex-col items-start">
      <span class="font-semibold mr-2">{{ $t('coffeeInfo.brewingMethod.label') }}:</span>
      <span class="flex items-center gap-1">
        {{ brewingMethodInfo.name }}
        <div
          v-if="brewingMethodInfo.tooltip"
          class="tooltip tooltip-right"
          :data-tip="brewingMethodInfo.tooltip"
        >
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
    <li v-if="roastDateInfo" class="flex flex-col items-start">
      <span class="font-semibold mr-2">{{ $t('coffeeInfo.roastDate.label') }}:</span>
      <span class="flex items-center gap-1">
        {{ roastDateInfo.name }}
        <div
          v-if="roastDateInfo.tooltip"
          class="tooltip tooltip-right"
          :data-tip="roastDateInfo.tooltip"
        >
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
import { useCoffeeInfo } from '../composables/useCoffeeInfo'
import { useCoffeeCharacteristics } from '../composables/useCoffeeCharacteristics'

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
</script>
