<template lang="pug">
d-contextmenu(:style="style", :list="list")
</template>
<script lang="ts">
import { reactive, toRefs, defineComponent } from 'vue'
import style from './style'
import makeGroup from './makeGroup'
import dContextmenu from '@dorring/sdk/vue3/components-style/d-contextmenu/index.vue'

export default defineComponent({
	name: 'contextmenu-widgets',
	components: {
		dContextmenu,
	},
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
