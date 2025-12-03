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

      <p class="text-sm text-primary-600 mb-6">
        {{ $t('coffeeInfo.modalSubtitle') }}
      </p>

      <div class="space-y-6">
        <!-- 1. Origen del café -->
        <div class="form-control">
          <label class="label">
            <span class="label-text font-semibold text-primary-700">
              {{ $t('coffeeInfo.origin.label') }}
            </span>
          </label>
          <select
            v-model="coffeeInfo.origin"
            class="select select-bordered w-full bg-base-100 border-primary-300 focus:border-primary-500 focus:outline-primary-500"
          >
            <option value="">{{ $t('coffeeInfo.origin.placeholder') }}</option>
            <option v-for="country in coffeeCountries" :key="country" :value="country">
              {{ country }}
            </option>
            <option value="other">{{ $t('coffeeInfo.origin.other') }}</option>
          </select>
          <input
            v-if="coffeeInfo.origin === 'other'"
            v-model="coffeeInfo.originOther"
            type="text"
            :placeholder="$t('coffeeInfo.origin.otherPlaceholder')"
            class="input input-bordered w-full mt-2 bg-base-100 border-primary-300 focus:border-primary-500 focus:outline-primary-500"
          />
        </div>

        <!-- 2. Variedad -->
        <div class="form-control">
          <label class="label">
            <span class="label-text font-semibold text-primary-700">
              {{ $t('coffeeInfo.variety.label') }}
            </span>
          </label>
          <select
            v-model="coffeeInfo.variety"
            class="select select-bordered w-full bg-base-100 border-primary-300 focus:border-primary-500 focus:outline-primary-500"
          >
            <option value="">{{ $t('coffeeInfo.variety.placeholder') }}</option>
            <option v-for="variety in coffeeVarieties" :key="variety" :value="variety">
              {{ variety }}
            </option>
            <option value="other">{{ $t('coffeeInfo.variety.other') }}</option>
          </select>
          <input
            v-if="coffeeInfo.variety === 'other'"
            v-model="coffeeInfo.varietyOther"
            type="text"
            :placeholder="$t('coffeeInfo.variety.otherPlaceholder')"
            class="input input-bordered w-full mt-2 bg-base-100 border-primary-300 focus:border-primary-500 focus:outline-primary-500"
          />
        </div>

        <!-- 3. Proceso -->
        <div class="form-control">
          <label class="label">
            <span class="label-text font-semibold text-primary-700">
              {{ $t('coffeeInfo.process.label') }}
            </span>
          </label>
          <div class="grid grid-cols-2 gap-2">
            <label class="label cursor-pointer">
              <span class="label-text">{{ $t('coffeeInfo.process.washed') }}</span>
              <input
                type="radio"
                value="washed"
                v-model="coffeeInfo.process"
                class="radio radio-primary"
              />
            </label>
            <label class="label cursor-pointer">
              <span class="label-text">{{ $t('coffeeInfo.process.natural') }}</span>
              <input
                type="radio"
                value="natural"
                v-model="coffeeInfo.process"
                class="radio radio-primary"
              />
            </label>
            <label class="label cursor-pointer">
              <span class="label-text">{{ $t('coffeeInfo.process.honey') }}</span>
              <input
                type="radio"
                value="honey"
                v-model="coffeeInfo.process"
                class="radio radio-primary"
              />
            </label>
            <label class="label cursor-pointer">
              <span class="label-text">{{ $t('coffeeInfo.process.anaerobic') }}</span>
              <input
                type="radio"
                value="anaerobic"
                v-model="coffeeInfo.process"
                class="radio radio-primary"
              />
            </label>
          </div>
        </div>

        <!-- 4. Nivel de tueste -->
        <div class="form-control">
          <label class="label">
            <span class="label-text font-semibold text-primary-700">
              {{ $t('coffeeInfo.roastLevel.label') }}
            </span>
          </label>
          <div class="grid grid-cols-2 gap-2">
            <label class="label cursor-pointer">
              <span class="label-text">{{ $t('coffeeInfo.roastLevel.light') }}</span>
              <input
                type="radio"
                value="light"
                v-model="coffeeInfo.roastLevel"
                class="radio radio-secondary"
              />
            </label>
            <label class="label cursor-pointer">
              <span class="label-text">{{ $t('coffeeInfo.roastLevel.medium') }}</span>
              <input
                type="radio"
                value="medium"
                v-model="coffeeInfo.roastLevel"
                class="radio radio-secondary"
              />
            </label>
            <label class="label cursor-pointer">
              <span class="label-text">{{ $t('coffeeInfo.roastLevel.mediumDark') }}</span>
              <input
                type="radio"
                value="mediumDark"
                v-model="coffeeInfo.roastLevel"
                class="radio radio-secondary"
              />
            </label>
            <label class="label cursor-pointer">
              <span class="label-text">{{ $t('coffeeInfo.roastLevel.dark') }}</span>
              <input
                type="radio"
                value="dark"
                v-model="coffeeInfo.roastLevel"
                class="radio radio-secondary"
              />
            </label>
          </div>
        </div>

        <!-- 5. Método de preparación -->
        <div class="form-control">
          <label class="label">
            <span class="label-text font-semibold text-primary-700">
              {{ $t('coffeeInfo.brewingMethod.label') }}
            </span>
          </label>
          <div class="grid grid-cols-2 gap-2">
            <label class="label cursor-pointer">
              <span class="label-text">{{ $t('coffeeInfo.brewingMethod.v60') }}</span>
              <input
                type="radio"
                value="v60"
                v-model="coffeeInfo.brewingMethod"
                class="radio radio-accent"
              />
            </label>
            <label class="label cursor-pointer">
              <span class="label-text">{{ $t('coffeeInfo.brewingMethod.chemex') }}</span>
              <input
                type="radio"
                value="chemex"
                v-model="coffeeInfo.brewingMethod"
                class="radio radio-accent"
              />
            </label>
            <label class="label cursor-pointer">
              <span class="label-text">{{ $t('coffeeInfo.brewingMethod.espresso') }}</span>
              <input
                type="radio"
                value="espresso"
                v-model="coffeeInfo.brewingMethod"
                class="radio radio-accent"
              />
            </label>
            <label class="label cursor-pointer">
              <span class="label-text">{{ $t('coffeeInfo.brewingMethod.aeropress') }}</span>
              <input
                type="radio"
                value="aeropress"
                v-model="coffeeInfo.brewingMethod"
                class="radio radio-accent"
              />
            </label>
            <label class="label cursor-pointer">
              <span class="label-text">{{ $t('coffeeInfo.brewingMethod.frenchPress') }}</span>
              <input
                type="radio"
                value="frenchPress"
                v-model="coffeeInfo.brewingMethod"
                class="radio radio-accent"
              />
            </label>
            <label class="label cursor-pointer">
              <span class="label-text">{{ $t('coffeeInfo.brewingMethod.cupping') }}</span>
              <input
                type="radio"
                value="cupping"
                v-model="coffeeInfo.brewingMethod"
                class="radio radio-accent"
              />
            </label>
          </div>
        </div>

        <!-- 6. Fecha de tueste -->
        <div class="form-control">
          <label class="label">
            <span class="label-text font-semibold text-primary-700">
              {{ $t('coffeeInfo.roastDate.label') }}
            </span>
          </label>
          <input
            v-model.number="coffeeInfo.roastDate"
            type="number"
            min="0"
            :placeholder="$t('coffeeInfo.roastDate.placeholder')"
            class="input input-bordered w-full bg-base-100 border-primary-300 focus:border-primary-500 focus:outline-primary-500"
          />
        </div>

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

const { coffeeInfo, closeSidebar } = useCoffeeInfo()

const handleSkip = () => {
  closeSidebar()
}

// Lista de países productores de café más comunes
const coffeeCountries = [
  'Brasil',
  'Colombia',
  'Etiopía',
  'Kenia',
  'Guatemala',
  'Honduras',
  'Costa Rica',
  'Panamá',
  'Nicaragua',
  'El Salvador',
  'México',
  'Perú',
  'Indonesia',
  'Vietnam',
  'India',
  'Yemen',
  'Ruanda',
  'Burundi',
  'Uganda',
  'Tanzania',
  'Papúa Nueva Guinea',
  'Ecuador',
  'Venezuela',
  'Bolivia',
]

const coffeeVarieties = [
  'Caturra',
  'Bourbon',
  'Typica',
  'Geisha',
  'Mundo Novo',
  'Catuai',
  'Pacamara',
  'Maragogype',
  'SL28',
  'SL34',
  'Ruiru 11',
  'Ethiopian Heirloom',
  'Sidamo',
  'Yirgacheffe',
  'Harrar',
  'Java',
  'Sumatra',
  'Sulawesi',
  'Blue Mountain',
  'Villa Sarchi',
]
</script>
