<template lang="pug">
el-input.d-input(v-bind="$attrs", v-model="currentVal")
	template(#append v-if="append") {{ append }}
</template>
<script lang="ts">
import { reactive, toRefs, watch, defineComponent } from 'vue'

export default defineComponent({
	name: 'd-input',
	props: {
		modelValue: {},
		format: {
			type: String,
		},
		append: {
			type: String,
		},
	},
	setup(props, { emit }) {
		const state = reactive({ currentVal: props.modelValue })
		watch(
			() => props.modelValue,
			val => {
				state.currentVal = val
			},
		)

		watch(
			() => state.currentVal,
			val => {
				emit('update:modelValue', props.format === 'number' ? Number(val) : val)
			},
		)
		return { ...toRefs(state) }
	},
})
</script>
<style lang="scss" scoped>
.d-input {
	&::v-deep(.el-input-group__append) {
		padding: 0 10px;
	}
}
</style>
