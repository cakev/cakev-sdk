<template lang="pug">
#screen(ref="canvas-wrapper", :style="editor.screen.screenStyle")
	d-scene(:zIndex="1")
		c-widget(
			v-for="lay in sceneWidgets(0)",
			:lay="lay",
			:key="lay.widgetId",
			:children="lay.children",
			readonly,)
		c-widget(
			v-for="lay in editor.current.currentSceneIndex === 0 ? [] : sceneWidgets(editor.current.currentSceneIndex)",
			:lay="lay",
			:key="lay.widgetId",
			:children="lay.children",
			readonly)
	d-scene(
		v-for="(sceneId, index) in editor.current.currentCreateSceneList",
		:key="sceneId",
		:sceneId="sceneId",
		:zIndex="index + 2")
		c-widget(
			v-for="lay in sceneWidgets(sceneId)",
			:lay="lay",
			:key="lay.widgetId",
			:children="lay.children",
			readonly)
	slot(v-if="editor.marketComponentLoading", name="loading")
		c-loading(:show="true")
</template>
<script>
import dScene from '../../components-base/d-scene/index.vue'
import Editor from '@/core/Editor'
import { getQueryString, on, off } from '@cakev/util'

export default {
	name: 'd-view',
	components: {
		dScene,
	},
	data() {
		return {
			editor: Editor.Instance(),
			currentLayoutMode: getQueryString('layoutMode'),
		}
	},
	computed: {
		sceneWidgets() {
			return scene =>
				Object.values(this.editor.screen.screenWidgetsLays).filter(item => item.scene === scene && !item.hide)
		},
	},
	methods: {
		layoutModeChange() {
			switch (this.currentLayoutMode) {
				case 'full-size':
					this.currentLayoutMode = 'full-width'
					break
				case 'full-width':
					this.currentLayoutMode = 'full-height'
					break
				case 'full-height':
					this.currentLayoutMode = 'full-size'
					break
				default:
					this.currentLayoutMode = 'full-size'
			}
			document.getElementById('screen').style.transform = this.editor.screen.changeLayoutMode(this.currentLayoutMode)
		},
		init(e) {
			if (
				(e.ctrlKey === true || e.metaKey === true) &&
				(e.which === 189 ||
					e.which === 187 ||
					e.which === 173 ||
					e.which === 61 ||
					e.which === 107 ||
					e.which === 109)
			) {
				e.preventDefault()
			}
			if (e.keyCode === 88) {
				this.layoutModeChange()
			}
		},
	},
	beforeDestroy() {
		off(document, 'keydown', this.init)
	},
	mounted() {
		on(document, 'keydown', this.init)
	},
}
</script>
