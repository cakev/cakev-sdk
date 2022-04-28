<template lang="pug">
li.fn-flex(@click="handleClick")
	.left-right-menu.fn-flex
		slot
	template(v-if="keyItem")
		.right-right-menu-key-code.fn-flex.flex-row(v-for="child in keyItem")
			.right-right-menu-hot-key-text(v-if="child.type === 'text'") {{ child.value }}
			.right-right-menu-hot-key-item(v-if="child.type === '+'") +
			img.right-right-menu-hot-key-img(
				v-if="child.type === 'img'",
				:src="child.value")
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class ItemCard extends Vue {
	@Prop() keyItem
	handleClick(): void {
		this.$emit('click')
	}
}
</script>
<style lang="scss" scoped>
li {
	position: relative;
	display: flex;
	align-items: center;
	height: 30px;
	padding: 0 12px 0 15px;
	cursor: pointer;

	.left-right-menu {
		align-items: center;
		min-width: 132px;
	}

	&:hover {
		background: #393e49;
	}

	span {
		margin-left: 4px;
		user-select: none;
	}
}

.right-right-menu-key-code {
	&:last-child {
		.right-right-menu-hot-key-text {
			margin-right: 0;
		}
	}
}

.right-right-menu-hot-key-img {
	margin-left: 6px;
}

.right-right-menu-hot-key-text {
	min-width: 22px;
	padding: 0 4px;
	margin-right: 10px;
	margin-left: 10px;
	font-style: normal;
	text-align: center;
	border: 1px solid #ddd;
	border-radius: 2px;
}

.right-right-menu-hot-key-img {
	width: 18px;
	text-align: center;
}
</style>
