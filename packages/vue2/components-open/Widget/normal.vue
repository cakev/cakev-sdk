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
}
</script>
