<template>
  <div class="min-h-screen flex flex-col">
    <RNav />
    <main class="flex-1">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import RNav from '../components/atoms/RNav.vue'
</script>

<style scoped>
/* Estilos adicionales si son necesarios */
</style>
