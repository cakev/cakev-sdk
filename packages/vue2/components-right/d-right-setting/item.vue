<template lang="pug">
component(
	:is="currentComponent[config.type]",
	:config="config",
	:parentProp="parentProp",
	:parentIndex="parentIndex")
</template>
<script lang="ts">
export default {
	name: 'd-manage-item',
	props: {
		config: {
			type: Object,
		},
		parentProp: {},
		parentIndex: {},
	},
	data() {
		return {
			currentComponent: {},
		}
	},
	created() {
		const components = require.context(`../../components-func`, true, /\.(vue)$/)
		components.keys().forEach(child => {
			const name = child.split('/')[1].replace('.vue', '')
			this.currentComponent[name] = components(child).default
		})
	},
}
</script>
