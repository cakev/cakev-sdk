<template lang="pug">
d-setting-container
	template(#title)
		d-titles(:list="[{ label: '填充' }]")
			d-icon.ml-auto(type="el-icon-plus", @click="createColor" v-if="")
	template(#content)
		el-form-item(label-width="0px")
			d-select(v-model="colorType" :style="{width:'100px'}" :list="background")
			//d-input.d-input-direction.ml-10(
			//	:modelValue="currentDirection",
			//	format="number", 
			//	append="°",
			//	:style="{width:'36px'}"
			//	@update:modelValue="updateDirection")
			d-icon.ml-auto(type="el-icon-edit", @click="destroyColor")
			d-icon.ml-10(type="el-icon-minus", @click="destroyColor")
			//d-color.pos-r.ml-auto(v-for="(item,index) in list" :modelValue="item" @update:modelValue="val=>updateColor(val,index)")
</template>
<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from 'vue'
import dColor from '@dorring/sdk/vue3/components-style/d-color/index.vue'
import dSelect from '@dorring/sdk/vue3/components-style/d-select/index.vue'
import dIcon from '@dorring/sdk/vue3/components-style/d-icon/index.vue'
import dTitles from '@dorring/sdk/vue3/components-style/d-titles/index.vue'
import dInput from '@dorring/sdk/vue3/components-style/d-input/index.vue'
import dSettingContainer from '@dorring/sdk/vue3/components-style/d-setting-container/index.vue'
import background from '@dorring/sdk/config/background'

export default defineComponent({
	name: 'd-colors',
	components: {
		dSelect,
		dColor,
		dIcon,
		dTitles,
		dInput,
		dSettingContainer,
	},
	props: {
		list: {
			type: Array,
			default() {
				return []
			},
		},
		direction: {
			type: Number,
		},
	},
	setup(props: any, { emit }) {
		const state = reactive({ currentDirection: props.direction })
		const colorType = computed({
			get: () => {
				if (props.list.length > 1) {
					return '线性渐变'
				} else {
					return '纯色'
				}
			},
			set: val => {
				if (val === '纯色') {
					if (props.list.length > 1) {
						emit('update:list', [props.list[0]])
					}
				}
				if (val === '线性渐变') {
					if (props.list.length === 1) {
						props.list.push('rgba(0,0,0,1)')
					}
				}
			},
		})
		const updateDirection = val => {
			state.currentDirection = val
			emit('update:direction', val)
		}
		const updateColor = (val, index) => {
			props.list[index] = val
		}
		const createColor = () => {
			props.list.push('rgba(0,0,0,1)')
		}
		const removeColor = index => {
			if (props.list.length > 1) props.list.splice(index, 1)
		}

		const destroyColor = () => {}

		return {
			...toRefs(state),
			colorType,
			background,
			updateColor,
			createColor,
			removeColor,
			updateDirection,
			destroyColor,
		}
	},
})
</script>
<style lang="scss" scoped>
.d-input-direction {
	height: 28px;
	&::v-deep(.d-input) {
		margin-bottom: 0;
		width: 60px !important;
	}
	&::v-deep(.el-input__inner) {
		padding-right: 0;
		text-align: right;
	}
	&::v-deep(.el-input-group__append) {
		height: 28px;
	}
}
.d-colors-icon-delete {
	background-color: red;
	color: #fff;
	width: 10px;
	height: 10px;
	right: 0;
	top: 0;
	border-radius: 50%;
	line-height: 7px;
	display: none;
}
.d-colors {
	flex-wrap: wrap;
	&::v-deep(.d-color) {
		&:hover {
			.d-colors-icon-delete {
				display: block;
			}
		}
	}
	&.feed-line {
		&::v-deep(.d-color) {
			margin-bottom: 10px;
		}
	}
	&::v-deep(.d-color) {
		margin-right: 10px;
		&:nth-child(5n) {
			margin-right: 0;
		}
	}
}
</style>
