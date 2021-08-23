<template lang="pug">
editor
</template>
<script lang="ts">
import { reactive, toRefs, defineComponent, onMounted } from 'vue'
import Manager from '@/core/Manager'
import editor from '@/vue3/components/editor/index.vue'

export default defineComponent({
	components: {
		editor,
	},
	setup() {
		const manager: Manager = Manager.Instance()
		const state = reactive({ manager })

		onMounted(() => {
			window.dorring = state.manager
		})

		return {
			...toRefs(state),
		}
	},
})
</script>
