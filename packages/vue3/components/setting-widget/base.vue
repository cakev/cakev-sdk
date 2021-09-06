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
		d-titles(:list="[{ label: '填充' }]")
	template(#content)
		el-form-item(label="背景色")
			d-color(v-model="currentWidget.backgroundColor")
d-setting-container
	template(#title)
		d-titles(:list="[{ label: '字体' }]")
	template(#content)
		el-form-item(label="字号")
			d-input(v-model="currentWidget.fontSize", format="number", append="px")
		el-form-item(label="行高")
			d-input(v-model="currentWidget.lineHeight", format="number", append="px")
		el-form-item(label="颜色")
			d-color(v-model="currentWidget.color")
		el-form-item(label="对齐方式")
			el-select(v-model="currentWidget.textAlign")
				el-option(value="left", label="左对齐")
				el-option(value="center", label="居中对齐")
				el-option(value="right", label="右对齐")
d-setting-container
	template(#title)
		d-titles(:list="[{ label: '描边' }]")
	template(#content)
		el-form-item(label="宽度")
			d-input(v-model="currentWidget.borderWidth", format="number", append="px")
		el-form-item(label="颜色")
			d-color(v-model="currentWidget.borderColor")
		el-form-item(label="样式")
			el-select(v-model="currentWidget.borderStyle")
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
import currentWidget from './currentWidget'
import dTitles from '@dorring/sdk/vue3/components-style/d-titles/index.vue'
import dColor from '@dorring/sdk/vue3/components-style/d-color/index.vue'
import dInput from '@dorring/sdk/vue3/components-style/d-input/index.vue'
import dSettingContainer from '@dorring/sdk/vue3/components-style/d-setting-container/index.vue'

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
