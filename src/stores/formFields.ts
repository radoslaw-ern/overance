import { ref } from 'vue'
import { defineStore } from 'pinia'
import { type FormFieldValue } from '@/types/formField'
import { numberOfFormFieldsInit, numberOfFormFieldsMax } from '@/utils/formFields'

export const useFormFieldsStore = defineStore('formFieldsStore', () => {
  const formFieldsValues = ref<FormFieldValue[]>(
    new Array<FormFieldValue>(numberOfFormFieldsInit).fill('')
  )

  const addFormField = (payload: FormFieldValue) => {
    if (formFieldsValues.value.length < numberOfFormFieldsMax) {
      formFieldsValues.value.push(payload)
    }
  }

  const updateFormFieldById = (formFieldId: number, payload: FormFieldValue) => {
    formFieldsValues.value[formFieldId] = payload
  }

  const deleteFormFieldById = (formFieldId: number) => {
    formFieldsValues.value.splice(formFieldId, 1)
  }

  return {
    formFieldsValues,
    addFormField,
    updateFormFieldById,
    deleteFormFieldById
  }
})
