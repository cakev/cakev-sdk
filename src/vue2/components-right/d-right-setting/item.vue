<template lang="pug">
component(
	:is="currentComponent[config.type]",
	:config="config",
	:parentProp="parentProp",
	:parentIndex="parentIndex")
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class DManageItem extends Vue {
	@Prop({ type: Object }) config: any
	@Prop() parentProp: any
	@Prop() parentIndex: any
	currentComponent: any = {}
	created(): void {
		const components = require.context(
			`../../components-func`,
			true,
			/\.(vue)$/,
		)
		components.keys().forEach(child => {
			const name = child.split('/')[1].replace('.vue', '')
			this.currentComponent[name] = components(child).default
		})
	}
}
</script>
