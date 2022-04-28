import Vue from 'vue'
import App from './App.vue'
import { Message, Modal } from 'view-design'
import router from './router'
import '@/vue2/index.js'
import '@/demo/components-business'

Vue.prototype.$Message = Message
Vue.prototype.$Modal = Modal
Vue.config.productionTip = false

new Vue({
	router,
	render: h => h(App),
}).$mount('#app')
