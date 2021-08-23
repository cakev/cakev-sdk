<template lang="pug">
vdr.cursor-move(
	:id="$attrs.id",
	:x="$attrs.x",
	:y="$attrs.y",
	:w="$attrs.width",
	:h="$attrs.height",
	:draggable="!$attrs.lock",
	:active="manager.screen.currentWidgets.includes($attrs.id)",
	:z="style({ ...$attrs, ...$props }).zIndex",
	:scale-ratio="manager.temporary.zoom",
	:snap="true",
	@refLineParams="refLineParams",
	@dragstop="dragStop",
	@contextmenu.stop.prevent="contextmenu($event, $attrs)",
	@resizestop="resizeStop")
	template(#tl) 😀
	template(#tm) 😀
	template(#tr) 😀
	template(#mr) 😀
	template(#br) 😀
	template(#bm) 😀
	template(#bl) 😀
	template(#ml) 😀
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
