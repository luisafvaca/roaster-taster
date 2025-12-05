<template>
  <div class="form-control">
    <label class="label">
      <span class="label-text font-semibold text-primary-700 mb-2">
        {{ $t('coffeeInfo.roastLevel.label') }}
      </span>
    </label>
    <div class="grid grid-cols-2 gap-2">
      <label v-for="option in roastLevelOptions" :key="option.value" class="label cursor-pointer">
        <input
          type="radio"
          :value="option.value"
          v-model="coffeeInfo.roastLevel"
          class="radio radio-secondary radio-xs"
        />
        <span class="label-text">{{ $t(option.labelKey) }}</span>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCoffeeInfo } from '../composables/useCoffeeInfo'

const { coffeeInfo } = useCoffeeInfo()

const roastLevelOptions = [
  { value: 'light', labelKey: 'coffeeInfo.roastLevel.light' },
  { value: 'medium', labelKey: 'coffeeInfo.roastLevel.medium' },
  { value: 'mediumDark', labelKey: 'coffeeInfo.roastLevel.mediumDark' },
  { value: 'dark', labelKey: 'coffeeInfo.roastLevel.dark' },
] as const
</script>
