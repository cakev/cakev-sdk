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
import { Vue, Component, Prop } from 'vue-property-decorator'
import { isExternal } from '../../utils/index'

@Component
export default class dIcon extends Vue {
	@Prop(String) iconClass
	@Prop(String) className
	@Prop({ default: 20 }) size

	get isExternal() {
		return isExternal(this.iconClass)
	}

	get iconName() {
		return `#icon-${this.iconClass}`
	}

	get svgClass() {
		if (this.className) {
			return 'svg-icon ' + this.className
		} else {
			return 'svg-icon'
		}
	}

	get styleExternalIcon() {
		return {
			mask: `url(${this.iconClass}) no-repeat 50% 50%`,
			'-webkit-mask': `url(${this.iconClass}) no-repeat 50% 50%`,
			width: `${this.size}px`,
			height: `${this.size}px`,
		}
	}
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
