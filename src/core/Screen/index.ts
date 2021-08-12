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
	sceneList: Array<SceneTask> = []

	selectWidgetById(id: string) {
		this.currentWidgets = [...[this.currentScreen.widgets[id]]]
	}

	pushWidget(widget: WidgetTask) {
		this.currentScreen.widgets[widget.id] = widget
		this.currentScreen.widgets = { ...this.currentScreen.widgets }
		this.currentScreen.widgetsLays[widget.id] = new WidgetLayout({ id: widget.id, scene: this.currentScene.id })
		this.selectWidgetById(widget.id)
	}

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

	selectScreenByIndex(index) {
		this.currentScreen = this.screenList[index]
	}

	createScreen(id) {
		const screen: ScreenTask = new ScreenTask(id)
		this.screenMd5SchemaList.push(md5(JSON.stringify(screen)))
		this.screenList.push(screen)
		if (!this.currentScreen) this.currentScreen = screen
	}

	selectSceneById(id) {
		let scene
		this.sceneList.forEach(item => {
			if (item.id === id) scene = item
		})
		this.currentScene = scene
	}

	initScene() {
		const scene = new SceneTask()
		this.sceneList.push(scene)
		this.selectSceneById(scene.id)
	}

	constructor() {
		super()
		this.initScene()
	}
}
