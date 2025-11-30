import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import uindow from 'uindow'
import 'uindow/style'
import './styles/index.scss'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(uindow)
app.mount('#app')