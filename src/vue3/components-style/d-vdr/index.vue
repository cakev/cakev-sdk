<template lang="pug">
.vdr.pos-a(
	:style="style",
	:ref="el => (dom['vdr'] = el)",
	:class="{ classNameActive: enabled, classNameDragging: dragging, classNameResizing: resizing, classNameDraggable: draggable, classNameResizable: resizable }",
	@click.stop,
	@mousedown.stop.prevent="mouseDown")
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
import { off, getStyle, on } from '@/vue3/utils/dom'
import { restrictToBounds, snapToGrid } from './fns'
import resetBoundsAndMouseState from './resetBoundsAndMouseState'
import changeWidth from './changeWidth'
import changeHeight from './changeHeight'
import _mouseUp from './mouseUp'
import styleHandle from './styleHandle'
import handleDown from './handleDown'
import _mouseDown from './mouseDown'
import settingAttribute from './settingAttribute'
import _mouseMove from './mouseMove'
import props from './props'

// 禁止用户选取
const userSelectNone = {
	userSelect: 'none',
}
// 用户选中自动
const userSelectAuto = {
	userSelect: 'auto',
}

export default defineComponent({
	name: 'dorring-vdr',
	props,
	setup(props: any, { emit }) {
		const state = reactive({
			dom: {},
			left: props.x,
			top: props.y,
			right: null,
			bottom: null,
			width: null,
			height: null,
			widthTouched: false,
			heightTouched: false,
			aspectFactor: null,
			parentWidth: null,
			parentHeight: null,
			minW: props.minWidth,
			minH: props.minHeight,
			maxW: props.maxWidth,
			maxH: props.maxHeight,
			handle: null,
			enabled: props.active,
			resizing: false,
			dragging: false,
			zIndex: props.z,
			bounds: {
				minLeft: null,
				maxLeft: null,
				minRight: null,
				maxRight: null,
				minTop: null,
				maxTop: null,
				minBottom: null,
				maxBottom: null,
			},
		})
		const mouseDown = e => _mouseDown(e, state, props)
		const mouseMove = e => _mouseMove(e, state, props, emit)
		const mouseUp = () => _mouseUp(state, emit)
		onMounted(() => {
			if (props.maxWidth && props.minWidth > props.maxWidth)
				console.warn('[Vdr warn]: Invalid prop: minWidth cannot be greater than maxWidth')
			if (props.maxWidth && props.minHeight > props.maxHeight)
				console.warn('[Vdr warn]: Invalid prop: minHeight cannot be greater than maxHeight')
			resetBoundsAndMouseState(state)
			const width = getStyle(state.dom['vdr'], 'width')
			const height = getStyle(state.dom['vdr'], 'height')
			state.aspectFactor = (props.w !== 'auto' ? props.w : width) / (props.h !== 'auto' ? props.h : height)
			state.width = props.w !== 'auto' ? props.w : width
			state.height = props.h !== 'auto' ? props.h : height
			state.right = -state.width - state.left
			state.bottom = -state.height - state.top
			settingAttribute(state)
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
			() => props.z,
			(val: string | number) => {
				val >= 0 || val === 'auto' ? (state.zIndex = val) : void 0
			},
		)

		watch(
			() => props.x,
			(val: number) => {
				if (state.resizing || state.dragging) {
					return
				}
				const [deltaX, _] = snapToGrid(val, state.top, props.scale)
				const left = restrictToBounds(deltaX, state.bounds.minLeft, state.bounds.maxLeft)
				state.left = left
				state.right = state.parentWidth - state.width - left
			},
		)

		watch(
			() => props.y,
			(val: number) => {
				if (state.resizing || state.dragging) {
					return
				}
				const [_, deltaY] = snapToGrid(state.left, val, props.scale)
				const top = restrictToBounds(deltaY, state.bounds.minTop, state.bounds.maxTop)
				state.top = top
				state.bottom = state.parentHeight - state.height - top
			},
		)

		watch(
			() => props.w,
			val => {
				if (state.resizing || state.dragging) {
					return
				}
				changeWidth(val, state)
			},
		)
		watch(
			() => props.h,
			val => {
				if (state.resizing || state.dragging) {
					return
				}
				changeHeight(val, state)
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
		watch(
			() => props.minWidth,
			(val: number) => {
				if (val > 0 && val <= state.width) {
					state.minW = val
				}
			},
		)
		watch(
			() => props.minHeight,
			(val: number) => {
				if (val > 0 && val <= state.height) {
					state.minH = val
				}
			},
		)
		watch(
			() => props.maxWidth,
			val => {
				state.maxW = val
			},
		)
		watch(
			() => props.maxHeight,
			val => {
				state.maxH = val
			},
		)
		const style = computed(() => {
			return {
				transform: `translate3d(${state.left}px, ${state.top}px, 0)`,
				width: props.w === 'auto' ? (!state.widthTouched ? 'auto' : state.width + 'px') : state.width + 'px',
				height:
					props.h === 'auto' ? (!state.heightTouched ? 'auto' : state.height + 'px') : state.height + 'px',
				zIndex: state.zIndex,
				...(state.dragging && props.disableUserSelect ? userSelectNone : userSelectAuto),
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

.ref-line {
	position: absolute;
	z-index: 9999;
	background-color: rgb(255, 0, 204);
}

.v-line {
	width: 1px;
}

.h-line {
	height: 1px;
}

@media only screen and (max-width: 768px) {
	[class*='handle-']::before {
		position: absolute;
		top: -10px;
		right: -10px;
		bottom: -10px;
		left: -10px;
		content: '';
	}
}
</style>
