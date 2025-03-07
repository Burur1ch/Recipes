<template>
  <header class="fixed z-10 w-full bg-amber-100 h-16 flex justify-between items-center px-6 shadow-md">
    <!-- Логотип -->
    <router-link to="/" class="text-xl font-bold hover:scale-110 transition">
      🔥 Recipes 🔥
    </router-link>

    <!-- Поиск + Навигация -->
    <div class="flex items-center gap-4">
      <!-- Кнопка поиска (мобильная версия) -->
      <button class="md:hidden text-xl" @click="toggleSearch">🔍</button>

<!-- Поиск (десктоп) -->
<div v-if="!isSearchOpen" class="relative w-64 hidden md:block">
  <input
    v-model="searchQuery"
    placeholder="Найти рецепт"
    type="text"
    @keyup.enter="search"
    class="w-full p-2 pl-4 pr-10 border rounded-full focus:ring-2 focus:ring-white transition"
  />
  <button @click="search" class="absolute right-3 top-1/2 -translate-y-1/2 hover:scale-110 transition">
    🔍
  </button>
</div>


      <!-- Навигация -->
      <nav class="hidden md:flex gap-6 text-gray-700 text-lg">
        <router-link to="/random" class="hover:text-black transition" exact-active-class="text-black font-bold">
          Случайное
        </router-link>
        <router-link to="/favorites" class="hover:text-black transition" exact-active-class="text-black font-bold">
          Избранное
        </router-link>
        <router-link to="/addRecipe" class="hover:text-red-500 transition" exact-active-class="text-black font-bold">
          Добавить
        </router-link>
      </nav>

      <!-- Бургер-меню -->
      <button class="md:hidden text-2xl" @click="toggleMenu">☰</button>
    </div>

    <!-- Мобильное меню -->
    <transition name="slide">
      <ul
        v-if="isMenuOpen"
        class="absolute top-16 right-0 bg-amber-50 w-48 flex flex-col items-end p-4 shadow-lg md:hidden z-50 rounded-md"
      >
        <router-link to="/random" class="hover:text-black transition" @click="toggleMenu">
          Случайный рецепт
        </router-link>
        <router-link to="/favorites" class="hover:text-black transition" @click="toggleMenu">
          Избранное
        </router-link>
        <router-link to="/addRecipe" class="hover:text-red-500 transition" @click="toggleMenu">
          Добавить 🔥
        </router-link>
      </ul>
    </transition>

    <!-- Поле поиска для мобильной версии -->
    <transition name="fade">
      <div v-if="isSearchOpen" class="absolute top-16 left-0 w-full bg-white shadow-md p-4 flex items-center">
        <input
          v-model="searchQuery"
          placeholder="Найти рецепт..."
          type="text"
          @keyup.enter="search"
          class="w-full p-2 pl-4 pr-10 border rounded-full focus:ring-2 focus:ring-amber-400"
        />
        <button @click="search" class="ml-2 text-2xl hover:scale-110 transition">🔍</button>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const isMenuOpen = ref(false);
const isSearchOpen = ref(false);
const searchQuery = ref("");
const router = useRouter();
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const toggleSearch = () => {
  isSearchOpen.value = !isSearchOpen.value;
};

const search = () => {
  if (searchQuery.value.trim()) {
    router.push({ name: "search", query: { q: searchQuery.value } });
    isSearchOpen.value = false; // Закрываем поле после поиска
  }
};
</script>

<style scoped>
/* Анимация появления мобильного меню */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease-out, opacity 0.3s ease-out;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

/* Анимация появления поиска */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
