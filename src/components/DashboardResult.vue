<template>
  <div class="mt-8" ref="dashboardRef">
    <div class="flex justify-end mb-4">
      <button
        @click="handlePrint"
        class="btn btn-primary btn-sm gap-2 bg-primary-500 hover:bg-primary-600 text-primary-content print:hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
          />
        </svg>
        {{ $t('dashboard.print') }}
      </button>
    </div>
    <div class="mx-auto max-w-4xl">
      <div class="card-body">
        <CoffeeInfoSection />
      </div>
    </div>
    <div class="mx-auto max-w-4xl">
      <div class="card-body">
        <InsightSection :scores="scores" />
      </div>
    </div>
    <div class="mx-auto max-w-4xl">
      <div class="card-body">
        <StatsSection :scores="scores" />
      </div>
    </div>
    <div class="card mx-auto max-w-4xl">
      <div class="card-body">
        <h3 class="text-2xl font-bold text-primary-800 mb-4 text-center">
          {{ $t('charts.flavorProfile') }}
        </h3>
        <PolarChart :scores="scores" />
      </div>
    </div>
    <div class="card mx-auto max-w-4xl">
      <div class="card-body">
        <h3 class="text-2xl font-bold text-primary-800 mb-4 text-center">
          {{ $t('charts.penalizations') }}
        </h3>
        <PenaltyBarChart :scores="scores" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Scores } from '../composables/useCalculator'
import PolarChart from './PolarChart.vue'
import PenaltyBarChart from './PenaltyBarChart.vue'
import InsightSection from './InsightSection.vue'
import StatsSection from './StatsSection.vue'
import CoffeeInfoSection from './CoffeeInfo/CoffeeInfoSection.vue'

defineProps<{
  scores: Scores
}>()

const dashboardRef = ref<HTMLElement | null>(null)

const handlePrint = () => {
  window.print()
}
</script>

<style scoped>
@media print {
  :deep(*) {
    print-color-adjust: exact;
    -webkit-print-color-adjust: exact;
  }
}
</style>
