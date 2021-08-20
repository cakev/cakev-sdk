import 'element-ui/lib/theme-chalk/index.css'
import '@/vue2/scss/index.scss'
import '@/vue2/scss/element-theme.scss'
import '@/icon'
import Editor from '@/vue2/components/editor/index.vue'

module.exports = {
	version: process.env.version,
	Editor,
}
