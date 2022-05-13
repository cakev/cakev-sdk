<template lang="pug">
c-row.pos-r
	.d-footer-bar.fn-flex.pointer
		.d-footer-bar-text(@click.stop="viewModal = !viewModal") 视图调整
	ul.d-footer-view-modal.pos-a(v-show="viewModal", v-click-outside="hideView")
		li.fn-flex.pointer(@click="taggerXRoomL2")
			span 场景区
			c-svg.pointer(type="checkmark", :size="12" v-show="editor.current.xRoomL2 > 0")
		li.fn-flex.pointer(@click="taggerXRoomR1")
			span 设置区
			c-svg.pointer(type="checkmark", :size="12" v-show="editor.current.xRoomR1 > 0")
	.d-footer-bar.fn-flex
		label.d-footer-hot-keys.fn-flex.flex-row
			.d-footer-bar-text.pointer.ellipsis(@click="showHotKey = !showHotKey", v-click-outside="hideHotKey") 快捷键
	.d-footer-bar.fn-flex
		label(:style="{ marginRight: '10px' }") {{ editor.current.currentEventDisabled ? '拖动模式' : '预览模式' }}
		c-switch(v-model="editor.current.currentEventDisabled")
	ul.d-footer-hot-key-list.pos-a(v-show="showHotKey")
		item-card(v-for="item in hotKeys", :key="item.name", :item="item")
</template>
<script>
import Editor from '@/core/Editor'
import ItemCard from '@/vue2/components-base/d-footer/item-card.vue'
import { hotKeys } from '@/vue2/utils'
import { clickOutside } from '@cakev/util'

export default {
	name: 'left',
	components: {
		ItemCard,
	},
	directives: { clickOutside },
	data() {
		return {
			showHotKey: false,
			viewModal: false,
			hotKeys: hotKeys,
			editor: Editor.Instance(),
		}
	},
	methods: {
		taggerXRoomL2() {
			this.editor.current.taggerXRoomL2()
			this.viewModal = false
		},
		taggerXRoomR1() {
			this.editor.current.taggerXRoomR1()
			this.viewModal = false
		},
		hideHotKey() {
			this.showHotKey = false
		},
		hideView() {
			this.viewModal = false
		},
	},
}
</script>
<style lang="scss" scoped>
.d-footer-view-modal {
	bottom: 32px;
	left: -4px;
	width: 90px;
	color: var(--text-1);
	background: var(--background-4);
	box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.57);

	li {
		align-items: center;
		justify-content: space-between;
		height: 36px;
		padding: 0 16px;
		white-space: nowrap;
		border-bottom: 1px solid #22242b;

		&:last-child {
			border-bottom: none;
		}
	}
}

.d-footer-bar {
	align-items: center;
	padding: 0 10px;
	line-height: 30px;
	cursor: pointer;
	user-select: none;
	
	&:hover {
		.d-footer-bar-text {
			color: var(--text-3);
		}
	}
}

.d-footer-hot-keys,
.d-footer-info {
	align-items: center;
	justify-content: center;
}

.d-footer-info {
	margin-left: 10px;
}

.d-footer-hot-keys {
	width: 100%;
	height: 100%;
}

.d-footer-hot-key-list {
	bottom: 32px;
	left: -4px;
	width: 295px;
	color: var(--text-1);
	pointer-events: none;
	background: var(--background-4);
	box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.57);
}
</style>
