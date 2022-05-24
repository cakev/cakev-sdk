import { uuid } from '@cakev/util'
import Factory from '../Base/factory'
import WidgetTask from '../Widget/task'
import LayTask from './lay'
import SceneTask from './scene'

export default class ScreenTask extends Factory<ScreenTask> {
	screenId = '' // 大屏ID
	screenName = '未命名大屏' // 大屏名
	screenWidgets: { [key: string]: WidgetTask } = {} // 大屏组件配置
	screenWidgetsLays: { [key: string]: LayTask } = {} // 大屏组件嵌套规则
	screenScene: { [key: string]: SceneTask } = {} // 大屏场景
	screenAvatar = '' // 大屏缩略图
	screenVersion = '' // 大屏版本号
	screenLayoutMode = 'full-size' // 大屏适配方式 full-size 充满页面 full-width 100%宽度 full-height 100%高度
	screenWidth = 1920 // 大屏宽度
	screenHeight = 1080 // 大屏高度
	screenBackGroundColor = 'rgb(11,11,11)' // 大屏背景颜色
	screenBackGroundImage = '' // 大屏背景图片
	screenMainScene: string | number = 0 // 大屏首屏场景
	screenDomain = ''
	screenHeaders = '{"Content-Type":"application/json"}'
	screenFilter = {
		// 更新大屏组件配置
		enable: false, // 开启状态
		grayscale: 0, // 灰度
		opacity: 100, // 不透明度
		contrast: 0, // 对比度
		brightness: 0, // 明度
		saturate: 0, // 饱和度
		hueRotate: 0, // 色相
	}

