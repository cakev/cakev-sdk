<template lang="pug">
.editor-scene.pos-r
	d-titles(:list="[{ label: '场景' }]", :left="true")
		d-icon.ml-auto(type="el-icon-plus", @click="createScene")
	contextmenu-scene(v-if="manager.temporary.sceneRightMenu", :editableScene="editableScene")
	d-drag-content(style="height: calc(100% - 40px)")
		template(#top)
			ul.editor-scene-select(v-clickoutside="clickOutSide",)
				li.fn-flex.pos-r.cursor-nomral(
					@click="selectSceneById(item.id)",
					@dblclick="editableScene(item.id)",
					@contextmenu.stop.prevent="contextmenu($event, item.id)",
					v-for="(item) in manager.screen.currentScreen.scenes",
					:key="item.id",
					:class="{ active: manager.screen.currentScene.id === item.id }")
					d-svg.pos-a(type="el-icon-check", v-if="manager.screen.currentScene.id === item.id")
					el-input(:ref="el=>dom[item.id]=el", v-model="item.name", v-if="editScene[item.id]", @blur="blurScene(item.id)")
					span(v-show="!editScene[item.id]") {{ item.name }}
		template(#bottom)
			div(v-if="manager.screen.sceneWidgetsBySortList.length")
				draggable(v-model="manager.screen.sceneWidgetsBySortList", :animation="300", @change="sceneWidgetDragEnd" item-key="id")
					template(#item="{element,index}")
						dorring-widget-layer(
							v-bind="{ ...element, ...manager.screen.currentScreen.widgets[element.id] }",
							:index="index",)
			el-empty(v-else)
</template>
<script lang="ts">
import Manager from '@dorring/sdk/core/Manager'
import { reactive, toRefs, defineComponent } from 'vue'
import draggable from 'vuedraggable'
import contextmenuScene from '@dorring/sdk/vue3/components/contextmenu-scene/index.vue'
import { ClickOutside } from '@dorring/sdk/vue3/directives'
import sceneWidgetDragEnd from './sceneWidgetDragEnd'
import createScene from './createScene'
import selectSceneById from './selectSceneById'
import clickOutSide from './clickOutSide'
import editableScene from './editableScene'
import blurScene from './blurScene'
import contextmenu from './contextmenu'
import dSvg from '@dorring/sdk/vue3/components-style/d-svg/index.vue'
import dIcon from '@dorring/sdk/vue3/components-style/d-icon/index.vue'
import dDragContent from '@dorring/sdk/vue3/components-style/d-drag-content/index.vue'
import dTitles from '@dorring/sdk/vue3/components-style/d-titles/index.vue'

export default defineComponent({
	name: 'editor-scene',
	components: {
		draggable,
		contextmenuScene,
		dSvg,
		dIcon,
		dDragContent,
		dTitles,
	},
	directives: {
		clickoutside: ClickOutside,
	},
	setup() {
		const manager: Manager = Manager.Instance()
		const state = reactive({ dom: {}, editScene: {}, manager })

		return {
			...toRefs(state),
			sceneWidgetDragEnd,
			createScene,
			selectSceneById,
			editableScene: id => editableScene(id, state),
			blurScene: id => blurScene(id, state),
			contextmenu: (e, id) => contextmenu(e, id, state),
			clickOutSide,
		}
	},
})
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
		.el-input {
			height: 32px;
			line-height: 32px;
		}
		.el-input,
		span {
			padding-left: 24px;
		}
	}
}
</style>
