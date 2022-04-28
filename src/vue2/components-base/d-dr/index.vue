<template lang="pug">
.dr.pos-a(
	:style="style",
	:data-id="id",
	:data-top="`${this.top}px`",
	:data-left="`${this.left}px`",
	:class="[{ ['dr-active']: enabled, ['dr-unactive']: !enabled, ['dr-dragging']: dragging, ['dr-resizing']: resizing, ['dr-draggable']: draggable, ['dr-resizable']: resizable }]",
	@click="elementEnable",
	@mousedown="elementDown",
	@touchstart="elementTouchDown")
	template(v-if="editor.currentWidgetList.length === 1")
		.dr-handle(
			v-for="handle in actualHandles",
			:key="handle",
			:class="[`dr-handle-${handle}`]",
			:style="{ display: enabled ? 'block' : 'none', transform: `scale(${returnRatio})` }",
			@mousedown.stop.prevent="handleDown(handle, $event)",
			@touchstart.stop.prevent="handleTouchDown(handle, $event)")
	d-dr-kuang(v-if="editor.currentWidgetList.length === 1")
	.dr-tip-top.pos-a(v-if="tipShow", :style="{ top: `-${top}px`, height: `${top}px`, borderWidth: `${returnRatio}px` }")
		span.pos-a(
			:style="{ fontSize: `${14 * returnRatio}px`, right: `${5 * returnRatio}px`, bottom: `${30 * returnRatio}px` }") {{ left }}
	.dr-tip-left.pos-a(
		v-if="tipShow",
		:style="{ left: `-${left}px`, width: `${left}px`, borderWidth: `${returnRatio}px` }")
		span.pos-a(
			:style="{ fontSize: `${14 * returnRatio}px`, right: `${30 * returnRatio}px`, bottom: `${5 * returnRatio}px` }") {{ top }}
	slot
	.dr-disabled-event.pos-a(
		@contextmenu.stop="showRightMenu($event, item)",
		:style="{ width: '100%', height: '100%', top: 0, left: 0, zIndex: z }",
		v-if="editor.current.currentEventDisabled")
</template>
<script lang="ts">
import { addEvent, removeEvent } from './dom'
import dDrKuang from '../d-dr-kuang/index.vue'
import Editor from '@/core/Editor'

