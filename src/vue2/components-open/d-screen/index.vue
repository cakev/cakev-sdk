<template lang="pug">
#d-screen.d-screen(:style="{ height: `calc(100% - ${editor.yRoom}px)` }")
	.d-editor-box.pos-r.fn-flex
		d-left-scene
		d-editor
		d-suspension
		d-right-manage(v-if="editor.currentWidgetList.length === 0")
		d-right-setting(v-if="editor.currentWidgetList.length === 1")
		d-right-setting-more(v-if="editor.currentWidgetList && editor.currentWidgetList.length > 1")
	slot(v-if="editor.marketComponentLoading", name="loading")
		load-mask(:show="true") 加载中...
</template>
<script>
import dLeftScene from '@/vue2/components-base/d-left-scene/index.vue'
import dEditor from '@/vue2/components-base/d-editor/index.vue'
import dRightManage from '@/vue2/components-right/d-right-manage/index.vue'
import dRightSetting from '@/vue2/components-right/d-right-setting/index.vue'
import dRightSettingMore from '@/vue2/components-right/d-right-setting-more/index.vue'
import dSuspension from '@/vue2/components-base/d-suspension/index.vue'
import Editor from '@/core/Editor'
import loadMask from '../load-mask/index.vue'
import { linkList } from '@/vue2/api/screen.api'
import { loadCss, loadJs } from '@/core/utils'

export default {
	name: 'd-screen',
	components: {
		loadMask,
		dLeftScene,
		dRightManage,
		dRightSetting,
		dRightSettingMore,
		dSuspension,
		dEditor,
	},
	data() {
		return {
			editor: Editor.Instance(),
		}
	},
	methods: {
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
	async created() {
		if (this.$route.params.id) {
			await this.loadExtraLink()
		}
	},
}
</script>
<style lang="scss" scoped>
.d-editor-box {
	width: 100%;
	height: 100%;
}

.d-screen {
	width: 100%;
	min-width: 1088px;
}

#screen:-webkit-full-screen {
	width: 100%;
	height: 100%;
}
</style>
