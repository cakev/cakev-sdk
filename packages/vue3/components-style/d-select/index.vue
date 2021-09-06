<template lang="pug">
el-select.d-select(v-model="currentVal")
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
	},
	setup(props, { emit }) {
		const state = reactive({
			currentVal: props.modelValue,
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

		return {
			...toRefs(state),
		}
	},
})
</script>
<style lang="scss" scoped>
.d-select {
	left: -10px;
	&::v-deep(.el-input__inner) {
		border-color: transparent;
	}
	&::v-deep(.el-input__suffix) {
		display: none;
	}
	&:hover {
		&::v-deep(.el-input__inner) {
			border-color: #ccc;
		}
	}
}
</style>
