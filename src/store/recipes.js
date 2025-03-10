import { defineStore } from "pinia";

export const useRecipesStore = defineStore("recipes", {
  state: () => ({
    recipes: JSON.parse(localStorage.getItem("recipes")) || [],
    selectedIngredients: [],
  }),
  actions: {
    addRecipe(recipe) {
      this.recipes.push(recipe);
      localStorage.setItem("recipes", JSON.stringify(this.recipes));
    },
    setSelectedIngredients(ingredients) {
      this.selectedIngredients = ingredients;
    },
    getFilteredRecipes() {
      if (this.selectedIngredients.length === 0) return this.recipes;
      return this.recipes.filter((recipe) =>
        recipe.ingredients.some((ing) => this.selectedIngredients.includes(ing.name))
      );
    },
    removeRecipe(id) {
      this.recipes = this.recipes.filter(item => item.id !== id);
      localStorage.setItem("recipes", JSON.stringify(this.recipes));
    }
  },
});
