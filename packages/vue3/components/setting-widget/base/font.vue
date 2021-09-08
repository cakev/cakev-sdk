<template lang="pug">
d-setting-container
	template(#title)
		d-titles(:list="[{ label: '文本' }]")
			d-icon.ml-auto(type="el-icon-minus", @click="destroyFont" v-if="currentWidget.font")
			d-icon.ml-auto(type="el-icon-plus", @click="createFont" v-else)
	template(#content)
		el-form-item(label-width="0px" v-if="currentWidget.font")
			d-input(v-model="currentWidget.font.size", format="number", prepend="T" title="字号")
			d-input.ml-10(v-model="currentWidget.font.lineHeight", format="number", prepend="行高" title="行高")
		el-form-item(label-width="0px" v-if="currentWidget.font")
			d-select(modelValue="纯色" :list="background" :style="{width:'100px'}" :disabled="true")
			d-color.ml-auto(v-model="currentWidget.font.color")
		el-form-item(label="对齐方式" v-if="currentWidget.font")
			el-select(v-model="currentWidget.font.textAlign")
				el-option(value="left", label="左对齐")
				el-option(value="center", label="居中对齐")
				el-option(value="right", label="右对齐")
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import Manager from '@dorring/sdk/core/Manager'
import currentWidget from '../currentWidget'
import dTitles from '@dorring/sdk/vue3/components-style/d-titles/index.vue'
import dColor from '@dorring/sdk/vue3/components-style/d-color/index.vue'
import dIcon from '@dorring/sdk/vue3/components-style/d-icon/index.vue'
import dInput from '@dorring/sdk/vue3/components-style/d-input/index.vue'
import dSelect from '@dorring/sdk/vue3/components-style/d-select/index.vue'
import dSettingContainer from '@dorring/sdk/vue3/components-style/d-setting-container/index.vue'
import background from '@dorring/sdk/config/background'
import WidgetFont from '@dorring/sdk/core/Widget/font'

export default defineComponent({
	name: 'setting-widget-base-font',
	components: {
		dTitles,
		dColor,
		dInput,
		dIcon,
		dSelect,
		dSettingContainer,
	},
	setup() {
		const manager: Manager = Manager.Instance()
		const state = reactive({ manager, currentWidget })

		const createFont = () => {
			state.currentWidget.font = new WidgetFont()
			state.manager.screen.currentScreen.widgets = { ...state.manager.screen.currentScreen.widgets }
		}
		const destroyFont = () => {
			state.currentWidget.font = null
			state.manager.screen.currentScreen.widgets = { ...state.manager.screen.currentScreen.widgets }
		}

		return {
			...toRefs(state),
			currentWidget,
			background,
			createFont,
			destroyFont,
		}
	},
})
</script>
