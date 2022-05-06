import Factory from '@/core/Base/factory'
import ScreenPc from '@/core/Screen/pc'
import Current from '@/core/Current'
import Scene from '@/core/Scene'
import Http from '@/core/Http'
import Local from '@/core/Local'
import Ruler from '@/core/ui/Ruler'
import ImageCache from '@/core/IndexDB/imageCache'
import ScreenCache from '@/core/IndexDB/screenCache'
import IndexDB from '@/core/IndexDB'

const db = new IndexDB()
const rulerContainerId = `drag-content-${+new Date()}`
export default class EditorBase extends Factory<EditorBase> {
	screen: ScreenPc = ScreenPc.Instance()
	current: Current = Current.Instance({
		rulerContainerId,
	})
	indexDB = db
	scene: Scene = Scene.Instance()
	http: Http = Http.Instance()
	local: Local = Local.Instance()
	imageCache: ImageCache = ImageCache.Instance(db)
	screenCache: ScreenCache = ScreenCache.Instance(db)
	ruler: Ruler | null
	rulerContainerId = rulerContainerId
	/* 大屏ID */
	screenId: string
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
	constructor() {
		super()
	}
}
