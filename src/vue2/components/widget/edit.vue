<template lang="pug">
vdr.cursor-move(
	:x="$attrs.x",
	:y="$attrs.y",
	:w="$attrs.width",
	:h="$attrs.height",
	:active="manager.screen.currentWidgets.includes($attrs.id)",
	:z="style({ ...$attrs, ...$props }).zIndex",
	:scale-ratio="manager.temporary.zoom",
	:snap="true",
	@click.native.stop="selectWidgetById($attrs.id)",
	@refLineParams="refLineParams",
	class-name-handle="vdr-handles",
	@dragstop="dragStop",
	@contextmenu.native.stop.prevent="contextmenu($event, $attrs.id)",
	@resizestop="resizeStop")
	div(slot="tl") 😀
	div(slot="tm") 😀
	div(slot="tr") 😀
	div(slot="mr") 😀
	div(slot="br") 😀
	div(slot="bm") 😀
	div(slot="bl") 😀
	div(slot="ml") 😀
	component.pos-a(:id="$attrs.id", :is="$attrs.type", v-bind="{ ...$attrs }", :style="style({ ...$attrs, ...$props })")
</template>
<script lang="ts">
import { reactive, toRefs } from '@vue/composition-api'
import Manager from '@/core/Manager'
import style from './style'
import selectWidgetById from './selectWidgetById'
// @ts-ignore
import vdr from 'vue-draggable-resizable-gorkys'
import 'vue-draggable-resizable-gorkys/dist/VueDraggableResizable.css'
import resizeStop from './resizeStop'
import dragStop from './dragStop'
import refLineParams from './refLineParams'
import contextmenu from './contextmenu'

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
			selectWidgetById,
			resizeStop,
			dragStop,
			refLineParams,
			contextmenu,
		}
	},
}
</script>
<style lang="scss" scoped>
::v-deep {
	.vdr-handles {
		position: absolute;
		border: 1px solid black;
		border-radius: 50%;
		height: 14px;
		width: 14px;
		font-size: 1em;
		line-height: 1em;
		box-sizing: border-box;
		transition: all 0.3s linear;
	}
	.vdr-handles-tr,
	.vdr-handles-mr,
	.vdr-handles-br,
	.vdr-handles-tm,
	.vdr-handles-tl,
	.vdr-handles-ml,
	.vdr-handles-bl,
	.vdr-handles-bm {
		&:hover {
			transform: scale(1.4);
		}
	}
	.vdr-handles-tr {
		cursor: ne-resize !important;
	}
	.vdr-handles-mr {
		cursor: e-resize !important;
	}
	.vdr-handles-br {
		cursor: se-resize !important;
	}
	.vdr-handles-tm {
		cursor: n-resize !important;
	}
	.vdr-handles-tl {
		cursor: nw-resize !important;
	}
	.vdr-handles-ml {
		cursor: w-resize !important;
	}
	.vdr-handles-bl {
		cursor: sw-resize !important;
	}
	.vdr-handles-bm {
		cursor: s-resize !important;
	}
}
</style>
