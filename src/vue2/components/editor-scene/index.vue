<template lang="pug">
el-select(v-model="manager.screen.currentScene.id")
	el-option(v-for="item in manager.screen.sceneList", :key="item.id", :label="item.name", :value="item.id")
</template>
<script lang="ts">
import Manager from '@/core/Manager'
import { reactive, toRefs } from '@vue/composition-api'

export default {
	setup() {
		const manager: Manager = Manager.Instance()
		const state = reactive({ manager })

		return {
			...toRefs(state),
		}
	},
}
</script>
