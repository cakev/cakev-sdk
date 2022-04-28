import { uuid } from '@/core/utils'

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
			componentVersion,
			componentId,
		} = data
		this.type = type
		// this.settingDataHandle = settingDataHandle
		// this.settingData = settingData
		// this.eventTypes = eventTypes
		// this.events = events
		this.market = market
		this.scene = currentSceneIndex
		const { layout = { size: {}, position: {} }, config = {}, widget = {}, api } = inputConfig || {}
		if (!layout.size) layout.size = {}
		if (!layout.position) layout.position = {}
		if (widgetType) this.widgetType = widgetType
		if (name) widget.name = name
		if (width) layout.size.width = width
		if (height) layout.size.height = height
		const top = offsetY - startY
		const left = offsetX - startX
		layout.position.top = top
		layout.position.left = left
		layout.zIndex = currentMaxZIndex
		this.id = uuid()
		widget.id = this.id
		widget.componentVersion = componentVersion
		widget.componentId = componentId

		this.config = {
			layout,
			widget,
			config,
			api,
		}
	}
}
