<template>
  <div class="container mx-auto px-4 p-20">
    <h1 class="text-4xl font-bold text-gray-900 text-center mb-6">📌Все рецепты</h1>

    <!-- Фильтры -->
    <div class="flex flex-wrap justify-center gap-4 mb-8">
      <!-- Фильтр по категории -->
      <select v-model="selectedCategory" class="border p-2 rounded-lg shadow-md">
        <option value="">Все категории</option>
        <option v-for="category in categories" :key="category" :value="category">
          {{ category }}
        </option>
      </select>

      <!-- Кнопка открытия модального окна для выбора ингредиентов -->
      <button @click="showModal = true" class="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition">
        🥑 Выбрать ингредиенты
      </button>
    </div>

    <!-- Отображение выбранных ингредиентов -->
    <div v-if="selectedIngredients.length" class="flex flex-wrap justify-center gap-2 mb-6">
      <span v-for="ingredient in selectedIngredients" :key="ingredient" class="bg-green-200 text-green-800 px-3 py-1 rounded-full shadow-md">
        {{ ingredient }} ✖
      </span>
    </div>

    <!-- Список рецептов -->
    <div v-if="filteredRecipes.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <div
        v-for="recipe in filteredRecipes"
        :key="recipe.id"
        class="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1"
      >
        <img v-if="recipe.image" :src="recipe.image" alt="Recipe Image" class="w-full h-56 object-cover rounded-xl mb-4" />
        <h2 class="text-2xl font-bold text-gray-900 mb-1">{{ recipe.title }}</h2>
        <p class="text-gray-500 text-lg mb-3">
          Категория: <span class="font-semibold text-amber-600">{{ recipe.category }}</span>
        </p>
        <p v-if="recipe.carbs">Калории: {{ recipe.carbs }}</p>
        <p class="text-gray-700 text-base line-clamp-2">{{ recipe.description }}</p>

        <router-link :to="'/recipe/' + recipe.id" class="mt-4 inline-block bg-amber-500 text-white px-5 py-3 rounded-lg shadow-md hover:bg-amber-600 transition">
          Посмотреть →
        </router-link>
        <button @click="store.removeRecipe(recipe.id)" class="ml-4 bg-red-500 text-white px-3 py-2 rounded-lg">
          Удалить
        </button>
      </div>
    </div>

    <p v-else class="text-gray-600 text-center mt-10 text-xl">
      ❌ Нет рецептов, соответствующих фильтрам.
    </p>

    <!-- Модальное окно выбора ингредиентов -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 class="text-xl font-bold mb-4">Выберите ингредиенты</h2>
        
        <div class="grid grid-cols-2 gap-2 mb-4">
          <label v-for="ingredient in uniqueIngredients" :key="ingredient" class="flex items-center gap-2">
            <input type="checkbox" :value="ingredient" v-model="selectedIngredients" />
            {{ ingredient }}
          </label>
        </div>

        <div class="flex justify-end gap-3">
          <button @click="clearIngredients" class="bg-gray-300 px-4 py-2 rounded-lg">Очистить</button>
          <button @click="showModal = false" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Применить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRecipesStore } from '@/store/recipes'

const store = useRecipesStore()
const showModal = ref(false)

// Фильтры
const selectedCategory = ref('')
const selectedIngredients = ref([])
const selectedCalories = ref('')

// Получаем уникальные категории
const categories = computed(() => [...new Set(store.recipes.map((recipe) => recipe.category))])

// Получаем уникальные ингредиенты
const uniqueIngredients = computed(() => {
  return [...new Set(store.recipes.flatMap((recipe) => recipe.ingredients.map((ing) => ing.name)))]
})

// Фильтрация рецептов
const filteredRecipes = computed(() => {
  return store.recipes.filter((recipe) => {
    const categoryMatch = selectedCategory.value ? recipe.category === selectedCategory.value : true
    const ingredientMatch = selectedIngredients.value.length
      ? selectedIngredients.value.every((ingredient) => recipe.ingredients.some((ing) => ing.name === ingredient))
      : true
    const caloriesMatch = selectedCalories.value
      ? recipe.carbs && recipe.carbs <= parseInt(selectedCalories.value)
      : true

    return categoryMatch && ingredientMatch && caloriesMatch
  })
})

// Очистка выбора ингредиентов
const clearIngredients = () => {
  selectedIngredients.value = []
}
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
