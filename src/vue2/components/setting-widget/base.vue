<template lang="pug">
div
	d-setting-container
		template(slot="title")
			d-titles(:list="[{ label: '尺寸' }]")
		template(slot="content")
			el-form-item(label="位置")
				d-input(v-model="currentWidget.x", style="width: 90px", format="number")
					template(slot="append") X
				d-input(v-model="currentWidget.y", style="width: 90px; margin-left: 8px", format="number")
					template(slot="append") Y
			el-form-item(label="宽高")
				d-input(v-model="currentWidget.width", style="width: 90px", format="number")
					template(slot="append") W
				d-input(v-model="currentWidget.height", style="width: 90px; margin-left: 8px", format="number")
					template(slot="append") H
	d-setting-container
		template(slot="title")
			d-titles(:list="[{ label: '背景' }]")
		template(slot="content")
			el-form-item(label="背景色")
				d-color(v-model="currentWidget.backgroundColor")
</template>
<script lang="ts">
import { reactive, toRefs } from '@vue/composition-api'
import Manager from '@/core/Manager'
import currentWidget from './currentWidget'

export default {
	setup() {
		const manager: Manager = Manager.Instance()
		const state = reactive({ manager })

		return {
			...toRefs(state),
			currentWidget,
		}
	},
}
</script>
