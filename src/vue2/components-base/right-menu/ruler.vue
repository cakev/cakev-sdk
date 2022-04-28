<template lang="pug">
#ruler-right-menu.right-menu.pos-f.z-index-99(
	@contextmenu.stop.prevent,
	v-click-outside="hideRightMenu")
	ul.list
		item-card(@click="handleCreateXGuide")
			i-icon(type="md-color-wand", :style="{ transform: 'rotate(46deg)' }")
			span 插入纵参考线
		item-card(@click="handleCreateYGuide")
			i-icon(type="md-color-wand", :style="{ transform: 'rotate(-46deg)' }")
			span 插入横参考线
		item-card(@click="handleClearGuide", :keyItem="hotKeys[0].key")
			i-icon(type="md-cut")
			span 清除全部参考线
	ul.list
		item-card(@click="zoomIn", :keyItem="hotKeys[1].key")
			e-svg.pointer(icon-class="zoomIn", :size="12")
			span 画布放大
		item-card(@click="zoomOut", :keyItem="hotKeys[2].key")
			e-svg.pointer(icon-class="zoomOut", :size="12") 
			span 画布缩小
		item-card(@click="resetZoom")
			i-icon(type="md-happy")
			span 画布居中
	i-modal(v-model="createModal", :closable="false", @on-ok="createGuide")
		.fn-flex.flex-row
			label(:style="{ marginRight: '10px', width: '100px' }") {{ guideType }}轴坐标值
			i-input(v-model="guide")
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Icon, Input, Modal } from 'view-design'
import Editor from '@/core/Editor'
import ClickOutside from 'vue-click-outside'
import ItemCard from '@/vue2/components-base/right-menu/item-card.vue'
import { hotKeys } from '@/vue2/utils'

@Component({
	components: {
		ItemCard,
		'i-icon': Icon,
		'i-input': Input,
		'i-modal': Modal,
	},
	directives: { ClickOutside },
})
export default class rightMenu extends Vue {
	editor: Editor = Editor.Instance()
	guide = ''
	guideType = ''
	createModal = false
	hotKeys = hotKeys

	zoomIn(): void {
		this.editor.zoomIn()
		this.hideRightMenu()
	}
	zoomOut(): void {
		this.editor.zoomOut()
		this.hideRightMenu()
	}
	createGuide(): void {
		if (isNaN(Number(this.guide))) this.$Message.error('请输入数字')
		this.editor.createGuide(this.guide, this.guideType)
	}
	resetZoom(): void {
		this.editor.resetZoom()
		this.hideRightMenu()
	}
	handleCreateXGuide(): void {
		this.createModal = true
		this.guide = ''
		this.guideType = 'x'
		this.hideRightMenu()
	}
	handleClearGuide(): void {
		this.hideRightMenu()
		this.$Modal.confirm({
			title: '确定是否清空参考线',
			onOk: () => {
				this.editor.clearGuides()
			},
		})
	}
	handleCreateYGuide(): void {
		this.createModal = true
		this.guide = ''
		this.guideType = 'y'
		this.hideRightMenu()
	}
	hideRightMenu(): void {
		const rightMenu = document.getElementById('ruler-right-menu')
		rightMenu.classList.remove('active')
	}
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
