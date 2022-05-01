<template lang="pug">
div 
	i-select(v-model="a")
		i-option(:value="1") 1
		i-option(:value="2") 2
	img.test-img(src="/node/0eea7812-1522-4377-bce1-1a4576065af2/componentBackGround/1627631713184.jpg")
</template>
<script lang="ts">
import Editor from '@/core/Editor'
import { Select, Option } from 'view-design'

export default {
	components: {
		'i-select': Select,
		'i-option': Option,
	},
	data() {
		return {
			a: 1,
			editor: Editor.Instance(),
		}
	},
	methods: {
		clickPost(): void {
			this.editor.request('post', '/node/market/component/list', { p: 1 })
		},
		clickGet(): void {
			this.editor.request('get', '/node/market/component/list', { p: 1 })
		},
	},
}
</script>
