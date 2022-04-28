<template lang="pug">
.d-ruler-wrapper.pos-r(
	:id="editor.rulerContainerId",
	@mousedown="mouseDown",
	@contextmenu="showRightMenu",
	@wheel="wheel",
	@mousemove="mouseMove")
	ruler-right-menu
	.content-body.pos-a(:style="editor.rulerStyle")
		slot
		.content-body-tip.pos-a(
			:style="{ fontSize: `${(1 / editor.zoom) * 12}px`, bottom: `-${(1 / editor.zoom) * 12 + 24}px` }")
			span 按住空格可拖动画布
			label {{ editor.width }}×{{ editor.height }} {{ zoom }}
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Editor from '@/core/Editor'
import Widget from '@/core/Widget/normal'
import rulerRightMenu from '@/vue2/components-base/right-menu/ruler.vue'

@Component({
	components: {
		rulerRightMenu,
	},
})
export default class DRuler extends Vue {
	editor: Editor = Editor.Instance()
	startX = 0
	startY = 0
	clientX = 0
	clientY = 0
	startPointerX = 0
	startPointerY = 0
	/* 滚动左右距离 */
	contentScrollLeft = 0
	/* 滚动上下距离 */
	contentScrollTop = 0
	/* 是否按下了 空格 键，之后按下了左键 */
	contentDrag = false
	/* 框移动 */
	kuangMove = false
	get zoom(): string {
		const zoom = this.editor.zoom
		return `${~~(zoom * 100)}%`
	}

	windowResize(): void {
		this.editor.resetZoom()
	}

	showRightMenu(e: MouseEvent): void {
		const rightMenu = document.getElementById('ruler-right-menu')
		rightMenu.classList.add('active')
		const widgetRightMenu = document.getElementById('widget-right-menu')
		widgetRightMenu.classList.remove('active')
		if (e.clientY + rightMenu.scrollHeight > window.innerHeight) {
			rightMenu.style.top = e.clientY - rightMenu.scrollHeight + 'px'
		} else {
			rightMenu.style.top = e.clientY + 'px'
		}
		rightMenu.style.left = e.clientX + 'px'
	}

	beforeDestroy(): void {
		window.removeEventListener('resize', this.windowResize)
		document.documentElement.removeEventListener('keydown', this.keydown)
		document.documentElement.removeEventListener('keyup', this.keyup)
		document.documentElement.removeEventListener('mouseup', this.mouseUp)
	}

	mounted(): void {
		window.addEventListener('resize', this.windowResize)
		document.documentElement.addEventListener('keydown', this.keydown)
		document.documentElement.addEventListener('keyup', this.keyup)
		document.documentElement.addEventListener('mouseup', this.mouseUp)
	}

	mouseUp(e: MyMouseEvent): void {
		if (this.contentDrag) {
			this.contentDrag = false
			if (this.editor.contentMove) {
				document.getElementById(this.editor.rulerContainerId).style.cursor = 'grab'
			}
			return
		}
		if (this.editor.widgetMove) {
			this.editor.widgetMove = false
			return
		}
		if (this.kuangMove) {
			document.getElementById('d-kuang').style.display = 'none'
			this.kuangMove = false
			const diffX = (this.editor.width * (1 - this.editor.zoom)) / 2 + this.editor.offsetX
			const diffY = (this.editor.height * (1 - this.editor.zoom)) / 2 + this.editor.offsetY
			const endPointerX = (e.layerX - diffX) / this.editor.zoom
			const endPointerY = (e.layerY - diffY) / this.editor.zoom
			if (this.startPointerX === endPointerX || this.startPointerY === endPointerY) return
			const minPointerX = Math.min(this.startPointerX, endPointerX)
			const minPointerY = Math.min(this.startPointerY, endPointerY)
			const maxPointerX = Math.max(this.startPointerX, endPointerX)
			const maxPointerY = Math.max(this.startPointerY, endPointerY)
			this.editor.unSelectWidgetList()
			Object.values(this.editor.screen.screenWidgets).forEach((v: Widget) => {
				// 只能框选当前场景下的组件
				if (this.editor.screen.screenWidgetsLays[v.id].scene === this.editor.currentSceneIndex) {
					const widgetStartX = Number(v.config.layout.position.left)
					const widgetStartY = Number(v.config.layout.position.top)
					const widgetEndX = Number(v.config.layout.position.left) + Number(v.config.layout.size.width)
					const widgetEndY = Number(v.config.layout.position.top) + Number(v.config.layout.size.height)
					if (
						minPointerX < widgetStartX &&
						widgetStartX < maxPointerX &&
						minPointerY < widgetStartY &&
						widgetStartY < maxPointerY &&
						minPointerX < widgetEndX &&
						widgetEndX < maxPointerX &&
						minPointerY < widgetEndY &&
						widgetEndY < maxPointerY
					) {
						this.editor.selectWidget(v)
					}
				}
			})
		}
	}

