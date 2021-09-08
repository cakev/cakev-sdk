<template lang="pug">
el-input.d-input.pos-r(:class="{'d-input-prepend':prepend,'d-input-append':append,'d-input-focus':focusState,'d-input-no-prepend-append':!prepend&&!append}" v-bind="$attrs", v-model="currentVal" :style="{width:width}" @focus="focus" @blur="blur")
	template(#prepend v-if="prepend") 
		.pos-r
			span {{ currentPrepend }}
			.d-input-hanggao.pos-a(v-if="prepend==='行高'")
	template(#append v-if="append")
		span {{ currentAppend }}
	
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
		prepend: {
			type: String,
		},
		append: {
			type: String,
		},
		width: {
			type: String,
			default: '100px',
		},
	},
	setup(props, { emit }) {
		let currentPrepend = ''
		if (props.prepend) {
			if (props.prepend === '行高') {
				currentPrepend = 'A'
			} else if (props.prepend.indexOf('描边') !== -1) {
			} else {
				currentPrepend = props.prepend
			}
		}
		const state = reactive({
			currentAppend: props.append,
			currentPrepend,
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
				emit('update:modelValue', props.format === 'number' ? Number(val) : val)
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
.d-input-hanggao {
	height: 100%;
	top: 0;
	left: 0;
	width: 100%;
	&:before,
	&:after {
		content: '';
		position: absolute;
		width: 12px;
		height: 1px;
		left: 50%;
		margin-left: -6px;
		background-color: #ccc;
	}
	&:before {
		top: 2px;
	}
	&:after {
		top: 14px;
	}
}
.d-input {
	&::v-deep(.el-input-group__prepend),
	&::v-deep(.el-input-group__append) {
		transition: 0s;
		background-color: transparent;
		color: #ccc;
		width: 10px;
		box-sizing: border-box;
		span {
			padding: 0 8px;
		}
	}
	&::v-deep(.el-input__inner) {
		padding: 0;
		transition: 0s;
	}
}
.d-input-append {
	&::v-deep(.el-input-group__append) {
		padding: 1px 1px 1px 0;
		border-width: 1px 1px 1px 0;
		border-top-right-radius: 2px;
		border-bottom-right-radius: 2px;
	}
	&::v-deep(.el-input__inner) {
		padding: 1px 0 1px 1px;
		border-width: 1px 0 1px 1px;
	}
	&.d-input-focus {
		&::v-deep(.el-input__inner) {
			padding: 0;
			border-width: 2px 0 2px 2px;
		}
	}
}
.d-input-prepend {
	&::v-deep(.el-input-group__prepend) {
		padding: 1px 0 1px 1px;
		border-width: 1px 0 1px 1px;
		border-top-left-radius: 2px;
		border-bottom-left-radius: 2px;
	}
	&::v-deep(.el-input__inner) {
		padding: 1px 1px 1px 0;
		border-width: 1px 1px 1px 0;
	}
	&.d-input-focus {
		&::v-deep(.el-input__inner) {
			padding: 0;
			border-width: 2px 2px 2px 0;
		}
	}
}
.d-input-focus {
	&::v-deep(.el-input-group__append),
	&::v-deep(.el-input-group__prepend),
	&::v-deep(.el-input__inner) {
		border-color: var(--el-color-primary) !important;
	}
	&::v-deep(.el-input-group__append) {
		border-width: 2px 2px 2px 0;
		padding: 0;
	}
	&::v-deep(.el-input-group__prepend) {
		border-width: 2px 0 2px 2px;
		padding: 0;
	}
	&::v-deep(.el-input__inner) {
		border-width: 2px;
	}
}
</style>
