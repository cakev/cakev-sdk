<script lang="ts">
import Editor from '@/core/Editor'
import { use } from '@/vue2/api/marketComponent.api'
import WidgetTask from '../../../core/Widget/task'

export default {
	name: 'c-widget',
	props: {
		lay: {},
	},
	computed: {
		widget(): WidgetTask {
			return this.editor.screen.screenWidgets[this.lay.widgetId]
		},
	},
	data() {
		return {
			data: null,
			editor: Editor.Instance() as Editor,
		}
	},
	beforeDestroy(): void {
		this.editor.http.abortOne(this.widget.widgetId)
	},
	methods: {
		request() {
			if (!this.widget.widgetApi.url) return
			this.editor.http.request(this.widget, {
				domain: this.editor.screen.screenDomain,
				headers: JSON.parse(this.editor.screen.screenHeaders),
			})
		},
		// todo
		loadMarket() {
			const version = this.widget.widgetBase.version
			const widgetIs = this.widget.widgetIs
			if (!this.editor.widgetLoaded[`${widgetIs}${version}`]) {
				use({
					widgetType: widgetIs,
					widgetVersion: version,
				})
					.then(res => {
						const script = document.createElement('script')
						script.onload = () => {
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
		// todo
		'widget.widgetBase.version': {
			deep: true,
			handler() {
				if (this.widget.widgetMarket) {
					this.loadMarket()
				}
			},
		},
		'widget.widgetApi.data': {
			handler() {
				if (this.widget.widgetApi.data !== '') {
					try {
						this.data = JSON.parse(this.widget.widgetApi.data)
					} catch (e) {
						this.data = this.widget.widgetApi.data
					}
				}
			},
			immediate: true,
			deep: true,
		},
		data: {
			handler(val) {
				this.editor.screen.screenWidgets[this.widget.widgetId].widgetApi.data = JSON.stringify(val)
			},
			immediate: true,
			deep: true,
		},
		'widget.widgetApi.url': {
			handler() {
				this.request()
			},
			immediate: true,
			deep: true,
		},
		'widget.widgetApi.params': {
			handler() {
				this.request()
			},
			immediate: true,
			deep: true,
		},
		'widget.widgetApi.method': {
			handler() {
				this.request()
			},
			immediate: true,
			deep: true,
		},
		'widget.widgetApi.path': {
			handler() {
				this.request()
			},
			immediate: true,
			deep: true,
		},
	},
	// todo
	mounted() {
		const version = this.widget.widgetBase.version
		const widgetIs = this.widget.widgetIs
		if (this.widget.widgetMarket) {
			this.loadMarket()
		} else {
			if (!this.editor.widgetLoaded[`${widgetIs}${version}`]) {
				// Vue.component(`${prefix2}${this.widget.type}`, this.editor.local.components[this.widget.type])
			}
		}
	},
	render(createElement) {
		return createElement(
			'div',
			{
				class: {
					'c-widget': true,
				},
				style: {
					position: 'absolute',
					width: `${this.widget.widgetLayout.width}px`,
					height: `${this.widget.widgetLayout.height}px`,
					zIndex: `${this.lay.zIndex}`,
					transform: `translate3d(${this.widget.widgetLayout.left}px, ${this.widget.widgetLayout.top}px,0) ${
						this.widget.widgetLayout.scale ? 'scale(' + this.widget.widgetLayout.scale + ')' : ''
					}`,
				},
			},
			[
				createElement(this.widget.widgetIs, {
					class: {
						[`animate__${this.widget.widgetAnimation.enter}`]: this.widget.widgetAnimation.transitionEnable,
					},
					attrs: {
						cake_widget: this.widget,
						cake_lay: this.lay,
						cake_data: this.data,
						cake_editor: this.editor,
					},
					style: {
						width: `100%`,
						height: `100%`,
						position: 'absolute',
						top: 0,
						left: 0,
						animationIterationCount: 1,
						animationFillMode: 1,
						animationDelay: `${this.widget.widgetAnimation.delay / 1000}s`,
						animationDuration: `${this.widget.widgetAnimation.duration / 1000}s`,
					},
				}),
			],
		)
	},
}
</script>
<style lang="scss" scoped>
.widget-part {
	position: absolute;
	top: 0;
	left: 0;
	backface-visibility: hidden;
	pointer-events: auto;
}
</style>
