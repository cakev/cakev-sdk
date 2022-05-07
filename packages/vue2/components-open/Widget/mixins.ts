import Editor from '@/core/Editor'

export default {
	props: {
		widget: {},
		lay: {},
		events: {
			type: Object,
			default() {
				return {}
			},
		},
		readonly: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			cake_data: null,
			cake_editor: Editor.Instance(),
		}
	},
	watch: {
		'widget.widgetApi.data': {
			handler() {
				if (this.widget.widgetApi.data !== '') {
					try {
						this.cake_data = JSON.parse(this.widget.widgetApi.data)
					} catch (e) {
						this.cake_data = this.widget.widgetApi.data
					}
				}
			},
			immediate: true,
			deep: true,
		},
		cake_data: {
			handler(val) {
				this.cake_editor.screen.screenWidgets[this.widget.widgetId].widgetApi.data = JSON.stringify(val)
			},
			immediate: true,
			deep: true,
		},
		'widget.widgetApi.url': {
			handler() {
				this.cake_request()
			},
			immediate: true,
			deep: true,
		},
		'widget.widgetApi.params': {
			handler() {
				this.cake_request()
			},
			immediate: true,
			deep: true,
		},
		'widget.widgetApi.method': {
			handler() {
				this.cake_request()
			},
			immediate: true,
			deep: true,
		},
		'widget.widgetApi.path': {
			handler() {
				this.cake_request()
			},
			immediate: true,
			deep: true,
		},
	},
	beforeDestroy(): void {
		this.cake_editor.http.abortOne(this.widget.widgetId)
	},
	methods: {
		cake_request() {
			if (!this.widget.widgetApi.url) return
			this.cake_editor.http.request(this.widget, {
				domain: this.cake_editor.screen.screenDomain,
				headers: JSON.parse(this.cake_editor.screen.screenHeaders),
			})
		},
		// __eventTypesSetting__(eventTypes): void {
		// 	this.cake_editor.eventTypesSetting(this.widget.widgetId, eventTypes)
		// },
		// cake_event(eventType = 'click', val): void {
		// 	if (this.events) {
		// 		this.events[eventType].forEach(item => {
		// 			let finalType = item.triggerType
		// 			if (finalType === 'update') finalType = item.target
		// 			if (item.eventClass === 'scene') {
		// 				const sceneId = item.id
		// 				switch (finalType) {
		// 					case 'openScene':
		// 						if (this.cake_editor.current.currentCreateSceneList.includes(sceneId)) return
		// 						this.cake_editor.activeWidgetId = this.widget.widgetId
		// 						this.cake_editor.current.sceneAnimate = item.animate || 'fadeIn'
		// 						this.cake_editor.openScene(sceneId)
		// 						break
		// 					case 'closeScene':
		// 						this.cake_editor.current.sceneAnimate = item.animate || 'fadeOut'
		// 						this.cake_editor.closeScene(sceneId)
		// 						break
		// 					case 'changeScene':
		// 						this.cake_editor.selectSceneIndex(sceneId)
		// 						break
		// 					default:
		// 				}
		// 			}
		// 			if (item.eventClass === 'component') {
		// 				const coms = Object.values(this.cake_editor.screen.screenWidgets).filter((v: any) =>
		// 					item.ids.includes(v.id),
		// 				)
		// 				let data = usePath('', val)
		// 				const { enable, methodBody } = item.process
		// 				if (enable && methodBody.trim()) {
		// 					try {
		// 						const processor = createSandbox(methodBody)
		// 						data = processor({ data })
		// 						coms.forEach((v: any) => {
		// 							if (
		// 								!['config.api.params', 'config.api.data', 'config.config'].includes(finalType)
		// 							) {
		// 								v.customEventsConfig.find((c: any) => c.type === finalType).handler(data)
		// 							} else {
		// 								this.cake_editor.updateComponentTarget(v.id, finalType, data)
		// 							}
		// 						})
		// 					} catch (err) {}
		// 				} else {
		// 					coms.forEach((v: any) => {
		// 						if (!['config.api.params', 'config.api.data', 'config.config'].includes(finalType)) {
		// 							v.customEventsConfig.find((c: any) => c.type === finalType).handler(data)
		// 						} else {
		// 							this.cake_editor.updateComponentTarget(v.id, finalType, data)
		// 						}
		// 					})
		// 				}
		// 			}
		// 		})
		// 	} else {
		// 		this.__eventTypesSetting__([{ key: 'click', label: '点击事件' }])
		// 	}
		// },
		// __init__(obj): void {
		// 	const { value, customConfig, eventTypes, customEventsConfig } = obj
		// 	this.__eventTypesSetting__(eventTypes)
		// 	this.cake_editor.setCustomEventConfig(this.widget.widgetId, customEventsConfig)
		// 	this.parseConfigValue(value, customConfig)
		// },
		// parseConfigValue(localConfigValue, customConfig) {
		// 	return this.cake_editor.updateWidgetConfig(this.widget.widgetId, localConfigValue, customConfig)
		// },
	},
	computed: {
		styles() {
			return {
				width: `${this.widget.widgetLayout.width}px`,
				height: `${this.widget.widgetLayout.height}px`,
				zIndex: `${this.lay.zIndex}`,
				transform: `translate3d(${this.widget.widgetLayout.left}px, ${this.widget.widgetLayout.top}px,0) ${
					this.widget.widgetLayout.scale ? 'scale(' + this.widget.widgetLayout.scale + ')' : ''
				}`,
			}
		},
	},
}
