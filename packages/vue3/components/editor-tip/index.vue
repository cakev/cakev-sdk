<template lang="pug">
.editor-content-tip.pos-a.fn-flex(:style="style") 按住空格可拖动画布 {{ manager.screen.currentScreen.width }}x{{ manager.screen.currentScreen.height }}
</template>
<script lang="ts">
import Manager from '@dorring/sdk/core/Manager'
import { reactive, toRefs, defineComponent } from 'vue'
import style from './style'

export default defineComponent({
	name: 'editor-tip',
	setup() {
		const manager: Manager = Manager.Instance()
		const state = reactive({ manager })
		return {
			...toRefs(state),
			style,
		}
	},
})
</script>
<style lang="scss" scoped>
.editor-content-tip {
	right: 0;
	bottom: -30px;
	height: 12px;
	line-height: 12px;
	color: #999;
}
</style>
