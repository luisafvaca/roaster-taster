<template>
  <div class="form-control">
    <label class="label">
      <span class="label-text font-semibold text-primary-700 mb-2">
        {{ $t('coffeeInfo.altitude.label') }}
      </span>
    </label>
    <select
      v-model="coffeeInfo.altitude"
      class="select select-bordered w-full bg-base-100 border-primary-300 focus:border-primary-500 focus:outline-primary-500"
    >
      <option value="">{{ $t('coffeeInfo.altitude.placeholder') }}</option>
      <option value="veryHigh">{{ $t('coffeeInfo.altitude.ranges.veryHigh') }}</option>
      <option value="high">{{ $t('coffeeInfo.altitude.ranges.high') }}</option>
      <option value="medium">{{ $t('coffeeInfo.altitude.ranges.medium') }}</option>
      <option value="low">{{ $t('coffeeInfo.altitude.ranges.low') }}</option>
      <option value="veryLow">{{ $t('coffeeInfo.altitude.ranges.veryLow') }}</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { useCoffeeInfo } from '../composables/useCoffeeInfo'

const { coffeeInfo } = useCoffeeInfo()
</script>
