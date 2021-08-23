import Factory from '@/core/Base/factory'
import ScreenTask from '@/core/Screen/task'
import SceneTask from '@/core/Scene/task'
import WidgetTask from '@/core/Widget/task'
import WidgetLayer from '@/core/Widget/layer'

const md5 = require('md5')

export default class Screen extends Factory<Screen> {
	currentScreen: ScreenTask | null = null
	currentWidgets: Array<string> = []
	screenList: Array<ScreenTask> = []
	screenMd5SchemaList: Array<string> = [] // md5文件指纹判别是否修改了大屏
	currentScene: SceneTask | null = null

	// 解锁/锁定组件
	changeLock() {
		this.currentScreen.widgets[this.currentWidgets[0]].lock =
			!this.currentScreen.widgets[this.currentWidgets[0]].lock
		this.currentScreen.widgets = { ...this.currentScreen.widgets }
	}

	// 拼合组件
	makeGroup() {
		let minLeft = null,
			maxLeft = null,
			width = 0,
			height = 0,
			minTop = null,
			maxTop = null
		this.currentWidgets.map(item => {
			const m = this.currentScreen.widgets[item]
			if (minLeft === null) {
				minLeft = m.x
			}
			if (maxLeft === null) {
				maxLeft = m.x
				width = m.width
			}
			if (minTop === null) {
				minTop = m.y
			}
			if (maxTop === null) {
				maxTop = m.y
				height = m.height
			}
			if (minLeft > m.x) {
				minLeft = m.x
			}
			if (maxLeft + width < m.x + m.width) {
				maxLeft = m.x
				width = m.width
			}
			if (minTop > m.y) {
				minTop = m.y
			}
			if (maxTop + height < m.y + m.height) {
				maxTop = m.y
				height = m.height
			}
		})
		const x = minLeft
		const y = minTop
		width = width + maxLeft - minLeft
		height = height + maxTop - minTop
		this.pushWidgetGroup({
			x,
			y,
			width,
			height,
		})
	}

	// 添加分组组件
	pushWidgetGroup(obj: { x: number; y: number; width: number; height: number }) {
		const widget = new WidgetTask({ ...obj, name: '分组', group: true })
		const widgets = []
		const currentWidgets = this.currentWidgets
		this.cancelSelectWidget()
		for (let i = 0; i < this.currentScreen.widgetsLayers.length; i++) {
			if (currentWidgets.includes(this.currentScreen.widgetsLayers[i].id)) {
				widgets.push(this.currentScreen.widgetsLayers[i])
				this.currentScreen.widgetsLayers.splice(i, 1)
				i--
			}
		}
		const layer = new WidgetLayer({
			id: widget.id,
			scene: this.currentScene.id,
			widgets,
			group: true,
			zIndex: this.sceneWidgetsBySortList[0] ? this.sceneWidgetsBySortList[0].zIndex + 1 : 10,
		})
		this.currentScreen.widgetsLayers = [...this.currentScreen.widgetsLayers, layer]
		this.currentScreen.widgets = { ...this.currentScreen.widgets, [widget.id]: widget }
		this.selectWidgetById(widget.id)
	}

	// 取消拼合
	cancelGroup() {
		const id = this.currentWidgets[0]
		delete this.currentScreen.widgets[this.currentWidgets[0]]
		this.cancelSelectWidget()
		let widgets = []
		for (let i = 0; i < this.currentScreen.widgetsLayers.length; i++) {
			if (this.currentScreen.widgetsLayers[i].id === id) {
				widgets = this.currentScreen.widgetsLayers[i].widgets
				this.currentScreen.widgetsLayers.splice(i, 1)
				i--
			}
		}
		this.currentScreen.widgets = { ...this.currentScreen.widgets }
		this.currentScreen.widgetsLayers = [...this.currentScreen.widgetsLayers, ...widgets]
	}

	// 取消选择组件
	cancelSelectWidget() {
		this.currentWidgets = []
	}

	// 选择组件
	selectWidgetById(id: string) {
		this.currentWidgets = [...this.currentWidgets, id]
	}

	// 选中一个组件
	selectOneWidget(id: string) {
		this.currentWidgets = [...[id]]
	}

	// 复制组件
	copyWidget() {
		const widget: WidgetTask = this.currentScreen.widgets[this.currentWidgets[0]]
		const newWidget: WidgetTask = new WidgetTask({ ...widget, name: `${widget.name}副本` })
		this.pushWidget(newWidget)
	}

