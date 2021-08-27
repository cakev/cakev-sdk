<template lang="pug">
el-container.editor.fn-flex.flex-column(@contextmenu.prevent @click="click")
	editor-header
	el-container
		el-aside
			editor-widgets-list
		el-divider.divider(direction="vertical")
		el-aside(width="240px")
			editor-scene(v-if="manager.screen.currentScreen")
		el-divider.divider(direction="vertical")
		editor-main
		el-divider.divider(direction="vertical")
		el-aside(width="300px", v-if="manager.screen.currentScreen")
			setting-widget(v-if="manager.screen.currentWidgets.length === 1")
			setting-editor(v-if="manager.screen.currentWidgets.length === 0")
</template>
<script lang="ts">
import { reactive, toRefs, defineComponent } from 'vue'
import Manager from '@/core/Manager'
import editorMain from '@/vue3/components/editor-main/index.vue'
import settingEditor from '@/vue3/components/setting-editor/index.vue'
import editorHeader from '@/vue3/components/editor-header/index.vue'
import editorWidgetsList from '@/vue3/components/editor-widgets-list/index.vue'
import settingWidget from '@/vue3/components/setting-widget/index.vue'
import editorScene from '@/vue3/components/editor-scene/index.vue'

export default defineComponent({
	name: 'editor',
	components: {
		settingEditor,
		editorHeader,
		editorWidgetsList,
		settingWidget,
		editorScene,
		editorMain,
	},
	setup() {
		const manager: Manager = Manager.Instance()
		const state = reactive({ manager })

		const click = () => {
			state.manager.temporary.clearRightMenu()
		}

		return {
			...toRefs(state),
			click,
		}
	},
})
</script>
<style lang="scss" scoped>
.editor {
	height: 100%;
}

.divider {
	height: 100%;
	margin: 0;
}
</style>
