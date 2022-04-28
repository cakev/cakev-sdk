<template lang="pug">
input.e-input(
	:value="currentVal",
	:style="{ width, display, height }",
	@focus="$emit('focus', $event)",
	@blur="$emit('blur', $event)",
	@change="$emit('change', $event)",
	@input="$emit('input', $event.target.value)")
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

@Component
export default class EInput extends Vue {
	@Prop({ default: '100%' }) width
	@Prop({ default: '' }) height
	@Prop({ default: 'block' }) display
	@Prop() value
	currentVal = ''

	@Watch('value')
	valueChange(val): void {
		this.currentVal = val
	}
	mounted(): void {
		this.currentVal = this.value
	}
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
