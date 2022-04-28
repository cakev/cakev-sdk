<template lang="pug">
.d-right-modal-box.z-index-999.fn-flex.flex-column(:style="{ width: `${editor.xRoomR1}px`, height: '100%', flex: 1 }")
	.d-modal-title 页面设置
	config
</template>
<script>
import { Component, Vue } from 'vue-property-decorator'
import config from './config.vue'
import { Icon, Input } from 'view-design'
import ClickOutside from 'vue-click-outside'
import Editor from '@/core/Editor'

@Component({
	components: {
		config,
		'i-icon': Icon,
		'i-input': Input,
	},
	directives: { ClickOutside },
})
export default class DRightManage extends Vue {
	editName = false
	editor = Editor.Instance()
	close() {
		this.editName = false
	}
}
</script>
