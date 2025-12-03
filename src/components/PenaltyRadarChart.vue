<template>
  <div class="w-full max-w-md mx-auto mb-6">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { Chart, registerables } from 'chart.js'
import type { Scores } from '../composables/useCalculator'
import qualityCategories from '../constants/qualityCategories'
import i18n from '../i18n'

Chart.register(...registerables)

const props = defineProps<{
  scores: Scores
}>()

const { t } = useI18n()
const chartCanvas = ref<HTMLCanvasElement | null>(null)
let chartInstance: Chart | null = null

const getChartData = () => {
  const labels = qualityCategories.map((cat) => {
    return t(cat.labelKey)
  })

  const totalPenalty = props.scores.nonUniformCups * 2.0 + props.scores.defectiveCups * 4.0
  const maxPossiblePenalty = 5 * 2.0 + 5 * 4.0

  const penaltyPercentage = (totalPenalty / maxPossiblePenalty) * 100

  const data = qualityCategories.map((cat) => {
    const attributeValue = props.scores[cat.key]
    const reduction = (attributeValue / 9) * penaltyPercentage
    return Math.max(100 - reduction, 0)
  })

  return {
    labels,
    datasets: [
      {
        label: t('charts.penaltyImpact'),
        data,
        backgroundColor: 'rgba(220, 20, 60, 0.2)',
        borderColor: '#DC143C',
        borderWidth: 2,
        pointBackgroundColor: '#DC143C',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#DC143C',
      },
    ],
  }
}

const createChart = () => {
  if (!chartCanvas.value) return

  const data = getChartData()

  chartInstance = new Chart(chartCanvas.value, {
    type: 'radar',
    data,
    options: {
      scales: {
        r: {
          min: 0,
          max: 100,
          ticks: { stepSize: 20 },
          grid: { color: '#EEE' },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  })
}

const updateChart = () => {
  if (!chartInstance) return

  const data = getChartData()
  chartInstance.data = data
  chartInstance.update()
}

onMounted(() => {
  createChart()
})

onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.destroy()
  }
})

watch(
  () => props.scores,
  () => {
    updateChart()
  },
  { deep: true },
)

watch(
  () => i18n.global.locale.value,
  () => {
    updateChart()
  },
)
</script>

<style scoped>
/* Estilos adicionales si son necesarios */
</style>
