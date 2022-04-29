import Vue from 'vue'
import App from './App.vue'
import CakeUi from '@cakev/ui'
import { Message, Modal } from 'view-design'
import router from './router'
import '@/vue2/index.js'
import '@/demo/components-business'
import '@cakev/ui/dist/ui.css'

Vue.use(CakeUi)
Vue.prototype.$Message = Message
Vue.prototype.$Modal = Modal
Vue.config.productionTip = false

new Vue({
	router,
	render: h => h(App),
}).$mount('#app')
