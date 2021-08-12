<template lang="pug">
editor
</template>
<script lang="ts">
import { onMounted, reactive, toRefs } from '@vue/composition-api'
import Manager from '@/core/Manager'
import editor from '@/vue2/components/editor/index.vue'

export default {
	components: {
		editor,
	},
	setup() {
		const manager: Manager = Manager.Instance()
		const state = reactive({ manager })

		onMounted(() => {
			window.manager = state.manager
		})

		return {
			...toRefs(state),
		}
	},
}
</script>
