<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppTopbar from '@/components/AppTopbar.vue'
import scssVars from './styles/variables/_global.scss?inline'
import { scssVarsToJSON } from './services/useScssVars'
import { type responsiveMain } from '@/types/responsiveMain'

const mainMaxWidth = (scssVarsToJSON(scssVars) as object as responsiveMain)['main-max-width']
</script>

<template>
  <v-app>
    <AppTopbar />
    <v-main class="e-main">
      <v-responsive :max-width="mainMaxWidth" class="e-main__container">
        <RouterView />
      </v-responsive>
    </v-main>
  </v-app>
</template>
