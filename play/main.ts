import Vue from 'vue'
import App from './App.vue'
import CakeUi from '@cakev/ui'
import { Message, Modal } from 'view-design'
import router from './router'
import 'view-design/dist/styles/iview.css'
import '@/vue2/scss/conf.scss'
import '@/vue2/scss/index.scss'
import '@/vue2/scss/animate.min.scss'
import '@/vue2/scss/animate-widget.min.scss'

import sceneGroup from '@/vue2/components-base/d-left-scene/widget-group.vue'
import widgetGroup from '@/vue2/components-base/d-widget/group.vue'
import widgetNormal from '@/vue2/components-base/d-widget/normal.vue'
import widget from '@/vue2/components-base/d-widget/index.vue'
Vue.component('scene-group', sceneGroup)
Vue.component('cakev-group', widgetGroup)
Vue.component('cakev-normal', widgetNormal)
Vue.component('cakev-widget', widget)
import './components-business'
import '@cakev/ui/dist/ui.css'

Vue.use(CakeUi)
Vue.prototype.$Message = Message
Vue.prototype.$Modal = Modal
Vue.config.productionTip = false

new Vue({
	router,
	render: h => h(App),
}).$mount('#app')
