import Ruler from '@/core/ui/Ruler'
import { uuid } from '@cakev/util'
import Agent from '@/core/Editor/base'

export default class Editor extends Agent {
	init(res?: any): any {
		let screen
		if (res) {
			if (res.screenId) this.screenId = res.screenId
			screen = this.screen.init(res)
			this.scene.init(res)
		}
		this.resetZoom()
		return { screen }
	}

	clear(): void {
		this.screen.clear()
		this.current.clear()
		this.scene.clear()
	}

	/* 放大画布 */
	zoomIn(step = 2): void {
		this.current.zoomIn(step)
		this.ruler.draw({
			zoom: this.current.zoom,
		})
	}
	/* 缩小画布 */
	zoomOut(step = 2): void {
		this.current.zoomOut(step)
		this.ruler.draw({
			zoom: this.current.zoom,
		})
	}
	/* 画布还原最佳比例 */
	resetZoom(): void {
		if (this.editorStatus === 'inEdit') {
			if (!this.ruler) this.ruler = new Ruler(this.rulerContainerId)
			this.ruler.resetZoom({
				screenHeight: this.screen.screenHeight,
				screenWidth: this.screen.screenWidth,
			})
			this.current.resetZoom({
				screenHeight: this.screen.screenHeight,
				screenWidth: this.screen.screenWidth,
			})
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

	/* ---------------------------------------------------Scene---------------------------------------------------*/
	/* 删除场景 */
	destroyScene(): void {
		if (this.current.currentSceneIndex !== 0) {
			this.moveWaitingDeleteRoom()
			this.scene.destroyScene(this.current.currentSceneIndex)
			this.current.selectSceneIndex(0)
			this.scene.sceneObj = { ...this.scene.sceneObj }
		}
	}
	/* ---------------------------------------------------More---------------------------------------------------*/
	moveWaitingDeleteRoom(): void {
		for (const key in this.screen.screenWidgets) {
			if (this.screen.screenWidgets[key].scene === this.current.currentSceneIndex) {
				this.screen.screenWidgets[key].scene = -1
			}
		}
		this.screen.screenWidgets = { ...this.screen.screenWidgets }
	}
	
	get rulerStyle(): any {
		return {
			transform: `translate3d(${this.current.offsetX}px, ${this.current.offsetY}px, 0) scale(${this.current.zoom})`,
			width: `${this.screen.screenWidth + 18 * 2}px`,
			height: `${this.screen.screenHeight + 18 * 2}px`,
		}
	}
	/* 清除当前场景的组件 */
	clearWidgetByCurrentScene(): void {
		if (this.current.currentSceneIndex == -1) {
			for (const key in this.screen.screenWidgetsLays) {
				if (this.screen.screenWidgetsLays[key].scene === -1) {
					delete this.screen.screenWidgets[key]
					delete this.screen.screenWidgetsLays[key]
				}
			}
		} else {
			for (const key in this.screen.screenWidgetsLays) {
				if (this.screen.screenWidgetsLays[key].scene === this.current.currentSceneIndex) {
					this.screen.screenWidgetsLays[key].scene = -1
				}
			}
		}
		this.screen.screenWidgets = { ...this.screen.screenWidgets }
		this.screen.screenWidgetsLays = { ...this.screen.screenWidgetsLays }
	}
}
