import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useIngredientStore = defineStore('ingredients', () => {
  const names = ref<string[]>(load())

  function load(): string[] {
    try {
      return JSON.parse(localStorage.getItem('ingredient-names') ?? '[]') as string[]
    } catch {
      return []
    }
  }

  function persist() {
    localStorage.setItem('ingredient-names', JSON.stringify(names.value))
  }

  function sync(incoming: string[]) {
    let changed = false
    for (const name of incoming) {
      const n = name.trim()
      if (n && !names.value.includes(n)) {
        names.value.push(n)
        changed = true
      }
    }
    if (changed) {
      names.value.sort((a, b) => a.localeCompare(b))
      persist()
    }
  }

  return { names, sync }
})
