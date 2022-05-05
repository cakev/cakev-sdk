<template lang="pug">
.d-suspension.fn-flex.flex-column.pos-a.z-index-999(:style="{ right: `${editor.xRoomR1 + 20}px` }")
	item-card(
		title="全局请求设置",
		icon="md-planet",
		@click="globalRequestConfigShow = true",
		:active="editor.screen.screenDomain || editor.screen.screenHeaders")
	globalRequestConfig(v-model="globalRequestConfigShow")
	item-card(
		title="全局滤镜",
		icon="ios-color-filter",
		@click="filterShow = true",
		:active="editor.screen.screenFilter.enable")
	global-filter(v-model="filterShow")
</template>
<script lang="ts">
import globalRequestConfig from './globalRequestConfig.vue'
import globalFilter from './globalFilter.vue'
import Editor from '@/core/Editor'
import ItemCard from '@/vue2/components-base/d-suspension/item-card.vue'

export default {
	name: 'd-suspension',
	components: {
		ItemCard,
		globalRequestConfig,
		globalFilter,
	},
	data() {
		return {
			editor: Editor.Instance(),
			globalRequestConfigShow: false,
			filterShow: false,
		}
	},
}
</script>
<style lang="scss" scoped>
.d-suspension {
	top: 88px;
	right: 338px;
	width: 46px;
	background: #22242b;
	box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.5);
}
</style>
