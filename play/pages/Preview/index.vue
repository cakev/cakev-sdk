<template lang="pug">
d-view
</template>
<script lang="ts">
import { Editor } from '@/index'
export default {
	name: 'preview',
	data() {
		return {
			editor: Editor.Instance() as Editor,
		}
	},
	mounted() {
		this.editor.screenCache.get('previewData').then(res => {
			this.editor.screen.init(res)
		})
	},
}
</script>
