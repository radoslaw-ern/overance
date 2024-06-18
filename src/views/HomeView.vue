<script setup lang="ts">
import GenericButton from '@/components/GenericButton.vue'
</script>

<template>
  <h1>Welcome</h1>
  <p>
    This is a Vue3 app, it was build using Vuetify framework. Please go ahead and check the custom
    form by clicking the button below.
  </p>
  <GenericButton :label="`Go to the custom form`" :to="`/custom-form`" />
</template>
