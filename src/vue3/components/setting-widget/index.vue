<template lang="pug">
d-titles(:list="list", :left="true", @change="init", @init="init")
component(:is="state.componentId")
</template>
<script lang="ts">
import { ref, shallowRef, defineComponent } from 'vue'
import sBase from './base.vue'
import sData from './data.vue'
import sInteractive from './interactive.vue'

export default defineComponent({
	name: 'setting-widget',
	setup() {
		const list = [
			{ label: '基础', component: sBase },
			{ label: '数据', component: sData },
			{ label: '交互', component: sInteractive },
		]
		const state = shallowRef({ componentId: null })
		const init = index => {
			state.value = { componentId: list[index].component }
		}
		return {
			state,
			list: ref(list),
			init,
		}
	},
})
</script>
