<template>
    <header class="w-full h-16 bg-amber-400 flex justify-between items-center px-6 uppercase shadow-md">
      <!-- Логотип -->
      <router-link to="/" class="text-xl font-bold">Наши рецепты</router-link>
  
      <!-- Навигация -->
      <nav>
        <ul class="hidden md:flex gap-4">
          <li>
            <router-link to="/" class="hover:text-white" active-class="text-white font-bold">Популярные</router-link>
          </li>
          <li>
            <router-link to="/random" class="hover:text-white" active-class="text-white font-bold">Случайный рецепт</router-link>
          </li>
          <li>
            <router-link to="/favorites" class="hover:text-white" active-class="text-white font-bold">Избранное</router-link>
          </li>
        </ul>
  
        <!-- Бургер-меню для мобильных -->
        <button class="md:hidden" @click="toggleMenu">
          ☰
        </button>
  
        <ul v-if="isMenuOpen" class="absolute top-16 right-0 bg-amber-400 w-40 flex flex-col items-end p-4 shadow-lg md:hidden">
          <li>
            <router-link to="/" class="hover:text-white" @click="toggleMenu">Популярные</router-link>
          </li>
          <li>
            <router-link to="/random" class="hover:text-white" @click="toggleMenu">Новое</router-link>
          </li>
          <li>
            <router-link to="/favorites" class="hover:text-white" @click="toggleMenu">Избранное</router-link>
          </li>
        </ul>
      </nav>
    </header>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const isMenuOpen = ref(false);
  const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
  };
  </script>
  
  <style scoped>
  /* Добавим небольшие стили для плавности */
  button {
    font-size: 1.5rem;
    cursor: pointer;
  }
  </style>
  