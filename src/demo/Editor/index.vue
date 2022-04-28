<template lang="pug">
.home-container
	d-detail
	d-screen
</template>
<script lang="ts">
import dScreen from '@/vue2/components-open/d-screen/index.vue'
import dDetail from '@/vue2/components-open/d-detail/index.vue'

export default {
	name: 'editor',
	components: {
		dScreen,
		dDetail,
	},
}
</script>
<style lang="scss">
.home-container {
	height: 100%;
	overflow: hidden;
}
</style>
