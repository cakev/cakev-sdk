<template lang="pug">
d-right-control(:label="`${config.label} [${inputKey}]`", title="支持mp4,webm,mov")
	d-upload(
		v-model="obj[inputKey]",
		:data="formData",
		type="video",
		accept="video/*")
</template>
<script lang="ts">
import func from './func.mx'
import dUpload from '../components-right/d-upload/index.vue'
import { Tooltip, Icon } from 'view-design'

export default {
	name: 'func-webm',
	components: {
		'i-icon': Icon,
		dUpload,
		Tooltip,
	},
	mixins: [func],
	computed: {
		formData() {
			if (this.editor.currentWidget) {
				return {
					library: `componentStatic/${this.editor.currentWidget.type}/${this.editor.currentWidget.config.widget.widgetVersion}`,
				}
			}
			return {}
		},
	},
}
</script>
