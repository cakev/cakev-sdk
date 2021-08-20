<template lang="pug">
.editor-scene.pos-r
	d-titles(:list="[{ label: '场景' }]", :left="true")
		.editor-scene-add.fn-flex.cursor-pointer(@click="createScene")
			d-svg(type="el-icon-plus", :size="16")
	contextmenu-scene(v-if="manager.temporary.sceneRightMenu", :editableScene="editableScene")
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
						d-svg.pos-a(type="el-icon-check", v-if="manager.screen.currentScene.id === item.id")
						el-input(:ref="item.id", v-model="item.name", v-show="editScene[item.id]", @blur="blurScene(item.id)")
						span(v-show="!editScene[item.id]") {{ item.name }}
		template(slot="bottom")
			div(v-if="manager.screen.sceneWidgetsBySortList.length")
				draggable(v-model="manager.screen.sceneWidgetsBySortList", :animation="300", @change="sceneWidgetDragEnd")
					dorring-widget-layer(
						v-bind="item",
						:key="item.id",
						:index="index",
						v-for="(item, index) in manager.screen.sceneWidgetsBySortList")
			el-empty(v-else)
</template>
<script lang="ts">
import Manager from '@/core/Manager'
import { reactive, toRefs } from '@vue/composition-api'
import draggable from 'vuedraggable'
import contextmenuScene from '@/vue2/components/contextmenu-scene/index.vue'
import sceneWidgetDragEnd from './sceneWidgetDragEnd'
import createScene from './createScene'
import selectSceneById from './selectSceneById'
import clickOutSide from './clickOutSide'

export default {
	components: {
		draggable,
		contextmenuScene,
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
.editor-scene-select {
	padding: 4px 0;
	margin-right: auto;

	li {
		align-items: center;
		padding: 0 16px;
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
	margin-left: auto;
	color: #333;
	border-radius: 3px;

	&:hover {
		background-color: rgba(0, 0, 0, 0.06);
	}
}
</style>
