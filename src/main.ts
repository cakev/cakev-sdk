import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vue3Widgets from './vue3-widgets'
import 'element-plus/lib/theme-chalk/index.css'
import '@/vue3/scss/index.scss'
import '@/vue3/scss/element-theme.scss'
import '@/icon'
import colorPicker from 'vue3-colorpicker'
import 'vue3-colorpicker/bundle.css'
import ElementPlus from 'element-plus'
import dInput from '@/vue3/components-style/d-input/index.vue'
import dImg from '@/vue3/components-style/d-img/index.vue'
import dSvg from '@/vue3/components-style/d-svg/index.vue'
import dIcon from '@/vue3/components-style/d-icon/index.vue'
import dColor from '@/vue3/components-style/d-color/index.vue'
import dTitles from '@/vue3/components-style/d-titles/index.vue'
import dDragContent from '@/vue3/components-style/d-drag-content/index.vue'
import dContextmenu from '@/vue3/components-style/d-contextmenu/index.vue'
import dSettingContainer from '@/vue3/components-style/d-setting-container/index.vue'
import group from '@/vue3/components/widget/group.vue'
import normal from '@/vue3/components/widget/normal.vue'
import widget from '@/vue3/components/widget/index.vue'
import layerGroup from '@/vue3/components/widget-layer/group.vue'
import layerNormal from '@/vue3/components/widget-layer/normal.vue'
import layerWidget from '@/vue3/components/widget-layer/index.vue'

const app = createApp(App)
app.component('dorring-widget-group', group)
app.component('dorring-widget', widget)
app.component('dorring-widget-normal', normal)
app.component('dorring-widget-layer-group', layerGroup)
app.component('dorring-widget-layer', layerWidget)
app.component('dorring-widget-layer-normal', layerNormal)

app.component('d-input', dInput)
app.component('d-img', dImg)
app.component('d-svg', dSvg)
app.component('d-icon', dIcon)
app.component('d-color', dColor)
app.component('d-titles', dTitles)
app.component('d-drag-content', dDragContent)
app.component('d-setting-container', dSettingContainer)
app.component('d-contextmenu', dContextmenu)
app.use(ElementPlus, { size: 'mini', zIndex: 3000, labelPosition: 'left' })
app.use(vue3Widgets)
app.use(colorPicker)

app.use(router)
app.mount('#app')
