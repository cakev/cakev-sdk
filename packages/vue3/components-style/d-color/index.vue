<template lang="pug">
.d-color.fn-flex.flex-row
	el-color-picker(v-model="currentVal", show-alpha, @change="change")
		span {{ currentVal ? currentVal : '无' }}
	slot
</template>
<script lang="ts">
import { reactive, toRefs, watch, defineComponent } from 'vue'

export default defineComponent({
	name: 'd-color',
	props: {
		modelValue: {
			type: String,
		},
		clearable: {
			type: Boolean,
			default: true,
		},
	},
	setup(props, { emit }) {
		let alpha = false
		if (props.modelValue) {
			alpha = eval(props.modelValue.replace('rgba', '')) < 1
		}
		const state = reactive({ alpha, currentVal: props.modelValue })
		const change = val => {
			emit('update:modelValue', val)
		}

		watch(
			() => props.modelValue,
			val => {
				state.currentVal = val
			},
		)
		return {
			...toRefs(state),
			change,
		}
	},
})
</script>
<style lang="scss" scoped>
.d-color {
	align-items: center;
	&::v-deep(.bee-color-wrap) {
		width: 16px;
		height: 16px;
		margin-right: 8px;
		border: 1px solid #e5e5e5;
		box-shadow: none;
		&.transparent {
			.current-color {
				background-color: transparent !important;
			}
		}
	}
}
.d-color-alpha-left {
	left: 0;
}
.d-color-alpha-right {
	right: 0;
}
.d-color-alpha-left,
.d-color-alpha-right {
	top: 0;
	width: 50%;
	height: 100%;
	background: url(data:image/svg+xml;utf8,%3Csvg%20width%3D%226%22%20height%3D%226%22%20viewBox%3D%220%200%206%206%22%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M0%200H3V3H0V0Z%22%20fill%3D%22%23E1E1E1%22/%3E%3Cpath%20d%3D%22M3%200H6V3H3V0Z%22%20fill%3D%22white%22/%3E%3Cpath%20d%3D%22M3%203H6V6H3V3Z%22%20fill%3D%22%23E1E1E1%22/%3E%3Cpath%20d%3D%22M0%203H3V6H0V3Z%22%20fill%3D%22white%22/%3E%3C/svg%3E%0A);
	border-top-right-radius: 1px;
	border-bottom-right-radius: 1px;
}
</style>
