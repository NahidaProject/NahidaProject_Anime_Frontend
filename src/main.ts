import { createApp } from 'vue'
import router from './router/router'
import App from './App.vue'
import './css/resetcss.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

const app = createApp(App)
app.use(router)
app.mount('#app')
