import fetch from '@/vue2/fetch'
import { usePath, createSandbox } from '@/vue2/utils'
import Editor from '@/core/Editor'
import LogTask from '@/core/Log/task'

export default {
	mixins: [fetch],
	props: {
		settingData: {
			type: Object,
		},
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
			instance: null,
			output: null,
			inPreview: true,
			cake_widget_id: props.config.widget.id,
			cake_editor: Editor.Instance(),
		}
	},
	beforeDestroy(): void {
		this.instance = null
		this.cake_editor.http.abortOne(this.cake_widget_id)
		this.animateActiveIndex = -1
	},
	methods: {
		__eventTypesSetting__(eventTypes): void {
			this.cake_editor.eventTypesSetting(this.config.widget.id, eventTypes)
		},
		__handleEvent__(eventType = 'click', val): void {
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
						let data = usePath('', val, errorMessage => {
							this.cake_editor.log.push(
								new LogTask({ code: 'DATA_FILTER_ERROR', id: this.cake_widget_id, errorMessage }),
							)
						})
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
								this.cake_editor.log.push(
									new LogTask({ code: 'DATA_FILTER_ERROR', id: this.cake_widget_id }),
								)
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
		/**
		 * @description 组件间联动，被关联组件收动添加 updateComponent 方法
		 * [id]
		 */
		emitComponentUpdate(data): void {
			if (this.config) {
				this.config.api.bind.refIds.forEach((ref: any) => {
					const widget = this.cake_editor.screen.screenWidgets[ref]
					if (!widget) return
					let params = widget.config.api.params
					if (params) {
						if (typeof params === 'string') {
							params = { ...JSON.parse(params), ...data }
						} else {
							params = { ...params, ...data }
						}
					} else {
						params = data
					}
					widget.config.api.params = params
				})
			}
		},
		__init__(obj): void {
			const { value, customConfig, setting, settingData, eventTypes, customEventsConfig } = obj
			this.__eventTypesSetting__(eventTypes)
			this.cake_editor.dataSetting(this.config.widget.id, setting, settingData)
			this.cake_editor.setCustomEventConfig(this.config.widget.id, customEventsConfig)
			this.parseConfigValue(value, customConfig)
		},
		parseConfigValue(localConfigValue, customConfig) {
			return this.cake_editor.updateWidgetConfig(this.config.widget.id, localConfigValue, customConfig)
		},
	},
	computed: {
		__settingData__() {
			return type => {
				if (this.settingData[type]) {
					return this.settingData[type].map(child => {
						return this.data.map(item => item[child])
					})
				} else {
					return []
				}
			}
		},
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
		eventLength(): number {
			return Object.keys(this.events).length
		},
		isSceneActive(): boolean {
			if (!this.events) return false
			const events = this.events
			let e = []
			for (const key in events) {
				// @ts-ignore
				e = [...e, ...events[key]]
			}
			return (
				this.cake_editor.activeWidgetId === this.config.widget.id &&
				e.some(v => v.id === this.cake_editor.activeSceneId)
			)
		},
	},
	mounted(): void {
		this.inPreview = this.cake_editor.editorStatus === 'inPreview'
	},
}
