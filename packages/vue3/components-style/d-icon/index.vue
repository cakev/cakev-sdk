<template lang="pug">
.d-icon.fn-flex.cursor-pointer
	d-svg(:size="size", :type="type")
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import dSvg from '@dorring/sdk/vue3/components-style/d-svg/index.vue'

export default defineComponent({
	name: 'd-icon',
	components: {
		dSvg,
	},
	props: {
		type: {
			type: String,
		},
		size: {
			type: Number,
			default: 14,
		},
	},
})
</script>
<style lang="scss" scoped>
.d-icon {
	align-items: center;
	justify-content: center;
	width: 32px;
	height: 32px;
	color: #333;
	border-radius: 3px;

	&:hover {
		background-color: rgba(0, 0, 0, 0.06);
	}
}
</style>
