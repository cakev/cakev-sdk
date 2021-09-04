<template lang="pug">
d-setting-container
	template(#title)
		d-titles(:list="[{ label: '尺寸' }]")
	template(#content)
		el-form-item(label="位置")
			d-input(v-model="currentWidget.x", style="width: 90px", format="number", append="X")
			d-input(v-model="currentWidget.y", style="width: 90px; margin-left: 8px", format="number", append="Y")
		el-form-item(label="宽高")
			d-input(v-model="currentWidget.width", style="width: 90px", format="number", append="W")
			d-input(v-model="currentWidget.height", style="width: 90px; margin-left: 8px", format="number", append="H")
d-setting-container
	template(#title)
		d-titles(:list="[{ label: '背景' }]")
	template(#content)
		el-form-item(label="色值")
			d-color(v-model="currentWidget.backgroundColor")
d-setting-container
	template(#title)
		d-titles(:list="[{ label: '字体' }]")
	template(#content)
		el-form-item(label="基础")
			d-input(v-model="currentWidget.fontSize", style="width: 90px" format="number", append="大小")
			d-input(v-model="currentWidget.lineHeight", style="width: 90px; margin-left: 8px", format="number", append="行高")
		el-form-item(label="色值")
			d-color(v-model="currentWidget.color")
		el-form-item(label="对齐方式")
			el-select(v-model="currentWidget.textAlign")
				el-option(value="left", label="左对齐")
				el-option(value="center", label="居中对齐")
				el-option(value="right", label="右对齐")
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import Manager from '@dorring-sdk/core/Manager'
import currentWidget from './currentWidget'
import dTitles from '@dorring-sdk/vue3/components-style/d-titles/index.vue'
import dColor from '@dorring-sdk/vue3/components-style/d-color/index.vue'
import dInput from '@dorring-sdk/vue3/components-style/d-input/index.vue'
import dSettingContainer from '@dorring-sdk/vue3/components-style/d-setting-container/index.vue'

export default defineComponent({
	name: 'setting-widget-base',
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
