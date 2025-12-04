<template>
  <div class="form-control">
    <label class="label">
      <span class="label-text font-semibold text-primary-700 mb-2">
        {{ $t('coffeeInfo.brewingMethod.label') }}
      </span>
    </label>
    <div class="grid grid-cols-2 gap-2">
      <label class="label cursor-pointer">
        <input
          type="radio"
          value="v60"
          v-model="coffeeInfo.brewingMethod"
          class="radio radio-accent radio-xs"
        />
        <span class="label-text">{{ $t('coffeeInfo.brewingMethod.v60') }}</span>
      </label>
      <label class="label cursor-pointer">
        <input
          type="radio"
          value="chemex"
          v-model="coffeeInfo.brewingMethod"
          class="radio radio-accent radio-xs"
        />
        <span class="label-text">{{ $t('coffeeInfo.brewingMethod.chemex') }}</span>
      </label>
      <label class="label cursor-pointer">
        <input
          type="radio"
          value="espresso"
          v-model="coffeeInfo.brewingMethod"
          class="radio radio-accent radio-xs"
        />
        <span class="label-text">{{ $t('coffeeInfo.brewingMethod.espresso') }}</span>
      </label>
      <label class="label cursor-pointer">
        <input
          type="radio"
          value="aeropress"
          v-model="coffeeInfo.brewingMethod"
          class="radio radio-accent radio-xs"
        />
        <span class="label-text">{{ $t('coffeeInfo.brewingMethod.aeropress') }}</span>
      </label>
      <label class="label cursor-pointer">
        <input
          type="radio"
          value="frenchPress"
          v-model="coffeeInfo.brewingMethod"
          class="radio radio-accent radio-xs"
        />
        <span class="label-text">{{ $t('coffeeInfo.brewingMethod.frenchPress') }}</span>
      </label>
      <label class="label cursor-pointer">
        <input
          type="radio"
          value="cupping"
          v-model="coffeeInfo.brewingMethod"
          class="radio radio-accent radio-xs"
        />
        <span class="label-text">{{ $t('coffeeInfo.brewingMethod.cupping') }}</span>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCoffeeInfo } from '../composables/useCoffeeInfo'

const { coffeeInfo } = useCoffeeInfo()
</script>
