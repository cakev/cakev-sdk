<template lang="pug">
div
	d-right-swiper-list(
		:title="item.label",
		@add-click="handleAddClick(item['key'])",
		v-for="item in editor.currentWidget.eventTypes",
		:list="editor.currentWidget.events[item['key']]",
		@remove-click="index => handleRemoveClick(item['key'], index)")
		template(v-slot="dataDefault")
			item-card(:activeIndex="dataDefault.activeIndex", :eventType="item['key']")
</template>
<script lang="ts">
import func from '@/vue2/components-func/func.mx'
import { Component } from 'vue-property-decorator'
import ItemCard from './item-card.vue'

@Component({ components: { ItemCard } })
export default class DataEvent extends func {
	handleAddClick(eventType: string): void {
		this.editor.current.currentWidget.events[eventType].push({
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
	}
	handleRemoveClick(eventType: string, index: number): void {
		this.editor.currentWidget.events[eventType].splice(index, 1)
	}
}
</script>
