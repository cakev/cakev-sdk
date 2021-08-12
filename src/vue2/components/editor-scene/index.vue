<template lang="pug">
div
	el-select(v-model="manager.screen.currentScene.id")
		el-option(v-for="item in manager.screen.sceneList", :key="item.id", :label="item.name", :value="item.id")
	div(v-if="manager.screen.sceneWidgetsBySortList.length")
		draggable(v-model="manager.screen.sceneWidgetsBySortList", @change="sceneWidgetDragEnd")
			el-card(
				shadow="hover",
				v-for="item in manager.screen.sceneWidgetsBySortList",
				@click="selectWidgetById(item.id)")
				h2 {{ manager.screen.currentScreen.widgets[item.id].name }}
	el-empty(v-else)
</template>
<script lang="ts">
import Manager from '@/core/Manager'
import { reactive, toRefs } from '@vue/composition-api'
import draggable from 'vuedraggable'
import sceneWidgetDragEnd from './sceneWidgetDragEnd'
import selectWidgetById from './selectWidgetById'

export default {
	components: {
		draggable,
	},
	setup() {
		const manager: Manager = Manager.Instance()
		const state = reactive({ manager })

		return {
			...toRefs(state),
			sceneWidgetDragEnd,
			selectWidgetById,
		}
	},
}
</script>
