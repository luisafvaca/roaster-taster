<template>
  <div class="form-control">
    <label class="label">
      <span class="label-text font-semibold text-primary-700 mb-2">
        {{ $t('coffeeInfo.cuppingDate.label') }}
      </span>
    </label>
    <button
      :id="buttonId"
      popovertarget="cally-popover"
      class="input input-bordered w-full border-primary-300 focus:border-primary-500 focus:outline-primary-500 text-left"
      :style="{ anchorName: `--${buttonId}` }"
    >
      {{ displayDate || $t('coffeeInfo.cuppingDate.placeholder') }}
    </button>
    <div
      popover="auto"
      id="cally-popover"
      class="dropdown rounded-box shadow-lg border border-base-300"
      :style="{ positionAnchor: `--${buttonId}` }"
    >
      <calendar-date ref="calendarRef" class="cally bg-primary-50" :value="coffeeInfo.cuppingDate">
        <calendar-month></calendar-month>
      </calendar-date>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useCoffeeInfo } from '../composables/useCoffeeInfo'

interface CalendarDateElement extends HTMLElement {
  value?: string
  addEventListener(type: 'change', listener: (event: Event) => void): void
}

const { coffeeInfo } = useCoffeeInfo()

const buttonId = `cally-button-${Math.random().toString(36).substr(2, 9)}`
const calendarRef = ref<CalendarDateElement | null>(null)

const displayDate = computed(() => {
  if (!coffeeInfo.cuppingDate) return ''
  const date = new Date(coffeeInfo.cuppingDate)
  return date.toLocaleDateString()
})

const handleDateChange = (event: Event) => {
  const target = event.target as CalendarDateElement
  if (target?.value) {
    coffeeInfo.cuppingDate = target.value
  }
}

onMounted(() => {
  if (calendarRef.value) {
    calendarRef.value.addEventListener('change', handleDateChange)

    const previousSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    previousSvg.setAttribute('aria-label', 'Previous')
    previousSvg.setAttribute('class', 'fill-current size-4')
    previousSvg.setAttribute('slot', 'previous')
    previousSvg.setAttribute('viewBox', '0 0 24 24')
    previousSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
    const previousPath = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    previousPath.setAttribute('fill', 'currentColor')
    previousPath.setAttribute('d', 'M15.75 19.5 8.25 12l7.5-7.5')
    previousSvg.appendChild(previousPath)
    calendarRef.value.appendChild(previousSvg)

    const nextSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    nextSvg.setAttribute('aria-label', 'Next')
    nextSvg.setAttribute('class', 'fill-current size-4')
    nextSvg.setAttribute('slot', 'next')
    nextSvg.setAttribute('viewBox', '0 0 24 24')
    nextSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
    const nextPath = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    nextPath.setAttribute('fill', 'currentColor')
    nextPath.setAttribute('d', 'm8.25 4.5 7.5 7.5-7.5 7.5')
    nextSvg.appendChild(nextPath)
    calendarRef.value.appendChild(nextSvg)

    // Aplicar estilos al calendario
    applyCalendarStyles()
  }
})

const applyCalendarStyles = () => {
  // Usar MutationObserver para detectar cuando el calendario se renderiza
  const observer = new MutationObserver(() => {
    if (calendarRef.value) {
      const calendar = calendarRef.value

      // Buscar todos los días del calendario
      const todayElements = calendar.querySelectorAll('[data-today], [aria-current="date"]')
      const selectedElements = calendar.querySelectorAll('[data-selected], [aria-selected="true"]')

      // Aplicar estilos al día actual
      todayElements.forEach((el) => {
        const element = el as HTMLElement
        if (!element.hasAttribute('data-selected') && !element.getAttribute('aria-selected')) {
          element.style.backgroundColor = 'var(--color-primary-50)'
          element.style.color = 'var(--color-primary-700)'
        }
      })

      // Aplicar estilos al día seleccionado
      selectedElements.forEach((el) => {
        const element = el as HTMLElement
        element.style.backgroundColor = 'var(--color-primary-500)'
        element.style.color = 'white'
      })
    }
  })

  if (calendarRef.value) {
    observer.observe(calendarRef.value, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['data-today', 'data-selected', 'aria-current', 'aria-selected'],
    })
  }

  // También aplicar estilos después de un pequeño delay para asegurar que el calendario esté renderizado
  setTimeout(() => {
    if (calendarRef.value) {
      const calendar = calendarRef.value
      const todayElements = calendar.querySelectorAll('[data-today], [aria-current="date"]')
      const selectedElements = calendar.querySelectorAll('[data-selected], [aria-selected="true"]')

      todayElements.forEach((el) => {
        const element = el as HTMLElement
        if (!element.hasAttribute('data-selected') && !element.getAttribute('aria-selected')) {
          element.style.backgroundColor = 'var(--color-primary-50)'
          element.style.color = 'var(--color-primary-700)'
        }
      })

      selectedElements.forEach((el) => {
        const element = el as HTMLElement
        element.style.backgroundColor = 'var(--color-primary-500)'
        element.style.color = 'white'
      })
    }
  }, 200)
}
</script>
