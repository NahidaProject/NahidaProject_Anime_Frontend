import { createApp } from 'vue'
import './style.scss'
import * as bootstrap from 'bootstrap'
import App from './App.vue'

const app = createApp(App)
app.use(bootstrap)
app.mount('#app')