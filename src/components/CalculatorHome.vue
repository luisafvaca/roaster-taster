<template>
  <div class="calculator-container p-8 min-h-screen bg-primary-50 from-primary-50 to-accent-50">
    <n-card class="mx-auto">
      <template #header>
        <h1 class="text-3xl text-primary-700 text-center font-[700]">
          {{ $t('app.subtitle') }}
        </h1>
        <h2 class="text-xl font-semibold text-primary-600 text-center mt-2">
          {{ $t('app.title') }}
        </h2>
      </template>

      <div class="space-y-8">
        <div>
          <h3 class="text-2xl font-bold text-primary-800 mb-4">
            {{ $t('calculator.impressionOfQuality') }}
          </h3>

          <div class="mb-4 p-4 bg-primary-100 rounded-lg">
            <p class="text-sm font-semibold mb-2">{{ $t('calculator.evaluationScale') }}:</p>
            <div class="grid grid-cols-3 md:grid-cols-5 gap-2 text-xs">
              <div>① {{ $t('scale.extremelyLow') }}</div>
              <div>② {{ $t('scale.veryLow') }}</div>
              <div>③ {{ $t('scale.moderatelyLow') }}</div>
              <div>④ {{ $t('scale.slightlyLow') }}</div>
              <div>⑤ {{ $t('scale.neitherHighNorLow') }}</div>
              <div>⑥ {{ $t('scale.slightlyHigh') }}</div>
              <div>⑦ {{ $t('scale.moderatelyHigh') }}</div>
              <div>⑧ {{ $t('scale.veryHigh') }}</div>
              <div>⑨ {{ $t('scale.extremelyHigh') }}</div>
            </div>
          </div>

          <div class="space-y-6">
            <div v-for="category in qualityCategories" :key="category.key" class="space-y-2">
              <div class="flex justify-between items-center">
                <label class="text-lg font-semibold text-primary-700">
                  {{ $t(category.labelKey) }}
                </label>
                <span class="text-xl font-bold text-primary-600 min-w-12 text-right">
                  {{ getQualityScore(category.key) }}
                </span>
              </div>
              <n-slider
                :value="getQualityScore(category.key)"
                @update:value="(val: number) => updateQualityScore(category.key, val)"
                :min="1"
                :max="9"
                :step="1"
                :marks="sliderMarks"
                :tooltip="false"
              />
            </div>
          </div>
        </div>

        <div>
          <h3 class="text-2xl font-bold text-primary-800 mb-4">
            {{ $t('calculator.penalizations') }}
          </h3>

          <div class="space-y-6">
            <div v-for="penalty in penaltyCategories" :key="penalty.key" class="space-y-2">
              <div class="flex justify-between items-center">
                <label class="text-lg font-semibold text-primary-700">
                  {{ $t(penalty.labelKey) }}
                </label>
                <span class="text-xl font-bold text-tertiary-600 min-w-12 text-right">
                  {{ getPenaltyScore(penalty.key) }}
                </span>
              </div>
              <n-slider
                :value="getPenaltyScore(penalty.key)"
                @update:value="(val: number) => updatePenaltyScore(penalty.key, val)"
                :min="0"
                :max="5"
                :step="1"
                :marks="penaltyMarks"
                :tooltip="false"
              />
            </div>
          </div>
        </div>

        <!-- Affective Score Display -->
        <div class="mt-8">
          <n-card class="bg-primary-800 text-white">
            <div class="flex justify-between items-center p-4">
              <span class="text-2xl font-bold">{{ $t('calculator.affectiveScore') }}</span>
              <span class="text-5xl font-bold text-accent-400">
                {{ affectiveScore.toFixed(2) }}
              </span>
            </div>
          </n-card>
        </div>
      </div>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { NCard, NSlider } from 'naive-ui'
import qualityCategories from '../constants/qualityCategories'
import penaltyCategories from '../constants/penaltyCategories'
import { useCalculator } from '../composables/useCalculator'

const { getQualityScore, getPenaltyScore, updateQualityScore, updatePenaltyScore, affectiveScore } =
  useCalculator()

const sliderMarks = {
  1: '1',
  3: '3',
  5: '5',
  7: '7',
  9: '9',
}

const penaltyMarks = {
  0: '0',
  1: '1',
  2: '2',
  3: '3',
  4: '4',
  5: '5',
}
</script>

<style scoped>
.calculator-container {
  min-height: 100vh;
}
</style>
