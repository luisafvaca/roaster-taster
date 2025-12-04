<template>
  <div class="form-control">
    <label class="label">
      <span class="label-text font-semibold text-primary-700 mb-2">
        {{ $t('coffeeInfo.process.label') }}
      </span>
    </label>
    <div class="grid grid-cols-2 gap-2">
      <label class="label cursor-pointer">
        <input
          type="radio"
          value="washed"
          v-model="coffeeInfo.process"
          class="radio radio-primary radio-xs"
        />
        <span class="label-text">{{ $t('coffeeInfo.process.washed') }}</span>
      </label>
      <label class="label cursor-pointer">
        <input
          type="radio"
          value="natural"
          v-model="coffeeInfo.process"
          class="radio radio-primary radio-xs"
        />
        <span class="label-text">{{ $t('coffeeInfo.process.natural') }}</span>
      </label>
      <label class="label cursor-pointer">
        <input
          type="radio"
          value="honey"
          v-model="coffeeInfo.process"
          class="radio radio-primary radio-xs"
        />
        <span class="label-text">{{ $t('coffeeInfo.process.honey') }}</span>
      </label>
      <label class="label cursor-pointer">
        <input
          type="radio"
          value="anaerobic"
          v-model="coffeeInfo.process"
          class="radio radio-primary radio-xs"
        />
        <span class="label-text">{{ $t('coffeeInfo.process.anaerobic') }}</span>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCoffeeInfo } from '../composables/useCoffeeInfo'

const { coffeeInfo } = useCoffeeInfo()
</script>
