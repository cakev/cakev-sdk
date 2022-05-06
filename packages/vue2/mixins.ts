import fetch from '@/vue2/fetch'
import { usePath, createSandbox } from '@/vue2/utils'
import Editor from '@/core/Editor'

export default {
	mixins: [fetch],
	props: {
		zIndex: {},
		events: {
			type: Object,
			default() {
				return {}
			},
		},
		config: {
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
	data(props) {
		return {
			data: null,
			time: Date.now(),
			output: null,
			cake_widget_id: props.config.widget.id,
			cake_editor: Editor.Instance(),
		}
	},
	beforeDestroy(): void {
		this.cake_editor.http.abortOne(this.cake_widget_id)
	},
	methods: {
		__eventTypesSetting__(eventTypes): void {
			this.cake_editor.eventTypesSetting(this.config.widget.id, eventTypes)
		},
		cake_event(eventType = 'click', val): void {
			if (this.events) {
				this.events[eventType].forEach(item => {
					let finalType = item.triggerType
					if (finalType === 'update') finalType = item.target
					if (item.eventClass === 'scene') {
						const sceneId = item.id
						switch (finalType) {
							case 'openScene':
								if (this.cake_editor.current.currentCreateSceneList.includes(sceneId)) return
								this.cake_editor.activeWidgetId = this.config.widget.id
								this.cake_editor.current.sceneAnimate = item.animate || 'fadeIn'
								this.cake_editor.openScene(sceneId)
								break
							case 'closeScene':
								this.cake_editor.current.sceneAnimate = item.animate || 'fadeOut'
								this.cake_editor.closeScene(sceneId)
								break
							case 'changeScene':
								this.cake_editor.selectSceneIndex(sceneId)
								break
							default:
						}
					}
					if (item.eventClass === 'component') {
						const coms = Object.values(this.cake_editor.screen.screenWidgets).filter((v: any) =>
							item.ids.includes(v.id),
						)
						let data = usePath('', val)
						const { enable, methodBody } = item.process
						if (enable && methodBody.trim()) {
							try {
								const processor = createSandbox(methodBody)
								data = processor({ data })
								coms.forEach((v: any) => {
									if (
										!['config.api.params', 'config.api.data', 'config.config'].includes(finalType)
									) {
										v.customEventsConfig.find((c: any) => c.type === finalType).handler(data)
									} else {
										this.cake_editor.updateComponentTarget(v.id, finalType, data)
									}
								})
							} catch (err) {
							}
						} else {
							coms.forEach((v: any) => {
								if (!['config.api.params', 'config.api.data', 'config.config'].includes(finalType)) {
									v.customEventsConfig.find((c: any) => c.type === finalType).handler(data)
								} else {
									this.cake_editor.updateComponentTarget(v.id, finalType, data)
								}
							})
						}
					}
				})
			} else {
				this.__eventTypesSetting__([{ key: 'click', label: '点击事件' }])
			}
		},
		__init__(obj): void {
			const { value, customConfig, eventTypes, customEventsConfig } = obj
			this.__eventTypesSetting__(eventTypes)
			this.cake_editor.setCustomEventConfig(this.config.widget.id, customEventsConfig)
			this.parseConfigValue(value, customConfig)
		},
		parseConfigValue(localConfigValue, customConfig) {
			return this.cake_editor.updateWidgetConfig(this.config.widget.id, localConfigValue, customConfig)
		},
	},
	computed: {
		styles() {
			const { layout } = this.config
			return {
				width: `${layout.width}px`,
				height: `${layout.height}px`,
				zIndex: `${this.zIndex}`,
				transform: `translate3d(${layout.left}px, ${layout.top}px,0) ${
					layout.scale ? 'scale(' + layout.scale + ')' : ''
				}`,
			}
		},
		id(): string {
			const now = +new Date()
			return `d-${now}`
		},
	},
}
