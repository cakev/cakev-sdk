<template lang="pug">
d-titles(:list="list", :left="true", @change="init", @init="init")
component(:is="state.componentId")
</template>
<script lang="ts">
import { defineComponent, shallowRef, ref } from 'vue'
import sSetting from './setting.vue'
import sWidget from './widget.vue'

export default defineComponent({
	name: 'setting-editor',
	setup() {
		const list = [
			{ label: '设计', component: sSetting },
			{ label: '组件', component: sWidget },
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
