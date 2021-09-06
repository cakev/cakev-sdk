<template lang="pug">
d-setting-container
	template(#title)
		d-titles(:list="[{ label: '尺寸' }]")
	template(#content)
		el-form-item(label-width="0px")
			d-input(v-model="currentWidget.x", format="number", prepend="X")
			d-input(v-model="currentWidget.y", format="number", prepend="Y")
			d-input(v-model="currentWidget.width", format="number", prepend="W")
			d-input(v-model="currentWidget.height", format="number", prepend="H")
d-colors(v-model:list="currentWidget.backgroundColor" v-model:direction="currentWidget.gradientDirection")
font
border
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import Manager from '@dorring/sdk/core/Manager'
import currentWidget from '../currentWidget'
import dTitles from '@dorring/sdk/vue3/components-style/d-titles/index.vue'
import dColor from '@dorring/sdk/vue3/components-style/d-color/index.vue'
import dColors from '@dorring/sdk/vue3/components-style/d-colors/index.vue'
import dInput from '@dorring/sdk/vue3/components-style/d-input/index.vue'
import dSettingContainer from '@dorring/sdk/vue3/components-style/d-setting-container/index.vue'
import font from './font.vue'
import border from './border.vue'

export default defineComponent({
	name: 'setting-widget-base',
	components: {
		dTitles,
		dColor,
		dColors,
		dInput,
		dSettingContainer,
		font,
		border,
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
