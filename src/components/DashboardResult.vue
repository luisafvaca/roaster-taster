<template>
  <!-- Charts Section -->
  <div class="mt-8">
    <!-- Insight Section -->
    <div class="mx-auto max-w-4xl">
      <div class="card-body">
        <InsightSection :scores="scores" />
      </div>
    </div>
    <!-- Stats Section -->
    <div class="mx-auto max-w-4xl">
      <div class="card-body">
        <StatsSection :scores="scores" />
      </div>
    </div>

    <!-- Polar Chart -->
    <div class="card mx-auto max-w-4xl">
      <div class="card-body">
        <h3 class="text-2xl font-bold text-primary-800 mb-4 text-center">
          {{ $t('charts.flavorProfile') }}
        </h3>
        <PolarChart :scores="scores" />
      </div>
    </div>

    <!-- Penalty Bar Chart -->
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

defineProps<{
  scores: Scores
}>()
</script>
