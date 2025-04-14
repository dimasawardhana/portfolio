import './assets/main.css'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createGtm } from '@gtm-support/vue-gtm'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(
  createGtm({
    id: 'G-R9YW49PE9Q',
    defer: true,
    compatibility: false,
    enabled: true,
    debug: false,
    loadScript: true,
    vueRouter: router,
    trackOnNextTick: false,
  }),
)

app.mount('#app')
