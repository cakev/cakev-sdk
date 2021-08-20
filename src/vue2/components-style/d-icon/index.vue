<template lang="pug">
.d-icon.fn-flex.cursor-pointer(v-on="$listeners")
	d-svg(v-bind="{ ...$props, ...$attrs }")
</template>
<script lang="ts">
export default {
	props: {
		size: {
			type: Number,
			default: 14,
		},
	},
}
</script>
<style lang="scss" scoped>
.d-icon {
	align-items: center;
	justify-content: center;
	width: 32px;
	height: 32px;
	margin-left: auto;
	color: #333;
	border-radius: 3px;

	&:hover {
		background-color: rgba(0, 0, 0, 0.06);
	}
}
</style>
