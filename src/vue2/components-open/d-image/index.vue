<template lang="pug">
img(:src="currentSrc", v-bind="{ ...$props, ...$attrs }", v-on="$listeners")
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import Editor from '@/core/Editor'

@Component
export default class DImage extends Vue {
	@Prop(String) src: string

	editor: Editor = Editor.Instance()
	currentSrc = ''

	async created() {
		this.currentSrc = await this.editor.imageCache.get(this.src)
	}
}
</script>
