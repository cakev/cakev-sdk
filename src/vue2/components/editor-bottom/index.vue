<template lang="pug">
.pos-a.editor-bottom.fn-flex.flex-row
	.left-box
		span {{ manager.screen.currentScene.name }}
	.icon-box.fn-flex
		i.el-icon-zoom-out.cursor-pointer(@click="zoomOut")
		span.text-center {{ Math.round(manager.temporary.zoom * 100) }}%
		i.el-icon-zoom-in.cursor-pointer(@click="zoomIn")
</template>
<script lang="ts">
import Manager from '@/core/Manager'
import { reactive, toRefs } from '@vue/composition-api'

export default {
	setup() {
		const manager: Manager = Manager.Instance()
		const state = reactive({ manager })

		const zoomIn = () => {
			manager.temporary.zoomIn()
		}
		const zoomOut = () => {
			manager.temporary.zoomOut()
		}
		return {
			...toRefs(state),
			zoomIn,
			zoomOut,
		}
	},
}
</script>
<style lang="scss" scoped>
.editor-bottom {
	bottom: 0;
	left: 0;
	align-items: center;
	width: 100%;
	height: 32px;
	background-color: #fff;
	border-top: 1px solid #dcdfe6;

	.left-box {
		margin-left: 10px;

		span {
			font-size: 12px;
			user-select: none;
		}
	}

	.icon-box {
		align-items: center;
		margin-left: auto;

		i,
		span {
			margin-right: 10px;
		}

		span {
			width: 30px;
			font-size: 12px;
			user-select: none;
		}
	}
}
</style>
