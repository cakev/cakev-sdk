<template lang="pug">
el-form.setting-widget-form(label-width="80px", label-position="left")
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import Manager from '@/core/Manager'
import currentWidget from './currentWidget'

export default defineComponent({
	name: 'setting-widget-data',
	setup() {
		const manager: Manager = Manager.Instance()
		const state = reactive({ manager })

		return {
			...toRefs(state),
			currentWidget,
		}
	},
})
</script>
