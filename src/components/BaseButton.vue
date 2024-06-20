<script setup lang="ts">
import { type BaseButton, BaseButtonType } from '@/types/baseButton'

const props = withDefaults(defineProps<BaseButton>(), {
  type: BaseButtonType.PRIMARY,
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
