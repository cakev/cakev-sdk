<template lang="pug">
	i-switch.d-switch(:size="size", v-bind="{ ...$props, ...$attrs }", v-on="$listeners", v-model="currentVal")
</template>
<script>
import { Switch } from 'view-design'

export default {
	name: 'd-input',
	components: {
		'i-switch': Switch,
	},
	props: {
		value: {},
		size: {
			default: 'small',
		},
	},
	data() {
		return {
			currentVal: this.value,
		}
	},
	watch: {
		value: val => {
			this.currentVal = val
		},
		currentVal: val => {
			this.$emit('input', val)
		},
	},
}
</script>
<style lang="scss" scoped>
.d-switch {
	&::v-deep {
		&.ivu-switch-checked {
			background-color: var(--primary-color);
			border-color: var(--primary-color);
		}
	}
}
</style>
