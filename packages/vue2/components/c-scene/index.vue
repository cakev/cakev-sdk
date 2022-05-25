<template lang="pug">
.c-scene.pos-a.fn-flex.flex-column(:style="{ width: `${editor.current.xRoomL2}px` }")
	c-tabs(:value="1" :style="{height:'100%'}")
		c-tab-pane(label="场景区" :value="1")
			header.fn-flex.flex-row
				c-input(
					icon-append="checkmark"
					@icon-append-click="editScene = false"
					v-model="editor.screen.screenScene[editor.currentSceneIndex].name", 
					v-if="editScene")
				c-select(v-model="editor.current.currentSceneIndex", v-if="!editScene" :border="false")
					c-select-option(:value="0" label="主场景")
					c-select-option(:value="key", v-for="(item, key) in editor.screen.screenScene", :key="key" :label="item.name")
					c-select-option(:value="-1" label="回收站") 
			ul.c-scene-list
				draggable(:value="editor.currentSceneWidget", @change="sceneWidgetDragEnd")
					transition-group
						item-card(v-for="lay in editor.currentSceneWidget", :key="lay.widgetId", :lay="lay")
			.c-scene-bottom.pos-a.fn-flex.flex-row
				.c-scene-bottom-btn.text-center(@click="handleClear") 清空
				.c-scene-bottom-btn.text-center(@click="handleCreate") 新增
				.c-scene-bottom-btn.text-center(
					@click="handleEdit",
					:class="{ disabled: editor.currentSceneIndex === 0 || editor.currentSceneIndex === -1 }") 编辑
				.c-scene-bottom-btn.text-center(
					@click="handleDestroy",
					:class="{ disabled: editor.currentSceneIndex === 0 || editor.currentSceneIndex === -1}") 删除
</template>
<script lang="ts">
import ItemCard from './item-card.vue'
import draggable from 'vuedraggable'
import Editor from '@/core/Editor'
import { CModal } from '@cakev/ui'

export default {
	name: 'c-scene',
	components: {
		draggable,
		ItemCard,
	},
	data() {
		return {
			editor: Editor.Instance() as Editor,
			editScene: false,
		}
	},
	methods: {
		handleEdit(): void {
			this.editScene = true
		},
		handleCreate(): void {
			const index = this.editor.screen.createScene()
			this.editor.current.selectSceneIndex(index)
		},
		handleDestroy(): void {
			CModal.confirm({
				title: '是否删除当前场景？',
				content: '该场景未删除的组件将自动进入回收站！',
				onOk: () => {
					this.editor.screen.destroySceneWidgets(this.editor.currentSceneIndex)
					this.editor.screen.destroyScene(this.editor.currentSceneIndex)
					this.editor.current.selectSceneIndex(-1)
					this.editor.current.unSelectWidget()
				},
			})
		},
		handleClear(): void {
			const title = this.editor.currentSceneIndex === -1 ? '是否清空当前场景？' : '是否清空回收站？'
			const content =
				this.editor.currentSceneIndex === -1 ? '删除的组件将自动进入回收站！' : '回收站的组件将被清空！'
			CModal.confirm({
				title,
				content,
				onOk: () => {
					this.editor.screen.destroySceneWidgets(this.editor.currentSceneIndex)
					this.editor.current.unSelectWidget()
				},
			})
		},
		sceneWidgetDragEnd(e): void {
			const oldLay =
				this.editor.screen.screenWidgetsLays[this.editor.currentSceneWidget[e['moved']['oldIndex']]['widgetId']]
			const newLay =
				this.editor.screen.screenWidgetsLays[this.editor.currentSceneWidget[e['moved']['newIndex']]['widgetId']]
			if (oldLay.zIndex === newLay.zIndex) {
				if (e['moved']['newIndex'] > e['moved']['oldIndex']) {
					newLay.zIndex++
				} else {
					oldLay.zIndex++
				}
			} else {
				let zIndex = newLay.zIndex
				newLay.zIndex = oldLay.zIndex
				oldLay.zIndex = zIndex
			}
			this.editor.screen.screenWidgetsLays = { ...this.editor.screen.screenWidgetsLays }
		},
	},
}
</script>
<style lang="scss" scoped>
.c-scene-bottom {
	width: 100%;
	bottom: 0;
	background-color: var(--middleBgColor);
	.c-scene-bottom-btn {
		flex: 1;
		height: 32px;
		line-height: 32px;
		cursor: pointer;

		&.disabled {
			color: var(--panelDisabeldFontColor);
			cursor: no-drop;
		}
	}
}

.c-scene-list {
	flex: 1;
	padding: 0 10px;
}

.c-scene {
	height: 100%;
	overflow: hidden;
	background-color: var(--panelBgColor);
	font-size: var(--panelFontSize);
	color: var(--panelFontColor);
	ul {
		overflow-y: auto;
	}
}
</style>