export default {
	components: {
		dDrKuang,
	},
	replace: true,
	name: 'd-dr',
	props: {
		item: {},
		id: {
			type: [String, Number],
			default: '',
		},
		active: {
			type: Boolean,
			default: false,
		},
		draggable: {
			type: Boolean,
			default: true,
		},
		resizable: {
			type: Boolean,
			default: true,
		},
		// 锁定宽高比
		lockAspectRatio: {
			type: Boolean,
			default: false,
		},
		w: {
			type: [String, Number],
			default: 200,
		},
		h: {
			type: [String, Number],
			default: 200,
		},
		x: {
			type: [String, Number],
			default: 0,
		},
		y: {
			type: [String, Number],
			default: 0,
		},
		z: {
			type: [String, Number],
			default: 'auto',
		},
		axis: {
			type: String,
			default: 'both',
			validator: val => ['x', 'y', 'both'].includes(val),
		},
		// 元素对齐
		snap: {
			type: Boolean,
			default: false,
		},
		snapToTarget: {
			type: Array,
			default: function () {
				return []
			},
		},
		scale: {
			type: [Number, String],
			default: 1,
		},
		// 缩放比例
		scaleRatio: {
			type: [Number, String],
			default: 1,
		},
	},
	data() {
		return {
			snapTolerance: 5, // 当调用对齐时，用来设置组件与组件之间的对齐距离，以像素为单位
			rawWidth: this.w,
			rawHeight: this.h,
			rawLeft: this.x,
			rawTop: this.y,
			rawRight: null,
			rawBottom: null,
			left: this.x,
			top: this.y,
			right: null,
			bottom: null,
			aspectFactor: this.w / this.h,
			handle: null,
			enabled: this.active,
			resizing: false,
			dragging: false,
			brotherNodes: [],
			editor: Editor.Instance(),
		}
	},
	created(): void {
		this.resetBoundsAndMouseState()
	},
	mounted(): void {
		this.rawRight = -this.rawWidth - this.rawLeft
		this.rawBottom = -this.rawHeight - this.rawTop
		addEvent(document.getElementById('ruler-content'), 'mousedown', this.deselect)
		addEvent(document.documentElement, 'touchend touchcancel', this.deselect)
	},
	beforeDestroy(): void {
		removeEvent(document.getElementById('ruler-content'), 'mousedown', this.deselect)
		removeEvent(document.documentElement, 'touchstart', this.handleUp)
		removeEvent(document.documentElement, 'mousemove', this.move)
		removeEvent(document.documentElement, 'touchmove', this.move)
		removeEvent(document.documentElement, 'mouseup', this.handleUp)
		removeEvent(document.documentElement, 'touchend touchcancel', this.deselect)
	},
	methods: {
		showRightMenu(e: MouseEvent, item: any): void {
			e.preventDefault()
			this.editor.unSelectWidget()
			this.editor.selectWidget(item)
			const rightMenu = document.getElementById('widget-right-menu')
			rightMenu.classList.add('active')
			const rulerRightMenu = document.getElementById('ruler-right-menu')
			rulerRightMenu.classList.remove('active')
			if (e.clientY + rightMenu.scrollHeight > window.innerHeight) {
				rightMenu.style.top = e.clientY - rightMenu.scrollHeight + 'px'
			} else {
				rightMenu.style.top = e.clientY + 'px'
			}
			rightMenu.style.left = e.clientX + 'px'
		},
		elementEnable(e): void {
			this.$emit('on-click', e)
			if (this.enabled) return
			this.enabled = true
			this.$emit('activated')
		},
		// 重置边界和鼠标状态
		resetBoundsAndMouseState(): void {
			this.mouseClickPosition = {
				mouseX: 0,
				mouseY: 0,
				x: 0,
				y: 0,
				w: 0,
				h: 0,
			}
		},
		// 元素触摸按下
		elementTouchDown(e): void {
			this.elementDown(e)
		},
		// 元素按下
		elementDown(e): void {
			if (!this.enabled || this.editor.contentMove) return
			const target = e.target || e.srcElement
			if (this.$el.contains(target)) {
				if (this.draggable) {
					this.editor.widgetMove = true
					this.dragging = true
				}

				if (this.snapToTarget) {
					this.snapToTarget.forEach(item => {
						const targets = document.querySelectorAll(item)
						if (targets.length) {
							this.brotherNodes.push(...targets)
						}
					})
				}
				this.mouseClickPosition.mouseX = e.touches ? e.touches[0].pageX : e.pageX
				this.mouseClickPosition.mouseY = e.touches ? e.touches[0].pageY : e.pageY

				this.mouseClickPosition.left = this.left
				this.mouseClickPosition.right = this.right
				this.mouseClickPosition.top = this.top
				this.mouseClickPosition.bottom = this.bottom

				addEvent(document.documentElement, 'mousemove', this.move)
				addEvent(document.documentElement, 'mouseup', this.handleUp)
			}
		},
		// 取消
		deselect(e): void {
			const target = e.target || e.srcElement
			const regex = new RegExp(this.className + '-([trmbl]{2})', '')
			if (!this.$el.contains(target) && !regex.test(target.className)) {
				if (this.enabled) {
					this.enabled = false
					this.$emit('deactivated')
					this.$emit('update:active', false)
				}
				removeEvent(document.documentElement, 'mousemove', this.handleMove)
			}
			this.resetBoundsAndMouseState()
		},
		// 控制柄触摸按下
		handleTouchDown(handle, e): void {
			this.handleDown(handle, e)
		},
		// 控制柄按下
		handleDown(handle, e): void {
			if (!this.enabled) return
			if (e.stopPropagation) e.stopPropagation()
			// Here we avoid a dangerous recursion by faking
			// corner handles as middle handles
			if (this.lockAspectRatio && !handle.includes('m')) {
				this.handle = 'm' + handle.substring(1)
			} else {
				this.handle = handle
			}
			this.resizing = true
			this.mouseClickPosition.mouseX = e.touches ? e.touches[0].pageX : e.pageX
			this.mouseClickPosition.mouseY = e.touches ? e.touches[0].pageY : e.pageY
			this.mouseClickPosition.left = this.left
			this.mouseClickPosition.right = this.right
			this.mouseClickPosition.top = this.top
			this.mouseClickPosition.bottom = this.bottom
			addEvent(document.documentElement, 'mousemove', this.handleMove)
			addEvent(document.documentElement, 'mouseup', this.handleUp)
		},
		// 移动
		move(e): void {
			if (this.dragging) {
				this.elementMove(e)
				return
			}
			if (this.resizing) {
				this.handleMove(e)
			}
		},
		// 元素移动
		elementMove(e): void {
			const axis = this.axis
			const mouseClickPosition = this.mouseClickPosition
			const tmpDeltaX =
				axis && axis !== 'y' ? mouseClickPosition.mouseX - (e.touches ? e.touches[0].pageX : e.pageX) : 0
			const tmpDeltaY =
				axis && axis !== 'x' ? mouseClickPosition.mouseY - (e.touches ? e.touches[0].pageY : e.pageY) : 0
			const deltaX = Math.round(tmpDeltaX / this.scaleRatio)
			const deltaY = Math.round(tmpDeltaY / this.scaleRatio)
			this.rawTop = mouseClickPosition.top - deltaY
			this.rawBottom = mouseClickPosition.bottom + deltaY
			this.rawLeft = mouseClickPosition.left - deltaX
			this.rawRight = mouseClickPosition.right + deltaX
			if (this.snap) this.snapCheck()
			// this.$emit('dragging', this.left, this.top)
		},
		// 控制柄移动
		handleMove(e): void {
			const handle = this.handle
			const mouseClickPosition = this.mouseClickPosition
			const tmpDeltaX = mouseClickPosition.mouseX - (e.touches ? e.touches[0].pageX : e.pageX)
			const tmpDeltaY = mouseClickPosition.mouseY - (e.touches ? e.touches[0].pageY : e.pageY)
			const deltaX = Math.round(tmpDeltaX / this.scaleRatio)
			const deltaY = Math.round(tmpDeltaY / this.scaleRatio)
			if (handle.includes('b')) {
				this.rawBottom = mouseClickPosition.bottom + deltaY
			} else if (handle.includes('t')) {
				this.rawTop = mouseClickPosition.top - deltaY
			}
			if (handle.includes('r')) {
				this.rawRight = mouseClickPosition.right + deltaX
			} else if (handle.includes('l')) {
				this.rawLeft = mouseClickPosition.left - deltaX
			}
			this.$emit('resizing', this.left, this.top, this.width, this.height)
		},
		// 从控制柄松开
		handleUp(): void {
			this.handle = null
			this.rawTop = this.top
			this.rawBottom = this.bottom
			this.rawLeft = this.left
			this.rawRight = this.right
			// 初始化辅助线数据
			const temArr = new Array(3).fill({
				display: false,
				position: '',
				origin: '',
				lineLength: '',
			})
			const refLine = { vLine: [], hLine: [] }
			for (let i in refLine) {
				refLine[i] = JSON.parse(JSON.stringify(temArr))
			}

			if (this.resizing) {
				this.resizing = false
				this.$emit('refLineParams', refLine)
				this.$emit('resizestop', this.width, this.height, this.left, this.top)
			}
			if (this.dragging) {
				this.dragging = false
				this.$emit('refLineParams', refLine)
				this.$emit('dragstop', this.left, this.top)
			}
			this.resetBoundsAndMouseState()
			removeEvent(document.documentElement, 'mousemove', this.handleMove)
		},
		// 检测对齐元素
		snapCheck(): void {
			let width = this.width
			let height = this.height
			let activeLeft = this.rawLeft
			let activeRight = this.rawLeft + width
			let activeTop = this.rawTop
			let activeBottom = this.rawTop + height
			// 初始化辅助线数据
			const temArr = new Array(3).fill({
				display: false,
				position: '',
				origin: '',
				lineLength: '',
			})
			const refLine = { vLine: [], hLine: [] }
			for (let i in refLine) {
				refLine[i] = JSON.parse(JSON.stringify(temArr))
			}
			// 获取当前父节点下所有子节点
			const nodes = this.brotherNodes
			let tem = {
				value: { x: [[], [], []], y: [[], [], []] },
				display: [],
				position: [],
			}
			for (let item of nodes) {
				let w = item.offsetWidth
				let h = item.offsetHeight
				const l = Number(item.getAttribute('data-left').replace('px', '')) // 对齐目标的left
				const r = l + w // 对齐目标right
				const t = Number(item.getAttribute('data-top').replace('px', '')) // 参考线取 data-top 值 普通取top值
				const b = t + h // 对齐目标的bottom
				const hc = Math.abs(activeTop + height / 2 - (t + h / 2)) <= this.snapTolerance //  y 中线
				const vc = Math.abs(activeLeft + width / 2 - (l + w / 2)) <= this.snapTolerance // 垂直中线
				const ts = Math.abs(t - activeBottom) <= this.snapTolerance // y 最下面的线
				const TS = Math.abs(b - activeBottom) <= this.snapTolerance // 从上到下
				const bs = Math.abs(t - activeTop) <= this.snapTolerance //
				const BS = Math.abs(b - activeTop) <= this.snapTolerance //  y 最上面的线
				const ls = Math.abs(l - activeRight) <= this.snapTolerance // 外左
				const LS = Math.abs(r - activeRight) <= this.snapTolerance // 外左
				const rs = Math.abs(l - activeLeft) <= this.snapTolerance // 外右
				const RS = Math.abs(r - activeLeft) <= this.snapTolerance // 外右
				tem['display'] = [ts, TS, bs, BS, hc, hc, ls, LS, rs, RS, vc, vc]
				tem['position'] = [t, b, t, b, t + h / 2, t + h / 2, l, r, l, r, l + w / 2, l + w / 2]
				if (ts) {
					this.rawTop = t - height
					this.rawBottom = -this.rawTop - height
					tem.value.y[0].push(l, r, activeLeft, activeRight)
				}
				if (bs) {
					this.rawTop = t
					this.rawBottom = -this.rawTop - height
					tem.value.y[0].push(l, r, activeLeft, activeRight)
				}
				if (TS) {
					this.rawTop = b - height
					this.rawBottom = -this.rawTop - height
					tem.value.y[1].push(l, r, activeLeft, activeRight)
				}
				if (BS) {
					this.rawTop = b
					this.rawBottom = -this.rawTop - height
					tem.value.y[1].push(l, r, activeLeft, activeRight)
				}
				if (ls) {
					this.rawLeft = l - width
					this.rawRight = -this.rawLeft - width
					tem.value.x[0].push(t, b, activeTop, activeBottom)
				}
				if (rs) {
					this.rawLeft = l
					this.rawRight = -this.rawLeft - width
					tem.value.x[0].push(t, b, activeTop, activeBottom)
				}
				if (LS) {
					this.rawLeft = r - width
					this.rawRight = -this.rawLeft - width
					tem.value.x[1].push(t, b, activeTop, activeBottom)
				}
				if (RS) {
					this.rawLeft = r
					this.rawRight = -this.rawLeft - width
					tem.value.x[1].push(t, b, activeTop, activeBottom)
				}
				if (hc) {
					this.rawTop = t + h / 2 - height / 2
					this.rawBottom = -this.rawTop - height
					tem.value.y[2].push(l, r, activeLeft, activeRight)
				}
				if (vc) {
					this.rawLeft = l + w / 2 - width / 2
					this.rawRight = -this.rawLeft - width
					tem.value.x[2].push(t, b, activeTop, activeBottom)
				}
				// 辅助线坐标与是否显示(display)对应的数组,易于循环遍历
				const arrTem = [0, 1, 0, 1, 2, 2, 0, 1, 0, 1, 2, 2]
				for (let i = 0; i <= arrTem.length; i++) {
					// 前6为Y辅助线,后6为X辅助线
					const xory = i < 6 ? 'y' : 'x'
					const horv = i < 6 ? 'hLine' : 'vLine'
					if (tem.display[i]) {
						const { origin, length } = this.calcLineValues(tem.value[xory][arrTem[i]])
						refLine[horv][arrTem[i]].display = tem.display[i]
						refLine[horv][arrTem[i]].position = tem.position[i] + 'px'
						refLine[horv][arrTem[i]].origin = origin
						refLine[horv][arrTem[i]].lineLength = length
					}
				}
			}
			this.$emit('refLineParams', refLine)
		},
		calcLineValues(arr): any {
			const length = Math.max(...arr) - Math.min(...arr) + 'px'
			const origin = Math.min(...arr) + 'px'
			return { length, origin }
		},
	},
	computed: {
		returnRatio(): number {
			return this.scaleRatio < 1 ? 1 / this.scaleRatio : this.scaleRatio
		},
		tipShow(): any {
			return (
				this.dragging &&
				this.top > 0 &&
				this.left > 0 &&
				this.top < this.editor.height &&
				this.left < this.editor.width
			)
		},
		style(): any {
			return {
				transform: `translate3d(${this.left}px, ${this.top}px,0) scale(${this.scale})`,
				width: this.width + 'px',
				height: this.height + 'px',
				zIndex: this.z,
			}
		},
		actualHandles(): string[] {
			if (!this.resizable) return [] // 控制柄显示与否
			return ['tl', 'tm', 'tr', 'mr', 'br', 'bm', 'bl', 'ml']
		},
		width(): number {
			return -this.left - this.right
		},
		height(): number {
			return -this.top - this.bottom
		},
		resizingOnX(): any {
			return Boolean(this.handle) && (this.handle.includes('l') || this.handle.includes('r'))
		},
		resizingOnY(): any {
			return Boolean(this.handle) && (this.handle.includes('t') || this.handle.includes('b'))
		},
	},
	watch: {
		active(val: boolean): void {
			this.enabled = val
			if (val) {
				this.$emit('activated')
			} else {
				this.$emit('deactivated')
			}
		},
		rawLeft(newLeft: number): void {
			const aspectFactor = this.aspectFactor
			const lockAspectRatio = this.lockAspectRatio
			const left = this.left
			const top = this.top
			if (lockAspectRatio && this.resizingOnX) {
				this.rawTop = top - (left - newLeft) / aspectFactor
			}
			this.left = newLeft
		},
		rawRight(newRight: number): void {
			const aspectFactor = this.aspectFactor
			const lockAspectRatio = this.lockAspectRatio
			const right = this.right
			const bottom = this.bottom

			if (lockAspectRatio && this.resizingOnX) {
				this.rawBottom = bottom - (right - newRight) / aspectFactor
			}

			this.right = newRight
		},
		rawTop(newTop: number): void {
			const aspectFactor = this.aspectFactor
			const lockAspectRatio = this.lockAspectRatio
			const left = this.left
			const top = this.top

			if (lockAspectRatio && this.resizingOnY) {
				this.rawLeft = left - (top - newTop) * aspectFactor
			}

			this.top = newTop
		},
		rawBottom(newBottom: number): void {
			const aspectFactor = this.aspectFactor
			const lockAspectRatio = this.lockAspectRatio
			const right = this.right
			const bottom = this.bottom

			if (lockAspectRatio && this.resizingOnY) {
				this.rawRight = right - (bottom - newBottom) * aspectFactor
			}

			this.bottom = newBottom
		},
		x(): void {
			if (this.resizing || this.dragging) {
				return
			}
			const delta = this.x - this.left
			this.rawLeft = this.x
			this.rawRight = this.right - delta
		},
		y(): void {
			if (this.resizing || this.dragging) {
				return
			}
			const delta = this.y - this.top
			this.rawTop = this.y
			this.rawBottom = this.bottom - delta
		},
		lockAspectRatio(val: boolean): void {
			if (val) {
				this.aspectFactor = this.width / this.height
			} else {
				this.aspectFactor = undefined
			}
		},
		w(): void {
			if (this.resizing || this.dragging) {
				return
			}
			const delta = this.width - this.w
			this.rawRight = this.right + delta
		},
		h(): void {
			if (this.resizing || this.dragging) {
				return
			}
			const delta = this.height - this.h
			this.rawBottom = this.bottom + delta
		},
	},
}
</script>
<style lang="scss">
@import './index.scss';
</style>
