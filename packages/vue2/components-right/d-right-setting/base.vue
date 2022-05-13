<template lang="pug">
.d-manage-modal-control-base
	c-collapse(label="基础属性", :value="true")
		c-control(label="组件名")
			template(slot="right")
				c-input.widget-name(
					v-model="editor.current.widget.widgetBase.name")
		c-control(label="组件ID")
			template(slot="right")
				c-input.widget-name(
					v-model="editor.current.widget.widgetId" :disabled="true")
		c-control(label="组件版本")
			template(slot="right")
				c-select(
					placeholder="非组件市场组件无版本管理"
					:disabled="!editor.current.widget.widgetMarket"
					v-model="editor.current.widget.widgetBase.version")
					c-select-option(:value="item.widgetVersion", v-for="(item, i) in versionList", :key="i" :label="item.widgetVersion")
	c-collapse(label="样式属性", :value="true")
		c-control(label="位置")
			template(slot="right")
				c-input(
					append="X",
					v-model="editor.current.widget.widgetLayout.left",
					:style="{ width: '100px', marginRight: '10px' }")
				c-input(append="Y", v-model="editor.current.widget.widgetLayout.top", :style="{ width: '100px' }")
		c-control(label="宽高")
			template(slot="right")
				c-input(
					append="W",
					v-model="editor.current.widget.widgetLayout.width",
					:style="{ width: '100px', marginRight: '10px' }")
				c-input(append="H", v-model="editor.current.widget.widgetLayout.height", :style="{ width: '100px' }")
		c-control(label="场景")
			template(slot="right")
				c-select(v-model="editor.screen.screenWidgetsLays[editor.current.widget.widgetId].scene")
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
				return `${Math.round(this.editor.current.widget.widgetLayout.scale * 100)}`
			},
			set(val: any) {
				if (isNaN(val)) {
					this.editor.current.widget.widgetLayout.scale = 0
				} else {
					this.editor.current.widget.widgetLayout.scale = val / 100
				}
			},
		},
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
