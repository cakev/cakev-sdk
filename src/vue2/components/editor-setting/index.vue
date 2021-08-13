<template lang="pug">
el-form(label-width="100px")
	el-form-item(label="屏幕大小")
		el-select(v-model="size", style="width: 100%")
			el-option(value="1920*1080", label="大屏推荐尺寸1920*1080")
			el-option(value="1366*768", label="web最常见尺寸1366*768")
			el-option(value="1024*768", label="web最小尺寸1024*768")
			el-option(value="custom", label="自定义")
	el-form-item
		d-input(v-model="manager.screen.currentScreen.width", style="width: 120px")
			template(slot="append") W
		d-input(v-model="manager.screen.currentScreen.height", style="width: 120px; margin-left: 10px;")
			template(slot="append") H
	el-form-item(label="背景色")
		el-color-picker(v-model="manager.screen.currentScreen.backgroundColor")
	el-form-item(label="适配方式", style="width: 100%")
		el-select(v-model="manager.screen.currentScreen.layoutMode")
			el-option(value="full-size", label="充满页面")
			el-option(value="full-width", label="100%宽度")
			el-option(value="full-height", label="100%高度")
</template>
<script lang="ts">
import { reactive, toRefs } from '@vue/composition-api'
import Manager from '@/core/Manager'
import size from './size'

export default {
	setup() {
		const manager: Manager = Manager.Instance()
		const state = reactive({ manager })

		return {
			...toRefs(state),
			size,
		}
	},
}
</script>
