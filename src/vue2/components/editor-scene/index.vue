<template lang="pug">
.editor-scene.pos-r
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
	font-size: 12px;
	user-select: none;
}

.editor-scene-title {
	margin-right: auto;
	font-weight: bold;
}

.editor-scene-select {
	padding: 4px 0;
	margin-right: auto;

	li {
		align-items: center;
		padding: 0 8px;
		line-height: 32px;

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
	align-items: center;
	justify-content: center;
	width: 32px;
	height: 32px;
	color: #333;
	border-radius: 3px;

	&:hover {
		background-color: rgba(0, 0, 0, 0.06);
	}
}

.editor-scene-header {
	align-items: center;
	padding: 4px 8px;

	i {
		font-size: 16px;
	}
}

.editor-scene-widget-box {
	align-items: center;
	height: 44px;
	padding: 0 10px;
	color: #333;
	border: 1px solid transparent;
	transition: all 0.3s;

	&:hover {
		border-color: #409eff;
	}

	&.active {
		background-color: #daebf7;
		border-color: transparent;
	}
}

.editor-scene-widget-img {
	width: 60px;
	height: 30px;
}

.editor-scene-widget-title {
	flex: 1;
	margin-left: 10px;
	text-align: center;
}
</style>
