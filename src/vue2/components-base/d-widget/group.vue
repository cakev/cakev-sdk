<template lang="pug">
.pos-a.widget-part-group(:style="{ ...styles, animationDuration, animationDelay }", :class="animationClass")
	.pos-a(:style="stylesR")
		template(v-for="item in children")
			eslinkv-widget(v-bind="item")
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import Editor from '@/core/Editor'

@Component
export default class DWidgetGroup extends Vue {
	@Prop() id
	@Prop() zIndex
	@Prop() children
	animationClass = null
	animationDuration = `.6s`
	animationDelay = `0s`
	editor: Editor = Editor.Instance()
	get item() {
		return this.editor.screen.screenWidgets[this.id]
	}
	get styles() {
		const { layout } = this.item.config
		return {
			width: `${layout.size.width}px`,
			height: `${layout.size.height}px`,
			zIndex: `${this.zIndex}`,
			transform: `translate3d(${layout.position.left}px, ${layout.position.top}px,0) ${
				layout.scale ? 'scale(' + layout.scale + ')' : ''
			}`,
		}
	}

	get stylesR() {
		const { layout } = this.item.config
		return {
			left: `${-layout.position.left}px`,
			top: `${-layout.position.top}px`,
		}
	}
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
	}
	removeAnimation(): void {
		this.animationClass = null
	}
	__init__(): void {
		this.parseConfigValue()
	}

	parseConfigValue(): void {
		this.editor.updateWidgetConfig(this.id, this.item.config)
	}

	created(): void {
		this.__init__()
	}

	mounted(): void {
		this.setAnimation()
	}
}
</script>
