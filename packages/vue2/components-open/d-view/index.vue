<template lang="pug">
.c-view.fn-flex
	#screen.c-view-screen(ref="canvas-wrapper", :style="screenStyle")
		d-scene(:zIndex="1")
			c-widget(v-for="lay in sceneWidgets(0)", :lay="lay", :key="lay.widgetId", :children="lay.children", readonly)
			c-widget(
				v-for="lay in editor.current.currentSceneIndex === 0 ? [] : sceneWidgets(editor.current.currentSceneIndex)",
				:lay="lay",
				:key="lay.widgetId",
				:children="lay.children",
				readonly
			)
		d-scene(
			v-for="(sceneId, index) in editor.current.currentCreateSceneList",
			:key="sceneId",
			:sceneId="sceneId",
			:zIndex="index + 2"
		)
			c-widget(
				v-for="lay in sceneWidgets(sceneId)",
				:lay="lay",
				:key="lay.widgetId",
				:children="lay.children",
				readonly
			)
		slot(v-if="editor.marketComponentLoading", name="loading")
			c-loading(:show="true")
</template>
<script>
import dScene from '../../components/d-scene/index.vue'
import Editor from '@/core/Editor'

export default {
	name: 'd-view',
	components: {
		dScene,
	},
	data() {
		return {
			editor: Editor.Instance(),
		}
	},
	computed: {
		sceneWidgets() {
			return scene =>
				Object.values(this.editor.screen.screenWidgetsLays).filter(item => item.scene === scene && !item.hide)
		},
		screenStyle() {
			return {
				width: `${this.editor.screen.screenWidth}px`,
				height: `${this.editor.screen.screenHeight}px`,
				backgroundColor: this.editor.screen.screenBackGroundColor,
				backgroundImage: `url(${this.editor.screen.screenBackGroundImage})`,
				overflow: 'hidden',
				transform: this.editor.screen.screenTransformStyle,
				...this.editor.screen.screenFilterStyle,
			}
		},
	},
}
</script>
<style lang="scss" scoped>
.c-view {
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	justify-content: center;
	align-items: center;
}
.c-view-screen {
	position: relative;
	flex-grow: 0;
	flex-shrink: 0;
}
</style>
