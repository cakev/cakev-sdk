<template lang="pug">
v-ace-editor(v-model:value="currentVal"
	lang="json"
	theme="chrome"
	:style="{height:'100px',width:'100%'}")
</template>
<script lang="ts">
import { reactive, defineComponent, toRefs, computed } from 'vue'
import { VAceEditor } from 'vue3-ace-editor'
import ace from 'ace-builds'

ace.config.set(
	'basePath',
	'https://cdn.jsdelivr.net/npm/ace-builds@' + require('ace-builds').version + '/src-noconflict/',
)

export default defineComponent({
	name: 'd-code',
	components: {
		VAceEditor,
	},
	props: {
		modelValue: {
			type: [Array, Object],
			default() {
				return []
			},
		},
	},
	setup(props: any, { emit }) {
		const state = reactive({
			error: false,
			mode: 'tree',
			modes: ['tree', 'code', 'form', 'text', 'view'],
			expandedModes: ['tree', 'view', 'form'],
			id: `d-code-${+new Date()}`,
			editor: null,
			json: [],
			internalChange: false,
		})

		const currentVal = computed({
			get: () => {
				return JSON.stringify(props.modelValue)
			},
			set: val => {
				try {
					emit('update:modelValue', JSON.parse(val))
				} catch (e) {
					// console.log(e)
				}
			},
		})

		return {
			...toRefs(state),
			currentVal,
		}
	},
})
</script>
