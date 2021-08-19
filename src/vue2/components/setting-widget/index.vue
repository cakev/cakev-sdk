<template lang="pug">
.setting-widget
	d-titles(:list="list", :left="true", @change="init", @init="init")
	component(:is="component")
</template>
<script lang="ts">
import { reactive, toRefs } from '@vue/composition-api'
import Manager from '@/core/Manager'
import base from './base.vue'
import data from './data.vue'
import interactive from './interactive.vue'

export default {
	setup() {
		const manager: Manager = Manager.Instance()
		const list = [
			{ label: '基础', component: base },
			{ label: '数据', component: data },
			{ label: '交互', component: interactive },
		]
		const state = reactive({ manager, list, component: null })
		const init = index => {
			state.component = list[index].component
		}
		return {
			...toRefs(state),
			init,
		}
	},
}
</script>
