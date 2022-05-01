import {
	Input,
	InputNumber,
	Select,
	Option,
	Switch,
	ColorPicker,
	Collapse,
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	Panel,
	Button,
	CheckboxGroup,
	Checkbox,
	Icon,
	Upload,
	Modal,
} from 'view-design'
import dRightSwiper from '@/vue2/components-right/d-right-swiper/index.vue'
import dRightSwiperList from '@/vue2/components-right/d-right-swiper-list/index.vue'
import dRightSwiperEye from '@/vue2/components-right/d-right-swiper-eye/index.vue'
import dRightControl from '@/vue2/components-right/d-right-control/index.vue'
import dInput from '@/vue2/components-style/d-input/index.vue'
import Editor from '@/core/Editor'

export default {
	components: {
		dRightSwiper,
		dRightControl,
		dInput,
		dRightSwiperList,
		dRightSwiperEye,
		'i-input': Input,
		'i-upload': Upload,
		'i-icon': Icon,
		'i-input-number': InputNumber,
		'i-select': Select,
		'i-option': Option,
		'i-color-picker': ColorPicker,
		'i-collapse': Collapse,
		'i-panel': Panel,
		'i-button': Button,
		'i-modal': Modal,
		CheckboxGroup,
		Checkbox,
	},
	data() {
		return {
			editor: Editor.Instance(),
		}
	},
	props: {
		config: {},
		parentProp: {},
		parentIndex: {},
	},
	computed: {
		fixedConfig() {
			if (this.parentProp) {
				return {
					...this.config,
					prop: `config.config.${this.parentProp}.${this.config.prop}`,
				}
			} else {
				return this.config
			}
		},
		obj() {
			if (!this.fixedConfig.prop) return null
			let res = this.editor.currentWidget
			if (res) {
				const props = this.fixedConfig.prop.split('.')
				props.length = props.length - 1
				props.forEach(v => {
					res = res[v]
				})
				return this.parentProp ? res[this.parentIndex] : res
			}
			return {}
		},
		inputKey() {
			if (this.parentProp) return this.config.prop
			if (!this.fixedConfig.prop) return null
			const props = this.fixedConfig.prop.split('.')
			return props.reverse()[0]
		},
	},
	methods: {
		getItemValue(keyString) {
			let res = this.editor.currentWidget
			const props = keyString.split('.')
			props.forEach(v => {
				res = res[v]
			})
			return res
		},
		getItemObj(keyString) {
			let res = this.editor.currentWidget
			const props = keyString.split('.')
			props.length = props.length - 1
			props.forEach(v => {
				res = res[v]
			})
			return res
		},
	},
}
