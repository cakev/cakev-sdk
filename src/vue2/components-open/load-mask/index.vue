<template lang="pug">
transition(name="fade")
	.load-mask.pos-a.fn-flex.z-index-999(
		v-if="show",
		:style="`background-color: ${backgroundColor}; color: ${color}; font-size: ${fontSize}`")
		c-svg.loading(type="loading", :size="iconSize")
		slot {{ text }}
</template>
<script lang="ts">
export default {
	props: {
		backgroundColor: {
			type: String,
			default: 'rgba(0, 0, 0, .4)',
		},
		show: {
			type: Boolean,
			default: true,
		},
		color: {
			type: String,
			default: '#e2e2e2',
		},
		fontSize: {
			type: String,
			default: '24px',
		},
		iconSize: {
			type: Number,
			default: 48,
		},
		text: {
			type: String,
			default: '请稍后…',
		},
	},
}
</script>
<style lang="scss">
@keyframes rotate {
	0% {
		transform: rotate(0);
	}

	100% {
		transform: rotate(360deg);
	}
}

.loading {
	animation: rotate infinite 1s;
}

.load-mask {
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
</style>
