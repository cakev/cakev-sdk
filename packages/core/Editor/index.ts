import Agent from '@/core/Editor/base'

export default class Editor extends Agent {
	init(res?: any): any {
		let screen
		if (res) {
			if (res.screenId) this.screenId = res.screenId
			screen = this.screen.init(res)
		}
		this.resetZoom()
		return { screen }
	}

	clear(): void {
		this.screen.clear()
		this.current.clear()
	}

	/* 放大画布 */
	zoomIn(step = 2): void {
		this.current.zoomIn(step)
	}
	/* 缩小画布 */
	zoomOut(step = 2): void {
		this.current.zoomOut(step)
	}
	/* 画布还原最佳比例 */
	resetZoom(): void {
		if (this.editorStatus === 'inEdit') {
			// this.ruler.resetZoom({
			// 	screenHeight: this.screen.screenHeight,
			// 	screenWidth: this.screen.screenWidth,
			// })
			// this.current.resetZoom({
			// 	screenHeight: this.screen.screenHeight,
			// 	screenWidth: this.screen.screenWidth,
			// })
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
	/* ---------------------------------------------------More---------------------------------------------------*/
	get rulerStyle(): any {
		return {
			transform: `translate3d(${this.current.offsetX}px, ${this.current.offsetY}px, 0) scale(${this.current.zoom})`,
			width: `${this.screen.screenWidth + 18 * 2}px`,
			height: `${this.screen.screenHeight + 18 * 2}px`,
		}
	}
}
