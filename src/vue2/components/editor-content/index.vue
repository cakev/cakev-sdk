<template lang="pug">
.editor-content.pos-a(
	@drop="drop",
	@dragover.prevent,
	@click="cancelSelectWidget",
	ref="editor-content",
	:style="style(manager.screen.currentScreen)")
	widget-edit(
		v-for="widget in manager.screen.currentScreen.widgets",
		:key="widget.id",
		v-bind="widget",
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
import drop from './drop'
import Manager from '@/core/Manager'
import { onMounted, reactive, toRefs, watch } from '@vue/composition-api'
import widgetEdit from '@/vue2/components/widget/edit.vue'
import cancelSelectWidget from './cancelSelectWidget'
import style from './style'
import resetZoom from './resetZoom'

export default {
	components: {
		widgetEdit,
	},
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
		
		return {
			...toRefs(state),
			drop,
			cancelSelectWidget,
			style,
		}
	},
}
</script>
<style lang="scss" scoped>
.editor-content {
	height: 100%;
	transform-origin: 0 0 0;
	box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
	top: 0;
	left: 0;
}
</style>
