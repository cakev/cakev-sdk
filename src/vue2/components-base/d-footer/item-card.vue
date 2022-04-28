<template lang="pug">
li.fn-flex.flex-row
	label.d-footer-name {{ item.name }}
	.d-footer-key-code.fn-flex.flex-row(v-for="child in item.key")
		.d-footer-hot-key-text.fn-flex(v-if="child.type === 'text'") {{ child.value }}
		.d-footer-hot-key-item(v-if="child.type === '+'") +
		img.d-footer-hot-key-img(v-if="child.type === 'img'", :src="child.value")
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class ItemCard extends Vue {
	@Prop() item
}
</script>
<style lang="scss" scoped>
li {
	align-items: center;
	justify-content: space-between;
	height: 36px;
	padding: 0 16px;
	white-space: nowrap;
	border-bottom: 1px solid #22242b;

	&:last-child {
		border-bottom: none;
	}
}

.d-footer-key-code {
	&:last-child {
		.d-footer-hot-key-text {
			margin-right: 0;
		}
	}
}

.d-footer-name {
	padding: 3px 10px;
	margin-right: auto;
	text-align: right;
	letter-spacing: 0;
}

.d-footer-hot-key-img {
	margin-left: 6px;
}

.d-footer-hot-key-item {
	margin: 0 5px;
}

.d-footer-hot-key-text {
	align-items: center;
	justify-content: center;
	min-width: 24px;
	height: 24px;
	padding: 0 5px;
	background: var(--background-2);
	border: 1px solid #393b4a;
	border-radius: 2px;
	box-shadow: 0 1px 3px 0 rgba(44, 46, 64, 0.82);
}

.d-footer-hot-key-img {
	width: 18px;
	text-align: center;
}
</style>
