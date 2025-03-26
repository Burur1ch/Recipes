<template>
  <div class="container mx-auto px-4 p-20 h-screen">
    <h1 class="text-4xl font-bold text-gray-900 text-center mb-6">📌Все рецепты</h1>


    <div class="flex flex-wrap justify-center gap-4 mb-8">

      <select v-model="selectedCategory" class="border p-2 rounded-lg shadow-md">
        <option value="">Все категории</option>
        <option v-for="category in categories" :key="category" :value="category">
          {{ category }}
        </option>
      </select>


      <button @click="showModal = true" class="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition">
        🥑 Выбрать ингредиенты
      </button>
    </div>


    <div v-if="selectedIngredients.length" class="flex flex-wrap justify-center gap-2 mb-6">
      <span v-for="ingredient in selectedIngredients" :key="ingredient" class="bg-green-200 text-green-800 px-3 py-1 rounded-full shadow-md">
        {{ ingredient }} ✖
      </span>
    </div>


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
        <p class="text-gray-700 text-base line-clamp-2">{{ recipe.description }}</p>

        <router-link :to="'/recipe/' + recipe.id" class="mt-4 inline-block bg-amber-500 text-white px-5 py-3 rounded-lg shadow-md hover:bg-amber-600 transition">
          Посмотреть →
        </router-link>
        <button @click="store.removeRecipe(recipe.id)" class="ml-4 bg-red-500 text-white px-3 py-2 rounded-lg">
          Удалить
        </button>
      </div>
    </div>

    <div v-if="isLoading" class="flex justify-center items-center mt-10">
      <span class="loader"></span>
    </div>

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
import { ref, computed, onMounted } from 'vue'
import { useRecipesStore } from '@/store/recipes'

const isLoading = ref()
const store = useRecipesStore()
const showModal = ref(false)
const selectedCategory = ref('')
const selectedIngredients = ref([])
const categories = computed(() => [...new Set(store.recipes.map((recipe) => recipe.category))])

const uniqueIngredients = computed(() => {
  return [...new Set(store.recipes.flatMap((recipe) => recipe.ingredients.map((ing) => ing.name)))]
})

const filteredRecipes = computed(() => {
  return store.recipes.filter((recipe) => {
    const categoryMatch = selectedCategory.value ? recipe.category === selectedCategory.value : true
    const ingredientMatch = selectedIngredients.value.length
      ? selectedIngredients.value.every((ingredient) => recipe.ingredients.some((ing) => ing.name === ingredient))
      : true

    return categoryMatch && ingredientMatch
  })
})
onMounted(() => {
  setTimeout(()=>{
    store.loadRecipes()
    isLoading.value = false
  },1500)
})

const clearIngredients = () => {
  selectedIngredients.value = []
}
</script>

<style scoped>

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.loader {
  color: #ff0000;
  font-size: 45px;
  text-indent: -9999em;
  overflow: hidden;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  position: relative;
  transform: translateZ(0);
  animation: mltShdSpin 1.7s infinite ease, round 1.7s infinite ease;
  z-index: 10;
}

@keyframes mltShdSpin {
  0% {
    box-shadow: 0 -0.83em 0 -0.4em,
    0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em,
    0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
  }
  5%,
  95% {
    box-shadow: 0 -0.83em 0 -0.4em, 
    0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 
    0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
  }
  10%,
  59% {
    box-shadow: 0 -0.83em 0 -0.4em, 
    -0.087em -0.825em 0 -0.42em, -0.173em -0.812em 0 -0.44em, 
    -0.256em -0.789em 0 -0.46em, -0.297em -0.775em 0 -0.477em;
  }
  20% {
    box-shadow: 0 -0.83em 0 -0.4em, -0.338em -0.758em 0 -0.42em,
     -0.555em -0.617em 0 -0.44em, -0.671em -0.488em 0 -0.46em, 
     -0.749em -0.34em 0 -0.477em;
  }
  38% {
    box-shadow: 0 -0.83em 0 -0.4em, -0.377em -0.74em 0 -0.42em,
     -0.645em -0.522em 0 -0.44em, -0.775em -0.297em 0 -0.46em, 
     -0.82em -0.09em 0 -0.477em;
  }
  100% {
    box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 
    0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
  }
}

@keyframes round {
  0% { transform: rotate(0deg) }
  100% { transform: rotate(360deg) }
}
 
</style>