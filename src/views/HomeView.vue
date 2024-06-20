<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue'
</script>

<template>
  <h1 class="pb-6">Welcome</h1>
  <p class="pb-6">
    This is a Vue3 app, it was build using Vuetify framework. Please go ahead and check the custom
    form by clicking the button below.
  </p>
  <BaseButton :label="`Go to the custom form`" :to="`/custom-form`" />
</template>
