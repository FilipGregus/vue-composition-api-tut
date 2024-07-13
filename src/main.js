import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import mitt from 'mitt'

import './assets/css/trulo.css'

const app = createApp(App).use(router)


app.mount('#app')

window.eventBus = mitt()