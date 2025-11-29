<template>
  <div class="w-full max-w-2xl mx-auto space-y-6">
    <!-- Casillas visuales -->
    <div class="space-y-4">
      <div v-for="penalty in penaltyCategories" :key="penalty.key" class="flex items-center gap-3">
        <div class="flex items-center gap-2 min-w-[200px]">
          <span class="text-sm font-semibold text-primary-700">
            {{ $t(penalty.labelKey) }}
          </span>
        </div>
        <div class="flex items-center gap-2 flex-1">
          <div class="flex gap-1">
            <span
              v-for="i in 5"
              :key="i"
              :class="[
                'w-6 h-6 rounded transition-colors',
                i <= scores[penalty.key] ? 'bg-error-500' : 'bg-gray-200 border border-gray-300',
              ]"
              :title="`${i <= scores[penalty.key] ? 'Lleno' : 'Vacío'}`"
            ></span>
          </div>
          <span class="text-sm font-medium text-primary-600 min-w-[60px]">
            {{ scores[penalty.key] }}
          </span>
        </div>
      </div>
    </div>

    <!-- Gráfico de barras horizontales con impacto -->
    <div class="space-y-3 pt-4 border-t border-gray-300">
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
import type { Scores } from '../composables/useCalculator'
import penaltyCategories from '../constants/penaltyCategories'

const props = defineProps<{
  scores: Scores
}>()

const getPenaltyLabel = (key: string): string => {
  const labelMap: Record<string, string> = {
    nonUniformCups: 'Taza no uniforme',
    defectiveCups: 'Taza defectuosa',
  }
  return labelMap[key] || key
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
