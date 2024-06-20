<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue'
</script>

<template>
  <h1 class="pb-6">Welcome</h1>
  <p class="pb-4">
    This is a Vue web application providing a custom form. The fields can be added and deleted with
    some predefined limitations. The app also provides a search functionality, and a vowel count for
    each field.
  </p>
  <p class="pb-4">
    Your data will be saved in the Pinia store, so you can leave the form and come back later. The
    data will be there until you close the browser or refresh the page.
  </p>
  <p class="pb-6">Please go ahead and check the custom form by clicking the button below.</p>
  <BaseButton :label="`Go to the custom form`" :to="`/custom-form`" />
</template>
