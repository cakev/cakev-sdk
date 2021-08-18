<template lang="pug">
.editor-setting
	.editor-setting-header.fn-flex.flex-row
		span 设计
	el-form.editor-setting-form(label-width="80px", label-position="left")
		el-form-item(label="屏幕大小")
			el-select(v-model="size", style="width: 100%")
				el-option(v-for="item in list", :key="item.value", :value="item.value", :label="item.label")
		el-form-item
			d-input(v-model="manager.screen.currentScreen.width", style="width: 90px", format="number")
				template(slot="append") W
			d-input(v-model="manager.screen.currentScreen.height", style="width: 90px; margin-left: 8px", format="number")
				template(slot="append") H
		el-form-item(label="背景色")
			el-color-picker(v-model="manager.screen.currentScreen.backgroundColor")
		el-form-item(label="适配方式", style="width: 100%")
			el-select(v-model="manager.screen.currentScreen.layoutMode")
				el-option(value="full-size", label="充满页面")
				el-option(value="full-width", label="100%宽度")
				el-option(value="full-height", label="100%高度")
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
import list from './list'

export default {
	setup() {
		const manager: Manager = Manager.Instance()
		const state = reactive({ list, manager })

		return {
			...toRefs(state),
			size,
		}
	},
}
</script>
<style lang="scss" scoped>
.editor-setting {
	font-size: 12px;
}
.editor-setting-header {
	padding: 4px 16px;
	align-items: center;
	height: 40px;
	span {
		font-weight: bold;
	}
}
.editor-setting-form {
	padding: 0 16px;
}
</style>
