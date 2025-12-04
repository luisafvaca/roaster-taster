<template>
  <div class="form-control">
    <label class="label">
      <span class="label-text font-semibold text-primary-700 mb-2">
        {{ $t('coffeeInfo.roastDate.label') }}
      </span>
    </label>
    <input
      v-model.number="coffeeInfo.roastDate"
      type="number"
      min="0"
      :placeholder="$t('coffeeInfo.roastDate.placeholder')"
      class="input input-bordered w-full bg-base-100 border-primary-300 focus:border-primary-500 focus:outline-primary-500"
    />
  </div>
</template>

<script setup lang="ts">
import { useCoffeeInfo } from '../composables/useCoffeeInfo'

const { coffeeInfo } = useCoffeeInfo()
</script>
