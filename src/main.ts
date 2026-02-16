import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import { createPinia } from 'pinia'
import { vClickOutside } from './directives/clickOutside'
import './styles/tailwind.css'



const app = createApp(App)
app.use(createPinia())
app.use(router)
app.directive('click-outside', vClickOutside)
app.mount('#app')