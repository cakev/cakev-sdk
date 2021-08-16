<template lang="pug">
div
	el-select(v-model="manager.screen.currentScene.id")
		el-option(
			v-for="item in manager.screen.currentScreen.scenes",
			:key="item.id",
			:label="item.name",
			:value="item.id")
	div(v-if="manager.screen.sceneWidgetsBySortList.length")
		draggable(v-model="manager.screen.sceneWidgetsBySortList", @change="sceneWidgetDragEnd")
			transition-group
				.widget-box.cursor-pointer.fn-flex.flex-row(
					:key="item.id"
					v-for="item in manager.screen.sceneWidgetsBySortList",
					:class="{ active: manager.screen.currentWidgets.includes(item.id) }",
					@click="selectWidgetById(item.id)")
					el-image.widget-img(:src="manager.screen.currentScreen.widgets[item.id].avatar")
					span.widget-title {{ manager.screen.currentScreen.widgets[item.id].name }}
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
<style lang="scss" scoped>
.widget-box {
	align-items: center;
	height: 44px;
	transition: all 0.3s;
	&.active {
		background: #409eff;
	}
}
.widget-img {
	height: 30px;
	width: 60px;
}
.widget-title {
	width: 100px;
	text-align: center;
	font-size: 12px;
}
</style>
