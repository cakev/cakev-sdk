<template lang="pug">
.d-right-modal-box.z-index-999(:style="{ width: `${editor.xRoomR1}px` }")
	.d-right-modal-name.fn-flex.flex-row(v-click-outside="close")
		span.widget-name-text(v-if="!editName") {{ editor.currentWidget.config.widget.name }}_{{ editor.currentWidget.id }}
		i-input.widget-name(
			v-if="editName",
			v-model="editor.currentWidget.config.widget.name")
		e-svg.pointer.widget-name-icon(
			icon-class="edit",
			color="#515a6e",
			@click.stop="editName = true",
			v-if="!editName")
	.d-right-modal-id.fn-flex.flex-column
		span {{ editor.currentWidget.type }}{{ editor.currentWidget.config.widget.componentVersion ? ` | ${editor.currentWidget.config.widget.componentVersion}` : '' }}
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
<script>
import itemList from './item-list.vue'
import { Icon, Input } from 'view-design'
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
			chooseList: [],
		}
	},
	watch: {
		'editor.currentWidget.config.customConfig': {
			handler(val) {
				if(val) {
					this.chooseList = [
						{
							key: [{ type: 'base' }],
						},
						{
							key: [{ type: 'data' }],
						},
						{
							key: [{ type: 'interactive' }],
						},
						{
							key: val || [],
						},
					]
				}
			},
			deep: true,
			immediate: true,
		},
	},
	methods: {
		close() {
			this.editName = false
		},
		handleClick(index) {
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
