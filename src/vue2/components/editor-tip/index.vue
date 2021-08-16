<template lang="pug">
.editor-content-tip.pos-a.fn-flex(:style="style") 按住空格可拖动画布 {{ manager.screen.currentScreen.width }}x{{ manager.screen.currentScreen.height }}
</template>
<script lang="ts">
import Manager from '@/core/Manager'
import { reactive, toRefs } from '@vue/composition-api'
import style from './style'

export default {
	setup() {
		const manager: Manager = Manager.Instance()
		const state = reactive({ manager })
		return {
			...toRefs(state),
			style,
		}
	},
}
</script>
<style lang="scss" scoped>
.editor-content-tip {
	bottom: -30px;
	right: 0;
	font-size: 12px;
	line-height: 12px;
	height: 12px;
	color: #999;
}
</style>
