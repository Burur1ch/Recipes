<template>
    <div class="mb-4">
      <h3 class="text-xl font-semibold mb-2">Фильтровать по ингредиентам</h3>
      <div v-for="ingredient in allIngredients" :key="ingredient" class="flex items-center gap-2">
        <input
          type="checkbox"
          :value="ingredient"
          v-model="selectedIngredients"
          class="h-5 w-5"
        />
        <label class="text-lg">{{ ingredient }}</label>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from "vue";
  import { useRecipesStore } from "@/store/recipes";
  
  const store = useRecipesStore();
  
  const selectedIngredients = ref([]);
  
  // Все возможные ингредиенты (добавляем их динамически)
  const allIngredients = computed(() => {
    const allIngredientsList = new Set();
    store.recipes.forEach((recipe) => {
      recipe.ingredients.forEach((ingredient) => {
        allIngredientsList.add(ingredient.name);
      });
    });
    return Array.from(allIngredientsList);
  });
  
  </script>
  
  <style scoped>
  /* Стили для фильтра */
  </style>
  