<template lang="pug">
p.hello-world {{  cake_data  }}
</template>
<script lang="ts">
export default {
	props: ['cake_data'],
	mounted() {
		console.log('111')
	},
}
</script>
<style lang="scss" scoped>
.hello-world {
	color: #fff;
	line-height: 32px;
	text-align: center;
}
</style>
