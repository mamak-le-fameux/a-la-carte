<template>
  <q-page padding>
    <div class="text-h6 q-mb-md">{{ isEdit ? 'Edit recipe' : 'New recipe' }}</div>

    <q-form @submit="submit" class="q-gutter-md">
      <q-input
        v-model="form.name"
        label="Recipe name *"
        outlined
        :rules="[(v) => !!v || 'Name is required']"
      />

      <q-input
        v-model="form.description"
        label="Description"
        outlined
        type="textarea"
        autogrow
      />

      <q-input
        v-model.number="form.duration"
        label="Duration (minutes)"
        outlined
        type="number"
        min="1"
      />

      <div>
        <div class="text-subtitle2 q-mb-sm">Ingredients</div>
        <div
          v-for="(ingredient, i) in form.ingredients"
          :key="i"
          class="row q-gutter-sm q-mb-sm items-center"
        >
          <q-input
            v-model="ingredient.name"
            label="Name"
            outlined
            dense
            class="col"
          />
          <q-input
            v-model="ingredient.quantity"
            label="Quantity"
            outlined
            dense
            class="col-4"
          />
          <q-btn flat round icon="delete" color="negative" @click="removeIngredient(i)" />
        </div>
        <q-btn flat icon="add" label="Add ingredient" color="primary" @click="addIngredient" />
      </div>

      <div class="row justify-end q-gutter-sm">
        <q-btn flat label="Cancel" to="/" />
        <q-btn type="submit" :label="isEdit ? 'Save changes' : 'Save recipe'" color="primary" />
      </div>
    </q-form>
  </q-page>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useRecipeStore } from '../stores/recipes'
import type { Ingredient } from '../stores/recipes'

const store = useRecipeStore()
const router = useRouter()
const route = useRoute()

const id = route.params.id as string | undefined
const isEdit = computed(() => !!id)
const existing = id ? store.recipes.find((r) => r.id === id) : undefined

const form = reactive({
  name: existing?.name ?? '',
  description: existing?.description ?? '',
  duration: existing?.duration ?? undefined as number | undefined,
  ingredients: existing?.ingredients.map((i) => ({ ...i })) ?? [] as Ingredient[],
})

function addIngredient() {
  form.ingredients.push({ name: '', quantity: '' })
}

function removeIngredient(i: number) {
  form.ingredients.splice(i, 1)
}

function submit() {
  const data = {
    name: form.name,
    ingredients: form.ingredients.filter((ing) => ing.name),
    ...(form.description ? { description: form.description } : {}),
    ...(form.duration ? { duration: form.duration } : {}),
  }

  if (isEdit.value && id) {
    store.update(id, data)
  } else {
    store.add(data)
  }

  void router.push('/')
}
</script>
