<template lang="pug">
.d-right-modal-box.z-index-999.fn-flex.flex-column(:style="{ width: `${editor.current.xRoomR1}px`, height: '100%', flex: 1 }")
	.d-modal-title 页面设置
	config
</template>
<script>
import config from './config.vue'
import {clickOutside} from '@cakev/util'
import Editor from '@/core/Editor'

export default {
	name: 'd-right-manage',
	components: {
		config,
	},
	directives: { clickOutside },
	data() {
		return {
			editName: false,
			editor: Editor.Instance(),
		}
	},
	methods: {
		close() {
			this.editName = false
		},
	},
}
</script>
