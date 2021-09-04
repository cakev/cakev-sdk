<template lang="pug">
.pos-a(:style="style({ ...$attrs, ...$props })")
	template(v-for="item in $attrs.widgets")
		dorring-widget(
			:key="item.id",
			v-if="!manager.screen.currentScreen.widgets[item.id].hide",
			v-bind="{ ...item, ...manager.screen.currentScreen.widgets[item.id] }")
</template>
<script lang="ts">
import style from './style'
import styleGroup from './styleGroup'
import Manager from '@dorring-sdk/core/Manager'
import { reactive, toRefs, defineComponent } from 'vue'

export default defineComponent({
	name: 'dorring-widget-group',
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
})
</script>
