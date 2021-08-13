<template lang="pug">
el-container.editor
	el-header
		editor-tabs
	el-container
		el-aside
			editor-widgets-list
		el-divider.divider(direction="vertical")
		el-aside(width="160px")
			editor-scene(v-if="manager.screen.currentScreen")
		el-divider.divider(direction="vertical")
		el-main
			editor-content(v-if="manager.screen.currentScreen")
		el-divider.divider(direction="vertical")
		el-aside(width="350px", v-if="manager.screen.currentScreen")
			widget-setting(v-if="manager.screen.currentWidgets.length === 1")
			editor-setting(v-if="manager.screen.currentWidgets.length === 0")
</template>
<script lang="ts">
import { reactive, toRefs } from '@vue/composition-api'
import Manager from '@/core/Manager'
import editorSetting from '@/vue2/components/editor-setting/index.vue'
import editorTabs from '@/vue2/components/editor-tabs/index.vue'
import editorWidgetsList from '@/vue2/components/editor-widgets-list/index.vue'
import editorContent from '@/vue2/components/editor-content/index.vue'
import widgetSetting from '@/vue2/components/widget-setting/index.vue'
import editorScene from '@/vue2/components/editor-scene/index.vue'

export default {
	components: {
		editorSetting,
		editorTabs,
		editorWidgetsList,
		editorContent,
		widgetSetting,
		editorScene,
	},
	setup() {
		const manager: Manager = Manager.Instance()
		const state = reactive({ manager })

		return {
			...toRefs(state),
		}
	},
}
</script>
<style lang="scss" scoped>
.editor {
	height: 100%;
}
.divider {
	height: 100%;
}
</style>
