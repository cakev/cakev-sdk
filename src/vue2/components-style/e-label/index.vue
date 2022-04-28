<template lang="pug">
label.e-label {{  value  }}
</template>
<script lang="ts">
export default {
	name: 'e-label',
	props: {
		value: {},
	},
}
</script>
<style lang="scss" scoped>
.e-label {
	display: block;
	min-width: 60px;
	min-height: 32px;
	margin-right: 10px;
	font-size: 12px;
	line-height: 32px;
	color: rgb(191, 191, 191);
}
</style>
