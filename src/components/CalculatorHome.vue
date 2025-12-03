<template>
  <h1
    class="text-2xl font-bold text-primary-600 text-center mt-24 sticky top-[70px] bg-base-100 z-3 py-4"
  >
    {{ $t('app.title') }}
  </h1>
  <div class="flex flex-col lg:flex-row gap-8">
    <div class="calculator-container p-8 min-h-screen">
      <div class="card shadow-xl mx-auto max-w-4xl">
        <div class="card-body">
          <div class="space-y-8">
            <div>
              <h3 class="text-xl font-semibold text-primary-800 mb-4">
                {{ $t('calculator.impressionOfQuality') }}
              </h3>

              <div class="mb-4 p-4 bg-primary-100 rounded-lg">
                <!-- <RMessage message="This is an info message" variant="info" /> -->
                <div class="grid grid-cols-3 gap-2 text-xs">
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
                  <div class="flex items-center">
                    <label class="text-sm font-semibold text-primary-700">
                      {{ $t(category.labelKey) }}:
                      <span class="text-sm font-bold text-primary-600 min-w-12 text-right">
                        {{ getQualityScore(category.key) }}
                      </span>
                    </label>
                  </div>
                  <div class="w-full">
                    <RRange
                      :value="getQualityScore(category.key)"
                      @update:value="updateQualityScore(category.key, $event)"
                      min="1"
                      max="9"
                      step="1"
                      variant="primary"
                      size="xs"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 class="text-2xl font-bold text-primary-800 mb-4">
                {{ $t('calculator.penalizations') }}
              </h3>

              <div class="space-y-6">
                <div v-for="penalty in penaltyCategories" :key="penalty.key" class="space-y-2">
                  <div class="flex items-center">
                    <label class="text-sm font-semibold text-primary-700">
                      {{ $t(penalty.labelKey) }}:
                      <span class="text-sm font-bold text-secondary-500 min-w-12 text-right">
                        {{ getPenaltyScore(penalty.key) }}
                      </span>
                    </label>
                  </div>
                  <div class="w-full">
                    <RRange
                      :value="getPenaltyScore(penalty.key)"
                      @update:value="updatePenaltyScore(penalty.key, $event)"
                      min="0"
                      max="5"
                      step="1"
                      variant="secondary"
                      size="xs"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- Affective Score Display -->
            <div class="mt-8">
              <div class="card bg-primary-500 text-white">
                <div class="card-body">
                  <div class="flex justify-between items-center">
                    <span class="text-2xl font-bold">{{ $t('calculator.affectiveScore') }}</span>
                    <span class="text-5xl font-bold text-secondary-500">
                      {{ affectiveScore.toFixed(2) }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <DashboardResult v-if="affectiveScore !== 58" :scores="scores" />
  </div>
</template>

<script setup lang="ts">
import qualityCategories from '../constants/qualityCategories'
import penaltyCategories from '../constants/penaltyCategories'
import { useCalculator } from '../composables/useCalculator'
import RRange from './atoms/RRange.vue'
import DashboardResult from './DashboardResult.vue'

const {
  scores,
  getQualityScore,
  getPenaltyScore,
  updateQualityScore,
  updatePenaltyScore,
  affectiveScore,
} = useCalculator()
</script>

<style scoped>
.calculator-container {
  min-height: 100vh;
}
</style>
