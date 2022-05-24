<template lang="pug">
.d-right-modal(:style="{padding:'10px'}")
	c-control(label="屏幕大小")
		template(slot="right")
			c-select(v-model="size")
				c-select-option(value="1920*1080" label="大屏推荐尺寸1920*1080") 
				c-select-option(value="1366*768" label="web最常见尺寸1366*768") 
				c-select-option(value="1024*768" label="web最小尺寸1024*768") 
				c-select-option(value="other" label="自定义") 
	c-control
		template(slot="right")
			c-input(
				append="W",
				:value="editor.screen.screenWidth",
				:style="{ width: '100px' }",
				@input="widthChange")
			c-input(
				append="H",
				:value="editor.screen.screenHeight",
				:style="{ marginLeft: '10px', width: '100px' }",
				@input="heightChange")
	c-control(label="背景色")
		template(slot="right")
			c-color(
				v-model="editor.screen.screenBackGroundColor",
				v-if="editor.screen.screenBackGroundColor")
	c-control(label="背景图", title="支持jpg，png，gif")
		template(slot="right")
			c-upload-img(v-model="editor.screen.screenBackGroundImage")
	c-control(label="适配模式")
		template(slot="right")
			c-select(v-model="editor.screen.screenLayoutMode")
				c-select-option(value="full-size" label="充满页面")
				c-select-option(value="full-width" label="100%宽度")
				c-select-option(value="full-height" label="100%高度") 
	c-control(label="封面", title="支持jpg，png，gif")
		template(slot="right")
			c-upload-img(v-model="editor.screen.screenAvatar")
	c-control(label="首场景")
		template(slot="right")
			c-select(filterable, v-model="editor.screen.screenMainScene")
				c-select-option(:value="0" label="主场景")
				c-select-option(:value="key", v-for="(item, key) in editor.screen.screenScene", :key="key" :label="item.name")
</template>
<script lang="ts">
import Editor from '@/core/Editor'

export default {
	name: 'func-config',
	data() {
		return {
			screenAvatarLoading: false,
			editor: Editor.Instance() as Editor,
		}
	},
	computed: {
		size: {
			get() {
				const width = this.editor.screen.screenWidth
				const height = this.editor.screen.screenHeight
				if (width !== 1920 && width !== 1366 && width !== 1024) {
					return 'other'
				}
				if (height !== 1080 && height !== 768) {
					return 'other'
				}
				return `${width}*${height}`
			},
			set(value) {
				if (value !== 'other' && value) {
					const [width, height] = value.split('*')
					this.editor.screen.screenWidth = +width
					this.editor.screen.screenHeight = +height
					this.editor.current.resetZoom()
				}
			},
		},
	},
	methods: {
		widthChange(value) {
			this.editor.screen.screenWidth = +value
			this.editor.resetZoom()
		},
		heightChange(value) {
			this.editor.screen.screenHeight = +value
			this.editor.resetZoom()
		}
	},
}
</script>
