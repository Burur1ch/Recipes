<template>
  <div class="container mx-auto px-4">
    <h1 class="text-4xl font-bold text-gray-900 text-center mb-8">📌 Все рецепты</h1>

    <!-- Фильтр ингредиентов по центру -->
    <div class="flex justify-center mb-8">
      <IngredientFilter />
    </div>

    <!-- Карточки рецептов -->
    <div v-if="filteredRecipes.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <div
        v-for="recipe in filteredRecipes"
        :key="recipe.id"
        class="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1"
      >
        <img
          v-if="recipe.image"
          :src="recipe.image"
          alt="Recipe Image"
          class="w-full h-56 object-cover rounded-xl mb-4"
        />
        <h2 class="text-2xl font-bold text-gray-900 mb-1">{{ recipe.title }}</h2>
        <p class="text-gray-500 text-lg mb-3">Категория: <span class="font-semibold text-amber-600">{{ recipe.category }}</span></p>
        <p class="text-gray-700 text-base line-clamp-2">{{ recipe.description }}</p>
        <router-link :to="'/recipe/' + recipe.id" class="mt-4 inline-block bg-amber-500 text-white px-5 py-3 rounded-lg shadow-md hover:bg-amber-600 transition">
          Посмотреть →
        </router-link>
      </div>
    </div>

    <p v-else class="text-gray-600 text-center mt-10 text-xl">❌ Нет рецептов, соответствующих фильтрам.</p>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRecipesStore } from "@/store/recipes";
import IngredientFilter from "@/components/views/RecipeList/IngredientFilter.vue";

const store = useRecipesStore();
const selectedIngredients = computed(() => store.selectedIngredients);

// Фильтруем рецепты по выбранным ингредиентам
const filteredRecipes = computed(() => {
  return store.recipes.filter((recipe) => {
    return selectedIngredients.value.every((ingredient) => {
      return recipe.ingredients.some((ing) => ing.name === ingredient);
    });
  });
});
</script>

<style scoped>
/* Ограничение количества строк */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
