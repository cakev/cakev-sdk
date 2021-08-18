<template lang="pug">
.editor-scene.pos-r(@contextmenu.prevent)
	.editor-scene-header.fn-flex.flex-row
		.editor-scene-title 场景
		.editor-scene-add.fn-flex.cursor-pointer(@click="createScene")
			i.el-icon-plus
	scene-contextmenu(v-if="manager.temporary.sceneRightMenu", :editableScene="editableScene")
	d-drag-content(style="height: calc(100% - 40px)")
		template(slot="top")
			ul.editor-scene-select
				li.fn-flex.pos-r.cursor-nomral(
					@click="selectSceneById(item.id)",
					@dblclick="editableScene(item.id)",
					@contextmenu.stop.prevent="contextmenu($event, item.id)",
					v-click-outside="clickOutSide",
					v-for="(item, index) in Object.values(manager.screen.currentScreen.scenes)",
					:key="item.id",
					:class="{ active: manager.screen.currentScene.id === item.id }")
					template
						i.el-icon-check.pos-a(v-if="manager.screen.currentScene.id === item.id")
						el-input(:ref="item.id", v-model="item.name", v-show="editScene[item.id]", @blur="blurScene(item.id)")
						span(v-show="!editScene[item.id]") {{ item.name }}
		template(slot="bottom")
			div(v-if="manager.screen.sceneWidgetsBySortList.length")
				draggable(v-model="manager.screen.sceneWidgetsBySortList", @change="sceneWidgetDragEnd")
					transition-group
						.editor-scene-widget-box.cursor-nomral.fn-flex.flex-row.pos-r(
							:key="item.id",
							v-for="item in manager.screen.sceneWidgetsBySortList",
							:class="{ active: manager.screen.currentWidgets.includes(item.id) }",
							@click="selectWidgetById($event,item.id)")
							d-img.editor-scene-widget-img(:src="manager.screen.currentScreen.widgets[item.id].avatar")
							span.editor-scene-widget-title.ellipsis {{ manager.screen.currentScreen.widgets[item.id].name }}
			el-empty(v-else)
</template>
<script lang="ts">
import Manager from '@/core/Manager'
import { reactive, toRefs } from '@vue/composition-api'
import draggable from 'vuedraggable'
import sceneContextmenu from '@/vue2/components/scene-contextmenu/index.vue'
import sceneWidgetDragEnd from './sceneWidgetDragEnd'
import selectWidgetById from './selectWidgetById'
import createScene from './createScene'
import selectSceneById from './selectSceneById'
import clickOutSide from './clickOutSide'

export default {
	components: {
		draggable,
		sceneContextmenu,
	},
	// @ts-ignore
	setup(props, context) {
		const manager: Manager = Manager.Instance()
		const state = reactive({ editScene: {}, manager })
		const contextmenu = (e: MouseEvent, id) => {
			if (!state.editScene[id]) {
				selectSceneById(id)
				manager.temporary.sceneRightMenu = true
				manager.temporary.sceneRightMenuX = e.clientX
				manager.temporary.sceneRightMenuY = e.clientY
			}
		}
		const editableScene = id => {
			state.editScene[id] = true
			state.editScene = { ...state.editScene }
			context.refs[id][0].focus()
			setTimeout(() => {
				context.refs[id][0].select()
			})
		}
		const blurScene = id => {
			if (manager.screen.currentScene.name.replace(/[\r\n]/g, '') === '') {
				manager.screen.currentScene.name = '未命名场景'
				context.refs[id][0].focus()
				setTimeout(() => {
					context.refs[id][0].select()
				})
			} else {
				state.editScene[id] = false
			}
		}

		return {
			...toRefs(state),
			sceneWidgetDragEnd,
			selectWidgetById,
			createScene,
			selectSceneById,
			editableScene,
			blurScene,
			contextmenu,
			clickOutSide,
		}
	},
}
</script>
<style lang="scss" scoped>
.editor-scene {
	height: 100%;
	user-select: none;
	font-size: 12px;
}
.editor-scene-title {
	margin-right: auto;
	font-weight: bold;
}
.editor-scene-select {
	margin-right: auto;
	padding: 4px 0;

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
		}
		.el-input,
		span {
			padding-left: 24px;
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
	i {
		font-size: 16px;
	}
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
	margin-left: 10px;
	flex: 1;
}
</style>
