import { Method } from 'axios'

export default class WidgetTask {
	widgetLayout = {
		width: 300,
		height: 200,
		left: 0,
		top: 0,
		scale: 1,
	}
	widgetBase = {
		name: '未知组件',
		version: '',
		locked: false,
	}
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
	widgetConfig = {}
	widgetAnimation = {
		transitionEnable: true,
		enter: 'fadeIn',
		duration: 1000,
		delay: 0,
	}
	widgetType = 'normal'
	widgetIs: null | string = null
	widgetTypeId = ''
	widgetAvatar = ''
	widgetId = ''
	widgetMarket = false

	constructor(obj) {
		const {
			widgetLayout,
			widgetBase,
			widgetApi,
			widgetType,
			widgetConfig,
			widgetIs,
			widgetMarket,
			widgetTypeId,
			widgetAvatar,
			widgetId,
		} = obj
		if (widgetId) this.widgetId = widgetId
		if (widgetAvatar) this.widgetAvatar = widgetAvatar
		if (widgetType) this.widgetType = widgetType
		if (widgetTypeId) this.widgetTypeId = widgetTypeId
		if (widgetIs) this.widgetIs = widgetIs
		this.widgetMarket = !!widgetMarket
		if (widgetBase) this.widgetBase = { ...this.widgetBase, ...widgetBase }
		if (widgetLayout) this.widgetLayout = { ...this.widgetLayout, ...widgetLayout }
		if (widgetApi) this.widgetApi = { ...this.widgetApi, ...widgetApi }
		if (widgetConfig) this.widgetConfig = { ...this.widgetConfig, ...widgetConfig }
	}
}
