import ScreenTask from '../Screen/task'
import Current from '../Current'
import Http from '../Http'
import Config from '../Config'
import Local from '../Local'
import ScreenCache from '../IndexDB/screenCache'
import IndexDB from '../IndexDB'
import Factory from '../Base/factory'

const db = new IndexDB()

export default class Editor extends Factory<Editor> {
	screen: ScreenTask = ScreenTask.Instance()
	current: Current = Current.Instance()
	http: Http = Http.Instance()
	config: Config = Config.Instance()
	local: Local = Local.Instance()
	screenCache: ScreenCache = ScreenCache.Instance(db)
	inEdit = false
	// 组件加载
	marketComponentLoading = false
	// 组件加载状态
	widgetLoaded = {}
	// 更新组件加载状态
	updateWidgetLoaded(key: string): void {
		this.widgetLoaded[key] = true
	}
	// 更新大屏状态
	updateEditorStatus(status: boolean): void {
		this.inEdit = status
	}
	// 当前场景
	get currentSceneIndex(): string | number {
		return this.current.currentSceneIndex
	}
	// 打开场景
	openScene(id: string): void {
		if (!this.inEdit) this.current.openScene(id)
	}
	// 关闭场景
	closeScene(id: string): void {
		if (!this.inEdit) this.current.closeScene(id)
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
}
