<template lang="pug">
.editor-content.pos-a(ref="editor-content", :style="style")
	widget-edit(
		v-for="item in manager.screen.sceneWidgetsBySortList",
		:key="item.id",
		v-bind="{ ...item, ...manager.screen.currentScreen.widgets[item.id] }",
		:readonly="false")
	span(
		v-for="item in manager.temporary.vLine",
		v-show="item.display",
		:style="{ left: item.position, top: item.origin, height: item.lineLength }")
	span(
		v-for="item in manager.temporary.hLine",
		v-show="item.display",
		:style="{ top: item.position, left: item.origin, width: item.lineLength }")
</template>
<script lang="ts">
import Manager from '@/core/Manager'
import { onMounted, reactive, toRefs, watch } from '@vue/composition-api'
import widgetEdit from '@/vue2/components/widget/edit.vue'
import style from './style'
import resetZoom from './resetZoom'
import resetStyle from './resetStyle'

export default {
	components: {
		widgetEdit,
	},
	// @ts-ignore
	setup(props, context) {
		const manager: Manager = Manager.Instance()
		const state = reactive({ manager })

		onMounted(() => {
			resetZoom(context)
		})

		watch(
			() => [manager.screen.currentScreen.width, manager.screen.currentScreen.height],
			() => {
				resetZoom(context)
			},
		)

		watch(
			() => [manager.temporary.zoom, manager.temporary.offsetY, manager.temporary.offsetX],
			() => {
				resetStyle(context)
			},
		)

		return {
			...toRefs(state),
			style,
		}
	},
}
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
