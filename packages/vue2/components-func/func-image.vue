<template lang="pug">
c-control(:label="`${config.label} [${inputKey}]`", title="支持jpg，png，gif")
	template(slot="right")
		d-upload(v-model="obj[inputKey]", :data="formData", accept="image/*")
</template>
<script lang="ts">
import func from './func.mx'
import dUpload from '../components-right/d-upload/index.vue'

export default {
	name: 'func-background',
	components: {
		dUpload,
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
