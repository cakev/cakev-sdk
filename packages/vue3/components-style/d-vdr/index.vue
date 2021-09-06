<template lang="pug">
.vdr.pos-a(
	:style="style",
	:ref="el => (dom['vdr'] = el)",
	:class="{ 'vdr-active': enabled, 'vdr-draggable': draggable, 'vdr-resizable': resizable }",
	@contextmenu.stop.prevent="contextmenu($event)",
	@mousedown="mouseDown")
	.vdr-line.pos-a
		.vdr-line-top.pos-a(:style="{ height: `${returnRatio}px` }")
		.vdr-line-bottom.pos-a(:style="{ height: `${returnRatio}px` }")
		.vdr-line-left.pos-a(:style="{ width: `${returnRatio}px` }")
		.vdr-line-right.pos-a(:style="{ width: `${returnRatio}px` }")
	template(v-for="handle in handles")
		.vdr-handle.circle(
			:key="handle",
			v-if="resizable && enabled",
			:class="['vdr-handle-' + handle]",
			:style="styleHandle(handle)",
			@mousedown.stop.prevent="handleDown($event, handle)")
			span(:style="{ borderWidth: `${returnRatio}px` }")
	slot
	.pos-a.vdr-size.text-center(:style="{bottom:`-${30*returnRatio}px`}" v-if="enabled")
		span(:style="styleSize") {{width}}x{{height}}
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, onBeforeUnmount, watch, computed } from 'vue'
import { off, on } from '@dorring/sdk/vue3/utils/dom'
import _mouseUp from './mouseUp'
import styleHandle from './styleHandle'
import handleDown from './handleDown'
import _mouseDown from './mouseDown'
import _mouseMove from './mouseMove'
import contextmenu from './contextmenu'
import props from './props'
import Manager from '@dorring/sdk/core/Manager'

export default defineComponent({
	name: 'd-vdr',
	props,
	setup(props) {
		const manager: Manager = Manager.Instance()
		const state = reactive({
			manager,
			handles: ['tl', 'tm', 'tr', 'mr', 'br', 'bm', 'bl', 'ml'],
			dom: {},
			left: props.x,
			top: props.y,
			width: props.w,
			height: props.h,
			aspectFactor: props.w / props.h,
			handle: '',
			enabled: props.active,
			resizing: false,
		})
		const mouseDown = e => _mouseDown(e, state, props)
		const mouseMove = e => _mouseMove(e, state, props)
		const mouseUp = () => _mouseUp(state, props)
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
			},
		)

		watch(
			() => [props.x, props.y, props.w, props.h],
			(val: Array<number>) => {
				if (state.resizing || state.manager.screen.currentWidgetDragging[props.id]) {
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

		const returnRatio = computed(() => {
			return props.scaleRatio < 1 ? 1 / props.scaleRatio : 1
		})

		const styleSize = computed(() => {
			const returnRatio = props.scaleRatio < 1 ? 1 / props.scaleRatio : 1
			return {
				fontSize: `${12 * returnRatio}px`,
				borderRadius: `${2 * returnRatio}px`,
				padding: `0 ${4 * returnRatio}px`,
			}
		})

		return {
			...toRefs(state),
			styleHandle: handle => styleHandle(handle, state, props),
			handleDown: (e, handle) => handleDown(e, handle, state),
			mouseDown,
			contextmenu: e => contextmenu(e, props.id),
			style,
			styleSize,
			returnRatio,
		}
	},
})
</script>
<style lang="scss" scoped>
.vdr {
	top: 0;
	left: 0;
	&.vdr-active,
	&:hover {
		.vdr-line-top,
		.vdr-line-bottom,
		.vdr-line-left,
		.vdr-line-right {
			background-color: var(--el-color-primary);
		}
	}
}
.vdr-size {
	bottom: -30px;
	width: 100%;
	span {
		background-color: var(--el-color-primary);
		color: #fff;
	}
}
.vdr-handle {
	position: absolute;
	span {
		width: 50%;
		height: 50%;
		position: absolute;
		left: 25%;
		background-color: #fff;
		top: 25%;
		border: 1px solid var(--el-color-primary);
	}
}

.vdr-handle-tl {
	cursor: nw-resize;
}

.vdr-handle-tm {
	cursor: n-resize;
	width: 70% !important;
	left: 15% !important;
	span {
		border: none;
		background-color: transparent;
	}
}

.vdr-handle-tr {
	cursor: ne-resize;
}

.vdr-handle-ml {
	cursor: w-resize;
	height: 70% !important;
	top: 15% !important;
	span {
		border: none;
		background-color: transparent;
	}
}

.vdr-handle-mr {
	cursor: e-resize;
	height: 70% !important;
	top: 15% !important;
	span {
		border: none;
		background-color: transparent;
	}
}

.vdr-handle-bl {
	cursor: sw-resize;
}

.vdr-handle-bm {
	cursor: s-resize;
	width: 70% !important;
	left: 15% !important;
	span {
		border: none;
		background-color: transparent;
	}
}

.vdr-handle-br {
	cursor: se-resize;
}

.vdr-line {
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}

.vdr-line-top {
	top: 0;
	left: 0;
	width: 100%;
	height: 1px;
}

.vdr-line-bottom {
	bottom: 0;
	left: 0;
	width: 100%;
	height: 1px;
}

.vdr-line-left {
	top: 0;
	left: 0;
	width: 1px;
	height: 100%;
}

.vdr-line-right {
	top: 0;
	right: 0;
	width: 1px;
	height: 100%;
}
</style>
