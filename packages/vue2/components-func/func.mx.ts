import {
	Input,
	InputNumber,
	Select,
	Option,
	ColorPicker,
	Button,
	CheckboxGroup,
	Checkbox,
	Icon,
	Upload,
	Modal,
} from 'view-design'
import dInput from '@/vue2/components-base/d-input/index.vue'
import Editor from '@/core/Editor'

export default {
	components: {
		dInput,
		'i-input': Input,
		'i-upload': Upload,
		'i-icon': Icon,
		'i-input-number': InputNumber,
		'i-select': Select,
		'i-option': Option,
		'i-color-picker': ColorPicker,
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
