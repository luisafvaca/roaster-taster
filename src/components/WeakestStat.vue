<template>
  <div class="stat bg-primary-100 rounded-lg shadow flex flex-col items-center p-6">
    <div class="stat-title text-primary-500 mb-2">{{ $t('stats.weakest') }}</div>
    <div
      class="radial-progress text-error-600"
      :style="{
        '--value': percentage,
        '--size': '8rem',
        '--thickness': '8px',
      }"
      :aria-valuenow="percentage"
      role="progressbar"
    >
      {{ allEqual ? '–' : attribute?.value.toFixed(1) || '0.0' }}
    </div>
    <div class="stat-desc text-primary-600 font-semibold mt-2 text-center">
      {{ allEqual ? $t('stats.uniformProfile') : $t(attribute?.label || 'calculator.overall') }}
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  attribute: { value: number; label: string } | null
  percentage: number
  allEqual: boolean
}>()
</script>
