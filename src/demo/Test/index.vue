<template lang="pug">
div 
	i-select(v-model="a")
		i-option(:value="1") 1
		i-option(:value="2") 2
	d-image.test-img(src="/node/0eea7812-1522-4377-bce1-1a4576065af2/componentBackGround/1627631713184.jpg")
</template>
<script lang="ts">
import Editor from '@/core/Editor'
import { Vue, Component } from 'vue-property-decorator'
import { Select, Option } from 'view-design'
import dImage from '@/vue2/components-open/d-image'

@Component({
	components: { 'i-select': Select, 'i-option': Option, dImage },
})
export default class extends Vue {
	a = 1
	editor: Editor = Editor.Instance()
	clickPost(): void {
		this.editor.request('post', '/node/market/component/list', { p: 1 })
	}

	clickGet(): void {
		this.editor.request('get', '/node/market/component/list', { p: 1 })
	}
}
</script>
