<template lang="pug">
.e-form-item.fn-flex(:class="`flex-${direction}`", :style="{ alignItems: align }")
	slot
</template>
<script lang="ts">
export default {
	name: 'e-form-item',
	props: {
		direction: {
			default: 'row',
		},
		align: {
			default: 'center',
		},
	},
}
</script>
<style lang="scss" scoped>
.e-form-item {
	align-items: center;
	margin: 4px 0;
}
</style>
