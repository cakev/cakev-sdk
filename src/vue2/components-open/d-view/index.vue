<template lang="pug">
#screen(ref="canvas-wrapper", :style="editor.screen.screenStyle")
	d-scene(:zIndex="1")
		eslinkv-widget(
			v-for="item in sceneWidgets(0)",
			:id="item.id",
			:key="item.id",
			:children="item.children",
			readonly,
			:zIndex="item.zIndex")
		eslinkv-widget(
			v-for="item in editor.current.currentSceneIndex === 0 ? [] : sceneWidgets(editor.current.currentSceneIndex)",
			:id="item.id",
			:key="item.id",
			:zIndex="item.zIndex",
			:children="item.children",
			readonly)
	d-scene(
		v-for="(sceneId, index) in editor.current.currentCreateSceneList",
		:key="sceneId",
		:sceneId="sceneId",
		:zIndex="index + 2")
		eslinkv-widget(
			v-for="item in sceneWidgets(sceneId)",
			:id="item.id",
			:zIndex="item.zIndex",
			:key="item.id",
			:children="item.children",
			readonly)
	slot(v-if="editor.marketComponentLoading", name="loading")
		load-mask(:show="true") 加载中...
</template>
<script>
import loadMask from '../load-mask/index.vue'
import dScene from '../../components-base/d-scene/index.vue'
import Editor from '@/core/Editor'
import { getQueryString } from '@/vue2/utils'
import { loadJs, loadCss } from '@/core/utils'
import { linkList } from '@/vue2/api/screen.api.js'

export default {
	name: 'd-view',
	components: {
		dScene,
		loadMask,
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
			document.getElementById('screen').style.transform = this.editor.changeLayoutMode(this.currentLayoutMode)
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
		async loadExtraLink() {
			const res = await linkList({ screenId: this.$route.params.id })
			if (!res.length) return
			const arr = []
			for (let i = 0; i < res.length; i++) {
				if (res[i].linkType === 'javascript' || res[i].linkType === 'iconfont') {
					arr.push(loadJs(res[i].linkUrl, res[i].linkUrl))
				} else if (res[i].linkType === 'css') {
					arr.push(loadCss(res[i].linkUrl, res[i].linkUrl))
				}
			}
			await Promise.all(arr)
		},
	},
	beforeDestroy() {
		document.documentElement.removeEventListener('keydown', this.init)
	},
	mounted() {
		document.documentElement.addEventListener('keydown', this.init)
	},
	async created() {
		await this.loadExtraLink()
	},
}
</script>
<style lang="scss" scoped>
::v-deep {
	.load-mask {
		position: fixed !important;
	}
}
</style>
