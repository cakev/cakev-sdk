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
		this.screenMainScene = undefined
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
		this.sort = res.sort
		this.createTime = res.createTime
		this.updateTime = res.updateTime
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
			if (screenWidgets[key].market) {
				this.marketComponents.push({
					id: key,
					type: screenWidgets[key].type,
					version: screenWidgets[key].config.widget.componentVersion,
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
			delete item.config.widget.remark
			if (item.config.layout) {
				delete item.config.layout.value
			}
			if (item.config.animation) {
				item.animation = item.config.animation
				delete item.config.animation
			}
			if (item.config.event) {
				if (!item.eventTypes) item.eventTypes = []
				item.eventTypes.push({ key: 'click', label: '点击事件' })
				if (item.config.event.scene) {
					if (!item.events) item.events = {}
					if (!(item.config.event.scene instanceof Array)) {
						item.config.event.scene = [item.config.event.scene]
					}
					item.config.event.scene.forEach(child => {
						const triggerType = child.type
						delete child.type
						if (!item.events.click) item.events.click = []
						item.events.click.push({ ...child, eventClass: 'scene', eventType: 'click', triggerType })
					})
					delete item.config.event.scene
				}
				if (item.config.event.component) {
					if (!item.events) item.events = {}
					if (!(item.config.event.component instanceof Array)) {
						item.config.event.component = [item.config.event.component]
					}
					item.config.event.component.forEach(child => {
						const triggerType = child.type
						delete child.type
						if (!item.events.click) item.events.click = []
						item.events.click.push({ ...child, eventClass: 'component', eventType: 'click', triggerType })
					})
					delete item.config.event.component
				}
				delete item.config.event
			}
			screenWidgets[item.id] = item
		}
		this.serialize(screenWidgets)
		return { screenWidgets, screenWidgetsLays: res.screenWidgetsLays }
	}
}
