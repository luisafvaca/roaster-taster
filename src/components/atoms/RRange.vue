<template>
  <input
    type="range"
    :value="value"
    @input="updateValue"
    :min="min"
    :max="max"
    :step="step"
    :class="rangeClasses"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  value: number | string
  min: number | string
  max: number | string
  step: number | string
  variant: 'primary' | 'secondary' | 'tertiary' | 'error'
  size: 'xs' | 'sm' | 'md' | 'lg'
}>()

const emit = defineEmits<{
  (e: 'update:value', value: number): void
}>()

const rangeClasses = computed(() => {
  const variantClass = {
    primary: 'range-primary',
    secondary: 'range-secondary',
    tertiary: 'range-error', // usando error para tertiary
    error: 'range-error',
  }[props.variant]

  const sizeClass = {
    xs: 'range-xs',
    sm: 'range-sm',
    md: 'range-md',
    lg: 'range-lg',
  }[props.size]

  return `range ${variantClass} ${sizeClass}`
})

const updateValue = (event: Event) => {
  emit('update:value', Number((event.target as HTMLInputElement).value))
}
</script>
