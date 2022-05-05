import { getQueryString, uuid } from '@/core/utils'
import Factory from '@/core/Base/factory'
import Widget from '@/core/Widget/base'
import copy from 'fast-copy'
import commonConfigValue from '@/core/common-config-value.js'
import { configMerge, versionToNum } from '@/core/utils'

export default class Screen extends Factory<Screen> {
	currentVersion = '1.1.0' // 当前系统版本
	screenId: string // 大屏ID
	screenName = '未命名' // 大屏名
	screenWidgets: { [key: string]: Widget } = {} // 大屏组件配置
	screenWidgetsLays = {} // 大屏组件嵌套规则
	screenType = 'CUSTOM' // 大屏类型 CUSTOM:大屏 TEMPLATE:模版
	screenPublish = '' // 大屏发布情况 EDIT:未发布 COMPLETE:已发布
	screenAvatar = '' // 大屏缩略图
	screenVersion = '' // 大屏版本号
	screenLayoutMode = 'full-size' // 大屏适配方式 full-size 充满页面 full-width 100%宽度 full-height 100%高度
	remark = '' // 备注
	sort = 1 // 排序
	createTime: string // 创建时间
	updateTime: string // 更新时间
	screenWidth = 1920 // 大屏宽度
	screenHeight = 1080 // 大屏高度
	screenBackGroundColor = 'rgba(24, 27, 36,1)' // 大屏背景颜色
	screenBackGroundImage = '' // 大屏背景图片
	screenMainScene: string | number // 大屏首屏场景
	screenPlatform: string // 大屏平台类型 PC:PC
	screenDomain: string // 大屏组件接口Domain
	screenHeaders: string // 大屏组件接口Headers
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

	updateWidgetConfig(id: string, localConfigValue: any, customConfig: any): any {
		const mergedValue = localConfigValue
			? configMerge(localConfigValue, commonConfigValue(localConfigValue.widgetType))
			: commonConfigValue()
		const target = this.screenWidgets[id]
		const inputConfig = Object.freeze(target.config || {})
		const res = configMerge(inputConfig, mergedValue)
		res.widget.name = res.widget.name || '未知组件'
		if (!target.widgetType)
			target.widgetType = localConfigValue ? localConfigValue.widgetType || 'normal' : 'normal'
		if (customConfig) {
			customConfig.map(item => {
				if (!item.prop.includes('config.config')) {
					item.prop = `config.config.${item.prop}`
				}
			})
			res.customConfig = [{ type: 'custom' }, ...customConfig]
		}
		target.config = res
	}

	changeLayoutMode(value: string): string {
		let scaleX = 0,
			scaleY = 1,
			actualScaleRatio = 1,
			scale = ''
		const { clientWidth, clientHeight } = document.body
		switch (value) {
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
		if (value === 'full-size') {
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

	/* 大屏样式 */
	get screenStyle() {
		const layoutMode = getQueryString('layoutMode')
		return {
			width: `${this.screenWidth}px`,
			height: `${this.screenHeight}px`,
			backgroundColor: this.screenBackGroundColor,
			backgroundImage: `url(${this.screenBackGroundImage})`,
			overflow: 'hidden',
			transform: this.changeLayoutMode(layoutMode),
			...this.screenFilterStyle,
		}
	}

	/* 获取大屏数据 */
	screenData(): any {
		return {
			screenFilter: this.screenFilter,
			screenWidgets: this.screenWidgets,
			screenType: this.screenType,
			screenAvatar: this.screenAvatar,
			screenDomain: this.screenDomain,
			screenHeaders: this.screenHeaders,
			screenBackGroundColor: this.screenBackGroundColor,
			screenBackGroundImage: this.screenBackGroundImage,
			screenHeight: this.screenHeight,
			screenWidth: this.screenWidth,
			screenName: this.screenName,
			screenPlatform: this.screenPlatform,
			screenWidgetsLays: this.screenWidgetsLays,
			screenVersion: versionToNum(this.currentVersion),
			screenLayoutMode: this.screenLayoutMode,
			screenMainScene: this.screenMainScene,
		}
	}
	/* 添加组件 */
	createWidget(
		offsetX = 0,
		offsetY = 0,
		data: any,
		currentSceneIndex: number | string = 0,
		currentMaxZIndex = 10,
	): void {
		const widgetItem = new Widget(offsetX, offsetY, data, currentSceneIndex, currentMaxZIndex)
		this.screenWidgets = {
			...this.screenWidgets,
			[widgetItem.id]: widgetItem,
		}
		this.screenWidgetsLays = {
			...this.screenWidgetsLays,
			[widgetItem.id]: { scene: currentSceneIndex, id: widgetItem.id, zIndex: currentMaxZIndex, hide: false },
		}
	}
	/* 复制组件 */
	copyWidget(copyId: string): void {
		const widget = this.screenWidgets[copyId]
		if (!widget) return
		const newWidget = copy(widget)
		const id = uuid()
		newWidget.id = id
		const config = newWidget.config
		config.widget.id = id
		const layout = config.layout
		layout.left = 10 + Number(layout.left)
		layout.top = 10 + Number(layout.top)
		this.screenWidgets = { ...this.screenWidgets, [id]: newWidget }
	}
	/* 更新组件 */
	updateComponentTarget(id, target, value): void {
		switch (target) {
			case 'config.api.params':
				this.screenWidgets[id].config.api.params = {
					...this.screenWidgets[id].config.api.params,
					...value,
				}
				break
			case 'config.api.data':
				this.screenWidgets[id].config.api.data = value
				break
			case 'config.config':
				this.screenWidgets[id].config.config = {
					...this.screenWidgets[id].config.config,
					...value,
				}
				break
		}
	}
	/* 更新组件 */
	updateComponent(id, config): void {
		const widgetConfig = this.screenWidgets[id].config.api
		if (config.params) {
			widgetConfig.params = JSON.stringify(config.params)
		}
		if (config.data) {
			widgetConfig.data = JSON.stringify(config.data)
		}
		if (config.url) {
			widgetConfig.url = config.url
		}
		if (config.path) {
			widgetConfig.path = config.path
		}
		if (config.method) {
			widgetConfig.method = config.method
		}
	}
}
