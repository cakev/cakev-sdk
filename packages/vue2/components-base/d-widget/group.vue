<template lang="pug">
.pos-a.widget-part-group(:style="{ ...styles, animationDuration, animationDelay }", :class="animationClass")
	.pos-a(:style="stylesR")
		template(v-for="item in children")
			cakev-widget(v-bind="item")
</template>
<script lang="ts">
import Editor from '@/core/Editor'

export default {
	name: 'd-widget-group',
	props: {
		id: {},
		zIndex: {},
		children: {},
	},
	data() {
		return {
			animationClass: null,
			animationDuration: `.6s`,
			animationDelay: `0s`,
			editor: Editor.Instance(),
		}
	},
	computed: {
		item() {
			return this.editor.screen.screenWidgets[this.id]
		},
		styles() {
			const { widgetLayout } = this.item.config
			return {
				width: `${widgetLayout.width}px`,
				height: `${widgetLayout.height}px`,
				zIndex: `${this.zIndex}`,
				transform: `translate3d(${widgetLayout.left}px, ${widgetLayout.top}px,0) ${
					widgetLayout.scale ? 'scale(' + widgetLayout.scale + ')' : ''
				}`,
			}
		},
		stylesR() {
			const { widgetLayout } = this.item.config
			return {
				left: `${-widgetLayout.left}px`,
				top: `${-widgetLayout.top}px`,
			}
		},
	},
	methods: {
		setAnimation(): void {
			if (!this.item.animation) return
			if (!this.item.animation.transitionEnable) {
				this.removeAnimation()
				return
			}
			const { duration, enter, delay } = this.item.animation
			this.animationDuration = `${duration / 1000}s`
			this.animationDelay = `${delay / 1000}s`
			enter ? (this.animationClass = `animate__${enter}`) : void 0
		},
		removeAnimation(): void {
			this.animationClass = null
		},
		__init__(): void {
			this.parseConfigValue()
		},

		parseConfigValue(): void {
			this.editor.updateWidgetConfig(this.id, this.item.config)
		},
	},
	created(): void {
		this.__init__()
	},
	mounted(): void {
		this.setAnimation()
	},
}
</script>
