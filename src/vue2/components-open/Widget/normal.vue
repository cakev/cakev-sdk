<template lang="pug">
.widget-part(:style="styles")
	slot
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class widgetNormal extends Vue {
	@Prop() value
	@Prop() customConfig
	@Prop() customEventsConfig
	@Prop({
		default() {
			return []
		},
	})
	setting
	@Prop({
		default() {
			return {}
		},
	})
	settingData
	@Prop({
		default() {
			return []
		},
	})
	eventTypes

	get styles() {
		return (this.$parent as any).styles
	}

	created(): void {
		;(this.$parent as any).__init__({
			value: this.value,
			customConfig: this.customConfig,
			setting: this.setting,
			settingData: this.settingData,
			eventTypes: this.eventTypes,
			customEventsConfig: this.customEventsConfig,
		})
	}
}
</script>
