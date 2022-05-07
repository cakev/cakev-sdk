import Ruler from '@/core/ui/Ruler'
import { uuid } from '@cakev/util'
import Agent from '@/core/Editor/agent'
import WidgetTask from '@/core/Widget/task'

export default class Editor extends Agent {
	init(res?: any): any {
		let screen
		if (res) {
			if (res.screenId) this.screenId = res.screenId
			screen = this.screen.init(res)
			this.scene.init(res)
		}
		this.resetZoom()
		return { screen }
	}

	clear(): void {
		this.screen.clear()
		this.current.clear()
		this.scene.clear()
	}

	/* 放大画布 */
	zoomIn(step = 2): void {
		this.current.zoomIn(step)
		this.ruler.draw({
			zoom: this.current.zoom,
		})
	}
	/* 缩小画布 */
	zoomOut(step = 2): void {
		this.current.zoomOut(step)
		this.ruler.draw({
			zoom: this.current.zoom,
		})
	}
	/* 画布还原最佳比例 */
	resetZoom(): void {
		if (this.editorStatus === 'inEdit') {
			if (!this.ruler) this.ruler = new Ruler(this.rulerContainerId)
			this.ruler.resetZoom({
				screenHeight: this.screen.screenHeight,
				screenWidth: this.screen.screenWidth,
			})
			this.current.resetZoom({
				screenHeight: this.screen.screenHeight,
				screenWidth: this.screen.screenWidth,
			})
		}
	}
	get currentSceneWidget() {
		return Object.values(this.screen.screenWidgetsLays)
			.filter(item => item.scene === this.current.currentSceneIndex)
			.sort((a, b) => {
				return b.zIndex - a.zIndex - 1
			})
	}
	get currentMaxZIndex(): number {
		return this.currentSceneWidget.length ? this.currentSceneWidget[0].zIndex + 1 : 10
	}
	get currentMinZIndex(): number {
		return this.currentSceneWidget.length
			? this.currentSceneWidget[this.currentSceneWidget.length - 1].zIndex - 1
			: 10
	}
	/* 删除多个组件 */
	deleteWidgets(): void {
		this.currentWidgetList.map(item => {
			this.screen.screenWidgetsLays[item].scene = -1
		})
		this.current.unSelectWidget()
		this.screen.screenWidgets = { ...this.screen.screenWidgets }
	}
	/* 更新大屏组件配置 */
	updateWidgetConfig(id: string, localConfigValue: any, customConfig: any): any {
		return this.screen.updateWidgetConfig(id, localConfigValue, customConfig)
	}

	/* ---------------------------------------------------Scene---------------------------------------------------*/
	/* 更新场景名称 */
	setSceneName(name: string): void {
		this.scene.setSceneName(this.current.currentSceneIndex, name)
	}
	/* 创建场景 */
	createScene(): void {
		const name = uuid()
		this.scene.createScene(name)
		this.current.selectSceneIndex(name)
	}
	/* 删除场景 */
	destroyScene(): void {
		if (this.current.currentSceneIndex !== 0) {
			this.moveWaitingDeleteRoom()
			this.scene.destroyScene(this.current.currentSceneIndex)
			this.current.selectSceneIndex(0)
			this.scene.sceneObj = { ...this.scene.sceneObj }
		}
	}
	/* ---------------------------------------------------More---------------------------------------------------*/
	moveWaitingDeleteRoom(): void {
		for (const key in this.screen.screenWidgets) {
			if (this.screen.screenWidgets[key].scene === this.current.currentSceneIndex) {
				this.screen.screenWidgets[key].scene = -1
			}
		}
		this.screen.screenWidgets = { ...this.screen.screenWidgets }
	}

