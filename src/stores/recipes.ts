import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Ingredient {
  name: string
  quantity: string
}

export interface Recipe {
  id: string
  name: string
  ingredients: Ingredient[]
  description?: string
  duration?: number
  createdAt: string
}

export const useRecipeStore = defineStore('recipes', () => {
  const recipes = ref<Recipe[]>(load())

  function load(): Recipe[] {
    try {
      return JSON.parse(localStorage.getItem('recipes') ?? '[]') as Recipe[]
    } catch {
      return []
    }
  }

  function persist() {
    localStorage.setItem('recipes', JSON.stringify(recipes.value))
  }

  function add(data: Omit<Recipe, 'id' | 'createdAt'>) {
    recipes.value.push({
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    })
    persist()
  }

  function update(id: string, data: Omit<Recipe, 'id' | 'createdAt'>) {
    const idx = recipes.value.findIndex((r) => r.id === id)
    if (idx !== -1) {
      recipes.value[idx] = { ...recipes.value[idx]!, ...data }
      persist()
    }
  }

  function remove(id: string) {
    recipes.value = recipes.value.filter((r) => r.id !== id)
    persist()
  }

  return { recipes, add, update, remove }
})
