<template lang="pug">
el-select.d-select.pos-r(:disabled="disabled" v-model="currentVal" :class="{'d-select-focus':focusState}", @focus="focus" @blur="blur")
	el-option(v-for="item in list" :value="item.value" :label="item.label")
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, watch } from 'vue'

export default defineComponent({
	name: 'd-select',
	props: {
		modelValue: {},
		list: {
			type: Array,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
	},
	setup(props, { emit }) {
		const state = reactive({
			currentVal: props.modelValue,
			focusState: false,
		})
		watch(
			() => props.modelValue,
			val => {
				state.currentVal = val
			},
		)

		watch(
			() => state.currentVal,
			val => {
				emit('update:modelValue', val)
			},
		)

		const focus = () => {
			state.focusState = true
		}
		const blur = () => {
			state.focusState = false
		}

		return {
			...toRefs(state),
			focus,
			blur,
		}
	},
})
</script>
<style lang="scss" scoped>
.d-select {
	&::v-deep(.el-input__inner) {
		padding: 1px 1px 1px 7px;
		border-width: 1px;
	}
	&.d-select-focus {
		&::v-deep(.el-input__inner) {
			padding: 0 0 0 6px;
			border-width: 2px;
		}
	}
}
</style>
