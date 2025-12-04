<template>
  <aside class="w-96 min-h-full bg-base-100 border-l border-primary-200">
    <div class="p-6 h-full overflow-y-auto">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold text-primary-500">
          {{ $t('coffeeInfo.modalTitle') }}
        </h2>
        <button @click="closeSidebar" class="btn btn-sm btn-circle btn-ghost text-primary-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div class="space-y-6">
        <CuppingDateInput />
        <OriginSelector />
        <AltitudeSelector />
        <VarietySelector />
        <ProcessSelector />
        <RoastLevelSelector />
        <BrewingMethodSelector />
        <RoastDateInput />

        <!-- Botones -->
        <div class="flex gap-3 pt-4">
          <button
            @click="closeSidebar"
            class="btn btn-primary flex-1 bg-primary-500 hover:bg-primary-600 text-primary-content"
          >
            {{ $t('coffeeInfo.buttons.continue') }}
          </button>
          <button
            @click="handleSkip"
            class="btn btn-ghost border-primary-300 text-primary-600 hover:bg-primary-100"
          >
            {{ $t('coffeeInfo.buttons.skip') }}
          </button>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { useCoffeeInfo } from '../composables/useCoffeeInfo'
import CuppingDateInput from './CuppingDateInput.vue'
import OriginSelector from './OriginSelector.vue'
import AltitudeSelector from './AltitudeSelector.vue'
import VarietySelector from './VarietySelector.vue'
import ProcessSelector from './ProcessSelector.vue'
import RoastLevelSelector from './RoastLevelSelector.vue'
import BrewingMethodSelector from './BrewingMethodSelector.vue'
import RoastDateInput from './RoastDateInput.vue'

const { closeSidebar } = useCoffeeInfo()

const handleSkip = () => {
  closeSidebar()
}
</script>
