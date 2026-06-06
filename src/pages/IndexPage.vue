<template>
  <q-page padding>
    <q-input
      v-model="search"
      placeholder="Search recipes..."
      outlined
      dense
      clearable
      class="q-mb-md"
    >
      <template #prepend><q-icon name="search" /></template>
    </q-input>

    <q-list separator bordered rounded v-if="filtered.length">
      <q-item
        v-for="recipe in filtered"
        :key="recipe.id"
        clickable
        v-ripple
        :to="`/recipes/${recipe.id}`"
      >
        <q-item-section>
          <q-item-label>{{ recipe.name }}</q-item-label>
          <q-item-label caption v-if="recipe.duration || recipe.description">
            <span v-if="recipe.duration">{{ recipe.duration }} min</span>
            <span v-if="recipe.duration && recipe.description"> · </span>
            <span v-if="recipe.description">{{ recipe.description }}</span>
          </q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon name="chevron_right" color="grey" />
        </q-item-section>
      </q-item>
    </q-list>

    <div v-else class="text-center text-grey q-mt-xl">
      <q-icon name="restaurant_menu" size="4rem" color="grey-4" />
      <div class="q-mt-sm">{{ search ? 'No recipes match' : 'No recipes yet' }}</div>
    </div>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="primary" to="/recipes/new" />
    </q-page-sticky>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRecipeStore } from '../stores/recipes'

const store = useRecipeStore()
const search = ref('')

const filtered = computed(() => {
  const q = search.value.trim().toLowerCase()
  if (!q) return store.recipes
  return store.recipes.filter((r) => r.name.toLowerCase().includes(q))
})
</script>
