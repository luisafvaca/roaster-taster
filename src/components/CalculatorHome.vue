<template>
  <div>
    <h1
      class="text-2xl font-bold text-primary-600 text-center mt-24 mb-4 sticky top-[70px] bg-base-100 z-3 p-4"
    >
      {{ $t('app.title') }}
    </h1>
    <!-- Botón flotante para añadir información -->
    <label
      for="coffee-info-drawer"
      class="btn btn-primary fixed bottom-6 right-6 z-50 bg-primary-500 hover:bg-primary-600 text-primary-content shadow-lg cursor-pointer gap-2"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
      </svg>
      <span class="hidden sm:inline">{{ $t('coffeeInfo.buttons.addInfo') }}</span>
    </label>
  </div>
  <CalculatorTool />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useCoffeeInfo } from '../composables/useCoffeeInfo'
import CalculatorTool from './CalculatorTool.vue'

const { openSidebar } = useCoffeeInfo()

// Abrir el sidebar automáticamente la primera vez
onMounted(() => {
  const hasSeenSidebar = localStorage.getItem('coffeeInfoSidebarSeen')
  if (!hasSeenSidebar) {
    setTimeout(() => {
      openSidebar()
      localStorage.setItem('coffeeInfoSidebarSeen', 'true')
    }, 500)
  }
})
</script>
