<template lang="pug">
.editor-content.pos-r(@drop="drop", @dragover.prevent)
	widget(v-for="widget in manager.screen.currentScreen.widgets", :key="widget.id", v-bind="widget")
</template>
<script lang="ts">
import drop from './drop'
import Manager from '@/core/Manager'
import { reactive, toRefs } from '@vue/composition-api'
import widget from '@/vue2/components/widget/index.vue'

export default {
	components: {
		widget,
	},
	setup() {
		const manager: Manager = Manager.Instance()
		const state = reactive({ manager })

		return {
			...toRefs(state),
			drop,
		}
	},
}
</script>
<style lang="scss" scoped>
.editor-content {
	height: 100%
}
</style>
