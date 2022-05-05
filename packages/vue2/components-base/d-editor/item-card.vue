<template lang="pug">
dr(
	:key="id",
	:ref="`widget_${id}`",
	:id="id",
	:scale-ratio="editor.zoom",
	:draggable="widgetEditable(item)",
	:resizable="widgetEditable(item)",
	:scale="item.config.layout.scale",
	:active="editor.currentWidgetList.includes(id) && widgetEditable(item)",
	:w="item.config.layout.width",
	:h="item.config.layout.height",
	:x="item.config.layout.left",
	:y="item.config.layout.top",
	:z="zIndex",
	:snap="editor.current.autoAlignGuide",
	:item="item",
	:class="[{ locked: item.config.widget.locked }, `widget-${id}`]",
	:snap-to-target="['.d-editor-line', '.dr-unactive', '.d-ruler-guide-x', '.d-ruler-guide-y']",
	@resizestop="onResizeStop",
	@refLineParams="params => getRefLineParams(params, item)",
	@dragstop="onDragStop",
	@on-click="handleClick($event, item)",
	@contextmenu.native.stop="showRightMenu($event, item)")
	cakev-widget(
		:id="id",
		:zIndex="zIndex",
		:widgetType="item.widgetType",
		:type="item.type",
		:events="item.events",
		:animation="item.animation",
		:eventTypes="item.eventTypes",
		:settingData="item.settingData",
		:config="item.config",
		:children="editor.screen.screenWidgetsLays[id].children")
</template>
<script lang="ts">
import dr from '@/vue2/components-base/d-dr/index.vue'
import dDrKuang from '@/vue2/components-base/d-dr-kuang/index.vue'
import Editor from '@/core/Editor'

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
		id: {},
		zIndex: {},
		getRefLineParams: {},
	},
	computed: {
		item() {
			return this.editor.screen.screenWidgets[this.id]
		},
		style() {
			return {
				transform: `translate3d(${this.item.config.layout.left}px, ${this.item.config.layout.top}px,0)`,
				width: this.item.config.layout.width + 'px',
				height: this.item.config.layout.height + 'px',
				zIndex: this.zIndex,
			}
		},
	},
	methods: {
		handleClick(e, item): void {
			if (e.shiftKey) {
				this.editor.selectWidget(item)
			} else {
				this.editor.unSelectWidget()
				this.editor.selectWidget(item)
			}
		},
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
		onDragStop(left: number, top: number): void {
			if (this.editor.currentWidget) {
				const diffLeft = left - this.editor.currentWidget.config.layout.left
				const diffTop = top - this.editor.currentWidget.config.layout.top
				this.editor.currentWidget.config.layout.left = left
				this.editor.currentWidget.config.layout.top = top
				this.onGroupDragStop(
					this.editor.screen.screenWidgetsLays[this.editor.currentWidgetList[0]],
					diffLeft,
					diffTop,
				)
			}
		},
		onGroupDragStop(item: any, diffLeft: number, diffTop: number): void {
			if (item.children) {
				if (Object.values(item.children).length > 0)
					for (let key in item.children) {
						this.editor.screen.screenWidgets[key].config.layout.left =
							Number(this.editor.screen.screenWidgets[key].config.layout.left) + diffLeft
						this.editor.screen.screenWidgets[key].config.layout.top =
							Number(this.editor.screen.screenWidgets[key].config.layout.top) + diffTop
						this.onGroupDragStop(item.children[key], diffLeft, diffTop)
						this.editor.screen.screenWidgets = { ...this.editor.screen.screenWidgets }
					}
			}
		},
		onResizeStop(width: number, height: number): void {
			this.editor.currentWidget.config.layout.width = width
			this.editor.currentWidget.config.layout.height = height
		},
		widgetEditable({ config }): boolean {
			return !config.widget.locked
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
