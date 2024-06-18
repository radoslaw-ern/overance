import './styles/index.scss'
import 'vuetify/styles'
import scssColors from './styles/variables/_colors.scss?inline'
import { scssVarsToVuetifyColors } from '@/services/useScssVars'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVuetify, type ThemeDefinition } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import App from './App.vue'
import router from './router'

const customTheme: ThemeDefinition = {
  dark: true,
  colors: scssVarsToVuetifyColors(scssColors) as object
}

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'customTheme',
    themes: { customTheme }
  }
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')
