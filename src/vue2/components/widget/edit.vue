<template lang="pug">
vdr.cursor-move(
	:id="$attrs.id",
	:x="$attrs.x",
	:y="$attrs.y",
	:w="$attrs.width",
	:h="$attrs.height",
	:active="manager.screen.currentWidgets.includes($attrs.id)",
	:z="style({ ...$attrs, ...$props }).zIndex",
	:scale-ratio="manager.temporary.zoom",
	:snap="true",
	@refLineParams="refLineParams",
	v-click-outside="clickOutSide",
	@dragstop="dragStop",
	@contextmenu.native.stop.prevent="contextmenu($event, $attrs)",
	@resizestop="resizeStop")
	div(slot="tl") 😀
	div(slot="tm") 😀
	div(slot="tr") 😀
	div(slot="mr") 😀
	div(slot="br") 😀
	div(slot="bm") 😀
	div(slot="bl") 😀
	div(slot="ml") 😀
	dorring-widget(v-bind="{ ...manager.screen.currentScreen.widgets[$attrs.id], ...$attrs, ...$props }")
</template>
<script lang="ts">
import { reactive, toRefs } from '@vue/composition-api'
import Manager from '@/core/Manager'
import vdr from '@/vue2/components-style/d-vdr/index.vue'
import style from './style'
import resizeStop from './resizeStop'
import dragStop from './dragStop'
import refLineParams from './refLineParams'
import contextmenu from './contextmenu'
import clickOutSide from './clickOutSide'

export default {
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
}
</script>
