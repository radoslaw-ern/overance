import { describe, beforeAll, it, expect } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import CustomForm from '../CustomForm.vue'

import {
  numberOfFormFieldsInit,
  numberOfFormFieldsMin,
  numberOfFormFieldsMax
} from '@/utils/formFields'

const store = createTestingPinia()
const vuetify = createVuetify({
  components,
  directives
})

describe('CustomForm', () => {
  let wrapper: VueWrapper

  beforeAll(() => {
    wrapper = mount(CustomForm, {
      global: {
        plugins: [store, vuetify]
      }
    })
  })

  it('renders properly', async () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('has the correct number of form fields initially', () => {
    const formFields = wrapper.findAll('.c-form__input')

    expect(formFields.length).toBe(numberOfFormFieldsInit)
  })

  it('adds a form field when the "Add new field" button is clicked', async () => {
    const addButton = wrapper.find('.c-form__add-button')
    await addButton.trigger('click')
    const formFields = wrapper.findAll('.c-form__input')

    expect(formFields.length).toBe(numberOfFormFieldsInit + 1)
  })

  it('does not add a form field when the number of fields is already at the maximum', async () => {
    const addButton = wrapper.find('.c-form__add-button')
    for (let i = 0; i < numberOfFormFieldsMax + 1; i++) {
      await addButton.trigger('click')
    }
    const formFields = wrapper.findAll('.c-form__input')

    expect(formFields.length).toBe(numberOfFormFieldsMax)
  })

  it('removes a form field when the "Delete" button is clicked', async () => {
    const formFieldsBeforeDelete = wrapper.findAll('.c-form__input')
    const deleteButton = wrapper.find('.c-form__delete-button')
    await deleteButton.trigger('click')
    const formFieldsAfterDelete = wrapper.findAll('.c-form__input')

    expect(formFieldsAfterDelete.length).toBe(formFieldsBeforeDelete.length - 1)
  })

  it('does not remove a form field when the number of fields is already at the minimum', async () => {
    const deleteButton = wrapper.find('.c-form__delete-button')
    for (let i = 0; i < numberOfFormFieldsMax; i++) {
      await deleteButton.trigger('click')
    }
    const formFields = wrapper.findAll('.c-form__input')

    expect(formFields.length).toBe(numberOfFormFieldsMin)
  })

  it('changes the background color of both Search field and Input field when the search phrase is found', async () => {
    const searchPhrase = 'Test string'
    const formSearch = wrapper.find('.c-form__search')
    const formSearchInput = wrapper.find('.c-form__search input')
    const formField = wrapper.find('.c-form__input')
    const formFieldInput = wrapper.find('.c-form__input input')

    await formFieldInput.setValue(searchPhrase)
    await formSearchInput.setValue(searchPhrase)

    expect(formSearch.classes()).toContain('c-form__search--success')
    expect(formField.classes()).toContain('c-form__input--success')
  })
})
