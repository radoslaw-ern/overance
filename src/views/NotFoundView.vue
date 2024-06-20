<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue'
</script>

<template>
  <h1 class="pb-6">Page not found</h1>
  <p class="pb-6">
    Looks like this page is missing. Don't worry, you can still go back to the homepage and start
    from there.
  </p>
  <BaseButton :label="`Go back to the Homepage`" :to="`/`" />
</template>
