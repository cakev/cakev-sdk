<template lang="pug">
.scene-container(:style="{ zIndex }", @animationend.self="animationend")
	slot
</template>
<script lang="ts">
import Editor from '@/core/Editor'

export default {
	name: 'd-scene',
	props: {
		zIndex: {},
		sceneId: {},
	},
	data() {
		return {
			editor: Editor.Instance(),
		}
	},
	methods: {
		animationend(): void {
			if (this.editor.current.activeWidgetId) {
				// 打开场景
				this.$emit('sceneLoaded')
			} else {
				// 关闭场景
				this.$emit('beforeSceneDestroy')
				this.editor.current.currentCreateSceneList.splice(this.sceneId, 1)
				this.editor.current.sceneAnimate = ''
			}
		},
	},
}
</script>
<style lang="scss" scoped>
.scene-container {
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 100%;
}
</style>
