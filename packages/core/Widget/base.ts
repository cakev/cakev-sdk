import { uuid } from '@cakev/util'

export default class Widget {
	id: string
	type: string
	config: any
	widgetType = 'normal'
	scene: number | string
	market: boolean
	settingDataHandle = []
	settingData = {}
	eventTypes = []
	customEventsConfig: any[]
	events = {}
	// 组件动画
	animation = {
		transitionEnable: true,
		enter: 'fadeIn',
		duration: 600,
		delay: 0,
	}
	constructor(
		offsetX: number,
		offsetY: number,
		data: any,
		currentSceneIndex: number | string,
		currentMaxZIndex = 10,
	) {
		const {
			// settingDataHandle = [],
			// settingData = {},
			// eventTypes = [],
			// events = {},
			widgetType,
			type,
			name,
			width,
			height,
			config: inputConfig,
			startX,
			startY,
			market = false,
			widgetVersion,
		} = data
		this.type = type
		// this.settingDataHandle = settingDataHandle
		// this.settingData = settingData
		// this.eventTypes = eventTypes
		// this.events = events
		this.market = market
		this.scene = currentSceneIndex
		const { layout, config = {}, widget = {}, api } = inputConfig || {}
		if (widgetType) this.widgetType = widgetType
		if (name) widget.name = name
		if (width) layout.width = width
		if (height) layout.height = height
		const top = offsetY - startY
		const left = offsetX - startX
		layout.top = top
		layout.left = left
		layout.zIndex = currentMaxZIndex
		this.id = uuid()
		widget.id = this.id
		widget.widgetVersion = widgetVersion

		this.config = {
			layout,
			widget,
			config,
			api,
		}
	}
}
