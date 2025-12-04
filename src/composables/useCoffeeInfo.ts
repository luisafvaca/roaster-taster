import { ref, reactive, watch } from 'vue'

export interface CoffeeInfo {
  cuppingDate: string
  origin: string
  originOther: string
  altitude: string
  variety: string
  varietyOther: string
  process: 'washed' | 'natural' | 'honey' | 'anaerobic' | ''
  roastLevel: 'light' | 'medium' | 'mediumDark' | 'dark' | ''
  brewingMethod: 'v60' | 'chemex' | 'espresso' | 'aeropress' | 'frenchPress' | 'cupping' | ''
  roastDate: number | null
}

const coffeeInfo = reactive<CoffeeInfo>({
  cuppingDate: '',
  origin: '',
  originOther: '',
  altitude: '',
  variety: '',
  varietyOther: '',
  process: '',
  roastLevel: '',
  brewingMethod: '',
  roastDate: null,
})

const isSidebarOpen = ref(false)

export function useCoffeeInfo() {
  const openSidebar = () => {
    isSidebarOpen.value = true
    const drawerCheckbox = document.getElementById('coffee-info-drawer') as HTMLInputElement
    if (drawerCheckbox) {
      drawerCheckbox.checked = true
    }
  }

  const closeSidebar = () => {
    isSidebarOpen.value = false
    const drawerCheckbox = document.getElementById('coffee-info-drawer') as HTMLInputElement
    if (drawerCheckbox) {
      drawerCheckbox.checked = false
    }
  }

  const toggleSidebar = () => {
    if (isSidebarOpen.value) {
      closeSidebar()
    } else {
      openSidebar()
    }
  }

  const resetCoffeeInfo = () => {
    coffeeInfo.cuppingDate = ''
    coffeeInfo.origin = ''
    coffeeInfo.originOther = ''
    coffeeInfo.altitude = ''
    coffeeInfo.variety = ''
    coffeeInfo.varietyOther = ''
    coffeeInfo.process = ''
    coffeeInfo.roastLevel = ''
    coffeeInfo.brewingMethod = ''
    coffeeInfo.roastDate = null
  }

  return {
    coffeeInfo,
    isSidebarOpen,
    openSidebar,
    closeSidebar,
    toggleSidebar,
    resetCoffeeInfo,
  }
}
