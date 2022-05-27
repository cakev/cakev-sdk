<template lang="pug">
.d-suspension.fn-flex.flex-column.pos-a.z-index-999(:style="{ right: `${editor.current.xRoomR1 + 20}px` }")
	c-badge(
		title="全局请求设置",
		type="global",
		@click="globalRequestConfigShow = true",
		:active="editor.screen.screenDomain || editor.screen.screenHeaders"
	)
	global-request-config(v-model="globalRequestConfigShow")
	c-badge(title="全局滤镜", type="color", @click="globalFilterShow = true", :active="editor.screen.screenFilter.enable")
	global-filter(v-model="globalFilterShow")
	c-badge(title="大屏外链", type="link", @click="globalLinkShow = true", :active="editor.screen.screenHead.length")
	global-link(v-model="globalLinkShow")
</template>
<script lang="ts">
import globalRequestConfig from './globalRequestConfig.vue'
import globalFilter from './globalFilter.vue'
import globalLink from './globalLink.vue'
import Editor from '@/core/Editor'

export default {
	name: 'd-suspension',
	components: {
		globalRequestConfig,
		globalFilter,
		globalLink,
	},
	data() {
		return {
			editor: Editor.Instance(),
			globalRequestConfigShow: false,
			globalFilterShow: false,
			globalLinkShow: false,
		}
	},
}
</script>
<style lang="scss" scoped>
.d-suspension {
	top: 88px;
	right: 338px;
	width: 46px;
	background-color: var(--panelBgColor);
	border-radius: var(--panelBorderRadius);
	box-shadow: var(--panelBoxshowColor);
}
</style>
