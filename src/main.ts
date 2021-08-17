import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import '@/vue2/scss/index.scss'
import 'element-ui/lib/theme-chalk/index.css'
// @ts-ignore
import VueCompositionAPI from '@vue/composition-api'
import dInput from '@/vue2/components-style/d-input/index.vue'
import dImg from '@/vue2/components-style/d-img/index.vue'
import dDragContent from '@/vue2/components-style/d-drag-content/index.vue'

Vue.component('d-input', dInput)
Vue.component('d-img', dImg)
Vue.component('d-drag-content', dDragContent)
Vue.use(ElementUI)
Vue.prototype.$ELEMENT = { size: 'mini', zIndex: 3000 }
Vue.config.productionTip = false
Vue.use(VueCompositionAPI)
new Vue({
	router,
	render: h => h(App),
}).$mount('#app')
