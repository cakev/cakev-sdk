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
	widgetTitle = '未知组件'
	widgetConfig = {}
	widgetBase = {
		name: '',
		version: '',
		locked: false,
	}
	widgetApi = {
		url: '',
		method: 'GET',
		params: '',
		path: 'data',
		data: '',
		autoFetch: {
			enable: false,
			duration: 5000,
		},
		process: {
			enable: false,
			methodBody: '',
		},
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
			widgetTitle,
			widgetIs,
			widgetMarket,
			widgetTypeId,
			widgetAvatar,
		} = obj
		if (widgetBase) this.widgetBase = widgetBase
		if (widgetAvatar) this.widgetAvatar = widgetAvatar
		if (widgetLayout) this.widgetLayout = widgetLayout
		if (widgetApi) this.widgetApi = widgetApi
		if (widgetType) this.widgetType = widgetType
		if (widgetConfig) this.widgetConfig = widgetConfig
		if (widgetTypeId) this.widgetTypeId = widgetTypeId
		this.widgetMarket = !!widgetMarket
		if (widgetTitle) {
			this.widgetTitle = widgetTitle
		} else {
			if (widgetIs) {
				this.widgetIs = widgetIs
				this.widgetTitle = widgetIs
			}
		}
	}
}
