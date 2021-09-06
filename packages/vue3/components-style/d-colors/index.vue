<template lang="pug">
.d-colors.fn-flex.flex-row(:class="{'feed-line':list.length>5}")
	d-color.pos-r(v-for="(item,index) in list" :modelValue="item" @update:modelValue="val=>update(val,index)")
		.d-colors-icon-delete.pos-a.text-center.cursor-pointer(@click="removeColor(index)" v-if="list.length>1") -
	d-icon(type="el-icon-plus", @click="createColor")
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import dColor from '@dorring/sdk/vue3/components-style/d-color/index.vue'
import dIcon from '@dorring/sdk/vue3/components-style/d-icon/index.vue'

export default defineComponent({
	name: 'd-colors',
	components: { dColor, dIcon },
	props: {
		list: {
			type: Array,
			default() {
				return []
			},
		},
	},
	setup(props: any) {
		const update = (val, index) => {
			props.list[index] = val
		}
		const createColor = () => {
			props.list.push('rgba(0,0,0,1)')
		}
		const removeColor = index => {
			if (props.list.length > 1) props.list.splice(index, 1)
		}

		return { update, createColor, removeColor }
	},
})
</script>
<style lang="scss" scoped>
.d-colors-icon-delete {
	background-color: red;
	color: #fff;
	width: 10px;
	height: 10px;
	right: 0;
	top: 0;
	border-radius: 50%;
	line-height: 7px;
}
.d-colors {
	flex-wrap: wrap;
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
