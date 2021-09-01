<template lang="pug">
.d-code(:id="id")
</template>
<script lang="ts">
import { onMounted, reactive, defineComponent, toRefs, ComponentPublicInstance, getCurrentInstance } from 'vue'
import JsonEditor from './jsoneditor.min'
import './jsoneditor.min.css'

export default defineComponent({
	name: 'd-code',
	props: {
		modelValue: {
			type: Array,
			default() {
				return []
			},
		},
	},
	// @ts-ignore
	setup(props, { emit }) {
		const root = getCurrentInstance()?.root.proxy as ComponentPublicInstance
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

		const expandAll = () => {
			if (state.expandedModes.includes(state.editor.getMode())) {
				;(state.editor as any).expandAll()
			}
		}

		// watch(
		// 	() => props.modelValue,
		// 	val => {
		// 		if (!state.internalChange) {
		// 			state.json = val
		// 			setEditor(val)
		// 			state.error = false
		// 			expandAll()
		// 		}
		// 	},
		// 	{ immediate: true, deep: true },
		// )

		onMounted(() => {
			const options = {
				mode: state.mode,
				modes: state.modes,
				onChange() {
					try {
						const json = state.editor.get()
						state.json = json
						state.error = false
						emit('json-change', json)
						state.internalChange = true
						emit('input', json)
						root.$nextTick(function () {
							state.internalChange = false
						})
					} catch (e) {
						state.error = true
						emit('has-error', e)
					}
				},
				onModeChange() {
					expandAll()
				},
			}
			state.editor = new JsonEditor(document.getElementById(state.id), options, state.json)
		})

		return {
			...toRefs(state),
		}
	},
})
</script>
<style lang="scss" scoped>
.d-code {
	min-height: 150px;
}
</style>
