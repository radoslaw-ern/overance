<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import BaseButton from '@/components/BaseButton.vue'
import { useFormFieldsStore } from '@/stores/formFields'
import { type FormFieldValue, type FormField } from '@/types/formField'
import { numberOfFormFieldsMin, numberOfFormFieldsMax } from '@/utils/formFields'

const formFieldsStore = useFormFieldsStore()
const formModel = ref<FormField[]>([])
const searchPhrase = ref<string>('')
const isAddButtonAvailable = computed(() => formModel.value.length < numberOfFormFieldsMax)
const isDeleteButtonAvailable = computed(() => formModel.value.length > numberOfFormFieldsMin)

const addFormField = () => {
  if (formModel.value.length < numberOfFormFieldsMax) {
    const formFieldValue: FormFieldValue = ''

    formModel.value.push({
      value: formFieldValue,
      isSearchPhraseFound: validateFormField(formFieldValue),
      vowelCount: getVowelCount(formFieldValue)
    })

    formFieldsStore.addFormField(formFieldValue)
  }
}

const deleteFormFieldById = (formFieldId: number) => {
  if (formModel.value.length > numberOfFormFieldsMin) {
    formModel.value.splice(formFieldId, 1)
    formFieldsStore.deleteFormFieldById(formFieldId)
  }
}

const getVowelCount = (payload: FormFieldValue = ''): number => {
  const vowelRegex = /[aeioyu]/gi
  const vowelCount = payload.match(vowelRegex)

  if (vowelCount) {
    return vowelCount.length
  }

  return 0
}

const isSearchPhraseFound = computed((): boolean =>
  formModel.value.some((formField) => formField.isSearchPhraseFound)
)

const validateFormField = (payload: FormFieldValue = ''): boolean =>
  searchPhrase.value !== '' && payload.includes(searchPhrase.value)

const onFormFieldValueChange = (formFieldId: number, payload: FormFieldValue) => {
  formModel.value[formFieldId].vowelCount = getVowelCount(payload)
  formModel.value[formFieldId].isSearchPhraseFound = validateFormField(payload)

  formFieldsStore.updateFormFieldById(formFieldId, payload)
}

const performSearch = () => {
  formModel.value.map((formField) => {
    formField.isSearchPhraseFound = validateFormField(formField.value)

    return formField
  })
}

onMounted(() => {
  formModel.value = Array.from(
    formFieldsStore.formFieldsValues.map((formFieldValue) => ({
      value: formFieldValue,
      isSearchPhraseFound: validateFormField(formFieldValue),
      vowelCount: getVowelCount(formFieldValue)
    }))
  )
})
</script>

<template>
  <v-text-field
    label="Enter text to search the form"
    append-inner-icon="mdi-magnify"
    hide-details
    single-line
    v-model="searchPhrase"
    @input="performSearch"
    :class="['c-form__search', { 'c-form__search--success': isSearchPhraseFound }]"
  ></v-text-field>

  <v-divider class="mt-6 mb-3" />

  <v-form>
    <v-list>
      <v-list-item
        v-for="(formFieldValue, formFieldId) in formModel"
        :key="formFieldId"
        class="px-0"
      >
        <div class="d-flex">
          <v-text-field
            hide-details
            @input="onFormFieldValueChange(formFieldId, $event.target._value)"
            :class="[
              'c-form__input',
              { 'c-form__input--success': formModel[formFieldId].isSearchPhraseFound }
            ]"
            v-model="formModel[formFieldId].value"
          />
          <div class="pt-1 px-4 text-right">
            <p>Vowel count:</p>
            <span>{{ formModel[formFieldId].vowelCount }}</span>
          </div>
          <v-btn
            icon="mdi-delete"
            aria-label="Delete field"
            :disabled="!isDeleteButtonAvailable"
            class="c-form__delete-button"
            @click="deleteFormFieldById(formFieldId)"
          />
        </div>
      </v-list-item>
    </v-list>
  </v-form>

  <v-divider class="mt-3 mb-6" />

  <BaseButton
    :label="`Add new field`"
    :disabled="!isAddButtonAvailable"
    :color="isAddButtonAvailable ? 'primary' : 'disabled'"
    class="c-form__add-button"
    @click="addFormField"
  />
</template>
