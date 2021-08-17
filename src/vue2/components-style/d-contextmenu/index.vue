<template lang="pug">
ul.d-contextmenu.pos-f.cursor-nomral.z-index-999
	li(v-for="item in list", @click="typeof item.handler === 'function' && item.handler()")
		span {{ item.label }}
</template>
<script lang="ts">
export default {
	props: {
		list: {
			type: Array,
			default() {
				return []
			},
		},
	},
}
</script>
<style lang="scss" scoped>
.d-contextmenu {
	width: 200px;
	box-shadow: 0 5px 17px rgba(0, 0, 0, 0.2), 0 2px 7px rgba(0, 0, 0, 0.15), inset 0 0 0 0.5px #000,
		0 0 0 0.5px rgba(0, 0, 0, 0.1);
	background-color: #222;
	padding: 8px 0;
	border-radius: 2px;
	color: #fff;
	li{
		line-height: 24px;
		font-size: 12px;
		padding: 0 16px;
		&:hover{
			background-color: #409EFF;
		}
	}
}
</style>
