<template lang="pug">
d-setting-container
	template(#title)
		d-titles(:list="[{ label: '文本' }]")
	template(#content)
		el-form-item(label-width="0px")
			d-input(v-model="currentWidget.fontSize", format="number", prepend="T" title="字号")
			d-input(v-model="currentWidget.lineHeight", format="number", prepend="行高" title="行高")
		el-form-item(label="颜色")
			d-color(v-model="currentWidget.color")
		el-form-item(label="对齐方式")
			el-select(v-model="currentWidget.textAlign")
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
import dInput from '@dorring/sdk/vue3/components-style/d-input/index.vue'
import dSettingContainer from '@dorring/sdk/vue3/components-style/d-setting-container/index.vue'

export default defineComponent({
	name: 'setting-widget-base-font',
	components: {
		dTitles,
		dColor,
		dInput,
		dSettingContainer,
	},
	setup() {
		const manager: Manager = Manager.Instance()
		const state = reactive({ manager })

		return {
			...toRefs(state),
			currentWidget,
		}
	},
})
</script>
