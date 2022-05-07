<template lang="pug">
component.widget-part.animate__animated(
	:style="{ animationDuration:`${widget.widgetAnimation.duration/1000}s`, animationDelay:`${widget.widgetAnimation.delay/1000}s` }",
	:is="widget.widgetIs",
	:class="animationClass",
	:widget="widget"
	:lay="lay"
	v-on="$listeners")
	slot
</template>
<script lang="ts">
import Editor from '@/core/Editor'
import { use } from '@/vue2/api/marketComponent.api'

export default {
	name: 'd-widget',
	props: {
		lay: {},
	},
	computed:{
		widget(){
			return this.editor.screen.screenWidgets[this.lay.widgetId]
		}	
	},
	data() {
		return {
			ready: false,
			animationClass: null,
			editor: Editor.Instance(),
		}
	},
	methods: {
		setAnimation() {
			if (!this.widget.widgetAnimation) return
			if (!this.widget.widgetAnimation.transitionEnable) {
				this.removeAnimation()
				return
			}
			const { enter } = this.widget.widgetAnimation
			enter ? (this.animationClass = `animate__${enter}`) : void 0
		},
		removeAnimation() {
			this.animationClass = null
		},
		loadMarket() {
			const version = this.widget.widgetBase.version
			const widgetIs = this.widget.widgetIs
			if (this.editor.widgetLoaded[`${widgetIs}${version}`]) {
				this.ready = true
			} else {
				use({
					widgetType: widgetIs,
					widgetVersion: version,
				})
					.then(res => {
						const script = document.createElement('script')
						script.onload = () => {
							this.ready = true
							this.editor.updateWidgetLoaded(`${widgetIs}${version}`)
						}
						if (res) {
							script.src = res.componentJsUrl
							document.head.appendChild(script)
						} else {
							console.error(`${widgetIs}${version}加载组件失败`)
						}
					})
					.catch(() => {
						console.error(`${widgetIs}${version}加载组件失败`)
					})
			}
		},
	},
	watch: {
		'widget.widgetBase.version': {
			deep: true,
			handler() {
				if (this.widget.widgetMarket) {
					this.ready = false
					this.loadMarket()
				}
			},
		},
		'widget.animation.transitionEnable': {
			deep: true,
			handler(value) {
				value && this.setAnimation()
			},
		},
		ready() {
			this.setAnimation()
		},
	},
	mounted() {
		const version = this.widget.widgetBase.version
		const widgetIs = this.widget.widgetIs
		if (this.widget.widgetMarket) {
			this.loadMarket()
		} else {
			if (this.editor.widgetLoaded[`${widgetIs}${version}`]) {
				this.ready = true
			} else {
				// Vue.component(`${prefix2}${this.widget.type}`, this.editor.local.components[this.widget.type])
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
