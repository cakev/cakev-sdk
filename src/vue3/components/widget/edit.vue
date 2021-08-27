<template lang="pug">
vdr(
	:id="$attrs.id",
	:x="$attrs.x",
	:y="$attrs.y",
	:w="$attrs.width",
	:h="$attrs.height",
	:draggable="!$attrs.lock && manager.screen.currentWidgets.includes($attrs.id) && !manager.temporary.editorContentDrag",
	:active="manager.screen.currentWidgets.includes($attrs.id)",
	:z="style({ ...$attrs, ...$props }).zIndex",
	:scale-ratio="manager.temporary.zoom",
	:snap="true",
	@refLineParams="refLineParams",
	@dragstop="dragStop",
	@contextmenu.stop.prevent="contextmenu($event, $attrs)",
	@resizestop="resizeStop")
	dorring-widget(v-bind="{ ...manager.screen.currentScreen.widgets[$attrs.id], ...$attrs, ...$props }")
</template>
<script lang="ts">
import { reactive, toRefs, defineComponent } from 'vue'
import Manager from '@/core/Manager'
import vdr from '@/vue3/components-style/d-vdr/index.vue'
import style from './style'
import resizeStop from './resizeStop'
import dragStop from './dragStop'
import refLineParams from './refLineParams'
import contextmenu from './contextmenu'
import clickOutSide from './clickOutSide'

export default defineComponent({
	name: 'dorring-widget-edit',
	components: { vdr },
	props: {
		readonly: {
			default: true,
			type: Boolean,
		},
	},
	setup() {
		const manager: Manager = Manager.Instance()
		const state = reactive({ manager })

		return {
			...toRefs(state),
			style,
			resizeStop,
			dragStop,
			refLineParams,
			contextmenu,
			clickOutSide,
		}
	},
})
</script>
