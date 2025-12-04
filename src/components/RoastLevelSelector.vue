<template>
  <div class="form-control">
    <label class="label">
      <span class="label-text font-semibold text-primary-700 mb-2">
        {{ $t('coffeeInfo.roastLevel.label') }}
      </span>
    </label>
    <div class="grid grid-cols-2 gap-2">
      <label class="label cursor-pointer">
        <input
          type="radio"
          value="light"
          v-model="coffeeInfo.roastLevel"
          class="radio radio-secondary radio-xs"
        />
        <span class="label-text">{{ $t('coffeeInfo.roastLevel.light') }}</span>
      </label>
      <label class="label cursor-pointer">
        <input
          type="radio"
          value="medium"
          v-model="coffeeInfo.roastLevel"
          class="radio radio-secondary radio-xs"
        />
        <span class="label-text">{{ $t('coffeeInfo.roastLevel.medium') }}</span>
      </label>
      <label class="label cursor-pointer">
        <input
          type="radio"
          value="mediumDark"
          v-model="coffeeInfo.roastLevel"
          class="radio radio-secondary radio-xs"
        />
        <span class="label-text">{{ $t('coffeeInfo.roastLevel.mediumDark') }}</span>
      </label>
      <label class="label cursor-pointer">
        <input
          type="radio"
          value="dark"
          v-model="coffeeInfo.roastLevel"
          class="radio radio-secondary radio-xs"
        />
        <span class="label-text">{{ $t('coffeeInfo.roastLevel.dark') }}</span>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCoffeeInfo } from '../composables/useCoffeeInfo'

const { coffeeInfo } = useCoffeeInfo()
</script>
