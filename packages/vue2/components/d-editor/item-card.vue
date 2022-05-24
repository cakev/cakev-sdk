<template lang="pug">
dr(
	:key="lay.widgetId",
	:ref="`widget_${lay.widgetId}`",
	:id="lay.widgetId",
	:scale-ratio="editor.current.zoom",
	:draggable="widgetEditable(widget)",
	:resizable="widgetEditable(widget)",
	:scale="widget.widgetLayout.scale",
	:active="editor.current.currentWidgetId === lay.widgetId && widgetEditable(widget)",
	:w="widget.widgetLayout.width",
	:h="widget.widgetLayout.height",
	:x="widget.widgetLayout.left",
	:y="widget.widgetLayout.top",
	:z="lay.zIndex",
	:snap="editor.current.autoAlignGuide",
	:widget="widget",
	:class="[{ locked: widget.widgetBase.locked }, `widget-${lay.widgetId}`]",
	:snap-to-target="['.d-editor-line', '.dr-unactive', '.d-ruler-guide-x', '.d-ruler-guide-y']",
	@resizestop="onResizeStop",
	@refLineParams="params => getRefLineParams(params, widget)",
	@dragstop="onDragStop",
	@on-click="handleClick($event, widget)",
	@contextmenu.native.stop="showRightMenu($event, widget)"
)
	c-widget(:lay="lay")
</template>
<script lang="ts">
import dr from '@/vue2/components/d-dr/index.vue'
import dDrKuang from '@/vue2/components/d-dr-kuang/index.vue'
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
			editor: Editor.Instance() as Editor,
		}
	},
	props: {
		getRefLineParams: {},
		lay: {},
	},
	computed: {
		widget(): WidgetTask {
			return this.editor.screen.screenWidgets[this.lay.widgetId]
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
				this.editor.current.selectWidget(widget)
			} else {
				this.editor.current.unSelectWidget()
				this.editor.current.selectWidget(widget)
			}
		},
		showRightMenu(e: MouseEvent, widget: any): void {
			e.preventDefault()
			this.editor.current.unSelectWidget()
			this.editor.current.selectWidget(widget)
			const rightMenu = document.getElementById('widget-right-menu')
			rightMenu.classList.add('active')
			if (e.clientY + rightMenu.scrollHeight > window.innerHeight) {
				rightMenu.style.top = e.clientY - rightMenu.scrollHeight + 'px'
			} else {
				rightMenu.style.top = e.clientY + 'px'
			}
			rightMenu.style.left = e.clientX + 'px'
		},
		onDragStop(left: number, top: number): void {
			if (this.editor.current.currentWidgetId) {
				const diffLeft = left - this.widget.widgetLayout.left
				const diffTop = top - this.widget.widgetLayout.top
				this.widget.widgetLayout.left = left
				this.widget.widgetLayout.top = top
				this.onGroupDragStop(
					this.editor.screen.screenWidgetsLays[this.editor.current.currentWidgetId],
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
		onResizeStop(width: number, height: number, left, top): void {
			this.widget.widgetLayout.width = width
			this.widget.widgetLayout.height = height
			this.widget.widgetLayout.left = left
			this.widget.widgetLayout.top = top
			this.editor.current.unSelectWidget()
			this.editor.screen.refreshWidget(this.widget.widgetId)
			setTimeout(() => {
				this.editor.current.selectWidget(this.widget)
			})
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
