<template>
  <div class="form-control">
    <label class="label">
      <span class="label-text font-semibold text-primary-700 mb-2">
        {{ $t('coffeeInfo.variety.label') }}
      </span>
    </label>
    <select
      v-model="coffeeInfo.variety"
      class="select select-bordered w-full bg-base-100 border-primary-300 focus:border-primary-500 focus:outline-primary-500"
    >
      <option value="">{{ $t('coffeeInfo.variety.placeholder') }}</option>
      <option v-for="variety in coffeeVarieties" :key="variety.value" :value="variety.value">
        {{ variety.label }}
      </option>
      <option value="other">{{ $t('coffeeInfo.variety.other') }}</option>
    </select>
    <input
      v-if="coffeeInfo.variety === 'other'"
      v-model="coffeeInfo.varietyOther"
      type="text"
      :placeholder="$t('coffeeInfo.variety.otherPlaceholder')"
      class="input input-bordered w-full mt-2 bg-base-100 border-primary-300 focus:border-primary-500 focus:outline-primary-500"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCoffeeInfo } from '../composables/useCoffeeInfo'
import { VARIETY_MAP } from '../constants/varietyMap'
import type { VarietyTranslationKey } from '../constants/varietyMap'

const { coffeeInfo } = useCoffeeInfo()

const formatVarietyName = (value: VarietyTranslationKey): string => {
  return value
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase())
    .trim()
}

const coffeeVarieties = computed(() => {
  const uniqueVarieties = new Set<VarietyTranslationKey>()

  Object.values(VARIETY_MAP).forEach((value) => {
    uniqueVarieties.add(value)
  })

  return Array.from(uniqueVarieties).map((value) => ({
    value,
    label: formatVarietyName(value),
  }))
})
</script>
