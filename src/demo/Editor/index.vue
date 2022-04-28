<template lang="pug">
.home-container
	d-detail
	d-screen
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import dScreen from '@/vue2/components-open/d-screen/index.vue'
import dDetail from '@/vue2/components-open/d-detail/index.vue'

@Component({
	components: {
		dScreen,
		dDetail,
	},
})
export default class editor extends Vue {}
</script>
<style lang="scss">
.home-container {
	height: 100%;
	overflow: hidden;
}
</style>
