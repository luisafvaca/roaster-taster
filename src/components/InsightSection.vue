<template>
  <div class="w-full">
    <div class="bg-base-200 rounded-lg p-6">
      <h4 class="text-lg font-bold text-primary-800 mb-3">Insight Automático</h4>
      <p class="text-primary-700 leading-relaxed">{{ insight }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useInsight } from '../composables/useInsight'
import type { Scores } from '../composables/useCalculator'

const props = defineProps<{
  scores: Scores
}>()

const { insight } = useInsight({ value: props.scores })
</script>

<style scoped>
/* Estilos adicionales si son necesarios */
</style>
