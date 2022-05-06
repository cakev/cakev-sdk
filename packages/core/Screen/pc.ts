import ScreenBase from '@/core/Screen/base'

export default class ScreenPc extends ScreenBase {
	marketComponents = []

	clear(): void {
		this.screenWidgets = {}
		this.screenWidgetsLays = {}
		this.screenType = 'CUSTOM'
		this.screenLayoutMode = 'full-size'
		this.screenName = '未命名'
		this.screenWidth = 1920
		this.screenHeight = 1080
		this.screenBackGroundColor = 'rgba(24, 27, 36,1)'
		this.screenBackGroundImage = ''
		this.screenAvatar = ''
		this.screenVersion = ''
		this.screenMainScene = 0
		this.screenFilter = {
			enable: false,
			grayscale: 0,
			opacity: 100,
			contrast: 0,
			brightness: 0,
			saturate: 0,
			hueRotate: 0,
		}
	}
	/* 初始化配置 */
	init(res: any): any {
		if (res.screenId) this.screenId = res.screenId
		this.screenName = res.screenName
		this.screenAvatar = res.screenAvatar
		this.screenPublish = res.screenPublish
		this.screenType = res.screenType || 'CUSTOM'
		this.screenVersion = res.screenVersion
		this.screenLayoutMode = res.screenLayoutMode || 'full-size'
		this.screenWidth = res.screenWidth
		this.screenHeight = res.screenHeight
		this.screenBackGroundColor = res.screenBackGroundColor
		this.screenBackGroundImage = res.screenBackGroundImage
		this.screenMainScene = res.screenMainScene
		this.screenPlatform = res.screenPlatform
		return this.initWidget(res)
	}
	/* 序列化children */
	serialize(screenWidgets): void {
		for (const key in screenWidgets) {
			if (screenWidgets[key].widgetMarket) {
				this.marketComponents.push({
					id: key,
					type: screenWidgets[key].type,
					version: screenWidgets[key].config.widget.widgetVersion,
				})
			}
			if (screenWidgets[key].children) {
				if (Object.values(screenWidgets[key].children).length > 0) {
					this.serialize(screenWidgets[key].children)
				}
			}
		}
	}
	/* 序列化组件数据 */
	initWidget(res: any): any {
		const screenWidgets = res.screenWidgets
		for (const key in screenWidgets) {
			let item = { ...res.screenWidgets[key] }
			item = {
				name: item.config.widget.name,
				...item,
			}
			// 兼容自定义事件
			if (item.config.eventType) {
				delete item.config.eventType
			}
			if (item.widgetLayout) {
				delete item.widgetLayout.value
			}
			screenWidgets[item.id] = item
		}
		this.serialize(screenWidgets)
		return { screenWidgets, screenWidgetsLays: res.screenWidgetsLays }
	}
}
