<template>
  <header class="w-full bg-amber-50 h-16 flex justify-between items-center px-30 uppercase shadow-md">
    <!-- Логотип -->
    <router-link to="/" class="text-xl font-bold">🔥Recipes🔥</router-link>

    <div class="flex items-center gap-6">
      <div class="relative">
        <button v-if="!isSearchOpen" @click="toggleSearch" class="text-2xl">🔍</button>
        <div v-else class="relative w-64">
          <input
            v-model="searchQuery"
            placeholder="Найти рецепт"
            type="text"
            @keyup.enter="search"
            class="w-full p-2 pl-4 pr-10 border rounded-full focus:ring-2 focus:ring-white"
          />
          <button @click="toggleSearch" class="absolute right-2 top-1/2 transform -translate-y-1/2">✖</button>
        </div>
      </div>

      <nav>
        <ul class="hidden md:flex gap-6">
          <li>
            <router-link to="/random" class="hover:text-black" active-class="text-black font-bold">Случайный рецепт</router-link>
          </li>
          <li>
            <router-link to="/favorites" class="hover:text-black" active-class="text-black font-bold">💙Избранное</router-link>
          </li>
          <li>
            <router-link to="/addRecipe" class="hover:text-red" active-class="text-black font-bold">New Recipe🔥</router-link>
          </li>
        </ul>

        <!-- Бургер-меню для мобильных -->
        <button class="md:hidden" @click="toggleMenu">☰</button>
        <ul v-if="isMenuOpen" class="absolute top-16 right-0 bg-amber-50 w-40 flex flex-col items-end p-4 shadow-lg md:hidden">
          <li>
            <router-link to="/random" class="hover:text-black" @click="toggleMenu">Новое</router-link>
          </li>
          <li>
            <router-link to="/favorites" class="hover:text-black" @click="toggleMenu">Избранное</router-link>
          </li>
          <li>
            <router-link to="/addRecipe" class="hover:text-red" @click="toggleMenu">New Recipe🔥</router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const isMenuOpen = ref(false);
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const isSearchOpen = ref(false);
const searchQuery = ref("");
const router = useRouter();

const toggleSearch = () => {
  isSearchOpen.value = !isSearchOpen.value;
};

const search = () => {
  if (searchQuery.value.trim()) {
    router.push({ name: "search", query: { q: searchQuery.value } });
    toggleSearch();
  }
};
</script>

<style scoped>
button {
  font-size: 1.5rem;
  cursor: pointer;
}
</style>
