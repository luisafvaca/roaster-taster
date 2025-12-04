<template>
  <div class="mt-8">
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
    <div class="mx-auto max-w-4xl">
      <div class="card-body">
        <CoffeeInfoSection />
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
import type { Scores } from '../composables/useCalculator'
import PolarChart from './PolarChart.vue'
import PenaltyBarChart from './PenaltyBarChart.vue'
import InsightSection from './InsightSection.vue'
import StatsSection from './StatsSection.vue'
import CoffeeInfoSection from './CoffeeInfoSection.vue'

defineProps<{
  scores: Scores
}>()
</script>
