<template>
  <div class="form-control">
    <label class="label">
      <span class="label-text font-semibold text-primary-700 mb-2">
        {{ $t('coffeeInfo.origin.label') }}
      </span>
    </label>
    <select
      v-model="coffeeInfo.origin"
      class="select select-bordered w-full bg-base-100 border-primary-300 focus:border-primary-500 focus:outline-primary-500"
    >
      <option value="">{{ $t('coffeeInfo.origin.placeholder') }}</option>
      <option v-for="country in coffeeCountries" :key="country" :value="country">
        {{ country }}
      </option>
      <option value="other">{{ $t('coffeeInfo.origin.other') }}</option>
    </select>
    <input
      v-if="coffeeInfo.origin === 'other'"
      v-model="coffeeInfo.originOther"
      type="text"
      :placeholder="$t('coffeeInfo.origin.otherPlaceholder')"
      class="input input-bordered w-full mt-2 bg-base-100 border-primary-300 focus:border-primary-500 focus:outline-primary-500"
    />
  </div>
</template>

<script setup lang="ts">
import { useCoffeeInfo } from '../composables/useCoffeeInfo'

const { coffeeInfo } = useCoffeeInfo()

const coffeeCountries = [
  'Brasil',
  'Colombia',
  'Etiopía',
  'Kenia',
  'Guatemala',
  'Honduras',
  'Costa Rica',
  'Panamá',
  'Nicaragua',
  'El Salvador',
  'México',
  'Perú',
  'Indonesia',
  'Vietnam',
  'India',
  'Yemen',
  'Ruanda',
  'Burundi',
  'Uganda',
  'Tanzania',
  'Papúa Nueva Guinea',
  'Ecuador',
  'Venezuela',
  'Bolivia',
]
</script>
