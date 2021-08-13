import Factory from '@/core/Base/factory'
import ScreenTask from '@/core/Screen/task'
import SceneTask from '@/core/Scene/task'
import WidgetTask from '@/core/Widget/task'
import WidgetLayout from '@/core/Widget/layout'

const md5 = require('md5')

export default class Screen extends Factory<Screen> {
	currentScreen: ScreenTask | null = null
	currentWidgets: Array<WidgetTask> = []
	screenList: Array<ScreenTask> = []
	screenMd5SchemaList: Array<string> = []
	currentScene: SceneTask | null = null

	// 取消选择组件
	cancelSelectWidget() {
		this.currentWidgets = []
	}

	// 选择组件
	selectWidgetById(id: string) {
		this.currentWidgets = [...[this.currentScreen.widgets[id]]]
	}

	// 添加组件
	pushWidget(widget: WidgetTask) {
		this.currentScreen.widgets = { ...this.currentScreen.widgets, [widget.id]: widget }
		this.currentScreen.widgetsLays = {
			...this.currentScreen.widgetsLays,
			[widget.id]: new WidgetLayout({ id: widget.id, scene: this.currentScene.id }),
		}
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
		this.screenList.push(screen)
		if (!this.currentScreen) this.currentScreen = screen
		this.selectSceneById('0')
	}

	// 当前场景 按zIndex 排序后的序列
	get sceneWidgetsBySortList(): Array<WidgetLayout> {
		const list: Array<WidgetLayout> = Object.values(this.currentScreen.widgetsLays)
		return list
			.filter((item: WidgetLayout) => item.scene === this.currentScene.id)
			.sort((a: WidgetLayout, b: WidgetLayout) => {
				return b.zIndex - a.zIndex - 1
			})
	}
	// @ts-ignore
	set sceneWidgetsBySortList(val) {}

	// 选中场景
	selectSceneById(id) {
		this.currentScene = this.currentScreen.scenes[id]
	}

	// 创建场景
	createScene() {
		const scene: SceneTask = new SceneTask()
		this.currentScreen.scenes = { ...this.currentScreen.scenes, [scene.id]: scene }
		this.selectSceneById(scene.id)
	}

	constructor() {
		super()
	}
}
