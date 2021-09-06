<template lang="pug">
.d-drag-content.fn-flex.flex-column(@mousemove.stop="mousemove", @mouseup.stop="mouseup")
	.d-drag-content-top(:ref="el => (dom['top'] = el)", :style="{ height: `${topMinHeight}px` }")
		slot(name="top")
	.d-drag-content-line(@mousedown.stop.prevent="mousedown")
	.d-drag-content-bottom(:ref="el => (dom['bottom'] = el)", :style="{ height: `calc(100% - ${topMinHeight + 9}px)` }")
		slot(name="bottom")
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
	name: 'd-drag-content',
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
	setup(props) {
		const state = reactive({ dom: {}, drag: false, startX: 0, startY: 0 })
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
				const topH = state.dom['top'].offsetHeight
				const bottomH = state.dom['bottom'].offsetHeight
				if (topH + diffY < props.topMinHeight) {
					state.dom['top'].style.height = props.topMinHeight + 'px'
					state.dom['bottom'].style.height = `calc(100% - ${props.topMinHeight}px)`
				} else if (bottomH - diffY < props.bottomMinHeight) {
					state.dom['top'].style.height = `calc(100% - ${props.bottomMinHeight}px)`
					state.dom['bottom'].style.height = props.bottomMinHeight + 'px'
				} else {
					state.dom['top'].style.height = topH + diffY + 'px'
					state.dom['bottom'].style.height = bottomH - diffY + 'px'
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
})
</script>
<style lang="scss" scoped>
.d-drag-content-top,
.d-drag-content-bottom {
	overflow-x: hidden;
	overflow-y: auto;
	overscroll-behavior: contain;

	&::-webkit-scrollbar {
		display: none;
		width: 0 !important;
		margin-right: 4px;
		-webkit-appearance: none;
	}
}

.d-drag-content {
	width: 100%;
	height: 100%;
}

.d-drag-content-line {
	padding: 4px 0;
	cursor: ns-resize;
	border-bottom: 1px solid #e5e5e5;
}
</style>
