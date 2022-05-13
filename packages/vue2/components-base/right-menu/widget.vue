<template lang="pug">
#widget-right-menu.right-menu.pos-f.z-index-99(@contextmenu.stop.prevent, v-click-outside="hideRightMenu")
	ul.list
		item-card(@click="handleZIndexTop")
			span 置顶
		item-card(@click="handleZIndexBottom")
			span 置底
	ul.list
		item-card(@click="hideWidget")
			c-svg(type="eye-off" :size="14")
			span 显示/隐藏
		item-card(@click="handleLock")
			c-svg(type="lock" :size="14")
			span 锁定/解锁
	ul.list
		item-card(@click="copyWidget")
			span 复制
		item-card(@click="handleSync")
			span 刷新
		item-card(@click="deleteWidget")
			span 删除
</template>
<script lang="ts">
import Editor from '@/core/Editor'
import { clickOutside } from '@cakev/util'
import ItemCard from '@/vue2/components-base/right-menu/item-card.vue'
import { CModal } from '@cakev/ui'

export default {
	name: 'right-menu',
	components: {
		ItemCard,
	},
	directives: { clickOutside },
	data() {
		return {
			editor: Editor.Instance() as Editor,
		}
	},
	methods: {
		handleSync(): void {
			const widgetId = this.editor.current.widget.widgetId
			this.editor.current.unSelectWidget()
			this.editor.screen.refreshWidget(widgetId)
			this.hideRightMenu()
		},
		handleZIndexTop(): void {
			const widgetId = this.editor.current.widget.widgetId
			this.editor.screen.setWidgetZIndex(widgetId, this.editor.currentMaxZIndex)
			this.hideRightMenu()
		},
		handleZIndexBottom(): void {
			const widgetId = this.editor.current.widget.widgetId
			this.editor.screen.setWidgetZIndex(widgetId, this.editor.currentMinZIndex)
			this.hideRightMenu()
		},
		hideWidget(): void {
			const widgetId = this.editor.current.widget.widgetId
			this.hideRightMenu()
			this.handleUnActive()
			this.editor.current.unSelectWidget()
			this.editor.screen.hideWidget(widgetId)
		},
		deleteWidget(): void {
			const widgetId = this.editor.current.currentWidgetList[0]
			if (this.editor.currentSceneIndex === -1) {
				CModal.confirm({
					title: '是否删除当前组件？',
					content: '该组件将永久消失！',
					onOk: () => {
						this.editor.screen.deleteWidget(widgetId)
						this.editor.current.unSelectWidget()
						this.hideRightMenu()
					},
					onCancel: () => {
						this.hideRightMenu()
					},
				})
			} else {
				CModal.confirm({
					title: '是否删除当前组件？',
					content: '该组件将自动进入回收站！',
					onOk: () => {
						this.editor.screen.dropWidget(widgetId)
						this.editor.current.unSelectWidget()
						this.hideRightMenu()
					},
					onCancel: () => {
						this.hideRightMenu()
					},
				})
			}
		},
		copyWidget(): void {
			const widgetId = this.editor.current.currentWidgetList[0]
			this.editor.screen.copyWidget(widgetId)
			this.handleUnActive()
			this.hideRightMenu()
		},
		hideRightMenu(): void {
			const rightMenu = document.getElementById('widget-right-menu')
			rightMenu.classList.remove('active')
		},
		handleUnActive(): void {
			this.editor.current.unSelectWidget()
		},
		handleLock(): void {
			const widgetId = this.editor.current.currentWidgetList[0]
			this.editor.screen.lockWidget(widgetId)
			this.hideRightMenu()
		},
	},
}
</script>
<style lang="scss" scoped>
.right-menu {
	color: #bfbfbf;
	text-align: left;
	pointer-events: none;
	background: #2d2f38;
	opacity: 0;
	transition: transform 0.2s, opacity 0.2s;
	transform: translateY(10px);

	.list {
		border-bottom: 1px solid #22242b;

		&:last-child {
			border-bottom: none;
		}
	}

	&.active {
		pointer-events: auto;
		opacity: 1;
		transform: translateY(0);
	}
}
</style>
