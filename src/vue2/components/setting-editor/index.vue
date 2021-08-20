<template lang="pug">
.setting-editor
	d-titles(:list="[{ label: '设计' }]")
	d-setting-container
		template(slot="title")
			d-titles(:list="[{ label: '尺寸' }]")
		template(slot="content")
			el-form-item(label="屏幕大小")
				el-select(v-model="size", style="width: 100%")
					el-option(v-for="item in screenSize", :key="item.value", :value="item.value", :label="item.label")
			el-form-item
				d-input(v-model="manager.screen.currentScreen.width", style="width: 90px", format="number")
					template(slot="append") W
				d-input(v-model="manager.screen.currentScreen.height", style="width: 90px; margin-left: 8px", format="number")
					template(slot="append") H
	d-setting-container
		template(slot="title")
			d-titles(:list="[{ label: '背景' }]")
		template(slot="content")
			el-form-item(label="背景色")
				d-color(v-model="manager.screen.currentScreen.backgroundColor")
	d-setting-container
		template(slot="title")
			d-titles(:list="[{ label: '其他' }]")
		template(slot="content")
			el-form-item(label="适配方式", style="width: 100%")
				el-select(v-model="manager.screen.currentScreen.layoutMode")
					el-option(:value="item.value", :label="item.label", v-for="item in layoutMode")
			el-form-item(label="首场景", style="width: 100%")
				el-select(v-model="manager.screen.currentScreen.mainScene")
					el-option(
						:value="item.id",
						:label="item.name",
						v-for="item in Object.values(manager.screen.currentScreen.scenes)")
</template>
<script lang="ts">
import { reactive, toRefs } from '@vue/composition-api'
import Manager from '@/core/Manager'
import size from './size'
import screenSize from '@/config/screenSize'
import layoutMode from '@/config/layoutMode'

export default {
	setup() {
		const manager: Manager = Manager.Instance()
		const state = reactive({ manager })

		return {
			...toRefs(state),
			size,
			layoutMode,
			screenSize,
		}
	},
}
</script>
