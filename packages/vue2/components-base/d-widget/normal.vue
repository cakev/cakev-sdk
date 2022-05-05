<template lang="pug">
component.widget-part.animate__animated(
	:style="{ animationDuration, animationDelay }",
	:is="currentComponent",
	:class="animationClass",
	:id="id",
	v-bind="{ zIndex, ...item, ...$attrs }",
	v-on="$listeners")
	slot
</template>
<script>
import Editor from '@/core/Editor'
import { use } from '@/vue2/api/marketComponent.api'
import Vue from 'vue'

const prefix1 = 'market-'
const prefix2 = 'cakev-'
export default {
	name: 'd-widget',
	props: {
		id: {},
		zIndex: {},
	},
	computed: {
		item() {
			return this.editor.screen.screenWidgets[this.id]
		},
		currentComponent() {
			if (this.ready) {
				if (this.item.market && this.editor.widgetLoaded[`${this.item.type}${this.componentVersion}`]) {
					return `${prefix1}${this.item.type}-${this.componentVersion}`
				}
				return `${prefix2}${this.item.type}`
			}
			return null
		},
	},
	data() {
		return {
			componentVersion: '',
			ready: false,
			animationClass: null,
			animationDuration: `.6s`,
			animationDelay: `0s`,
			editor: Editor.Instance(),
		}
	},
	methods: {
		setAnimation() {
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
		removeAnimation() {
			this.animationClass = null
		},
		loadMarket() {
			this.componentVersion = this.item.config.widget.componentVersion
			if (this.editor.widgetLoaded[`${this.item.type}${this.componentVersion}`]) {
				this.ready = true
			} else {
				use({
					componentEnTitle: this.item.type,
					componentVersion: this.item.config.widget.componentVersion,
				})
					.then(res => {
						const script = document.createElement('script')
						script.onload = () => {
							this.ready = true
							this.editor.updateWidgetLoaded(`${this.item.type}${this.componentVersion}`)
							if (res.isCollection) {
								res.componentConfig.widget.id = this.item.config.widget.id
								this.editor.screen.screenWidgets[this.item.config.widget.id].config =
									res.componentConfig
							}
						}
						if (res) {
							script.src = res.componentJsUrl
							document.head.appendChild(script)
						} else {
							console.error(`${this.item.type}${this.componentVersion}加载组件失败`)
						}
					})
					.catch(() => {
						console.error(`${this.item.type}${this.componentVersion}加载组件失败`)
					})
			}
		},
	},
	watch: {
		'item.config.widget.componentVersion': {
			deep: true,
			handler() {
				if (this.item.market) {
					this.ready = false
					this.loadMarket()
				}
			},
		},
		'item.animation.transitionEnable': {
			deep: true,
			handler(value) {
				value && this.setAnimation()
			},
		},
		ready(){
			this.setAnimation()
		},
	},
	mounted() {
		if (this.item.market) {
			this.loadMarket()
		} else {
			if (this.editor.widgetLoaded[`${this.item.type}${this.componentVersion}`]) {
				this.ready = true
			} else {
				Vue.component(`${prefix2}${this.item.type}`, this.editor.local.components[this.item.type])
				this.ready = true
			}
		}
	},
}
</script>
<style lang="scss">
.widget-part {
	position: absolute;
	top: 0;
	left: 0;
	font-size: 15px;
	line-height: 1.5em;
	color: rgb(0, 0, 0);
	text-align: center;
	backface-visibility: hidden;
	pointer-events: auto;
}
</style>
