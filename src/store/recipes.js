import { defineStore } from "pinia";
import supabase from "@/superbase";

export const useRecipesStore = defineStore("recipes", {
  state: () => ({
    recipes: [],
    selectedIngredients: [],
  }),
  actions: {
    async addRecipe(recipe) {
      const { data, error } = await supabase
        .from('recipes')
        .insert([{
          title: recipe.title,
          image: recipe.image,
          category: recipe.category,
          ingredients: JSON.stringify(recipe.ingredients), // Проверяем JSON
          description: recipe.description,
        }])
        .select("*");
    
      if (error) {
        console.error("Ошибка при добавлении рецепта:", error);
        return;
      }
    
      if (data && data.length > 0) {
        this.recipes.push(data[0]);
      }
    },    
    async loadRecipes() {
      const { data, error } = await supabase.from('recipes').select('*');
    
      if (error) {
        console.error("Ошибка загрузки:", error);
        return;
      }   
      this.recipes = data.map(recipe => ({
        ...recipe,
        ingredients: typeof recipe.ingredients === "string"
          ? JSON.parse(recipe.ingredients) 
          : recipe.ingredients
      }));
    
    },
    async removeRecipe(id) {
      const { error } = await supabase
        .from('recipes')
        .delete()
        .eq('id', id);

      if (error) {
        console.error("Ошибка при удалении рецепта:", error);
        return;
      }
      this.recipes = this.recipes.filter((item) => item.id !== id);
    },
  },
});
