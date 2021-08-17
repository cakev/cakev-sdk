import Factory from '@/core/Base/factory'

export default class Temporary extends Factory<Temporary> {
	vLine = [] // 参考线
	hLine = []
	zoom = 1 // 放大缩小比例
	offsetX = 0 // 画布偏移量
	offsetY = 0
	editorContentDrag = false // 画布拖动
	editorContentDragging = false // 画布拖动中
	editorContentStartX = 0
	editorContentStartY = 0
	widgetRightMenu = false // 右键组件
	widgetRightMenuX = 0
	widgetRightMenuY = 0

	scrollLeft(step = 10) {
		this.offsetX -= step
	}

	scrollRight(step = 10) {
		this.offsetX += step
	}

	scrollTop(step = 10) {
		this.offsetY += step
	}

	scrollBottom(step = 10) {
		this.offsetY -= step
	}

	zoomIn(step = 2) {
		this.zoom = +((this.zoom * 100 + step) / 100).toFixed(2)
	}

	zoomOut(step = 2): void {
		if (this.zoom * 100 > 20) {
			this.zoom = +((this.zoom * 100 - step) / 100).toFixed(2)
		}
	}

	clear() {
		this.vLine = []
		this.hLine = []
	}

	constructor() {
		super()
	}
}
