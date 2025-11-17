import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import flipped from '@/directives/flpped.ts'

const app = createApp(App)
app.directive('flipped', flipped)

app.mount('#app')
