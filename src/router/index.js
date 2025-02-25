import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/components/views/HomeView.vue';
import RecipeView from '@/components/views/RecipeView.vue';
import FavoriteView from '@/components/views/FavoriteView.vue';
const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/recipe/:id', name: 'recipe', component: RecipeView, props: true },
  { path: '/favorites', name: 'favorites', component: FavoriteView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
