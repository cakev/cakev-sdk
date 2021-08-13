<template lang="pug">
component.pos-a(:id="$attrs.id", :is="$attrs.type", v-bind="{ ...$attrs }", :style="style({ ...$attrs, ...$props })")
</template>
<script lang="ts">
import style from './style'
export default {
	components: { vdr },
	props: {
		readonly: {
			default: true,
			type: Boolean,
		},
	},
	setup() {
		return { style }
	},
}
</script>
<style lang="scss" scoped></style>
