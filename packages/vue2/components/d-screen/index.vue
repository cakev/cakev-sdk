<template lang="pug">
#d-screen.d-screen(:style="{ height: `calc(100vh - ${editor.current.yRoom}px)` }")
	.d-editor-box.pos-r.fn-flex
		c-scene
		d-editor
		d-right-manage(v-if="!editor.current.currentWidgetId")
		d-right-setting(v-if="editor.current.currentWidgetId")
		d-suspension
	slot(v-if="editor.marketComponentLoading", name="loading")
		c-loading(:show="true")
</template>
<script lang="ts">
import cScene from '@/vue2/components/c-scene/index.vue'
import dEditor from '@/vue2/components/d-editor/index.vue'
import dRightManage from '@/vue2/components-right/d-right-manage/index.vue'
import dRightSetting from '@/vue2/components-right/d-right-setting/index.vue'
import dSuspension from '@/vue2/components/d-suspension/index.vue'
import Editor from '@/core/Editor'

export default {
	name: 'd-screen',
	components: {
		cScene,
		dRightManage,
		dRightSetting,
		dSuspension,
		dEditor,
	},
	data() {
		return {
			editor: Editor.Instance() as Editor,
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
	overflow: hidden;
}

#screen:-webkit-full-screen {
	width: 100%;
	height: 100%;
}
</style>
