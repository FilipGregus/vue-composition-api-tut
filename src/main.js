import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import mitt from 'mitt'

import { createPinia } from 'pinia';

import './assets/css/trulo.css'

const pinia = createPinia();

const app = createApp(App).use(router).use(pinia)


app.mount('#app')

window.eventBus = mitt()