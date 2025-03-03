<template>
  <div class="bg-white p-4 rounded-xl shadow-lg border border-gray-200">
    <h3 class="text-xl font-semibold mb-3">Фильтровать по ингредиентам</h3>
    <div v-for="ingredient in allIngredients" :key="ingredient" class="flex items-center gap-3 mb-2">
      <label class="flex items-center cursor-pointer">
        <input
          type="checkbox"
          :value="ingredient"
          v-model="selectedIngredients"
          class="hidden"
        />
        <span class="w-5 h-5 border-2 border-gray-400 rounded-md flex items-center justify-center transition-all duration-200 ease-in-out"
          :class="{ 'bg-amber-400 border-amber-400': selectedIngredients.includes(ingredient) }">
          <svg v-if="selectedIngredients.includes(ingredient)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" class="w-4 h-4">
            <path fill-rule="evenodd" d="M20.25 6.75L9 18l-5.25-5.25 1.5-1.5L9 15l9.75-9.75 1.5 1.5z" clip-rule="evenodd" />
          </svg>
        </span>
        <span class="ml-2 text-lg text-gray-700">{{ ingredient }}</span>
      </label>
    </div>
  </div>
</template>
  
  <script setup>
  import { ref, computed } from "vue";
  import { useRecipesStore } from "@/store/recipes";
  
  const store = useRecipesStore();

  const selectedIngredients = ref([]);
  
  const allIngredients = computed(() => {
  const allIngredientsList = new Set();
  store.recipes?.forEach((recipe) => {
    recipe.ingredients?.forEach((ingredient) => {
      if (ingredient?.name) {
        allIngredientsList.add(ingredient.name);
      }
    });
  });
  return Array.from(allIngredientsList);
});
  
  </script>
  
  <style scoped>
  input:checked + span {
    transform: scale(1.1);
  }
  </style>