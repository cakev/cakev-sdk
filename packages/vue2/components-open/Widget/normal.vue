<template lang="pug">
.widget-part(:style="styles")
	slot
</template>
<script lang="ts">
export default {
	name: 'widget-normal',
	props: {
		value: {},
		customConfig: {},
		customEventsConfig: {},
		eventTypes: {
			default() {
				return []
			},
		},
	},
	computed: {
		styles() {
			return (this.$parent as any).styles
		},
	},
	created(): void {
		;(this.$parent as any).__init__({
			value: this.value,
			customConfig: this.customConfig,
			eventTypes: this.eventTypes,
			customEventsConfig: this.customEventsConfig,
		})
	},
}
</script>
