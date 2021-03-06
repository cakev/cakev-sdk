import Factory from '../Base/factory'
import WidgetTask from '../Widget/task'

export default class Current extends Factory<Current> {
	xRoomL2 = 238
	xRoomR1 = 335
	yRoom = 60
	autoAlignGuide = true // 大屏平台状态 是否自动贴靠参考线
	currentEventDisabled = true // 拖动模式/预览模式 控制组件内部事件关闭
	sceneAnimate = '' // 当前场景动画
	contentMove = false // 是否按下了 空格 键，启动内容区拖动
	widgetMove = false // 组件点击开始拖拽
	fullscreen = false // 大屏平台状态 是否全屏
	zoom = 1 // 当前标尺zoom
	zoomStep = 0.02 // 当前标尺zoom步长
	offsetX = 0 // 当前位置x
	offsetY = 0 // 当前位置y
	currentWidgetId: string | null = null // 当前组件
	currentSceneIndex: number | string = 0 // 当前场景
	currentCreateSceneList: Array<number | string> = [] // 当前打开的场景集合

	constructor() {
		super()
	}

	clear(): void {
		this.contentMove = false
		this.widgetMove = false
		this.sceneAnimate = ''
		this.currentWidgetId = null
		this.currentSceneIndex = 0
		this.currentCreateSceneList = []
	}

	taggerXRoomL2(): void {
		this.xRoomL2 = this.xRoomL2 > 0 ? 0 : 238
	}
	taggerXRoomR1(): void {
		this.xRoomR1 = this.xRoomR1 > 0 ? 0 : 335
	}
	/* 放大画布 */
	zoomIn(step = 2): void {
		this.zoom = +((this.zoom * 100 + step) / 100).toFixed(2)
	}
	/* 缩小画布 */
	zoomOut(step = 2): void {
		if (this.zoom * 100 > 20) {
			this.zoom = +((this.zoom * 100 - step) / 100).toFixed(2)
		}
	}
	/* 画布还原最佳比例 */
	resetZoom({ screenWidth, screenHeight }: any = {}): void {
		const dom = document.getElementById('editor') as HTMLElement
		const rulerOffsetWidth = dom.offsetWidth - 18
		let zoom = ~~((rulerOffsetWidth / screenWidth) * 100) / 100
		if (zoom % 2 !== 0) zoom = zoom - 0.1
		if (zoom < 0.2) {
			zoom = 0.2
		}
		this.zoom = zoom
		const rulerOffsetHeight = dom.offsetHeight
		this.offsetX = (rulerOffsetWidth - screenWidth) * 0.5
		this.offsetY = (rulerOffsetHeight - screenHeight) * 0.5
	}
	/* 选中组件 */
	selectWidget(widget: WidgetTask): void {
		this.currentWidgetId = widget.widgetId
	}
	/* 取消选中组件 */
	unSelectWidget(): void {
		this.currentWidgetId = null
	}
	/* 选中场景 */
	selectSceneIndex(val: number | string): void {
		if (val === undefined || val === null) return
		this.currentSceneIndex = val
	}
	/* 打开场景 */
	openScene(id: number | string, animate?: string): void {
		this.sceneAnimate = animate || this.sceneAnimate
		this.currentCreateSceneList.push(id)
	}
	/* 关闭场景 */
	closeScene(id: string): void {
		const index = this.currentCreateSceneList.findIndex(v => v === id)
		if (index === -1) return
	}
}
