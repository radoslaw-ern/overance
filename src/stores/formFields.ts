import { ref } from 'vue'
import { defineStore } from 'pinia'
import { type FormField } from '@/types/formField'

const FIELDS_INIT = 3
const FIELDS_MIN = 1
const FIELDS_MAX = 10

export const useFormFieldsStore = defineStore('formFieldsStore', () => {
  const numberOfFields = ref<number>(FIELDS_INIT)
  const numberOfFieldsMin = ref<number>(FIELDS_MIN)
  const numberOfFieldsMax = ref<number>(FIELDS_MAX)
  const formFieldsValues = ref<FormField[]>(new Array<FormField>(FIELDS_INIT).fill(''))

  const addFormField = (payload: FormField) => {
    if (formFieldsValues.value.length < numberOfFieldsMax.value) {
      formFieldsValues.value.push(payload)
      numberOfFields.value = formFieldsValues.value.length
    }
  }

  const updateFormFieldById = (formFieldId: number, payload: FormField) => {
    formFieldsValues.value[formFieldId] = payload
  }

  const deleteFormFieldById = (formFieldId: number) => {
    formFieldsValues.value.splice(formFieldId, 1)
  }

  // const isDialogOpen = ref<boolean>(false)
  // const content = ref<Dialog>({} as Dialog)

  // const toggleDialog = (): void => {
  //   isDialogOpen.value = !isDialogOpen.value
  // }

  // const openDialog = (payload: Dialog): void => {
  //   content.value = payload
  //   isDialogOpen.value = true
  // }

  // const closeDialog = (): void => {
  //   isDialogOpen.value = false
  // }

  return {
    numberOfFields,
    numberOfFieldsMin,
    numberOfFieldsMax,
    formFieldsValues,
    addFormField,
    updateFormFieldById,
    deleteFormFieldById
  }
})
