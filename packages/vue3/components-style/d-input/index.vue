<template lang="pug">
.d-input-box.pos-r.fn-flex
	el-input.d-input.pos-r(:class="{'d-input-prepend':prepend,'d-input-append':append,'d-input-focus':focusState,'d-input-no-prepend-append':!prepend&&!append}" v-bind="$attrs", v-model="currentVal" :style="{width:width}" @focus="focus" @blur="blur")
		template(#prepend v-if="prepend") 
			span {{ currentPrepend }}
		template(#append v-if="append")
			span {{ currentAppend }}
	.d-input-hanggao.pos-a(v-if="prepend==='行高'")
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
		return { ...toRefs(state), focus, blur }
	},
})
</script>
<style lang="scss" scoped>
.d-input-hanggao {
	&:before,
	&:after {
		content: '';
		position: absolute;
		width: 12px;
		height: 1px;
		background-color: #ccc;
	}
	&:before {
		top: 8px;
	}
	&:after {
		top: 20px;
	}
}
.d-input-append {
	padding: 1px;
	&::v-deep(.el-input-group__append) {
		border-width: 1px 1px 1px 0;
		border-top-right-radius: 2px;
		border-bottom-right-radius: 2px;
	}
	&::v-deep(.el-input__inner) {
		border-width: 1px 0 1px 1px;
	}
}
.d-input-prepend {
	padding: 1px;
	&::v-deep(.el-input-group__prepend) {
		border-width: 1px 0 1px 1px;
		border-top-left-radius: 2px;
		border-bottom-left-radius: 2px;
	}
	&::v-deep(.el-input__inner) {
		border-width: 1px 1px 1px 0;
	}
}
.d-input-focus {
	&::v-deep(.el-input-group__append),
	&::v-deep(.el-input-group__prepend),
	&::v-deep(.el-input__inner) {
		border-color: var(--el-color-primary) !important;
	}
	&::v-deep(.el-input__inner) {
		border-width: 2px 0 2px 2px;
	}
	&::v-deep(.el-input-group__append) {
		border-width: 2px 2px 2px 0;
	}
	&::v-deep(.el-input-group__prepend) {
		border-width: 2px 0 2px 2px;
	}
	&::v-deep(.el-input__inner) {
		border-width: 2px 2px 2px 0;
	}
}
.d-input {
	margin-bottom: 4px;
	left: -10px;
	&:hover {
		&::v-deep(.el-input-group__append),
		&::v-deep(.el-input__inner),
		&::v-deep(.el-input-group__prepend) {
			border-color: #ccc;
		}
	}
	&::v-deep(.el-input-group__prepend),
	&::v-deep(.el-input-group__append) {
		padding: 0 10px;
		transition: 0s;
		background-color: transparent;
		color: #ccc;
		width: 10px;
		border-style: solid;
		border-color: transparent;
	}
	&:nth-child(2n) {
		margin-left: 10px;
	}
	&::v-deep(.el-input__inner) {
		border-style: solid;
		transition: 0s;
		border-color: transparent;
		padding-left: 0;
	}
	&.d-input-no-prepend-append {
		&::v-deep(.el-input__inner) {
			border-width: 2px;
		}
	}
}
</style>
