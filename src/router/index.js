import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/components/views/Home.vue';
import RecipeView from '@/components/views/RecipeView.vue';
import FavoriteView from '@/components/views/Favorite.vue';
import SearchView from '@/components/views/SearchView.vue';
import Random from '@/components/views/Random.vue';
import AddRecipe from '@/components/AddRecipe.vue';
const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/recipe/:id', name: 'recipe', component: RecipeView, props: true },
  { path: '/random', name: 'random', component: Random},
  { path: '/favorites', name: 'favorites', component: FavoriteView },
  { path: '/search', name: 'search', component: SearchView},
  { path: '/addRecipe', name: 'add', component: AddRecipe}
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
