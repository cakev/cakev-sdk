import { Method } from 'axios'

export default class {
	widgetLayout = {
		width: 300,
		height: 200,
		left: 0,
		top: 0,
		scale: 1,
	}
	widgetType = 'normal'
	widgetIs: null | string = null
	widgetConfig = {}
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
	widgetTypeId = ''
	widgetAvatar = ''
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
		} = obj
		if (widgetBase) this.widgetBase = { ...this.widgetBase, ...widgetBase }
		if (widgetAvatar) this.widgetAvatar = widgetAvatar
		if (widgetLayout) this.widgetLayout = { ...this.widgetLayout, ...widgetLayout }
		if (widgetApi) this.widgetApi = { ...this.widgetApi, ...widgetApi }
		if (widgetType) this.widgetType = widgetType
		if (widgetConfig) this.widgetConfig = { ...this.widgetConfig, ...widgetConfig }
		if (widgetTypeId) this.widgetTypeId = widgetTypeId
		this.widgetMarket = !!widgetMarket
		if (widgetIs) {
			this.widgetIs = widgetIs
		}
	}
}
