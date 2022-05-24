<template lang="pug">
.d-manage-modal-control-base
	c-collapse(label="基础属性", :value="true")
		c-control(label="组件名")
			template(slot="right")
				c-input.widget-name(
					v-model="widget.widgetBase.name")
		c-control(label="组件ID")
			template(slot="right")
				c-input.widget-name(
					v-model="widget.widgetId" :disabled="true")
		c-control(label="组件版本")
			template(slot="right")
				c-select(
					placeholder="非组件市场组件无版本管理"
					:disabled="!widget.widgetMarket"
					v-model="widget.widgetBase.version")
					c-select-option(:value="item.widgetVersion", v-for="(item, i) in versionList", :key="i" :label="item.widgetVersion")
	c-collapse(label="样式属性", :value="true")
		c-control(label="位置")
			template(slot="right")
				c-input(
					append="X",
					v-model="widget.widgetLayout.left",
					:style="{ width: '100px', marginRight: '10px' }")
				c-input(append="Y", v-model="widget.widgetLayout.top", :style="{ width: '100px' }")
		c-control(label="宽高")
			template(slot="right")
				c-input(
					append="W",
					v-model="widget.widgetLayout.width",
					:style="{ width: '100px', marginRight: '10px' }")
				c-input(append="H", v-model="widget.widgetLayout.height", :style="{ width: '100px' }")
		c-control(label="场景")
			template(slot="right")
				c-select(v-model="editor.screen.screenWidgetsLays[widget.widgetId].scene")
					c-select-option(:value="0" label="主场景")
					c-select-option(:value="key", v-for="(item, key) in editor.screen.screenScene", :key="key" :label="item.name")
					c-select-option(:value="-1" label="回收站") 
		c-control(label="缩放比例")
			template(slot="right")
				c-input(v-model="scale" append="%")
</template>
<script lang="ts">
import Editor from '@/core/Editor'

export default {
	data() {
		return {
			versionList: [],
			editor: Editor.Instance() as Editor,
		}
	},
	computed: {
		scale: {
			get() {
				return `${Math.round(this.widget.widgetLayout.scale * 100)}`
			},
			set(val: any) {
				if (isNaN(val)) {
					this.widget.widgetLayout.scale = 0
				} else {
					this.widget.widgetLayout.scale = val / 100
				}
			},
		},
		widget(){
			return this.editor.screen.screenWidgets[this.editor.current.currentWidgetId]
		}
	},
	mounted() {
		console.log(this.editor.config.api.widgetVersionList)
		// const res = await getVersionList({
		// 	widgetType: this.editor.current.widget.type,
		// })
		// this.versionList = res
	},
}
</script>
