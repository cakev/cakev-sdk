<template lang="pug">
d-setting-container
	template(#title)
		d-titles(:list="[{ label: '填充' }]")
			d-icon(type="el-icon-plus", @click="createColor" :style="{marginLeft:'auto'}")
	template(#content)
		el-form-item(label-width="0px")
			el-select(v-model="colorType" :style="{width:'100px'}")
				el-option(value="纯色" label="纯色")
				el-option(value="线性渐变" label="线性渐变")
			d-input.d-input-direction(
				v-if="list.length>1",
				:modelValue="currentDirection",
				format="number", 
				append="°",
				:style="{marginLeft:'auto'}"
				@update:modelValue="updateDirection")
			d-color.pos-r(:style="{marginLeft:'auto'}" v-else v-for="(item,index) in list" :modelValue="item" @update:modelValue="val=>updateColor(val,index)")
		el-form-item(label-width="0px" v-if="list.length>1")
			.d-colors.fn-flex.flex-row(:class="{'feed-line':list.length>5}")
				d-color.pos-r(v-for="(item,index) in list" :modelValue="item" @update:modelValue="val=>updateColor(val,index)")
					.d-colors-icon-delete.pos-a.text-center.cursor-pointer(@click="removeColor(index)" v-if="list.length>1") -
</template>
<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from 'vue'
import dColor from '@dorring/sdk/vue3/components-style/d-color/index.vue'
import dIcon from '@dorring/sdk/vue3/components-style/d-icon/index.vue'
import dTitles from '@dorring/sdk/vue3/components-style/d-titles/index.vue'
import dInput from '@dorring/sdk/vue3/components-style/d-input/index.vue'
import dSettingContainer from '@dorring/sdk/vue3/components-style/d-setting-container/index.vue'

export default defineComponent({
	name: 'd-colors',
	components: {
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

		return {
			...toRefs(state),
			colorType,
			updateColor,
			createColor,
			removeColor,
			updateDirection,
		}
	},
})
</script>
<style lang="scss" scoped>
.d-input-direction {
	&::v-deep(.d-input) {
		margin-bottom: 0;
		width: 60px !important;
	}
	&::v-deep(.el-input__inner) {
		padding-right: 0;
		text-align: right;
	}
	&::v-deep(.el-input-group__append) {
		padding: 0;
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
