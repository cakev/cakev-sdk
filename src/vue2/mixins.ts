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
	data() {
		return {
			ready: false,
			data: null,
			__configReady__: false,
			time: Date.now(),
			instance: null,
			animateTimer: null,
			animateActiveIndex: -1,
			output: null,
			inPreview: true,
			editor: Editor.Instance(),
		}
	},
	beforeDestroy(): void {
		this.instance = null
		clearInterval(this.animateTimer)
		clearTimeout(this.animateTimer)
		this.editor.http.abortOne(this.__widgetId__)
		this.animateTimer = null
		this.animateActiveIndex = -1
	},
	methods: {
		__eventTypesSetting__(eventTypes): void {
			this.editor.eventTypesSetting(this.config.widget.id, eventTypes)
		},
		__handleEvent__(eventType = 'click', val): void {
			if (this.events) {
				if (!this.events[eventType]) {
					if (this.eventTypes) {
						this.__eventTypesSetting__(this.eventTypes)
						return
					} else {
						this.editor.log.push(
							new LogTask({
								code: 'OLD_METHOD_WARN',
								errorMessage: `${this.$parent.type} ${this.config.widget.componentVersion}检测到你使用旧API __handleClick__ 请及时更换新API __handleEvent__ \n\nhttps://eslink-web.yuque.com/books/share/55b0e7ab-4fac-41f5-9062-901636ef4792/phnay2`,
							}),
						)
						this.__eventTypesSetting__([{ key: 'click', label: '点击事件' }])
						return
					}
				}
				this.events[eventType].forEach(item => {
					let finalType = item.triggerType
					if (finalType === 'update') finalType = item.target
					if (item.eventClass === 'scene') {
						const sceneId = item.id
						switch (finalType) {
							case 'openScene':
								if (this.editor.current.currentCreateSceneList.includes(sceneId)) return
								this.editor.activeWidgetId = this.config.widget.id
								this.editor.current.sceneAnimate = item.animate || 'fadeIn'
								this.editor.openScene(sceneId)
								break
							case 'closeScene':
								this.editor.current.sceneAnimate = item.animate || 'fadeOut'
								this.editor.closeScene(sceneId)
								break
							case 'changeScene':
								this.editor.selectSceneIndex(sceneId)
								break
							default:
						}
					}
					if (item.eventClass === 'component') {
						const coms = Object.values(this.editor.screen.screenWidgets).filter((v: any) =>
							item.ids.includes(v.id),
						)
						let data = usePath('', val, errorMessage => {
							this.editor.log.push(
								new LogTask({ code: 'DATA_FILTER_ERROR', id: this.__widgetId__, errorMessage }),
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
										this.editor.updateComponentTarget(v.id, finalType, data)
									}
								})
							} catch (err) {
								this.editor.log.push(new LogTask({ code: 'DATA_FILTER_ERROR', id: this.__widgetId__ }))
							}
						} else {
							coms.forEach((v: any) => {
								if (!['config.api.params', 'config.api.data', 'config.config'].includes(finalType)) {
									v.customEventsConfig.find((c: any) => c.type === finalType).handler(data)
								} else {
									this.editor.updateComponentTarget(v.id, finalType, data)
								}
							})
						}
					}
				})
			} else {
				this.__eventTypesSetting__([{ key: 'click', label: '点击事件' }])
			}
		},
		__handleClick__(val): void {
			this.__handleEvent__('click', val)
		},
		/**
		 * @description 组件间联动，被关联组件收动添加 updateComponent 方法
		 * [id]
		 */
		emitComponentUpdate(data): void {
			if (this.config) {
				this.config.api.bind.refIds.forEach((ref: any) => {
					const widget = this.editor.screen.screenWidgets[ref]
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
			this.__configReady__ = true
			const { value, customConfig, setting, settingData, eventTypes, customEventsConfig } = obj
			this.__eventTypesSetting__(eventTypes)
			this.editor.dataSetting(this.config.widget.id, setting, settingData)
			this.editor.setCustomEventConfig(this.config.widget.id, customEventsConfig)
			this.parseConfigValue(value, customConfig)
		},
		parseConfigValue(localConfigValue, customConfig) {
			return this.editor.updateWidgetConfig(this.config.widget.id, localConfigValue, customConfig)
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
		__widgetId__(): string {
			if (this.config) {
				if (this.config.widget) {
					return this.config.widget.id
				}
			}
			return ''
		},
		styles() {
			const { layout } = this.config
			return {
				width: `${layout.size.width}px`,
				height: `${layout.size.height}px`,
				zIndex: `${this.zIndex}`,
				transform: `translate3d(${layout.position.left}px, ${layout.position.top}px,0) ${
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
				this.editor.activeWidgetId === this.config.widget.id && e.some(v => v.id === this.editor.activeSceneId)
			)
		},
	},
	watch: {
		__configReady__(value): void {
			if (value) {
				requestAnimationFrame(() => {
					this.readonly && this.$el.classList.add('readonly')
					this.ready = true
				})
			}
		},
	},
	mounted(): void {
		this.inPreview = this.editor.editorStatus === 'inPreview'
	},
}
