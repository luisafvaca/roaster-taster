<template>
  <div class="message" :class="variantClasses">
    <p>{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    message: string
    variant: 'info' | 'warning' | 'error' | 'success'
  }>(),
  {
    variant: 'info',
  },
)

const variantClasses = computed(() => {
  const classes = {
    info: 'bg-info-50 text-info-500',
    warning: 'bg-warning-50 text-warning-500',
    error: 'bg-error-50 text-error-500',
    success: 'bg-success-50 text-success-500',
  } as const
  return classes[props.variant]
})
</script>
