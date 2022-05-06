<template lang="pug">
.d-right-modal-box.z-index-999(:style="{ width: `${editor.xRoomR1}px` }")
	.d-right-modal-name.fn-flex.flex-row(v-click-outside="close")
		span.widget-name-text(v-if="!editName") {{ editor.current.widget.widgetBase.name }}_{{ editor.current.widget.widgetId }}
		i-input.widget-name(
			v-if="editName",
			v-model="editor.current.widget.widgetBase.name")
		c-svg.pointer.widget-name-icon(
			type="edit",
			color="#515a6e",
			@click.stop="editName = true",
			v-if="!editName")
	.d-right-modal-id.fn-flex.flex-column
		span {{ editor.current.widget.widgetIs }}{{ editor.current.widget.widgetBase.version }}
	.d-right-modal-title.pointer.text-center.fn-flex.flex-row
		span.pos-r(
			v-for="(item, index) in title",
			@click="handleClick(index)",
			:key="item",
			:class="{ active: index === editor.currentRightSettingIndex }") {{ item }}
	.d-right-modal.d-scrollbar-none
		itemList(
			v-for="(item, index) in chooseList",
			:list="item.key",
			v-if="editor.currentRightSettingIndex === index")
</template>
<script lang="ts">
import itemList from './item-list.vue'
import { Icon, Input } from 'view-design'
// @ts-ignore
import ClickOutside from 'vue-click-outside'
import Editor from '@/core/Editor'

export default {
	name: 'd-right-setting',
	components: {
		itemList,
		'i-icon': Icon,
		'i-input': Input,
	},
	directives: { ClickOutside },
	data() {
		return {
			editName: false,
			editor: Editor.Instance(),
			title: ['基础', '数据', '交互', '自定义'],
			chooseList: [
				{
					key: [{ type: 'base' }],
				},
				{
					key: [{ type: 'data' }],
				},
				{
					key: [{ type: 'interactive' }],
				},
				// {
				// 	key: val || [],
				// },
			],
		}
	},
	methods: {
		close(): void {
			this.editName = false
		},
		handleClick(index: number): void {
			this.editor.selectRightSettingIndex(index)
		},
	},
}
</script>
<style lang="scss" scoped>
.d-right-modal {
	height: calc(100vh - 191px);
}

.widget-name-icon {
	line-height: 32px;
}

.d-right-modal-name {
	line-height: 32px;
}

.widget-name {
	&::v-deep {
		.ivu-input {
			padding: 0;
			font-size: 20px;
			line-height: 20px;
			color: #fff;
			background-color: transparent;
			border: none;
			border-bottom: 1px solid var(--borderGray);
			border-radius: 0;
			outline: none;
			box-shadow: none;
		}
	}
}
</style>
