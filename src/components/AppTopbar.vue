<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const isBackButtonAvailable = ref<boolean>(false)

watch(route, (to) => {
  isBackButtonAvailable.value = to.path !== '/'
})

const onRedirect = () => {
  const uriSegments = route.path.split('/')

  if (uriSegments.length > 2) {
    uriSegments.pop()
    router.push(`${uriSegments.join('/')}`)
  } else {
    router.push('/')
  }
}
</script>

<template>
  <v-app-bar class="c-topbar">
    <v-btn
      v-if="isBackButtonAvailable"
      class="ml-4 mr-0"
      icon="mdi-arrow-left"
      aria-label="Go back"
      @click="onRedirect()"
    />
    <v-app-bar-title :class="[`ml-${isBackButtonAvailable ? '0' : '16'}`, 'mr-16', 'text-center']">
      <span v-if="isBackButtonAvailable">
        {{ route.name }}
      </span>
      <img v-else src="@/assets/images/app-logo.png" alt="Overance logo" class="c-topbar__logo" />
    </v-app-bar-title>
  </v-app-bar>
</template>
