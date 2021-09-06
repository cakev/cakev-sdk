<template lang="pug">
d-setting-container
	template(#title)
		d-titles(:list="[{ label: '描边' }]")
			d-icon(type="el-icon-minus", @click="destroyBorder" :style="{marginLeft:'auto'}" v-if="currentWidget.border")
			d-icon(type="el-icon-plus", @click="createBorder" :style="{marginLeft:'auto'}" v-else)
	template(#content)
		el-form-item(label-width="0px" v-if="currentWidget.border" :style="{marginBottom:'2px'}")
			.d-input-shangmiaobian
			.d-input-zuomiaobian
			.d-input-xiamiaobian
			.d-input-youmiaobian
		el-form-item(label-width="0px" v-if="currentWidget.border" :style="{marginBottom:'0'}")
			d-input.d-input-border(v-model="currentWidget.border.width[0]", format="number")
			d-input.d-input-border(v-model="currentWidget.border.width[1]", format="number")
			d-input.d-input-border(v-model="currentWidget.border.width[2]", format="number")
			d-input.d-input-border(v-model="currentWidget.border.width[3]", format="number")
		el-form-item(label="颜色" v-if="currentWidget.border")
			d-color(v-model="currentWidget.border.color")
		el-form-item(label="样式" v-if="currentWidget.border")
			el-select(v-model="currentWidget.border.style")
				el-option(value="solid", label="实线")
				el-option(value="dashed", label="虚线")
				el-option(value="double", label="双线")
				el-option(value="dotted", label="点状")
				el-option(value="none", label="无")
				el-option(value="inherit", label="继承父元素样式")
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import Manager from '@dorring/sdk/core/Manager'
import currentWidget from '../currentWidget'
import createBorder from '../createBorder'
import destroyBorder from '../destroyBorder'
import dTitles from '@dorring/sdk/vue3/components-style/d-titles/index.vue'
import dColor from '@dorring/sdk/vue3/components-style/d-color/index.vue'
import dInput from '@dorring/sdk/vue3/components-style/d-input/index.vue'
import dIcon from '@dorring/sdk/vue3/components-style/d-icon/index.vue'
import dSettingContainer from '@dorring/sdk/vue3/components-style/d-setting-container/index.vue'

export default defineComponent({
	name: 'setting-widget-base',
	components: {
		dTitles,
		dColor,
		dInput,
		dIcon,
		dSettingContainer,
	},
	setup() {
		const manager: Manager = Manager.Instance()
		const state = reactive({ manager })

		return {
			...toRefs(state),
			currentWidget,
			createBorder,
			destroyBorder,
		}
	},
})
</script>
<style lang="scss" scoped>
.d-input-border {
	width: 50px !important;
	margin-right: 2px;
	&:last-child {
		margin-right: 0;
	}
	&::v-deep(.d-input) {
		left: 0;
	}
	&::v-deep(.el-input__inner) {
		text-align: center;
		padding-right: 0;
		height: 20px;
	}
}
.d-input-xiamiaobian,
.d-input-youmiaobian,
.d-input-zuomiaobian,
.d-input-shangmiaobian {
	width: 50px;
	height: 12px;
	position: relative;
	margin-right: 2px;
	&:last-child {
		margin-right: 0;
	}
	&:before {
		content: '';
		position: absolute;
		left: 50%;
		margin-left: -6px;
		width: 12px;
		height: 12px;
		border: 1px solid #ccc;
	}
}
.d-input-shangmiaobian {
	&:before {
		border-top-color: #333;
	}
}
.d-input-xiamiaobian {
	&:before {
		border-bottom-color: #333;
	}
}
.d-input-zuomiaobian {
	&:before {
		border-left-color: #333;
	}
}
.d-input-youmiaobian {
	&:before {
		border-right-color: #333;
	}
}
</style>
