<template>
  <div class="max-w-4xl mx-auto p-6">
    <h2 class="text-2xl font-bold mb-4">Рецепты</h2>

    <!-- Фильтр по ингредиентам -->
    <div class="mb-4">
      <label class="block font-semibold mb-2">Фильтр по ингредиентам:</label>
      <div class="flex flex-wrap gap-2">
        <label
          v-for="ingredient in allIngredients"
          :key="ingredient"
          class="flex items-center gap-1"
        >
          <input type="checkbox" :value="ingredient" v-model="selectedIngredients" />
          {{ ingredient }}
        </label>
      </div>
    </div>

    <!-- Список рецептов -->
    <div v-if="filteredRecipes.length">
      <div
        v-for="recipe in filteredRecipes"
        :key="recipe.id"
        class="border p-4 rounded-lg shadow-md mb-4"
      >
        <h3 class="text-xl font-bold">{{ recipe.title }}</h3>
        <img v-if="recipe.image" :src="recipe.image" class="mt-2 max-h-40 rounded-md" />
        <p class="text-gray-600 mt-2">
          Категория: <strong>{{ recipe.category }}</strong>
        </p>
        <p class="mt-2">
          <strong>Ингредиенты:</strong> {{ formatIngredients(recipe.ingredients) }}
        </p>
        <p class="mt-2"><strong>Описание:</strong> {{ recipe.description }}</p>
      </div>
    </div>
    <p v-else class="text-gray-500">Рецептов нет или не найдено по фильтру.</p>
  </div>
</template>

<script setup>
import { useRecipeStore } from '@/store/recipes'
import { computed, ref, watch} from 'vue'

const selectedIngredients = ref([])
const store = useRecipeStore()

const allIngredients = computed(() => {
  const ingredientsSet = new Set();
  console.log(store.recipes);  
  store.recipes.forEach((recipe) =>
    recipe.ingredients.forEach((ing) => ingredientsSet.add(ing.name))
  );
  return Array.from(ingredientsSet);
});

const filteredRecipes = computed(() => store.getFilteredRecipes())

watch(selectedIngredients, (newVal) => {
  store.setSelectedIngredients(newVal)
})

const formatIngredients = (ingredients) => {
  return ingredients.map((ing) => `${ing.name} (${ing.amount} г)`).join(', ')
}
</script>

<style>
</style>