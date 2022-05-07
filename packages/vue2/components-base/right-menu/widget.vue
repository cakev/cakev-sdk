<template lang="pug">
#widget-right-menu.right-menu.pos-f.z-index-99(@contextmenu.stop.prevent, v-click-outside="hideRightMenu")
	ul.list
		item-card(@click="handleZIndexTop")
			i-icon(type="md-arrow-round-up")
			span 置顶
		item-card(@click="handleZIndexBottom")
			i-icon(type="md-arrow-round-down")
			span 置底
	ul.list(v-if="isGroup")
		item-card(@click="handleRelieveGroup")
			i-icon(type="md-apps")
			span 取消组合
	ul.list
		item-card(@click="hideWidget")
			i-icon(type="md-eye-off")
			span 隐藏
		item-card(@click="handleLock")
			i-icon(:type="isLock ? 'md-lock' : 'md-unlock'")
			span {{ isLock ? '解锁' : '锁定' }}
	ul.list
		item-card(@click="copyWidget")
			i-icon(type="ios-copy")
			span 复制
		item-card(@click="handleSync")
			i-icon(type="md-refresh")
			span 刷新
		item-card(@click="deleteWidget")
			i-icon(type="md-trash")
			span 删除
</template>
<script>
import { Icon } from 'view-design'
import Editor from '@/core/Editor'
import ClickOutside from 'vue-click-outside'
import ItemCard from '@/vue2/components-base/right-menu/item-card.vue'
import { create } from '@/vue2/api/collectionComponent.api.js'

export default {
	name: 'right-menu',
	components: {
		'i-icon': Icon,
		ItemCard,
	},
	directives: { ClickOutside },
	data() {
		return {
			isLock: false,
			editor: Editor.Instance(),
		}
	},
	computed: {
		isGroup() {
			if (this.editor.currentWidget) {
				return this.editor.current.widget.widgetType === 'group'
			}
			return false
		},
	},
	methods: {
		handleRelieveGroup() {
			this.editor.relieveWidgetGroup()
			this.hideRightMenu()
			this.handleUnActive()
		},
		handleSync() {
			this.editor.refreshWidget()
			this.hideRightMenu()
		},
		handleZIndexTop() {
			this.editor.current.widget.layout.zIndex = this.editor.currentMaxZIndex
			this.hideRightMenu()
		},
		handleZIndexBottom() {
			this.editor.current.widget.layout.zIndex = this.editor.currentMinZIndex
			this.hideRightMenu()
		},
		hideWidget() {
			const id = this.editor.current.widget.id
			this.hideRightMenu()
			this.handleUnActive()
			this.editor.screen.screenWidgetsLays[id].hide = true
		},
		deleteWidget() {
			const id = this.editor.currentWidgetList[0]
			if (this.editor.currentSceneIndex === -1) {
				this.$Modal.confirm({
					title: '是否删除当前组件？',
					content: '该组件将自动进入回收站！',
					onOk: () => {
						this.editor.deleteWidget(id)
						this.hideRightMenu()
					},
					onCancel: () => {
						this.hideRightMenu()
					},
				})
			} else {
				this.$Modal.confirm({
					title: '是否删除当前组件？',
					content: '该组件将自动进入回收站！',
					onOk: () => {
						this.editor.deleteWidget(id)
						this.hideRightMenu()
					},
					onCancel: () => {
						this.hideRightMenu()
					},
				})
			}
		},
		copyWidget() {
			this.editor.copyWidget()
			this.handleUnActive()
			this.hideRightMenu()
		},
		hideRightMenu() {
			const rightMenu = document.getElementById('widget-right-menu')
			rightMenu.classList.remove('active')
		},
		handleUnActive() {
			this.editor.unSelectWidget()
		},
		handleLock() {
			this.isLock = !this.isLock
			this.editor.current.widget.config.widget.locked = this.isLock
			this.hideRightMenu()
		},
	},
}
</script>
<style lang="scss" scoped>
.right-menu {
	font-size: 12px;
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
