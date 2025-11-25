<template>
  <div class="about p-8 min-h-screen">
    <n-card class="max-w-2xl mx-auto">
      <template #header>
        <h1 class="text-3xl font-bold text-primary-700">Prueba de Configuración</h1>
      </template>

      <div class="space-y-4">
        <n-alert type="success" title="Tailwind CSS v4">
          Tailwind CSS está funcionando correctamente
        </n-alert>

        <n-alert type="info" title="Naive UI"> Naive UI está configurado y funcionando </n-alert>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div class="bg-green-500 p-4 rounded-lg text-white text-center">
            <p class="font-semibold">Green</p>
            <p class="text-sm">bg-green-500</p>
          </div>

          <div class="bg-primary-500 p-4 rounded-lg text-white text-center">
            <p class="font-semibold">Primary</p>
            <p class="text-sm">bg-primary-500</p>
          </div>

          <div class="bg-secondary-500 p-4 rounded-lg text-white text-center">
            <p class="font-semibold">Secondary</p>
            <p class="text-sm">bg-secondary-500</p>
          </div>

          <div class="bg-accent-500 p-4 rounded-lg text-white text-center">
            <p class="font-semibold">Accent</p>
            <p class="text-sm">bg-accent-500</p>
          </div>
        </div>

        <div class="mt-6">
          <n-button type="primary" class="mr-2">Botón Primary</n-button>
          <n-button type="success">Botón Success</n-button>
        </div>
      </div>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { NCard, NAlert, NButton } from 'naive-ui'
</script>

<style scoped>
.about {
  background: linear-gradient(to bottom, var(--color-primary-50), var(--color-accent-50));
}
</style>
