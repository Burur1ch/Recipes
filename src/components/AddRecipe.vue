<template>
  <div
    class="bg-gradient-to-br from-green-200 to-amber-100 min-h-screen flex items-center justify-center p-10"
  >
    <div
      class="max-w-2xl w-full bg-white p-8 rounded-2xl shadow-lg mt-16"
    >
      <h2 class="text-2xl font-bold mb-4">Добавить рецепт</h2>

      <form @submit.prevent="addNewRecipe">
        <div class="mb-4">
          <label class="block font-semibold">Название рецепта:</label>
          <input v-model="title" type="text" class="w-full p-2 border rounded-md" required />
        </div>

        <div class="mb-4">
          <label class="block font-semibold">Картинка:</label>
          <input
            type="file"
            @change="handleImageUpload"
            class="w-full p-2 border rounded-md"
            accept="image/*"
          />
          <img v-if="imagePreview" :src="imagePreview" class="mt-2 max-h-40 rounded-md" />
        </div>

        <div class="mb-4">
          <label class="block font-semibold">Категория:</label>
          <select v-model="category" class="w-full p-2 border rounded-md">
            <option disabled value="">Выберите категорию</option>
            <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
          </select>
        </div>

        <div class="mb-4">
          <label class="block font-semibold">Ингредиенты:</label>
          <div v-for="(ing, index) in ingredients" :key="index" class="flex gap-2 mb-2">
            <input
              v-model="ing.name"
              type="text"
              placeholder="Название"
              class="p-2 border rounded-md w-1/3"
            />
            <input
              v-model="ing.amount"
              type="number"
              placeholder="Кол-во"
              class="p-2 border rounded-md w-1/4"
            />
            <select v-model="ing.unit" class="p-2 border rounded-md w-1/4">
              <option value="г">грамм(ы)</option>
              <option value="мл">мл</option>
              <option value="шт">штук(и)</option>
              <option value="ложка">ст.л</option>
              <option value="ч. ложка">ч.ложка</option>
            </select>
            <button @click="removeIngredient(index)" type="button" class="text-red-500">❌</button>
          </div>
          <button @click="addIngredient" type="button" class="text-amber-500">
            ➕ Добавить ингредиент
          </button>
        </div>


        <div class="mb-4">
          <label class="block font-semibold">Описание:</label>
          <textarea v-model="description" class="w-full p-2 border rounded-md" rows="3"></textarea>
        </div>

        <button
          type="submit"
          class="bg-amber-500 text-white px-4 py-2 rounded-md hover:bg-amber-600"
        >
          Добавить рецепт
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRecipesStore } from '@/store/recipes'

const store = useRecipesStore()

const title = ref('')
const image = ref(null)
const imagePreview = ref('')
const category = ref('')
const description = ref('')
const ingredients = ref([{ name: '', amount: '', unit: 'г' }])


const categories = ['Завтраки', 'Обеды', 'Ужины', 'Десерты', 'Закуски', 'Напитки']

const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      imagePreview.value = e.target.result
      image.value = file
    }
    reader.readAsDataURL(file)
  }
}

const addIngredient = () => {
  ingredients.value.push({ name: '', amount: '', unit: 'г' })
}

const removeIngredient = (index) => {
  ingredients.value.splice(index, 1)
}

const addNewRecipe = () => {
  if (!title.value.trim() || !category.value || ingredients.value.length === 0) return

  const newRecipe = {
    id: Date.now(),
    title: title.value,
    image: imagePreview.value || null,
    category: category.value,
    ingredients: ingredients.value,
    description: description.value,
  }

  store.addRecipe(newRecipe)

  title.value = ''
  image.value = null
  imagePreview.value = ''
  category.value = ''
  ingredients.value = [{ name: '', amount: '', unit: 'г' }]
  description.value = ''
}
</script>