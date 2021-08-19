<template lang="pug">
.pos-a(:style="style({ ...$attrs, ...$props })")
	.pos-a(:style="styleGroup($attrs)")
		dorring-widget(
			v-bind="{ ...item, ...manager.screen.currentScreen.widgets[item.id] }",
			v-for="item in $attrs.children")
</template>
<script lang="ts">
import style from './style'
import styleGroup from './styleGroup'
import Manager from '@/core/Manager'
import { reactive, toRefs } from '@vue/composition-api'
export default {
	props: {
		readonly: {
			default: true,
			type: Boolean,
		},
	},
	setup() {
		const manager: Manager = Manager.Instance()
		const state = reactive({ manager })
		return {
			...toRefs(state),
			style,
			styleGroup,
		}
	},
}
</script>