	clear(): void {
		this.screenWidgets = {}
		this.screenWidgetsLays = {}
		this.screenScene = {}
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

	init(res: ScreenTask): void {
		this.screenId = res.screenId
		this.screenName = res.screenName
		this.screenAvatar = res.screenAvatar
		this.screenVersion = res.screenVersion
		this.screenLayoutMode = res.screenLayoutMode || 'full-size'
		this.screenWidth = res.screenWidth
		this.screenHeight = res.screenHeight
		this.screenBackGroundColor = res.screenBackGroundColor
		this.screenBackGroundImage = res.screenBackGroundImage
		this.screenMainScene = res.screenMainScene
		this.screenWidgets = res.screenWidgets
		this.screenWidgetsLays = res.screenWidgetsLays
		this.screenScene = res.screenScene
	}

	get screenTransformStyle(): string {
		let scaleX = 0,
			scaleY = 1,
			actualScaleRatio = 1,
			scale = ''
		const { clientWidth, clientHeight } = document.body
		switch (this.screenLayoutMode) {
			case 'full-size':
				scaleX = clientWidth / this.screenWidth
				scaleY = clientHeight / this.screenHeight
				break
			case 'full-width':
				actualScaleRatio = clientWidth / this.screenWidth
				break
			case 'full-height':
				actualScaleRatio = clientHeight / this.screenHeight
				break
		}
		if (this.screenLayoutMode === 'full-size') {
			scale = `${scaleX},${scaleY}`
		} else {
			scale = `${actualScaleRatio}`
		}
		return `scale(${scale}) translate3d(0, 0, 0)`
	}

	get screenFilterStyle() {
		let grayscale = '',
			opacity = '',
			contrast = '',
			brightness = '',
			saturate = '',
			hueRotate = ''
		if (this.screenFilter.enable) {
			grayscale = this.screenFilter.grayscale > 0 ? `grayscale(${this.screenFilter.grayscale}%)` : ''
			opacity = this.screenFilter.opacity < 100 ? `opacity(${this.screenFilter.opacity}%)` : ''
			contrast = this.screenFilter.contrast !== 0 ? `contrast(${this.screenFilter.contrast + 100}%)` : ''
			brightness = this.screenFilter.brightness !== 0 ? `brightness(${this.screenFilter.brightness + 100}%)` : ''
			saturate = this.screenFilter.saturate !== 0 ? `saturate(${this.screenFilter.saturate + 100}%)` : ''
			hueRotate = this.screenFilter.hueRotate !== 0 ? `hue-rotate(${this.screenFilter.hueRotate}deg)` : ''
		}
		if (grayscale || opacity || contrast || brightness || saturate || hueRotate)
			return { filter: `${grayscale} ${opacity} ${contrast} ${brightness} ${saturate} ${hueRotate}` }
		return {}
	}

	// 创建场景
	createScene(): string {
		const name = uuid()
		const scene = new SceneTask(name)
		this.screenScene = { ...this.screenScene, [name]: scene }
		return name
	}
	/* 删除场景 */
	destroyScene(index: number | string): void {
		delete this.screenScene[index]
		this.screenScene = { ...this.screenScene }
	}
	// 删除场景中组件 场景中组件 移入回收站
	destroySceneWidgets(index: number | string): void {
		if (index === -1) {
			for (const key in this.screenWidgetsLays) {
				if (this.screenWidgetsLays[key].scene === -1) {
					delete this.screenWidgets[key]
					delete this.screenWidgetsLays[key]
				}
			}
		} else {
			for (const key in this.screenWidgetsLays) {
				if (this.screenWidgetsLays[key].scene === index) {
					this.screenWidgetsLays[key].scene = -1
				}
			}
		}
		this.screenWidgetsLays = { ...this.screenWidgetsLays }
		this.screenWidgets = { ...this.screenWidgets }
	}

	/* 添加组件 */
	createWidget({
		offsetX,
		offsetY,
		startX,
		startY,
		currentSceneIndex,
		currentMaxZIndex,
		widgetLayout,
		widgetIs,
		widgetType,
		widgetAvatar,
		widgetMarket,
		widgetApi,
		widgetBase,
		widgetConfig,
	}): void {
		const top = (offsetY || 0) - (startY || 0)
		const left = (offsetX || 0) - (startX || 0)
		widgetLayout.top = top
		widgetLayout.left = left
		const widgetId = uuid()
		const widget = new WidgetTask(
			JSON.parse(
				JSON.stringify({
					widgetId,
					widgetLayout,
					widgetIs,
					widgetType,
					widgetAvatar,
					widgetMarket,
					widgetApi,
					widgetBase,
					widgetConfig,
				}),
			),
		)
		this.screenWidgets = {
			...this.screenWidgets,
			[widgetId]: widget,
		}
		const lay = new LayTask({ scene: currentSceneIndex, widgetId, zIndex: currentMaxZIndex, hide: false })
		this.screenWidgetsLays = {
			...this.screenWidgetsLays,
			[widgetId]: lay,
		}
	}
	// 刷新当前组件
	refreshWidget(widgetId: string): void {
		const widget = this.screenWidgets[widgetId]
		const lay = this.screenWidgetsLays[widgetId]
		delete this.screenWidgetsLays[widgetId]
		delete this.screenWidgets[widgetId]
		this.screenWidgetsLays = { ...this.screenWidgetsLays }
		this.screenWidgets = { ...this.screenWidgets }
		setTimeout(() => {
			this.screenWidgets[widget.widgetId] = widget
			this.screenWidgetsLays[widget.widgetId] = lay
			this.screenWidgets = { ...this.screenWidgets }
			this.screenWidgetsLays = { ...this.screenWidgetsLays }
		})
	}
	// 锁定/解锁组件
	lockWidget(widgetId: string) {
		this.screenWidgets[widgetId].widgetBase.locked = !this.screenWidgets[widgetId].widgetBase.locked
		this.screenWidgets = { ...this.screenWidgets }
	}
	// 隐藏/显示组件
	hideWidget(widgetId: string) {
		this.screenWidgetsLays[widgetId].hide = !this.screenWidgetsLays[widgetId].hide
	}
	// 组件 移入回收站
	dropWidget(widgetId: string): void {
		this.screenWidgetsLays[widgetId].scene = -1
		this.screenWidgetsLays = { ...this.screenWidgetsLays }
	}
	// 删除组件
	deleteWidget(widgetId: string): void {
		delete this.screenWidgets[widgetId]
		delete this.screenWidgetsLays[widgetId]
		this.screenWidgets = { ...this.screenWidgets }
		this.screenWidgetsLays = { ...this.screenWidgetsLays }
	}
	// 复制组件
	copyWidget(widgetId: string): void {
		const widget = this.screenWidgets[widgetId]
		const lay = this.screenWidgetsLays[widgetId]
		const newWidgetId = uuid()
		const newWidget = new WidgetTask({ ...JSON.parse(JSON.stringify(widget)), widgetId: newWidgetId })
		newWidget.widgetLayout.left = 10 + Number(newWidget.widgetLayout.left)
		newWidget.widgetLayout.top = 10 + Number(newWidget.widgetLayout.top)
		const newLay = new LayTask({ ...lay, widgetId: newWidgetId })
		this.screenWidgetsLays = { ...this.screenWidgetsLays, [newWidgetId]: newLay }
		this.screenWidgets = { ...this.screenWidgets, [newWidgetId]: newWidget }
	}
	// 设定组件 zIndex
	setWidgetZIndex(widgetId: string, zIndex: number) {
		this.screenWidgetsLays[widgetId].zIndex = zIndex
	}
	// 更新组件
	// updateComponentTarget(id, target, value): void {
	// 	switch (target) {
	// 		case 'config.api.params':
	// 			this.screenWidgets[id].config.api.params = {
	// 				...this.screenWidgets[id].config.api.params,
	// 				...value,
	// 			}
	// 			break
	// 		case 'config.api.data':
	// 			this.screenWidgets[id].config.api.data = value
	// 			break
	// 		case 'config.config':
	// 			this.screenWidgets[id].config.config = {
	// 				...this.screenWidgets[id].config.config,
	// 				...value,
	// 			}
	// 			break
	// 	}
	// }
	// 更新组件
	// updateComponent(id, config): void {
	// 	const widgetConfig = this.screenWidgets[id].config.api
	// 	if (config.params) {
	// 		widgetConfig.params = JSON.stringify(config.params)
	// 	}
	// 	if (config.data) {
	// 		widgetConfig.data = JSON.stringify(config.data)
	// 	}
	// 	if (config.url) {
	// 		widgetConfig.url = config.url
	// 	}
	// 	if (config.path) {
	// 		widgetConfig.path = config.path
	// 	}
	// 	if (config.method) {
	// 		widgetConfig.method = config.method
	// 	}
	// }
}
