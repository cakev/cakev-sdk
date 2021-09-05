<template lang="pug">
i(:class="type", v-if="isExternal", :style="{ fontSize: `${size}px` }")
svg.d-svg(v-else, aria-hidden="true", :style="{ width: `${size}px`, height: `${size}px` }")
	use(:xlink:href="`#dorring-${type}`")
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
	name: 'd-svg',
	props: {
		type: {
			type: String,
		},
		size: {
			type: Number,
			default: 12,
		},
	},
	setup(props) {
		const isExternal = computed({
			get: () => {
				return /el-icon-/.test(props.type)
			},
			// @ts-ignore
			set: value => {},
		})

		return { isExternal }
	},
})
</script>
<style lang="scss" scoped>
.d-svg {
	overflow: hidden;
	fill: currentColor;
}
</style>
