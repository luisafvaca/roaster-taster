<template>
  <nav class="roaster-nav w-full p-4 fixed top-0 left-0 bg-white z-10">
    <div class="flex items-center gap-2">
      <img src="@/assets/logo.svg" alt="RoasterTaster" class="w-[24px]" />
      <p class="text-2xl font-bold text-primary-700 md:text-4xl">RoasterTaster</p>
    </div>
    <img
      src="@/assets/coffeefriends.svg"
      alt="CoffeeFriends"
      class="w-[130px] absolute right-[30px] bottom-[-37px]"
    />
  </nav>
</template>

<style scoped>
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
