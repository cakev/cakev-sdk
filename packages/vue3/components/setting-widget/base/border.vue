<template lang="pug">
d-setting-container
	template(#title)
		d-titles(:list="[{ label: '描边' }]")
			d-icon.ml-auto(type="el-icon-minus", @click="destroyBorder" v-if="currentWidget.border")
			d-icon.ml-auto(type="el-icon-plus", @click="createBorder" v-else)
	template(#content)
		el-form-item(label="颜色" v-if="currentWidget.border")
			d-color(v-model="currentWidget.border.color")
		el-form-item(label="样式" v-if="currentWidget.border")
			d-select(v-model="currentWidget.border.type" :list="border")
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
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import Manager from '@dorring/sdk/core/Manager'
import currentWidget from '../currentWidget'
import dTitles from '@dorring/sdk/vue3/components-style/d-titles/index.vue'
import dColor from '@dorring/sdk/vue3/components-style/d-color/index.vue'
import dInput from '@dorring/sdk/vue3/components-style/d-input/index.vue'
import dSelect from '@dorring/sdk/vue3/components-style/d-select/index.vue'
import dIcon from '@dorring/sdk/vue3/components-style/d-icon/index.vue'
import dSettingContainer from '@dorring/sdk/vue3/components-style/d-setting-container/index.vue'
import border from '@dorring/sdk/config/border'
import WidgetBorder from '@dorring/sdk/core/Widget/border'

export default defineComponent({
	name: 'setting-widget-base',
	components: {
		dTitles,
		dSelect,
		dColor,
		dInput,
		dIcon,
		dSettingContainer,
	},
	setup() {
		const manager: Manager = Manager.Instance()
		const state = reactive({ manager, currentWidget })

		const createBorder = () => {
			state.currentWidget.border = new WidgetBorder()
			state.manager.screen.currentScreen.widgets = { ...state.manager.screen.currentScreen.widgets }
		}
		const destroyBorder = () => {
			state.currentWidget.border = null
			state.manager.screen.currentScreen.widgets = { ...state.manager.screen.currentScreen.widgets }
		}

		return {
			...toRefs(state),
			currentWidget,
			createBorder,
			destroyBorder,
			border,
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
