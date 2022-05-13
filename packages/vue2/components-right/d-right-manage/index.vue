<template lang="pug">
.z-index-999(:style="{ backgroundColor:'var(--panelBgColor)',width: `${editor.current.xRoomR1}px`, height: '100%', flex: 1 }")
	c-tabs(:value="1")
		c-tab-pane(label="页面设置" :value="1")
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
