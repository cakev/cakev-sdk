<template lang="pug">
.editor-scene
	.editor-scene-header.fn-flex.flex-row
		.editor-scene-title 场景
		.editor-scene-add.fn-flex.cursor-pointer
			i.el-icon-plus
	ul.editor-scene-select
		li.fn-flex.pos-r.cursor-nomral(
			v-for="item in manager.screen.currentScreen.scenes",
			:key="item.id",
			:class="{ active: manager.screen.currentScene.id === item.id }")
			i.el-icon-check.pos-a(v-if="manager.screen.currentScene.id === item.id")
			span {{ item.name }}
	div(v-if="manager.screen.sceneWidgetsBySortList.length")
		draggable(v-model="manager.screen.sceneWidgetsBySortList", @change="sceneWidgetDragEnd")
			transition-group
				.editor-scene-widget-box.cursor-nomral.fn-flex.flex-row.pos-r(
					:key="item.id",
					v-for="item in manager.screen.sceneWidgetsBySortList",
					:class="{ active: manager.screen.currentWidgets.includes(item.id) }",
					@click="selectWidgetById(item.id)")
					d-img.editor-scene-widget-img(:src="manager.screen.currentScreen.widgets[item.id].avatar")
					span.editor-scene-widget-title.ellipsis {{ manager.screen.currentScreen.widgets[item.id].name }}
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
.editor-scene-title {
	margin-right: auto;
}
.editor-scene-select {
	margin-right: auto;
	padding: 4px 0;
	border-bottom: 1px solid #e5e5e5;

	li {
		align-items: center;
		line-height: 32px;
		padding: 0 8px;
		&:hover {
			background-color: rgba(0, 0, 0, 0.06);
		}
		&.active {
			font-weight: bold;
		}
		i {
			font-weight: bold;
			font-size: 12px;
		}
		span {
			padding-left: 24px;
			font-size: 14px;
		}
	}
}
.editor-scene-add {
	color: #333;
	border-radius: 3px;
	width: 32px;
	height: 32px;
	align-items: center;
	justify-content: center;
	&:hover {
		background-color: rgba(0, 0, 0, 0.06);
	}
}
.editor-scene-header {
	padding: 4px 8px;
	align-items: center;
}
.editor-scene-widget-box {
	align-items: center;
	height: 44px;
	transition: all 0.3s;
	padding: 0 10px;
	color: #333;
	border: 1px solid transparent;
	&:hover {
		border-color: #409eff;
	}
	&.active {
		border-color: transparent;
		background-color: #daebf7;
	}
}
.editor-scene-widget-img {
	height: 30px;
	width: 60px;
}
.editor-scene-widget-title {
	text-align: center;
	font-size: 12px;
	margin-left: 10px;
	flex: 1;
}
</style>
