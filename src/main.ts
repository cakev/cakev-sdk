import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/vue2/scss/index.scss'
import '@/vue2/scss/element-theme.scss'
import './icon'
// @ts-ignore
import VueCompositionAPI from '@vue/composition-api'
import dInput from '@/vue2/components-style/d-input/index.vue'
import dImg from '@/vue2/components-style/d-img/index.vue'
import dSvg from '@/vue2/components-style/d-svg/index.vue'
import dIcon from '@/vue2/components-style/d-icon/index.vue'
import dColor from '@/vue2/components-style/d-color/index.vue'
import dTitles from '@/vue2/components-style/d-titles/index.vue'
import dDragContent from '@/vue2/components-style/d-drag-content/index.vue'
import dContextmenu from '@/vue2/components-style/d-contextmenu/index.vue'
import dSettingContainer from '@/vue2/components-style/d-setting-container/index.vue'
import group from '@/vue2/components/widget/group.vue'
import normal from '@/vue2/components/widget/normal.vue'
import widget from '@/vue2/components/widget/index.vue'
import layerGroup from '@/vue2/components/widget-layer/group.vue'
import layerNormal from '@/vue2/components/widget-layer/normal.vue'
import layerWidget from '@/vue2/components/widget-layer/index.vue'
import ClickOutside from 'vue-click-outside'

Vue.directive('click-outside', ClickOutside)
Vue.component('dorring-widget-group', group)
Vue.component('dorring-widget', widget)
Vue.component('dorring-widget-normal', normal)
Vue.component('dorring-widget-layer-group', layerGroup)
Vue.component('dorring-widget-layer', layerWidget)
Vue.component('dorring-widget-layer-normal', layerNormal)

Vue.component('d-input', dInput)
Vue.component('d-img', dImg)
Vue.component('d-svg', dSvg)
Vue.component('d-icon', dIcon)
Vue.component('d-color', dColor)
Vue.component('d-titles', dTitles)
Vue.component('d-drag-content', dDragContent)
Vue.component('d-setting-container', dSettingContainer)
Vue.component('d-contextmenu', dContextmenu)
Vue.use(ElementUI)
Vue.prototype.$ELEMENT = { size: 'mini', zIndex: 3000, labelPosition: 'left' }
Vue.config.productionTip = false
Vue.use(VueCompositionAPI)
new Vue({
	router,
	render: h => h(App),
}).$mount('#app')
