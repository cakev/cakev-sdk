<template lang="pug">
i(:class="type" v-if="isExternal", :style="{ fontSize: `${size}px` }", v-on="$listeners")
svg.d-svg(v-else, aria-hidden="true", v-on="$listeners", :style="{ width: `${size}px`, height: `${size}px` }")
	use(:xlink:href="`#dorring-${type}`")
</template>
<script lang="ts">
import { computed } from '@vue/composition-api'

export default {
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
}
</script>
<style lang="scss" scoped>
.d-svg {
	overflow: hidden;
	fill: currentColor;
}
</style>
