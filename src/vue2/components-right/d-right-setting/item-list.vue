<template lang="pug">
.d-mange-list
	d-manage-item(
		:config="child",
		v-for="(child, i) in list",
		:key="`${i}-${editor.currentWidgetList[0]}`")
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import DManageItem from './item.vue'
import Editor from '@/core/Editor'

@Component({ components: { DManageItem } })
export default class DManageItemList extends Vue {
	@Prop(Array) list: any[]
	editor: Editor = Editor.Instance()
}
</script>
