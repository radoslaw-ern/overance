<script setup lang="ts">
import { type GenericButton, GenericButtonType } from '@/types/genericButton'

const props = withDefaults(defineProps<GenericButton>(), {
  type: GenericButtonType.PRIMARY,
  disabled: false
})
</script>

<template>
  <v-btn
    :to="props?.to || ``"
    :color="props.type"
    :class="['c-button', { 'c-button--disabled': props.disabled }]"
    :disabled="props.disabled"
  >
    <v-icon v-if="props.icon" class="c-button__icon mr-3">{{ props.icon }}</v-icon>
    {{ props.label }}
  </v-btn>
</template>
