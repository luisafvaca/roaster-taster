<template>
  <div class="w-full max-w-md mx-auto">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { Chart, registerables } from 'chart.js'
import type { Scores } from '../composables/useCalculator'
import qualityCategories from '../constants/qualityCategories'

Chart.register(...registerables)

const props = defineProps<{
  scores: Scores
}>()

const chartCanvas = ref<HTMLCanvasElement | null>(null)
let chartInstance: Chart | null = null

const getChartData = () => {
  const labels = qualityCategories.map((cat) => {
    const labelMap: Record<string, string> = {
      fragrance: 'Fragancia',
      aroma: 'Aroma',
      flavor: 'Sabor',
      aftertaste: 'Regusto',
      acidity: 'Acidez',
      sweetness: 'Dulzor',
      mouthfeel: 'Cuerpo',
      overall: 'General',
    }
    return labelMap[cat.key] || cat.key
  })

  const data = qualityCategories.map((cat) => props.scores[cat.key])

  const backgroundColor = [
    '#D9A441', // Fragancia
    '#E8C15E', // Aroma
    '#EA8C55', // Sabor
    '#C16E43', // Regusto
    '#7EC850', // Acidez
    '#F4A4A4', // Dulzor
    '#4378A6', // Cuerpo
    '#A58CD3', // General
  ]

  return {
    labels,
    datasets: [
      {
        label: 'Perfil de sabor',
        data,
        backgroundColor,
        borderWidth: 0,
      },
    ],
  }
}

const createChart = () => {
  if (!chartCanvas.value) return

  const data = getChartData()

  chartInstance = new Chart(chartCanvas.value, {
    type: 'polarArea',
    data,
    options: {
      scales: {
        r: {
          min: 0,
          max: 10,
          ticks: { stepSize: 1 },
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
</script>

<style scoped>
/* Estilos adicionales si son necesarios */
</style>
