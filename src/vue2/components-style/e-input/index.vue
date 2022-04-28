<template lang="pug">
input.e-input(
	:value="currentVal",
	:style="{ width, display, height }",
	@focus="$emit('focus', $event)",
	@blur="$emit('blur', $event)",
	@change="$emit('change', $event)",
	@input="$emit('input', $event.target.value)")
</template>
<script>
export default {
	name: 'e-input',
	props: {
		width: {
			default: '100%',
		},
		height: {
			default: '',
		},
		display: {
			default: 'block',
		},
		value: {},
	},
	data() {
		return {
			currentVal: '',
		}
	},
	watch: {
		value: val => {
			this.currentVal = val
		},
	},
	mounted() {
		this.currentVal = this.value
	},
}
</script>
<style lang="scss" scoped>
.e-input {
	width: 100%;
	padding: 4px 8px;
	color: rgb(191, 191, 191);
	background-color: var(--component-background);
	border: 1px solid var(--border-color-base);
	border-radius: 2px;
	box-shadow: none;

	&:focus {
		border-color: var(--primary-color);
	}

	&:hover {
		border-color: var(--primary-color);
	}
}
</style>
