<template lang="pug">
.z-index-999(:style="{ backgroundColor:'var(--panelBgColor)',width: `${editor.current.xRoomR1}px` }")
	c-tabs(:value="1")
		c-tab-pane(label="基础" :value="1")
			c-base
		c-tab-pane(label="数据" :value="2")
			c-data
		c-tab-pane(label="交互" :value="3")
			interactive
		c-tab-pane(label="自定义" :value="4")
</template>
<script lang="ts">
import Editor from '@/core/Editor'
import base from './base.vue'
import data from './data.vue'
import interactive from './interactive.vue'

export default {
	name: 'd-right-setting',
	components: {
		'c-base':base,
		'c-data':data,
		interactive,
	},
	data() {
		return {
			editor: Editor.Instance() as Editor,
		}
	},
}
</script>
<style lang="scss" scoped>
.d-right-modal {
	height: calc(100vh - 191px);
}
</style>
