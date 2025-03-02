<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    <div v-for="recipe in recipes" :key="recipe.id" class="bg-white rounded-lg shadow-md overflow-hidden">
      <img :src="recipe.image" :alt="recipe.title" class="w-full h-48 object-cover" />
      <div class="p-4">
        <h2 class="text-lg font-bold mb-2">{{ recipe.title }}</h2>
        <router-link :to="'/recipe/' + recipe.id" class="text-amber-500 hover:underline">
          Подробнее →
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  recipes: Array
});
</script>
