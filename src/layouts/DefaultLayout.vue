<template>
  <div class="drawer drawer-end">
    <input
      id="coffee-info-drawer"
      type="checkbox"
      class="drawer-toggle"
      :checked="isSidebarOpen"
      @change="handleDrawerChange"
    />
    <div class="drawer-content min-h-screen flex flex-col">
      <RNav />
      <main class="flex-1 mt-[64px]">
        <RouterView />
      </main>
    </div>
    <div class="drawer-side z-50">
      <label for="coffee-info-drawer" class="drawer-overlay" @click="closeSidebar"></label>
      <CoffeeInfoSidebar />
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { RouterView } from 'vue-router'
import RNav from '../components/atoms/RNav.vue'
import CoffeeInfoSidebar from '../components/CoffeeInfoSidebar.vue'
import { useCoffeeInfo } from '../composables/useCoffeeInfo'

const { isSidebarOpen, closeSidebar } = useCoffeeInfo()

const handleDrawerChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (!target.checked) {
    closeSidebar()
  }
}

// Sincronizar el checkbox cuando cambie el estado reactivo
watch(isSidebarOpen, (newValue) => {
  const drawerCheckbox = document.getElementById('coffee-info-drawer') as HTMLInputElement
  if (drawerCheckbox) {
    drawerCheckbox.checked = newValue
  }
})
</script>

<style scoped>
/* Estilos adicionales si son necesarios */
</style>
