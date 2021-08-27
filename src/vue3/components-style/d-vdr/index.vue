<template lang="pug">
.vdr.pos-a(
	:style="style",
	:ref="el => (dom['vdr'] = el)",
	:class="{ classNameActive: enabled, classNameDragging: dragging, classNameResizing: resizing, classNameDraggable: draggable, classNameResizable: resizable }",
	@click.stop,
	@mousedown.capture="mouseDown")
	template(v-for="handle in handles")
		div(
			:key="handle",
			v-if="resizable && enabled",
			:class="[classNameHandle, classNameHandle + '-' + handle]",
			:style="styleHandle(handle)",
			@mousedown.stop.prevent="handleDown($event, handle)")
			slot(:name="handle")
	slot
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, onBeforeUnmount, watch, computed } from 'vue'
import { off, on } from '@/vue3/utils/dom'
import _mouseUp from './mouseUp'
import styleHandle from './styleHandle'
import handleDown from './handleDown'
import _mouseDown from './mouseDown'
import _mouseMove from './mouseMove'
import props from './props'

export default defineComponent({
	name: 'dorring-vdr',
	props,
	setup(props: any, { emit }) {
		const state = reactive({
			dom: {},
			left: props.x,
			top: props.y,
			width: props.w,
			height: props.h,
			aspectFactor: props.w / props.h,
			handle: '',
			enabled: props.active,
			resizing: false,
			dragging: false,
			clientX: 0,
			clientY: 0,
		})
		const mouseDown = e => _mouseDown(e, state, props)
		const mouseMove = e => _mouseMove(e, state, props, emit)
		const mouseUp = () => _mouseUp(state, emit)
		onMounted(() => {
			on(document.documentElement, 'mousemove', mouseMove)
			on(document.documentElement, 'mouseup', mouseUp)
		})
		onBeforeUnmount(() => {
			off(document.documentElement, 'mousemove', mouseMove)
			off(document.documentElement, 'mouseup', mouseUp)
		})

		watch(
			() => props.active,
			(val: boolean) => {
				state.enabled = val
				val ? emit('activated') : emit('deactivated')
			},
		)

		watch(
			() => [props.x, props.y, props.w, props.h],
			(val: Array<number>) => {
				if (state.resizing || state.dragging) {
					return
				}
				state.left = val[0]
				state.top = val[1]
				state.width = val[2]
				state.height = val[3]
			},
		)

		watch(
			() => props.lockAspectRatio,
			val => {
				if (val) {
					state.aspectFactor = state.width / state.height
				} else {
					state.aspectFactor = undefined
				}
			},
		)
		const style = computed(() => {
			return {
				transform: `translate3d(${state.left}px, ${state.top}px, 0)`,
				width: state.width + 'px',
				height: state.height + 'px',
				zIndex: props.z,
			}
		})
		return {
			...toRefs(state),
			styleHandle: handle => styleHandle(handle, state, props),
			handleDown: (e, handle) => handleDown(e, handle, state),
			style,
			mouseDown,
		}
	},
})
</script>
<style lang="scss" scoped>
.vdr {
	top: 0;
	left: 0;
}
.handle {
	position: absolute;
	box-sizing: border-box;
	width: 14px;
	height: 14px;
	font-size: 1em;
	line-height: 1em;
	border: 1px solid black;
	border-radius: 50%;
	transition: all 0.3s linear;
}

.handle-tl {
	top: -5px;
	left: -5px;
	cursor: nw-resize;
}

.handle-tm {
	top: -5px;
	left: calc(50% - 4px);
	cursor: n-resize;
}

.handle-tr {
	top: -5px;
	right: -5px;
	cursor: ne-resize;
}

.handle-ml {
	top: calc(50% - 4px);
	left: -5px;
	cursor: w-resize;
}

.handle-mr {
	top: calc(50% - 4px);
	right: -5px;
	cursor: e-resize;
}

.handle-bl {
	bottom: -5px;
	left: -5px;
	cursor: sw-resize;
}

.handle-bm {
	bottom: -5px;
	left: calc(50% - 4px);
	cursor: s-resize;
}

.handle-br {
	right: -5px;
	bottom: -5px;
	cursor: se-resize;
}

.handle-tr,
.handle-mr,
.handle-br,
.handle-tm,
.handle-tl,
.handle-ml,
.handle-bl,
.handle-bm {
	&:hover {
		transform: scale(1.4);
	}
}
</style>
