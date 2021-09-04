<template lang="pug">
component(:is="$attrs.type", v-bind="$attrs" :style="style({ ...$attrs, ...$props })")
</template>
<script lang="ts">
import style from './style'
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'dorring-widget-normal',
	props: {
		readonly: {
			default: true,
			type: Boolean,
		},
	},
	setup() {
		return { style }
	},
})
</script>
