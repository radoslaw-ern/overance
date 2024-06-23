<script setup lang="ts">
import { type BaseCounter } from '@/types/baseCounter'

const props = withDefaults(defineProps<BaseCounter>(), {
  count: 0
})
</script>

<template>
  <div class="c-counter">
    <p v-if="label" class="c-counter__label">{{ props.label }}</p>
    <p class="c-counter__count text-right">{{ props.count }}</p>
  </div>
</template>
