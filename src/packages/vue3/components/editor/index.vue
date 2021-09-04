<template lang="pug">
el-container.editor.fn-flex.flex-column(@contextmenu.prevent @click="click")
	editor-header
	el-container(style="height:calc(100vh - 48px)")
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
import Manager from '@dorring-sdk/core/Manager'
import editorMain from '@dorring-sdk/vue3/components/editor-main/index.vue'
import settingEditor from '@dorring-sdk/vue3/components/setting-editor/index.vue'
import editorHeader from '@dorring-sdk/vue3/components/editor-header/index.vue'
import settingWidget from '@dorring-sdk/vue3/components/setting-widget/index.vue'
import editorScene from '@dorring-sdk/vue3/components/editor-scene/index.vue'

export default defineComponent({
	name: 'editor',
	components: {
		settingEditor,
		editorHeader,
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
