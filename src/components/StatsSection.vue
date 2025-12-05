<template>
  <div class="w-full">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StrongestStat
        :attribute="strongestAttribute || null"
        :percentage="strongestPercentage"
        :all-equal="allEqual"
      />
      <WeakestStat
        :attribute="weakestAttribute || null"
        :percentage="weakestPercentage"
        :all-equal="allEqual"
      />
      <BalanceStat :balance="balance" :percentage="balancePercentage" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStats } from '../composables/useStats'
import type { Scores } from '../composables/useCalculator'
import StrongestStat from './StrongestStat.vue'
import WeakestStat from './WeakestStat.vue'
import BalanceStat from './BalanceStat.vue'

const props = defineProps<{
  scores: Scores
}>()

const { strongestAttribute, weakestAttribute, balance, allEqual } = useStats({
  value: props.scores,
})

const averageScore = computed(() => {
  const entries = Object.entries(props.scores).filter(
    ([key]) => !['nonUniformCups', 'defectiveCups'].includes(key),
  )

  const values = entries.map(([, v]) => Number(v))
  return values.reduce((a, b) => a + b, 0) / values.length
})

// Calcular porcentajes para radial progress
// Mayor Fortaleza: valor de 1-9 convertido a porcentaje (11.11% - 100%)
const strongestPercentage = computed(() => {
  const value = strongestAttribute.value?.value || 0
  return Math.min((value / 9) * 100, 100)
})

// Punto Débil: valor de 1-9 convertido a porcentaje (11.11% - 100%)
const weakestPercentage = computed(() => {
  const value = weakestAttribute.value?.value || 0
  return Math.min((value / 9) * 100, 100)
})

// Balance General: más balanceado = mayor porcentaje
// stdDev < 1.2 = 100%, stdDev 1.2-2.0 = 50-100%, stdDev > 2.0 = 0-50%
const balancePercentage = computed(() => {
  const stdDev = balance.value.stdDev
  const minQuality = averageScore.value // promedio de todos los atributos

  // Si el café tiene valores bajos, reducir el balance
  if (minQuality < 5) {
    return 20 // Máximo 20% para cafés muy bajos
  }

  if (stdDev < 1.2) {
    // Balanceado: 80-100%
    return 100 - (stdDev / 1.2) * 20
  }
  if (stdDev <= 2.0) {
    // Medianamente balanceado: 50-80%
    return 80 - ((stdDev - 1.2) / 0.8) * 30
  }

  // Desbalanceado: 0-50%
  return Math.max(50 - ((stdDev - 2.0) / 2.0) * 50, 0)
})
</script>
