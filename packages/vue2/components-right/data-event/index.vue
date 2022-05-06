<template lang="pug">
div
	c-collapse(
		type="list"
		:title="item.label",
		@add-click="handleAddClick(item['key'])",
		v-for="item in editor.current.widget.eventTypes",
		:list="editor.current.widget.events[item['key']]",
		@remove-click="index => handleRemoveClick(item['key'], index)")
		template(v-slot="dataDefault")
			item-card(:activeIndex="dataDefault.activeIndex", :eventType="item['key']")
</template>
<script lang="ts">
import func from '@/vue2/components-func/func.mx'
import ItemCard from './item-card.vue'

export default {
	name: 'data-event',
	mixins: [func],
	components: {
		ItemCard,
	},
	methods: {
		handleAddClick(eventType: string): void {
			this.editor.current.current.widget.events[eventType].push({
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
