<template lang="pug">
.d-suspension.fn-flex.flex-column.pos-a.z-index-999(:style="{ right: `${editor.xRoomR1 + 20}px` }")
	item-card(title="更新组件", icon="md-sync", @click="update")
		updateDrawer(v-model="showDrawer", :data="updateInfo")
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
	item-card(
		v-if="editor.currentWidgetList[0] && editor.currentWidget",
		title="主题风格",
		icon="md-color-palette",
		@click="themeShow = true")
		theme(v-model="themeShow")
</template>
<script lang="ts">
import updateDrawer from './updateDrawer.vue'
import globalRequestConfig from './globalRequestConfig.vue'
import theme from './theme.vue'
import globalFilter from './globalFilter.vue'
import { Component, Vue } from 'vue-property-decorator'
import { versionUpdateList } from '@/vue2/api/marketComponent.api'
import Editor from '@/core/Editor'
import ItemCard from '@/vue2/components-base/d-suspension/item-card.vue'
@Component({
	components: {
		ItemCard,
		updateDrawer,
		globalRequestConfig,
		theme,
		globalFilter,
	},
})
export default class DSuspension extends Vue {
	editor = Editor.Instance()
	showDrawer = false
	globalRequestConfigShow = false
	themeShow = false
	filterShow = false
	updateInfo = []
	async update() {
		const req = []
		const obj = this.editor.screen.screenWidgets
		if (obj) {
			Object.values(obj).forEach((v: any) => {
				if (v.market) {
					req.push({
						componentEnTitle: v.type,
						componentVersion: v.config.widget.componentVersion,
						componentId: v.id,
						componentTitle: v.config.widget.name,
					})
				}
			})
			this.updateInfo = await versionUpdateList({ components: req })
			if (this.updateInfo.length === 0) {
				this.$Message.warning('暂无可更新组件')
				return
			}
			this.showDrawer = true
		} else {
			this.$Message.warning('暂无可更新组件')
		}
	}
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
