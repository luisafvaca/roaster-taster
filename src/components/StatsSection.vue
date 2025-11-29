<template>
  <div class="w-full">
    <h4 class="text-lg font-bold text-primary-800 mb-4">Insights Visuales Rápidos</h4>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <!-- Mayor Fortaleza -->
      <div class="stat bg-base-200 rounded-lg shadow">
        <div class="stat-title text-primary-700">Mayor Fortaleza</div>
        <div class="stat-value text-secondary-600 text-sm">
          {{ $t(strongestAttribute?.label || 'calculator.overall') }}
        </div>
        <div class="stat-desc text-primary-600 font-semibold">
          {{ strongestAttribute?.value.toFixed(1) || '0.0' }}
        </div>
      </div>

      <!-- Punto Débil -->
      <div class="stat bg-base-200 rounded-lg shadow">
        <div class="stat-title text-primary-700">Punto Débil</div>
        <div class="stat-value text-error-600 text-sm">
          {{ $t(weakestAttribute?.label || 'calculator.overall') }}
        </div>
        <div class="stat-desc text-primary-600 font-semibold">
          {{ weakestAttribute?.value.toFixed(1) || '0.0' }}
        </div>
      </div>

      <!-- Balance General -->
      <div class="stat bg-base-200 rounded-lg shadow">
        <div class="stat-title text-primary-700">Balance General</div>
        <div
          :class="[
            'stat-value text-sm',
            balance.level === 'balanceado'
              ? 'text-success-600'
              : balance.level === 'medianamente balanceado'
                ? 'text-warning-600'
                : 'text-error-600',
          ]"
        >
          {{ capitalizeFirst(balance.level) }}
        </div>
        <div class="stat-desc text-primary-600 font-semibold">
          σ: {{ balance.stdDev.toFixed(2) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStats } from '../composables/useStats'
import type { Scores } from '../composables/useCalculator'

const props = defineProps<{
  scores: Scores
}>()

const { strongestAttribute, weakestAttribute, balance } = useStats({ value: props.scores })

const capitalizeFirst = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
</script>

<style scoped>
/* Estilos adicionales si son necesarios */
</style>
