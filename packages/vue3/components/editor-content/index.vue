<template lang="pug">
.editor-content.pos-a#editor-content(:style="style")
	template(v-for="widget in manager.screen.sceneWidgetsBySortList")
		widget-edit(
			v-if="!manager.screen.currentScreen.widgets[widget.id].hide",
			:key="widget.id",
			v-bind="{ ...widget, ...manager.screen.currentScreen.widgets[widget.id] }",
			:readonly="false")
</template>
<script lang="ts">
import Manager from '@dorring/sdk/core/Manager'
import { onMounted, reactive, toRefs, watch, defineComponent, computed } from 'vue'
import widgetEdit from '@dorring/sdk/vue3/components/widget/edit.vue'
import resetZoom from './resetZoom'
import resetStyle from './resetStyle'

export default defineComponent({
	name: 'editor-content',
	components: {
		widgetEdit,
	},
	setup() {
		const manager: Manager = Manager.Instance()
		const state = reactive({ manager })

		onMounted(() => {
			resetZoom()
		})

		watch(
			() => [state.manager.screen.currentScreen.width, state.manager.screen.currentScreen.height],
			() => {
				resetZoom()
			},
		)

		watch(
			() => [state.manager.temporary.zoom, state.manager.temporary.offsetY, state.manager.temporary.offsetX],
			() => {
				resetStyle()
			},
		)

		const style = computed(() => {
			let backgroundColor = state.manager.screen.currentScreen.backgroundColor
			let resultColor = ''
			if (backgroundColor.length > 1) {
				resultColor = `linear-gradient(${
					state.manager.screen.currentScreen.gradientDirection
				}deg, ${backgroundColor.toString()})`
			} else {
				resultColor = state.manager.screen.currentScreen.backgroundColor[0]
			}
			return {
				[backgroundColor.length > 1 ? 'background-image' : 'background-color']: resultColor,
				width: state.manager.screen.currentScreen.width + 'px',
				height: state.manager.screen.currentScreen.height + 'px',
			}
		})

		return {
			...toRefs(state),
			style,
		}
	},
})
</script>
<style lang="scss" scoped>
.editor-content {
	top: 0;
	left: 0;
	height: 100%;
	box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
	transform-origin: 0 0 0;
}
</style>
