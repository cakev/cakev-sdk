import Factory from '../Base/factory'
import ScreenTask from '../Screen/task'
import Current from '../Current'
import Http from '../Http'
import Config from '../Config'
import Local from '../Local'
import ScreenCache from '../IndexDB/screenCache'
import IndexDB from '../IndexDB'

const db = new IndexDB()
const rulerContainerId = `drag-content-${+new Date()}`

export default class EditorBase extends Factory<EditorBase> {
	screen: ScreenTask = ScreenTask.Instance()
	current: Current = Current.Instance({
		rulerContainerId,
	})
	http: Http = Http.Instance()
	config: Config = Config.Instance()
	local: Local = Local.Instance()
	screenCache: ScreenCache = ScreenCache.Instance(db)
	rulerContainerId = rulerContainerId
	/* 大屏ID */
	screenId = ''
	/* 大屏状态 inEdit  在编辑器中  inPreview 在预览中 */
	editorStatus = 'inPreview'
	/* 组件加载 */
	marketComponentLoading = false
	/* 组件加载状态 */
	widgetLoaded = {}
	/* 更新组件加载状态 */
	updateWidgetLoaded(key: string): void {
		this.widgetLoaded[key] = true
	}
	/* 更新大屏状态 */
	updateEditorStatus(status: string): void {
		this.editorStatus = status
	}
	/* ---------------------------------------------------Current---------------------------------------------------*/
	/* 当前场景 */
	get currentSceneIndex(): string | number {
		return this.current.currentSceneIndex
	}
	/* 打开场景 */
	openScene(id: string): void {
		if (this.editorStatus === 'inPreview') this.current.openScene(id)
	}
	/* 关闭场景 */
	closeScene(id: string): void {
		if (this.editorStatus === 'inPreview') this.current.closeScene(id)
	}
	get zoom(): number {
		return this.current.zoom
	}
	constructor() {
		super()
	}
}
