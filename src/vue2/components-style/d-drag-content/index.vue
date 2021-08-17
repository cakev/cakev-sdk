<template lang="pug">
.d-drag-content.fn-flex.flex-column(@mousemove.stop="mousemove", @mouseup.stop="mouseup")
	.d-drag-content-top(ref="top", :style="{ height: `${topMinHeight}px` }")
		slot(name="top")
	.d-drag-content-line(@mousedown.stop.prevent="mousedown")
	.d-drag-content-bottom(ref="bottom", :style="{ height: `calc(100% - ${topMinHeight + 9}px)` }")
		slot(name="bottom")
</template>
<script lang="ts">
import { reactive, toRefs } from '@vue/composition-api'
export default {
	props: {
		topMinHeight: {
			default: 100,
			type: Number,
		},
		bottomMinHeight: {
			default: 100,
			type: Number,
		},
	},
	setup(props, context) {
		const state = reactive({ drag: false, startX: 0, startY: 0 })
		const mousedown = (e: MouseEvent) => {
			state.drag = true
			state.startY = e.clientY
			state.startX = e.clientX
		}
		const mouseup = () => {
			state.drag = false
		}
		const mousemove = (e: MouseEvent) => {
			if (state.drag) {
				const diffY = e.clientY - state.startY
				const topH = context.refs.top.offsetHeight
				const bottomH = context.refs.bottom.offsetHeight
				if (topH + diffY < props.topMinHeight) {
					context.refs.top.style.height = props.topMinHeight + 'px'
					context.refs.bottom.style.height = `calc(100% - ${props.topMinHeight}px)`
				} else if (bottomH - diffY < props.bottomMinHeight) {
					context.refs.top.style.height = `calc(100% - ${props.bottomMinHeight}px)`
					context.refs.bottom.style.height = props.bottomMinHeight + 'px'
				} else {
					context.refs.top.style.height = topH + diffY + 'px'
					context.refs.bottom.style.height = bottomH - diffY + 'px'
				}
				state.startY = e.clientY
			}
		}
		return {
			...toRefs(state),
			mousedown,
			mousemove,
			mouseup,
		}
	},
}
</script>
<style lang="scss" scoped>
.d-drag-content-top,
.d-drag-content-bottom {
	overflow-y: auto;
	overflow-x: hidden;
	overscroll-behavior: contain;
	&::-webkit-scrollbar {
		display: none;
	}
	&::-webkit-scrollbar {
		-webkit-appearance: none;
		width: 7px;
		margin-right: 4px;
	}
	&::-webkit-scrollbar {
		width: 0 !important;
	}
	&::-webkit-scrollbar-thumb {
		border-radius: 4px;
		background-color: hsla(0, 0%, 100%, 0.4);
		box-shadow: 0 0 1px rgba(0, 0, 0, 0.4);
	}
}
.d-drag-content {
	height: 100%;
	width: 100%;
}
.d-drag-content-line {
	cursor: ns-resize;
	border-bottom: 1px solid #e5e5e5;
	padding: 4px 0;
}
</style>
