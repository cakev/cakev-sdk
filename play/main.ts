import Vue from 'vue'
import App from './App.vue'
import router from './router'
import CakeUi from '@cakev/ui'
import CakeSDK from '@/index'

import cWidget from '@/vue2/components/c-widget/normal.vue'
Vue.component('c-widget', cWidget)

import './widget-business'
import '@cakev/ui/dist/ui.css'

Vue.use(CakeUi)
Vue.use(CakeSDK)
Vue.config.productionTip = false

new Vue({
	router,
	render: h => h(App),
}).$mount('#app')
