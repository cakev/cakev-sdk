<template lang="pug">
div
	c-collapse(
		type="list"
		:label="item.label",
		@add-click="handleAddClick(item['key'])",
		v-for="item in editor.current.widget.eventTypes",
		:list="editor.current.widget.events[item['key']]",
		@remove-click="index => handleRemoveClick(item['key'], index)")
		template(v-slot="dataDefault")
			item-card(:activeIndex="dataDefault.activeIndex", :eventType="item['key']")
</template>
<script lang="ts">
import ItemCard from './item-card.vue'
import Editor from '@/core/Editor'

export default {
	name: 'data-event',
	components: {
		ItemCard,
	},
	data() {
		return {
			editor: Editor.Instance() as Editor,
		}
	},
	methods: {
		handleAddClick(eventType: string): void {
			this.editor.current.widget.events[eventType].push({
				ids: [],
				id: '',
				animate: '',
				type: '',
				eventType,
				source: '',
				eventClass: 'component',
				target: '',
				process: {
					enable: false,
					methodBody: '',
				},
			})
		},
		handleRemoveClick(eventType: string, index: number): void {
			this.editor.current.widget.events[eventType].splice(index, 1)
		},
	},
}
</script>
