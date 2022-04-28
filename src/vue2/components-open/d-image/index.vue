<template lang="pug">
img(:src="currentSrc", v-bind="{ ...$props, ...$attrs }", v-on="$listeners")
</template>
<script lang="ts">
import Editor from '@/core/Editor'

export default {
	name: 'd-image',
	props: {
		src: {
			type: String,
		},
	},
	data() {
		return {
			editor: Editor.Instance(),
			currentSrc: '',
		}
	},
	async created() {
		this.currentSrc = await this.editor.imageCache.get(this.src)
	},
}
</script>
