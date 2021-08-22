<template lang="pug">
d-contextmenu(:style="style", :list="list")
</template>
<script lang="ts">
import { reactive, toRefs, defineComponent } from 'vue'
import style from './style'
import makeGroup from './makeGroup'

export default defineComponent({
	name: 'contextmenu-widgets',
	setup() {
		const list = [
			{
				label: '拼合',
				handler: makeGroup,
			},
		]
		const state = reactive({ list })
		return {
			...toRefs(state),
			style,
			makeGroup,
		}
	},
})
</script>
