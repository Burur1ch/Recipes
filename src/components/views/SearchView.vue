<template>
  <div>
    <h1 class="text-2xl font-bold">Результаты поиска</h1>
    <p v-if="query">Ищем рецепты по запросу: <strong>{{ query }}</strong></p>
    <p v-else class="text-gray-500">Введите поисковый запрос</p>

    <ul v-if="filteredRecipes.length > 0">
      <li v-for="recipe in filteredRecipes" :key="recipe.id">
        <router-link :to="'/recipe/' + recipe.id" class="text-blue-500 hover:underline">
          {{ recipe.title }}
        </router-link>
      </li>
    </ul>
    <p v-else class="text-red-500">Ничего не найдено 😔</p>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useRecipesStore } from "@/store/recipes";

const route = useRoute();
const store = useRecipesStore();

const query = computed(() => route.query.q); // Получаем параметр ?q= из URL

const filteredRecipes = computed(() => {
  if (!query.value) return [];
  return store.recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(query.value.toLowerCase())
  );
});
</script>
