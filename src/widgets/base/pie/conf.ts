import conf from '@/core/Widget/conf'
import Vue from 'vue'
import widget from './index.vue'
const type = 'dorring-pie-1'

export default new conf({
	width: 200,
	height: 200,
	data: [],
	type,
	version: '1.0.0',
	name: '基本饼图',
})

Vue.component(type, widget)
