<template>
  <div class="w-full max-w-2xl mx-auto space-y-6">
    <!-- Gráfico de barras horizontales con impacto -->
    <div class="space-y-3 pt-4">
      <div
        v-for="penalty in penaltyCategories"
        :key="`impact-${penalty.key}`"
        class="flex items-center gap-4"
      >
        <div class="min-w-[180px]">
          <span class="text-sm font-semibold text-primary-700">
            {{ getPenaltyLabel(penalty.key) }}
          </span>
        </div>
        <div class="flex-1 flex items-center gap-3">
          <div class="flex-1 relative h-6 bg-gray-100 rounded overflow-hidden">
            <div
              :style="{
                width: `${getImpactPercentage(penalty.key)}%`,
              }"
              class="h-full bg-error-500 transition-all duration-300"
            ></div>
          </div>
          <span class="text-sm font-bold text-error-600 min-w-[50px] text-right">
            -{{ getImpactValue(penalty.key).toFixed(1) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { Scores } from '../composables/useCalculator'
import penaltyCategories from '../constants/penaltyCategories'

const props = defineProps<{
  scores: Scores
}>()

const { t } = useI18n()

const getPenaltyLabel = (key: string): string => {
  const labelMap: Record<string, string> = {
    nonUniformCups: 'charts.nonUniformCup',
    defectiveCups: 'charts.defectiveCup',
  }
  return t(labelMap[key] || key)
}

const getImpactValue = (key: string): number => {
  if (key === 'nonUniformCups') {
    return props.scores.nonUniformCups * 2.0
  }
  if (key === 'defectiveCups') {
    return props.scores.defectiveCups * 4.0
  }
  return 0
}

const getImpactPercentage = (key: string): number => {
  const maxImpact = 20 // Máximo impacto posible (5 * 4.0 para defectiveCups)
  const impact = getImpactValue(key)
  return Math.min((impact / maxImpact) * 100, 100)
}
</script>

<style scoped>
/* Estilos adicionales si son necesarios */
</style>
