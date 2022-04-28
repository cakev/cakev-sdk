<template lang="pug">
.svg-external-icon.svg-icon(v-if="isExternal", :style="styleExternalIcon", v-on="$listeners")
svg(
	v-else,
	:class="svgClass",
	aria-hidden="true",
	v-on="$listeners",
	:style="{ width: `${size}px`, height: `${size}px` }")
	use(:xlink:href="iconName")
</template>
<script lang="ts">
import { isExternal } from '../../utils/index'

export default {
	name: 'd-icon',
	props: {
		iconClass: {
			type: String,
		},
		className: {
			type: String,
		},
		size: {
			type: Number,
			default: 20,
		},
	},
	computed: {
		isExternal() {
			return isExternal(this.iconClass)
		},
		iconName() {
			return `#icon-${this.iconClass}`
		},
		svgClass() {
			if (this.className) {
				return 'svg-icon ' + this.className
			} else {
				return 'svg-icon'
			}
		},
		styleExternalIcon() {
			return {
				mask: `url(${this.iconClass}) no-repeat 50% 50%`,
				'-webkit-mask': `url(${this.iconClass}) no-repeat 50% 50%`,
				width: `${this.size}px`,
				height: `${this.size}px`,
			}
		},
	},
}
</script>
<style lang="scss" scoped>
.svg-icon {
	overflow: hidden;
	fill: currentColor;
}

.svg-external-icon {
	display: inline-block;
	background-color: currentColor;
	mask-size: cover !important;
}
</style>
