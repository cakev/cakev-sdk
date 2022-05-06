export default class Widget {
	widgetId = ''
	widgetLayout = {}
	widgetIs = ''
	widgetType = 'normal'
	widgetAvatar = ''
	widgetTitle = ''
	widgetMarket: boolean = false
	widgetApi = {}
	widgetBase = {}
	widgetConfig = {}
	// events = {}
	// 组件动画
	// animation = {
	// 	transitionEnable: true,
	// 	enter: 'fadeIn',
	// 	duration: 600,
	// 	delay: 0,
	// }
	constructor({
		widgetId,
		widgetLayout,
		widgetIs,
		widgetType,
		widgetAvatar,
		widgetTitle,
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
		this.widgetTitle = widgetTitle
		this.widgetMarket = widgetMarket
		this.widgetApi = widgetApi
		this.widgetBase = widgetBase
		this.widgetConfig = widgetConfig
	}
}
