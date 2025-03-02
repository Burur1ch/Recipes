<template>
  <div>
    <h1 class="text-3xl font-bold mb-4">Все рецепты</h1>

    <IngredientFilter />
    
    <div v-if="filteredRecipes.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="recipe in filteredRecipes"
        :key="recipe.id"
        class="bg-white p-4 rounded-lg shadow-md"
      >
        <img v-if="recipe.image" :src="recipe.image" alt="Recipe Image" class="w-full h-32 object-cover rounded-md mb-2" />
        <h2 class="text-xl font-semibold">{{ recipe.title }}</h2>
        <p class="text-gray-500">Категория: {{ recipe.category }}</p>
        <p class="text-gray-700">{{ recipe.description }}</p>
      </div>
    </div>
    <p v-else>Нет рецептов, соответствующих фильтрам.</p>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRecipesStore } from "@/store/recipes";
import IngredientFilter from "./RecipeList/IngredientFilter.vue";

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