	mouseDown(e: MyMouseEvent): void {
		// 判断是否为鼠标左键被按下
		if (e.buttons !== 1 || e.which !== 1) return
		this.startX = e.clientX
		this.startY = e.clientY
		const diffX = (this.editor.width * (1 - this.editor.zoom)) / 2 + this.editor.offsetX
		const diffY = (this.editor.height * (1 - this.editor.zoom)) / 2 + this.editor.offsetY
		this.startPointerX = (e.layerX - diffX) / this.editor.zoom
		this.startPointerY = (e.layerY - diffY) / this.editor.zoom
		if (this.editor.contentMove) {
			this.contentDrag = true
			document.getElementById(this.editor.rulerContainerId).style.cursor = 'grabbing'
		}
		if (!this.editor.widgetMove && !e.shiftKey) {
			this.editor.unSelectWidget()
		}
		if (!this.editor.widgetMove) {
			const rightMenu = document.getElementById('widget-right-menu')
			rightMenu.classList.remove('active')
		}
		if (!this.editor.contentMove && !this.editor.widgetMove && !e.shiftKey) {
			this.kuangMove = true
			let kuang = document.getElementById('d-kuang')
			if (!kuang) {
				kuang = document.createElement('div')
				kuang.style.cssText =
					'position: absolute;width: 0;height: 0;margin: 0;padding: 0;border: 1px solid rgb(36, 145, 247);background-color: rgba(0, 132, 255, 0.15);z-index: 1000;opacity: 0.6;display: none;pointer-events: none;'
				kuang.id = 'd-kuang'
				document.body.appendChild(kuang)
			}
			kuang.style.left = this.startX + 'px'
			kuang.style.top = this.startY + 'px'
		}
	}

	mouseMove(e: any): void {
		const { clientX, clientY } = e
		this.clientX = clientX
		this.clientY = clientY
		if (this.contentDrag) {
			if (!this.startX) {
				this.clientX = clientX
				this.clientY = clientY
			}
			this.contentScrollLeft = Math.ceil(clientX - this.startX)
			this.editor.offsetX += this.contentScrollLeft
			this.contentScrollTop = Math.ceil(clientY - this.startY)
			this.editor.offsetY += this.contentScrollTop
			this.editor.ruler.draw({
				offsetY: this.editor.offsetY,
				offsetX: this.editor.offsetX,
			})
			this.startX = clientX
			this.startY = clientY
		}
		if (this.kuangMove) {
			e.stopPropagation()
			const _x = e.clientX
			const _y = e.clientY
			const selDiv = document.getElementById('d-kuang')
			selDiv.style.display = 'block'
			selDiv.style.left = Math.min(_x, this.startX) + 'px'
			selDiv.style.top = Math.min(_y, this.startY) + 'px'
			selDiv.style.width = Math.abs(_x - this.startX) + 'px'
			selDiv.style.height = Math.abs(_y - this.startY) + 'px'
		}
	}

	/* 滚动画布 */
	wheel(e: any): void {
		if (e.ctrlKey) {
			e.preventDefault()
			e.stopPropagation()
			if (e.wheelDelta > 0) {
				this.editor.zoomIn()
			} else {
				this.editor.zoomOut()
			}
		} else {
			if (e.shiftKey) {
				this.editor.offsetX += e.wheelDelta > 0 ? 10 : -10
			} else {
				this.editor.offsetY += e.wheelDelta > 0 ? 10 : -10
			}
		}
		this.editor.ruler.draw({
			offsetY: this.editor.offsetY,
			offsetX: this.editor.offsetX,
			zoom: this.editor.zoom,
		})
	}

	keyup(): void {
		this.editor.contentMove = false
		document.getElementById(this.editor.rulerContainerId).style.cursor = 'auto'
		// if (e.keyCode === 8 || e.keyCode === 46) {
		// delete 键 删除
		// }
	}

	keydown(e: KeyboardEvent): void {
		if (
			(e.ctrlKey === true || e.metaKey === true) &&
			(e.which === 189 ||
				e.which === 187 ||
				e.which === 173 ||
				e.which === 61 ||
				e.which === 107 ||
				e.which === 109)
		) {
			e.preventDefault()
		}
		if (e.keyCode === 189) {
			this.editor.zoomOut()
		}
		if (e.keyCode === 187) {
			this.editor.zoomIn()
		}
		if (e.keyCode === 32 && !this.editor.contentMove) {
			this.editor.contentMove = true
			document.getElementById(this.editor.rulerContainerId).style.cursor = 'grab'
		}
	}
}
</script>
<style lang="scss">
.d-ruler-wrapper {
	top: 0;
	left: 0;
	z-index: 1;
	width: 100%;
	height: calc(100% - 32px);
	overflow: hidden;
	user-select: none;

	.content-body {
		top: 0;
		left: 0;
		margin-top: 1px;
		overflow: visible;
		border: 18px transparent solid;
	}
}

.content-body-tip {
	right: 0;
	color: rgb(169, 175, 184);
	white-space: nowrap;

	span {
		margin-right: 20px;
	}
}
</style>
