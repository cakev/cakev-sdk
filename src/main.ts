import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vue3Widgets from './vue3-widgets'
import 'element-plus/lib/theme-chalk/index.css'
import '@/vue3/scss/index.scss'
import '@/vue3/scss/element-theme.scss'
import '@/vue3/scss/dorring.scss'
import '@/vue3/icon'

const app = createApp(App)

import ElementPlus from 'element-plus'

app.use(ElementPlus, { size: 'mini', zIndex: 3000, labelPosition: 'left' })
app.use(vue3Widgets)

app.use(router)
app.mount('#app')
