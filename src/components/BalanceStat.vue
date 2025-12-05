<template>
  <div class="stat bg-primary-100 rounded-lg shadow flex flex-col items-center p-6">
    <div class="stat-title text-primary-500 mb-2">{{ $t('stats.balance') }}</div>
    <div
      :class="[
        'radial-progress',
        balance.level === 'balanced'
          ? 'text-success-600'
          : balance.level === 'moderatelyBalanced'
            ? 'text-warning-600'
            : 'text-error-600',
      ]"
      :style="{
        '--value': percentage,
        '--size': '8rem',
        '--thickness': '8px',
      }"
      :aria-valuenow="percentage"
      role="progressbar"
    >
      {{ percentage.toFixed(0) }}%
    </div>
    <div
      :class="[
        'stat-desc font-semibold mt-2 text-center',
        balance.level === 'balanced'
          ? 'text-success-600'
          : balance.level === 'moderatelyBalanced'
            ? 'text-warning-600'
            : 'text-error-600',
      ]"
    >
      {{ $t(balance.levelKey) }}
    </div>
    <div class="text-xs text-primary-600 mt-1">σ: {{ balance.stdDev.toFixed(2) }}</div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  balance: {
    level: string
    levelKey: string
    stdDev: number
  }
  percentage: number
}>()
</script>
