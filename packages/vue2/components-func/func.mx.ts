import Editor from '@/core/Editor'

export default {
	data() {
		return {
			editor: Editor.Instance() as Editor,
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
}
