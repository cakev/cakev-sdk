<template lang="pug">
d-setting-container
	template(slot="title")
		d-titles(:list="[{ label: '动画' }]")
	template(slot="content")
		el-form-item(label="开启")
			el-checkbox(v-model="currentWidget.animation.enable")
		el-form-item(label="形式")
			el-select(v-model="currentWidget.animation.enter", style="width: 100%")
				el-option(v-for="item in animation", :key="item.value", :value="item.value", :label="item.label")
		el-form-item(label="时长")
			d-input(v-model="currentWidget.animation.duration", format="number")
				template(slot="append") ms
		el-form-item(label="延迟")
			d-input(v-model="currentWidget.animation.delay", format="number")
				template(slot="append") ms
</template>
<script lang="ts">
import { reactive, toRefs } from '@vue/composition-api'
import Manager from '@/core/Manager'
import currentWidget from './currentWidget'
import animation from '@/config/animation'

export default {
	setup() {
		const manager: Manager = Manager.Instance()
		const state = reactive({ manager })

		return {
			...toRefs(state),
			currentWidget,
			animation,
		}
	},
}
</script>
