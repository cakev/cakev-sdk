<template lang="pug">
.d-color.pos-r.fn-flex.flex-row(v-click-outside="hide")
	.d-clock-block.pos-r(:style="{ backgroundColor: currentVal }", @click="show")
		.d-color-alpha-right.pos-a(v-if="alpha || !currentVal")
		.d-color-alpha-left.pos-a(v-if="!currentVal")
	span(@click="show") {{ currentVal ? currentVal : '无' }}
	.pos-a.d-color-pick.z-index-9(v-if="picker")
		chrome-picker(@input="input", :value="currentVal")
	.icon-close
	d-icon(v-if="clearable && currentVal", type="el-icon-close", @click="clear")
</template>
<script lang="ts">
import { reactive, toRefs, watch } from '@vue/composition-api'
import { Chrome } from 'vue-color'

export default {
	components: {
		'chrome-picker': Chrome,
	},
	props: {
		value: {},
		clearable: {
			type: Boolean,
			default: true,
		},
	},
	setup(props, { emit }) {
		let alpha = false
		if (props.value) alpha = eval(props.value.replace('rgba', '')) < 1
		const state = reactive({ alpha, picker: false, currentVal: props.value })
		const show = () => {
			state.picker = !state.picker
		}
		const hide = () => {
			state.picker = false
		}
		const input = val => {
			if (val.rgba.a < 1) {
				state.alpha = true
			} else {
				state.alpha = false
			}
			emit('input', `rgba(${val.rgba.r},${val.rgba.g},${val.rgba.b},${val.rgba.a})`)
		}
		const clear = () => {
			state.currentVal = ''
			emit('input', '')
		}

		watch(
			() => props.value,
			val => {
				state.currentVal = val
			},
		)
		return {
			...toRefs(state),
			input,
			show,
			hide,
			clear,
		}
	},
}
</script>
<style lang="scss" scoped>
.d-color {
	align-items: center;
}
.d-color-alpha-left {
	left: 0;
}
.d-color-alpha-right {
	right: 0;
}
.icon-close {
	margin-left: auto;
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
.d-color-pick {
	top: 30px;
	left: -50px;
}
.d-clock-block {
	width: 16px;
	height: 16px;
	margin-right: 8px;
	border: 1px solid #e5e5e5;
}
</style>
