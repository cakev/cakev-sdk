<template lang="pug">
.d-ruler-wrapper.pos-r#editor(
	@mousedown="mouseDown",
	@wheel="wheel",
	@mousemove="mouseMove")
	.content-body.pos-a(:style="rulerStyle")
		slot
		.content-body-tip.pos-a(
			:style="{ fontSize: `${(1 / editor.current.zoom) * 12}px`, bottom: `-${(1 / editor.current.zoom) * 12 + 24}px` }")
			span 按住空格可拖动画布
			label {{ editor.screen.screenWidth }}×{{ editor.screen.screenHeight }} {{ zoom }}
</template>
<script>
import Editor from '@/core/Editor'
import { on, off } from '@cakev/util'

export default {
	name: 'd-ruler',
	data(){
		return {
			editor:  Editor.Instance(),
			startX : 0,
			startY : 0,
			clientX : 0,
			clientY : 0,
			startPointerX : 0,
			startPointerY : 0,
			/* 滚动左右距离 */
			contentScrollLeft : 0,
			/* 滚动上下距离 */
			contentScrollTop : 0,
			/* 是否按下了 空格 键，之后按下了左键 */
			contentDrag : false,
		}
	},
	computed:{
		zoom() {
			const zoom = this.editor.current.zoom
			return `${~~(zoom * 100)}%`
		},
		rulerStyle(){
			return {
				transform: `translate3d(${this.editor.current.offsetX}px, ${this.editor.current.offsetY}px, 0) scale(${this.editor.current.zoom})`,
				width: `${this.editor.screen.screenWidth + 18 * 2}px`,
				height: `${this.editor.screen.screenHeight + 18 * 2}px`,
			}
		}
	},
	methods:{
		mouseUp(e) {
			if (this.contentDrag) {
				this.contentDrag = false
				if (this.editor.current.contentMove) {
					document.getElementById('editor').style.cursor = 'grab'
				}
				return
			}
			if (this.editor.current.widgetMove) {
				this.editor.current.widgetMove = false
				return
			}
		},

		mouseDown(e) {
			// 判断是否为鼠标左键被按下
			if (e.buttons !== 1 || e.which !== 1) return
			this.startX = e.clientX
			this.startY = e.clientY
			const diffX = (this.editor.screen.screenWidth * (1 - this.editor.current.zoom)) / 2 + this.editor.current.offsetX
			const diffY = (this.editor.screen.screenHeight * (1 - this.editor.current.zoom)) / 2 + this.editor.current.offsetY
			this.startPointerX = (e.layerX - diffX) / this.editor.current.zoom
			this.startPointerY = (e.layerY - diffY) / this.editor.current.zoom
			if (this.editor.current.contentMove) {
				this.contentDrag = true
				document.getElementById('editor').style.cursor = 'grabbing'
			}
			if (!this.editor.current.widgetMove && !e.shiftKey) {
				this.editor.current.unSelectWidget()
			}
			if (!this.editor.current.widgetMove) {
				const rightMenu = document.getElementById('widget-right-menu')
				rightMenu.classList.remove('active')
			}
		},

		mouseMove(e) {
			const { clientX, clientY } = e
			this.clientX = clientX
			this.clientY = clientY
			if (this.contentDrag) {
				if (!this.startX) {
					this.clientX = clientX
					this.clientY = clientY
				}
				this.contentScrollLeft = Math.ceil(clientX - this.startX)
				this.editor.current.offsetX += this.contentScrollLeft
				this.contentScrollTop = Math.ceil(clientY - this.startY)
				this.editor.current.offsetY += this.contentScrollTop
				this.startX = clientX
				this.startY = clientY
			}
		},
		/* 滚动画布 */
		wheel(e) {
			if (e.ctrlKey) {
				e.preventDefault()
				e.stopPropagation()
				if (e.wheelDelta > 0) {
					this.editor.current.zoomIn()
				} else {
					this.editor.current.zoomOut()
				}
			} else {
				if (e.shiftKey) {
					this.editor.current.offsetX += e.wheelDelta > 0 ? 10 : -10
				} else {
					this.editor.current.offsetY += e.wheelDelta > 0 ? 10 : -10
				}
			}
		},

		keyup() {
			this.editor.current.contentMove = false
			document.getElementById('editor').style.cursor = 'auto'
			// if (e.keyCode === 8 || e.keyCode === 46) {
			// delete 键 删除
			// }
		},

		keydown(e) {
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
				this.editor.current.zoomOut()
			}
			if (e.keyCode === 187) {
				this.editor.current.zoomIn()
			}
			if (e.keyCode === 32 && !this.editor.current.contentMove) {
				this.editor.current.contentMove = true
				document.getElementById('editor').style.cursor = 'grab'
			}
		},
	},
	beforeDestroy() {
		off(document,'keydown', this.keydown)
		off(document,'keyup', this.keyup)
		off(document,'mouseup', this.mouseUp)
	},
	mounted() {
		on(document,'keydown', this.keydown)
		on(document,'keyup', this.keyup)
		on(document,'mouseup', this.mouseUp)
	},
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
