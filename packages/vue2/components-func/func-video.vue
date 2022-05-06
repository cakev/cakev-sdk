<template lang="pug">
c-control(:label="`${config.label} [${inputKey}]`", title="支持mp4,webm,mov")
	template(slot="right")
		d-upload(
			v-model="obj[inputKey]",
			:data="formData",
			type="video",
			accept="video/*")
</template>
<script lang="ts">
import func from './func.mx'
import dUpload from '../components-right/d-upload/index.vue'

export default {
	name: 'func-webm',
	components: {
		dUpload,
	},
	mixins: [func],
	computed: {
		formData() {
			if (this.editor.currentWidget) {
				return {
					library: `componentStatic/${this.editor.current.widget.type}/${this.editor.current.widget.config.widget.widgetVersion}`,
				}
			}
			return {}
		},
	},
}
</script>
