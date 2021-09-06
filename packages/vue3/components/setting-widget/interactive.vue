<template lang="pug">
d-setting-container
	template(#title)
		d-titles(:list="[{ label: '动画' }]")
	template(#content)
		el-form-item(label="开启")
			el-checkbox(v-model="currentWidget.animation.enable")
		el-form-item(label="形式" v-if="currentWidget.animation.enable")
			el-select(v-model="currentWidget.animation.enter")
				el-option(v-for="item in animation", :key="item.value", :value="item.value", :label="item.label")
		el-form-item(label="时长" v-if="currentWidget.animation.enable")
			d-input(v-model="currentWidget.animation.duration", format="number", prepend="ms")
		el-form-item(label="延迟" v-if="currentWidget.animation.enable")
			d-input(v-model="currentWidget.animation.delay", format="number", prepend="ms")
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import Manager from '@dorring/sdk/core/Manager'
import currentWidget from './currentWidget'
import animation from '@dorring/sdk/config/animation'
import dTitles from '@dorring/sdk/vue3/components-style/d-titles/index.vue'
import dInput from '@dorring/sdk/vue3/components-style/d-input/index.vue'
import dSettingContainer from '@dorring/sdk/vue3/components-style/d-setting-container/index.vue'

export default defineComponent({
	name: 'setting-widget-interactive',
	components: {
		dTitles,
		dInput,
		dSettingContainer,
	},
	setup() {
		const manager: Manager = Manager.Instance()
		const state = reactive({ manager })

		return {
			...toRefs(state),
			currentWidget,
			animation,
		}
	},
})
</script>
