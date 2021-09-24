<template lang="pug">
.editor-content.pos-a#editor-content(:style="style")
	template(v-for="widget in manager.screen.sceneWidgetsBySortList")
		dorring-widget(
			v-if="!manager.screen.currentScreen.widgets[widget.id].hide",
			v-bind="{ ...widget, ...manager.screen.currentScreen.widgets[widget.id]}")
</template>
<script lang="ts">
import Manager from '@dorring/sdk/core/Manager'
import { onBeforeMount, reactive, toRefs, defineComponent, computed } from 'vue'
import widgetEdit from '@dorring/sdk/vue3/components/widget/edit.vue'

export default defineComponent({
	name: 'dorring-preview',
	components: {
		widgetEdit,
	},
	setup() {
		const manager: Manager = Manager.Instance()
		const state = reactive({ manager })

		onBeforeMount(() => {
			state.manager.screenCache.get('screen-preview').then(res => {
				const id = Math.random().toString(16).replace('.', '')
				state.manager.screen.createScreen(id, res)
				state.manager.screen.selectScreenByIndex(state.manager.screen.screenList.length - 1)
			})
		})

		const style = computed(() => {
			if (state.manager.screen.currentScreen) {
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
			}
			return {}
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