	// 删除组件
	removeWidget() {
		const widget = this.currentScreen.widgets[this.currentWidgets[0]]
		//todo 递归
		if (this.currentScene.id === '-1') {
			this.currentScreen.widgetsLayers.forEach((item, index) => {
				if (item.id === widget.id) {
					this.currentScreen.widgetsLayers.splice(index, 1)
				}
			})
			delete this.currentScreen.widgets[this.currentWidgets[0]]
		} else {
			this.currentScreen.widgetsLayers.forEach(item => {
				if (item.id === widget.id) {
					item.scene = '-1'
				}
			})
		}
		this.cancelSelectWidget()
		this.currentScreen.widgets = { ...this.currentScreen.widgets }
	}

	// 添加组件
	pushWidget(widget: WidgetTask) {
		this.currentScreen.widgets = { ...this.currentScreen.widgets, [widget.id]: widget }
		this.currentScreen.widgetsLayers = [
			...this.currentScreen.widgetsLayers,
			new WidgetLayer({
				id: widget.id,
				scene: this.currentScene.id,
				zIndex: this.sceneWidgetsBySortList[0] ? this.sceneWidgetsBySortList[0].zIndex + 1 : 10,
			}),
		]
		this.selectOneWidget(widget.id)
	}

	// 校验是否修改过
	checkChange(id) {
		const now = md5(JSON.stringify(this.currentScreen))
		let old
		this.screenList.forEach((item, index) => {
			if (item.id === id) {
				old = this.screenMd5SchemaList[index]
			}
		})
		return old === now
	}

	// 删除大屏
	removeScreenById(id) {
		this.screenList.forEach((item, index) => {
			if (item.id === id) {
				this.screenList.splice(index, 1)
				this.screenMd5SchemaList.splice(index, 1)
			}
			this.currentWidgets = []
			if (item.id === this.currentScreen.id) {
				if (this.screenList.length > 0) {
					this.currentScreen = this.screenList[0]
				} else {
					this.currentScreen = null
				}
			}
		})
	}

	// 选择大屏
	selectScreenByIndex(index) {
		this.currentScreen = this.screenList[index]
		this.selectSceneById('0')
	}

	// 创建大屏
	createScreen(id) {
		const screen: ScreenTask = new ScreenTask(id)
		this.screenMd5SchemaList.push(md5(JSON.stringify(screen)))
		this.screenList = [...this.screenList, screen]
		if (!this.currentScreen) {
			this.currentScreen = screen
			this.selectSceneById('0')
		}
	}

	// 当前场景 按zIndex 排序后的序列
	get sceneWidgetsBySortList(): Array<WidgetLayer> {
		return this.currentScreen.widgetsLayers
			.filter((item: WidgetLayer) =>
				this.currentScene.id === '0' || this.currentScene.id === '-1'
					? item.scene === this.currentScene.id
					: item.scene === '0' || item.scene === this.currentScene.id,
			)
			.sort((a: WidgetLayer, b: WidgetLayer) => {
				return b.zIndex - a.zIndex - 1
			})
	}
	// @ts-ignore
	set sceneWidgetsBySortList(val) {}

	// 选中场景
	selectSceneById(id) {
		if (this.currentScreen.scenes[id]) this.currentScene = this.currentScreen.scenes[id]
		this.cancelSelectWidget()
	}

	// 创建场景
	createScene() {
		const scene: SceneTask = new SceneTask()
		this.currentScreen.scenes = { ...this.currentScreen.scenes, [scene.id]: scene }
		this.selectSceneById(scene.id)
	}

	// 清空场景
	clearScene() {
		if (this.sceneWidgetsBySortList.length <= 0) return
		if (this.currentScene.id === '-1') {
			for (let i = 0; i < this.currentScreen.widgetsLayers.length; i++) {
				const item = this.currentScreen.widgetsLayers[i]
				if (item.scene === this.currentScene.id) {
					delete this.currentScreen.widgets[item.id]
					this.currentScreen.widgetsLayers.splice(i, 1)
					i--
				}
			}
		} else {
			this.currentScreen.widgetsLayers.forEach(item => {
				if (item.scene === this.currentScene.id) {
					item.scene = '-1'
				}
			})
		}
		this.cancelSelectWidget()
		this.currentScreen.widgets = { ...this.currentScreen.widgets }
		this.currentScreen.widgetsLayers = [...this.currentScreen.widgetsLayers]
	}

	// 删除场景
	removeScene() {
		this.clearScene()
		delete this.currentScreen.scenes[this.currentScene.id]
		this.currentScreen.scenes = { ...this.currentScreen.scenes }
		this.selectSceneById('-1')
	}

	constructor() {
		super()
	}
}