	/* 获取大屏组件配置——根据zIndex排序 */
	get sortByZIndexWidgetsList(): any {
		const list = []
		for (const key in this.screen.screenWidgetsLays) {
			const widget = this.screen.screenWidgets[this.screen.screenWidgetsLays[key].id]
			if (this.screen.screenWidgetsLays[key].scene === this.current.currentSceneIndex) {
				list.push(widget)
			}
		}
		list.sort((a, b) => {
			return b.widgetLayout.zIndex - a.widgetLayout.zIndex - 1
		})
		return list
	}
	get rulerStyle(): any {
		return {
			transform: `translate3d(${this.current.offsetX}px, ${this.current.offsetY}px, 0) scale(${this.current.zoom})`,
			width: `${this.width + 18 * 2}px`,
			height: `${this.height + 18 * 2}px`,
		}
	}
	screenSizeChange({ width, height }: any = {}): void {
		if (width) this.screen.screenWidth = width
		if (height) this.screen.screenHeight = height
		this.resetZoom()
	}
	/* 清除当前场景的组件 */
	clearWidgetByCurrentScene(): void {
		if (this.current.currentSceneIndex == -1) {
			for (const key in this.screen.screenWidgetsLays) {
				if (this.screen.screenWidgetsLays[key].scene === -1) {
					delete this.screen.screenWidgets[key]
					delete this.screen.screenWidgetsLays[key]
				}
			}
		} else {
			for (const key in this.screen.screenWidgetsLays) {
				if (this.screen.screenWidgetsLays[key].scene === this.current.currentSceneIndex) {
					this.screen.screenWidgetsLays[key].scene = -1
				}
			}
		}
		this.screen.screenWidgets = { ...this.screen.screenWidgets }
		this.screen.screenWidgetsLays = { ...this.screen.screenWidgetsLays }
	}

	/**
	 * @description 预置事件初始化
	 */
	setCustomEventConfig(id: string, val): void {
		if (val && val.length) {
			const target = this.screen.screenWidgets[id]
			target.customEventsConfig = val
		}
	}

	/**
	 * @description 触发事件初始化
	 */
	eventTypesSetting(id: string, eventTypes: { key: string; label: string }[]) {
		if (eventTypes && eventTypes.length) {
			const target = this.screen.screenWidgets[id]
			target.eventTypes = eventTypes
			const obj = {}
			eventTypes.forEach(item => {
				if (!obj[item['key']]) obj[item['key']] = []
			})
			if (!target.events) {
				target.events = JSON.parse(JSON.stringify(obj))
			} else {
				target.events = JSON.parse(JSON.stringify({ ...obj, ...target.events }))
			}
		}
	}
	
	/* 添加到选中组件集合 */
	selectWidget(widget: WidgetTask) {
		this.current.selectWidget(widget)
		if (this.currentWidgetList.length > 1) {
			this.updateCurrentWidgetListConfig()
		}
	}

	updateCurrentWidgetListConfig(): void {
		let minLeft = null,
			maxLeft = null,
			width = 0,
			height = 0,
			minTop = null,
			maxTop = null
		this.currentWidgetList.map(item => {
			const m = this.screen.screenWidgets[item]
			if (minLeft === null) {
				minLeft = Number(m.widgetLayout.left)
			}
			if (maxLeft === null) {
				maxLeft = Number(m.widgetLayout.left)
				width = Number(m.widgetLayout.width)
			}
			if (minTop === null) {
				minTop = Number(m.widgetLayout.top)
			}
			if (maxTop === null) {
				maxTop = Number(m.widgetLayout.top)
				height = Number(m.widgetLayout.height)
			}
			if (minLeft > Number(m.widgetLayout.left)) {
				minLeft = m.widgetLayout.left
			}
			if (Number(maxLeft) + Number(width) < Number(m.widgetLayout.left) + Number(m.widgetLayout.width)) {
				maxLeft = m.widgetLayout.left
				width = m.widgetLayout.width
			}
			if (minTop > Number(m.widgetLayout.top)) {
				minTop = m.widgetLayout.top
			}
			if (Number(maxTop) + Number(height) < Number(m.widgetLayout.top) + Number(m.widgetLayout.height)) {
				maxTop = m.widgetLayout.top
				height = m.widgetLayout.height
			}
		})
		this.selectWidgetList({
			left: minLeft,
			top: minTop,
			width: Number(width) + (Number(maxLeft) - Number(minLeft)),
			height: Number(height) + (Number(maxTop) - Number(minTop)),
			z: this.currentMaxZIndex,
		})
	}
}
