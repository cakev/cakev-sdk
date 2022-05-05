<template lang="pug">
.d-mange-list
	d-manage-item(
		:config="child",
		v-for="(child, i) in list",
		:key="`${i}-${editor.currentWidgetList[0]}`")
</template>
<script lang="ts">
import DManageItem from './item.vue'
import Editor from '@/core/Editor'

export default {
	name: 'd-manage-item-list',
	components: {
		DManageItem,
	},
	props: {
		list: {
			type: Array,
			default: () => [],
		},
	},
	data() {
		return {
			editor: Editor.Instance(),
		}
	},
}
</script>
