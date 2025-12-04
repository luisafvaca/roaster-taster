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
      <option v-for="variety in coffeeVarieties" :key="variety" :value="variety">
        {{ variety }}
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
import { useCoffeeInfo } from '../composables/useCoffeeInfo'

const { coffeeInfo } = useCoffeeInfo()

const coffeeVarieties = [
  'Caturra',
  'Bourbon',
  'Typica',
  'Geisha',
  'Mundo Novo',
  'Catuai',
  'Pacamara',
  'Maragogype',
  'SL28',
  'SL34',
  'Ruiru 11',
  'Ethiopian Heirloom',
  'Sidamo',
  'Yirgacheffe',
  'Harrar',
  'Java',
  'Sumatra',
  'Sulawesi',
  'Blue Mountain',
  'Villa Sarchi',
]
</script>
