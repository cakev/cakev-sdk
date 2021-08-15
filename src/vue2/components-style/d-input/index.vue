<template lang="pug">
el-input.d-input(v-bind="$attrs", v-on="$listeners", v-model="currentVal")
	template(slot="append") {{ $slots.append[0].text }}
</template>
<script lang="ts">
import { reactive, toRefs, watch } from '@vue/composition-api'

export default {
	props: {
		value: {},
		format: {
			type: String,
		},
	},
	setup(props, { emit }) {
		const state = reactive({ currentVal: props.value })
		watch(
			() => props.value,
			val => {
				state.currentVal = val
			},
		)

		watch(
			() => state.currentVal,
			val => {
				emit('input', props.format === 'number' ? Number(val) : val)
			},
		)
		return { ...toRefs(state) }
	},
}
</script>
<style lang="scss" scoped>
.d-input {
	/deep/ {
		.el-input-group__append {
			padding: 0 10px;
		}
	}
}
</style>
