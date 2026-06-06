<template>
  <q-page padding>
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
            :rules="[(v) => !!v || 'Required']"
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
        <q-btn type="submit" label="Save recipe" color="primary" />
      </div>
    </q-form>
  </q-page>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useRecipeStore } from '../stores/recipes'
import type { Ingredient } from '../stores/recipes'

const store = useRecipeStore()
const router = useRouter()

const form = reactive({
  name: '',
  description: '',
  duration: undefined as number | undefined,
  ingredients: [] as Ingredient[],
})

function addIngredient() {
  form.ingredients.push({ name: '', quantity: '' })
}

function removeIngredient(i: number) {
  form.ingredients.splice(i, 1)
}

function submit() {
  store.add({
    name: form.name,
    description: form.description || undefined,
    duration: form.duration || undefined,
    ingredients: form.ingredients.filter((ing) => ing.name),
  })
  void router.push('/')
}
</script>
