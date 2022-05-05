<template lang="pug">
.d-right-modal-box.z-index-999(:style="{ width: `${editor.xRoomR1}px` }")
	.d-right-modal-more-list.fn-flex.flex-column
		i-button(@click="handleGroup", type="primary") 组合
		i-button(@click="handleDelete", type="primary") 删除
</template>
<script>
import { Button } from 'view-design'
import Editor from '@/core/Editor'

export default {
	name: 'DRightSettingMore',
	components: {
		'i-button': Button,
	},
	data() {
		return {
			editor: Editor.Instance(),
		}
	},
	methods: {
		handleGroup() {
			this.editor.createWidgetGroup()
		},
		handleDelete() {
			this.$Modal.confirm({
				title: '是否删除所选组件？',
				content: '所有组件将自动进入回收站！',
				onOk: () => {
					this.editor.deleteWidgets()
					this.editor.unSelectWidget()
				},
			})
		},
	},
}
</script>
<style lang="scss" scoped>
.d-right-modal-more-list {
	align-items: center;
	justify-content: center;
	margin: 20px;

	&::v-deep(.ivu-btn) {
		margin-bottom: 10px;
	}
}
</style>
