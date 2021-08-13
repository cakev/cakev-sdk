<template lang="pug">
.pos-a.editor-bottom.fn-flex.flex-row
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
	height: 32px;
	width: 100%;
	background-color: #fff;
	align-items: center;
	border-top: 1px solid #DCDFE6;
	.icon-box {
		margin-left: auto;
		align-items: center;
		i,
		span {
			margin-right: 10px;
		}
		span {
			user-select: none;
			font-size: 12px;
			width: 30px;
		}
	}
}
</style>
