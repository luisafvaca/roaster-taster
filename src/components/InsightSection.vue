<template>
  <div class="w-full">
    <div class="bg-primary-100 rounded-lg p-6">
      <h4 class="text-lg font-bold text-primary-800 mb-3">{{ $t('insight.title') }}</h4>
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
