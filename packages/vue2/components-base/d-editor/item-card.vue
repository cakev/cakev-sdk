<template lang="pug">
dr(
	:key="id",
	:ref="`widget_${id}`",
	:id="id",
	:scale-ratio="editor.zoom",
	:draggable="widgetEditable(widget)",
	:resizable="widgetEditable(widget)",
	:scale="widget.widgetLayout.scale",
	:active="editor.currentWidgetList.includes(id) && widgetEditable(widget)",
	:w="widget.widgetLayout.width",
	:h="widget.widgetLayout.height",
	:x="widget.widgetLayout.left",
	:y="widget.widgetLayout.top",
	:z="zIndex",
	:snap="editor.current.autoAlignGuide",
	:widget="widget",
	:class="[{ locked: widget.widgetBase.locked }, `widget-${id}`]",
	:snap-to-target="['.d-editor-line', '.dr-unactive', '.d-ruler-guide-x', '.d-ruler-guide-y']",
	@resizestop="onResizeStop",
	@refLineParams="params => getRefLineParams(params, widget)",
	@dragstop="onDragStop",
	@on-click="handleClick($event, widget)",
	@contextmenu.native.stop="showRightMenu($event, widget)")
	cakev-widget(
		:id="id",
		:zIndex="zIndex",
		:widgetType="widget.widgetType",
		:type="widget.type",
		:events="widget.events",
		:animation="widget.animation",
		:eventTypes="widget.eventTypes",
		:config="widget.config",
		:children="editor.screen.screenWidgetsLays[id].children")
</template>
<script lang="ts">
import dr from '@/vue2/components-base/d-dr/index.vue'
import dDrKuang from '@/vue2/components-base/d-dr-kuang/index.vue'
import Editor from '@/core/Editor'
import WidgetTask from '@/core/Widget/task'

export default {
	name: 'item-card',
	components: {
		dr,
		dDrKuang,
	},
	data() {
		return {
			editor: Editor.Instance(),
		}
	},
	props: {
		getRefLineParams: {},
		widgetId: {
			type: String,
		},
		zIndex: {
			type: Number,
		},
		scene: {
			type: Number | String,
		},
		hide: {
			type: Boolean,
		},
	},
	computed: {
		widget(): WidgetTask {
			return this.editor.screen.screenWidgets[this.widgetId]
		},
		style() {
			return {
				transform: `translate3d(${this.widget.widgetLayout.left}px, ${this.widget.widgetLayout.top}px,0)`,
				width: this.widget.widgetLayout.width + 'px',
				height: this.widget.widgetLayout.height + 'px',
				zIndex: this.zIndex,
			}
		},
	},
	methods: {
		handleClick(e, widget): void {
			if (e.shiftKey) {
				this.editor.selectWidget(widget)
			} else {
				this.editor.unSelectWidget()
				this.editor.selectWidget(widget)
			}
		},
		showRightMenu(e: MouseEvent, widget: any): void {
			e.preventDefault()
			this.editor.unSelectWidget()
			this.editor.selectWidget(widget)
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
		onDragStop(left: number, top: number): void {
			if (this.editor.currentWidget) {
				const diffLeft = left - this.editor.current.widget.widgetLayout.left
				const diffTop = top - this.editor.current.widget.widgetLayout.top
				this.editor.current.widget.widgetLayout.left = left
				this.editor.current.widget.widgetLayout.top = top
				this.onGroupDragStop(
					this.editor.screen.screenWidgetsLays[this.editor.currentWidgetList[0]],
					diffLeft,
					diffTop,
				)
			}
		},
		onGroupDragStop(widget: any, diffLeft: number, diffTop: number): void {
			if (widget.children) {
				if (Object.values(widget.children).length > 0)
					for (let key in widget.children) {
						this.editor.screen.screenWidgets[key].widgetLayout.left =
							Number(this.editor.screen.screenWidgets[key].widgetLayout.left) + diffLeft
						this.editor.screen.screenWidgets[key].widgetLayout.top =
							Number(this.editor.screen.screenWidgets[key].widgetLayout.top) + diffTop
						this.onGroupDragStop(widget.children[key], diffLeft, diffTop)
						this.editor.screen.screenWidgets = { ...this.editor.screen.screenWidgets }
					}
			}
		},
		onResizeStop(width: number, height: number): void {
			this.editor.current.widget.widgetLayout.width = width
			this.editor.current.widget.widgetLayout.height = height
		},
		widgetEditable({ widgetBase }): boolean {
			return !widgetBase.locked
		},
	},
}
</script>
<style lang="scss" scoped>
.widget-part-edit {
	.widget-part {
		position: relative !important;
		transform: translate3d(0, 0, 0) !important;
	}
}

.dr-hide {
	display: none;
}
</style>
