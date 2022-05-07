import { Method } from 'axios'

export default class WidgetTask {
	widgetId = ''
	widgetLayout = {
		width: 300,
		height: 200,
		left: 0,
		top: 0,
		scale: 1,
	}
	widgetIs = ''
	widgetType = 'normal'
	widgetAvatar = ''
	widgetMarket = false
	widgetApi = {
		url: '',
		method: 'GET' as Method,
		params: '',
		path: 'data',
		data: '',
		autoFetchEnable: false,
		autoFetchDuration: 5000,
		processEnable: false,
		processBody: '',
	}
	widgetBase = {
		name: '未知组件',
		version: '',
		locked: false,
	}
	widgetConfig = {}
	widgetAnimation = {
		transitionEnable: true,
		enter: 'fadeIn',
		duration: 600,
		delay: 0,
	}
	// events = {}
	constructor({
		widgetId,
		widgetLayout,
		widgetIs,
		widgetType,
		widgetAvatar,
		widgetMarket,
		widgetApi,
		widgetBase,
		widgetConfig,
	}) {
		// this.eventTypes = eventTypes
		// this.events = events
		// this.widgetMarket = widgetMarket
		this.widgetId = widgetId
		this.widgetLayout = widgetLayout
		this.widgetIs = widgetIs
		this.widgetType = widgetType
		this.widgetAvatar = widgetAvatar
		this.widgetMarket = widgetMarket
		this.widgetApi = widgetApi
		this.widgetBase = widgetBase
		this.widgetConfig = widgetConfig
	}
}
