<template lang="pug">
li.fn-flex.flex-row
	label.c-footer-name {{ item.name }}
	.c-footer-key-code.fn-flex.flex-row(v-for="child in item.key")
		.c-footer-hot-key-text.fn-flex(v-if="child.type === 'text'") {{ child.value }}
		.c-footer-hot-key-item(v-if="child.type === '+'") +
		img.c-footer-hot-key-img(v-if="child.type === 'img'", :src="child.value")
</template>
<script lang="ts">
export default {
	name: 'item-card',
	props: {
		item: {},
	},
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

.c-footer-key-code {
	&:last-child {
		.c-footer-hot-key-text {
			margin-right: 0;
		}
	}
}

.c-footer-name {
	padding: 3px 10px;
	margin-right: auto;
	text-align: right;
	letter-spacing: 0;
}

.c-footer-hot-key-img {
	margin-left: 6px;
	width: 18px;
	text-align: center;
}

.c-footer-hot-key-item {
	margin: 0 5px;
}

.c-footer-hot-key-text {
	align-items: center;
	justify-content: center;
	min-width: 24px;
	height: 24px;
	padding: 0 5px;
	background: #22242b;
	border: 1px solid #393b4a;
	border-radius: 2px;
	box-shadow: 0 1px 3px 0 rgba(44, 46, 64, 0.82);
}
</style>
