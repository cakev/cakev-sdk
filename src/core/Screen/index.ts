import Factory from '@/core/Base/factory'
import ScreenTask from '@/core/Screen/task'
import SceneTask from '@/core/Scene/task'
import WidgetTask from '@/core/Widget/task'
import WidgetLayout from '@/core/Widget/layout'

const md5 = require('md5')

export default class Screen extends Factory<Screen> {
	currentScreen: ScreenTask | null = null
	currentWidgets: Array<string> = []
	screenList: Array<ScreenTask> = []
	screenMd5SchemaList: Array<string> = []
	currentScene: SceneTask | null = null

	// 取消选择组件
	cancelSelectWidget() {
		this.currentWidgets = []
	}

	// 选择组件
	selectWidgetById(id: string) {
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
			this.currentScreen.widgetsLays.forEach((item, index) => {
				if (item.id === widget.id) {
					this.currentScreen.widgetsLays.splice(index, 1)
				}
			})
			delete this.currentScreen.widgets[this.currentWidgets[0]]
		} else {
			this.currentScreen.widgetsLays.forEach(item => {
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
		this.currentScreen.widgetsLays = [
			...this.currentScreen.widgetsLays,
			new WidgetLayout({
				id: widget.id,
				scene: this.currentScene.id,
				zIndex: this.sceneWidgetsBySortList[0] ? this.sceneWidgetsBySortList[0].zIndex + 1 : 10,
			}),
		]
		this.selectWidgetById(widget.id)
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
	get sceneWidgetsBySortList(): Array<WidgetLayout> {
		return this.currentScreen.widgetsLays
			.filter((item: WidgetLayout) =>
				this.currentScene.id === '0' || this.currentScene.id === '-1'
					? item.scene === this.currentScene.id
					: item.scene === '0' || item.scene === this.currentScene.id,
			)
			.sort((a: WidgetLayout, b: WidgetLayout) => {
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
			for (let i = 0; i < this.currentScreen.widgetsLays.length; i++) {
				const item = this.currentScreen.widgetsLays[i]
				if (item.scene === this.currentScene.id) {
					delete this.currentScreen.widgets[item.id]
					this.currentScreen.widgetsLays.splice(i, 1)
					i--
				}
			}
		} else {
			this.currentScreen.widgetsLays.forEach(item => {
				if (item.scene === this.currentScene.id) {
					item.scene = '-1'
				}
			})
		}
		this.cancelSelectWidget()
		this.currentScreen.widgets = { ...this.currentScreen.widgets }
		this.currentScreen.widgetsLays = [...this.currentScreen.widgetsLays]
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
