<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import GenericButton from '@/components/GenericButton.vue'
import { useFormFieldsStore } from '@/stores/formFields'
import { type FormField } from '@/types/formField'

const formFieldsStore = useFormFieldsStore()
const isAddButtonAvailable = ref<boolean>(true)
const formState = ref<FormField[]>([])

const formFieldsValues = computed(() => formFieldsStore.formFieldsValues)
const addFormField = () => {
  formFieldsStore.addFormField('')
}

const deleteFormFieldById = (formFieldId: number) => {
  formState.value.splice(formFieldId, 1)
  formFieldsStore.deleteFormFieldById(formFieldId)
}

const onFormFieldValueChange = (formFieldId: number, payload: FormField) => {
  console.log({ formFieldId, payload })
  formFieldsStore.updateFormFieldById(formFieldId, payload)
}

onMounted(() => {
  isAddButtonAvailable.value = true
  formState.value = Array.from(formFieldsStore.formFieldsValues)
})
</script>

<template>
  <h1>Manage your data</h1>

  <v-form>
    <v-list>
      <v-list-item v-for="(formFieldValue, formFieldId) in formFieldsValues" :key="formFieldId">
        <div class="d-flex">
          <v-text-field
            @input="onFormFieldValueChange(formFieldId, $event.target._value)"
            v-model="formState[formFieldId]"
          />
          <v-btn icon="mdi-delete" @click="deleteFormFieldById(formFieldId)" />
        </div>
      </v-list-item>
    </v-list>
  </v-form>
  <GenericButton :label="`Add new field`" :disabled="!isAddButtonAvailable" @click="addFormField" />
  <br>
  {{ formState }}
  <br />
  {{ formFieldsValues }}
</template>
