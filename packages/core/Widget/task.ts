export default class Widget {
	widgetId = ''
	widgetLayout = {}
	widgetIs = ''
	widgetType = 'normal'
	widgetAvatar = ''
	widgetMarket = false
	widgetApi = {}
	widgetBase = {}
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
