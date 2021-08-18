<template lang="pug">
d-contextmenu(:style="style", :list="list")
</template>
<script lang="ts">
import { reactive, toRefs } from '@vue/composition-api'
import style from './style'
import makeGroup from './makeGroup'

export default {
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
}
</script>
