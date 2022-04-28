<template lang="pug">
transition(name="fade")
	.load-mask.pos-a.fn-flex.z-index-999(
		v-if="show",
		:style="`background-color: ${backgroundColor}; color: ${color}; font-size: ${fontSize}`")
		e-svg.loading(icon-class="loading", :size="iconSize")
		slot {{ text }}
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
class loadMask extends Vue {
	@Prop({ default: 'rgba(0, 0, 0, .4)' }) backgroundColor: string
	@Prop({ default: true }) show: boolean
	@Prop({ default: '#e2e2e2' }) color: string
	@Prop({ default: '24px' }) fontSize: string
	@Prop({ default: 48 }) iconSize: number
	@Prop({ default: '请稍后…' }) text: string
}

export default loadMask
</script>
<style lang="scss">
@keyframes rotate {
	0% {
		transform: rotate(0);
	}

	100% {
		transform: rotate(360deg);
	}
}

.loading {
	animation: rotate infinite 1s;
}

.load-mask {
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
</style>
