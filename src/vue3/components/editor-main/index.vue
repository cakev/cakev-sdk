<template lang="pug">
el-main.pos-r.editor-container(
	:style="style",
	@wheel.stop.prevent="wheel",
	@click.self="clickSelf",
	@mousedown="mousedown",
	@mouseup.capture="mouseup",
	@mousemove.capture="mousemove",
	@drop.prevent="drop",
	@dragover.prevent,)
	editor-content(v-if="manager.screen.currentScreen" @click.self="clickSelf",)
	editor-tip(v-if="manager.screen.currentScreen")
	contextmenu-widget(v-if="manager.temporary.widgetRightMenu")
	contextmenu-widgets(v-if="manager.temporary.widgetsRightMenu")
</template>
<script lang="ts">
import { reactive, toRefs, defineComponent, onMounted, onBeforeUnmount } from 'vue'
import Manager from '@/core/Manager'
import settingEditor from '@/vue3/components/setting-editor/index.vue'
import editorHeader from '@/vue3/components/editor-header/index.vue'
import editorWidgetsList from '@/vue3/components/editor-widgets-list/index.vue'
import editorContent from '@/vue3/components/editor-content/index.vue'
import settingWidget from '@/vue3/components/setting-widget/index.vue'
import editorScene from '@/vue3/components/editor-scene/index.vue'
import editorTip from '@/vue3/components/editor-tip/index.vue'
import contextmenuWidget from '@/vue3/components/contextmenu-widget/index.vue'
import contextmenuWidgets from '@/vue3/components/contextmenu-widgets/index.vue'
import { on, off } from '@/vue3/utils/dom'
import drop from './drop'
import wheel from './wheel'
import style from './style'
import mousedown from './mousedown'
import mousemove from './mousemove'

export default defineComponent({
	name: 'editor',
	components: {
		settingEditor,
		editorHeader,
		editorWidgetsList,
		editorContent,
		settingWidget,
		editorScene,
		editorTip,
		contextmenuWidget,
		contextmenuWidgets,
	},
	setup() {
		const manager: Manager = Manager.Instance()
		const state = reactive({ manager, dom: {} })

		const keydown = e => {
			if (e.keyCode === 32) {
				state.manager.temporary.editorContentDrag = true
			}
		}

		const keyup = () => {
			state.manager.temporary.editorContentDragging = false
			state.manager.temporary.editorContentDrag = false
		}

		const clickSelf = () => {
			state.manager.screen.cancelSelectWidget()
		}

		const mouseup = () => {
			state.manager.temporary.editorContentDragging = false
		}

		onMounted(() => {
			on(document.documentElement, 'keyup', keyup)
			on(document.documentElement, 'keydown', keydown)
		})

		onBeforeUnmount(() => {
			off(document.documentElement, 'keyup', keyup)
			off(document.documentElement, 'keydown', keydown)
		})

		return {
			...toRefs(state),
			drop,
			wheel,
			style,
			keyup,
			mousedown,
			mouseup,
			mousemove,
			clickSelf,
		}
	},
})
</script>
<style lang="scss" scoped>
.editor-container {
	overflow: hidden;
	background-color: #ddd;
	outline: none;
}
</style>
