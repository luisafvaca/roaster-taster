<template>
  <div class="w-full" v-show="hasInfo">
    <div class="bg-secondary-50 rounded-lg p-6">
      <h4 class="text-lg font-bold text-primary-500 mb-4">
        {{ $t('coffeeInfo.sectionTitle') }}
      </h4>
      <CoffeeInfoContent />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCoffeeInfo } from '../../composables/useCoffeeInfo'
import CoffeeInfoContent from './CoffeeInfoContent.vue'

const { coffeeInfo } = useCoffeeInfo()

const hasInfo = computed(() => {
  return !!(
    coffeeInfo.origin ||
    coffeeInfo.altitude ||
    coffeeInfo.variety ||
    coffeeInfo.process ||
    coffeeInfo.roastLevel ||
    coffeeInfo.brewingMethod ||
    coffeeInfo.roastDate !== null
  )
})
</script>
