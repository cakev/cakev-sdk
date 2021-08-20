<template lang="pug">
.pos-a(:style="style({ ...$attrs, ...$props })")
	.pos-a(:style="styleGroup($attrs)")
		template(v-for="item in $attrs.children")
			dorring-widget(
				:key="item.id",
				v-if="!manager.screen.currentScreen.widgets[item.id].hide",
				v-bind="{ ...item, ...manager.screen.currentScreen.widgets[item.id] }")
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
