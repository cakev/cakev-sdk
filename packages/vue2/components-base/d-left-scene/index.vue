<template lang="pug">
.d-left-scene.pos-a.fn-flex.flex-column(:style="{ width: `${editor.current.xRoomL2}px` }")
	.d-modal-title 场景区
	header.fn-flex.flex-row
		c-input(
			icon-append="checkmark"
			@icon-append-click="editScene = false"
			v-model="editor.screen.screenScene[editor.currentSceneIndex].name", 
			v-if="editScene")
		c-select(v-model="editor.current.currentSceneIndex", v-if="!editScene", @change="changeSceneIndex")
			c-select-option(:value="0" label="主场景")
			c-select-option(:value="key", v-for="(item, key) in editor.screen.screenScene", :key="key" :label="item.name")
			c-select-option(:value="-1" label="回收站") 
	ul.d-left-scene-list
		draggable(:value="editor.currentSceneWidget", @change="sceneWidgetDragEnd")
			transition-group
				item-card(v-for="lay in editor.currentSceneWidget", :key="lay.widgetId", :lay="lay")
	.d-left-scene-bottom.fn-flex.flex-row
		.d-left-scene-bottom-btn.text-center(@click="handleClear") 清空
		.d-left-scene-bottom-btn.text-center(@click="handleCreate") 新增
		.d-left-scene-bottom-btn.text-center(
			@click="handleEdit",
			:class="{ disabled: editor.currentSceneIndex === 0 || editor.currentSceneIndex === -1 }") 编辑
		.d-left-scene-bottom-btn.text-center(
			@click="handleDestroy",
			:class="{ disabled: editor.currentSceneIndex === 0 || editor.currentSceneIndex === -1}") 删除
</template>
<script lang="ts">
import ItemCard from './item-card.vue'
import draggable from 'vuedraggable'
import Editor from '@/core/Editor'

export default {
	name: 'd-left-scene',
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
		changeSceneIndex(index: string | number): void {
			this.editor.current.selectSceneIndex(index)
		},
		handleEdit(): void {
			this.editScene = true
		},
		handleCreate(): void {
			const index = this.editor.screen.createScene()
			this.editor.current.selectSceneIndex(index)
		},
		handleDestroy(): void {
			this.$Modal.confirm({
				title: '是否删除当前场景？',
				content: '该场景未删除的组件将自动进入回收站！',
				onOk: () => {
					this.editor.clearWidgetByCurrentScene()
					this.editor.screen.destroyScene(this.editor.currentSceneIndex)
					this.editor.current.selectSceneIndex(-1)
				},
			})
		},
		handleClear(): void {
			if (this.editor.currentSceneIndex === -1) {
				this.$Modal.confirm({
					title: '是否清空回收站？',
					content: '回收站的组件将被清空！',
					onOk: () => {
						this.editor.clearWidgetByCurrentScene()
					},
				})
			} else {
				this.$Modal.confirm({
					title: '是否清空当前场景？',
					content: '删除的组件将自动进入回收站！',
					onOk: () => {
						this.editor.clearWidgetByCurrentScene()
					},
				})
			}
		},
		sceneWidgetDragEnd(e): void {
			const oldLay =
				this.editor.screen.screenWidgetsLays[this.editor.currentSceneWidget[e.moved.oldIndex].widgetId]
			const newLay =
				this.editor.screen.screenWidgetsLays[this.editor.currentSceneWidget[e.moved.newIndex].widgetId]
			if (oldLay.zIndex === newLay.zIndex) {
				if (e.moved.newIndex > e.moved.oldIndex) {
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
.d-left-scene-bottom {
	width: 100%;

	.d-left-scene-bottom-btn {
		flex: 1;
		height: 30px;
		line-height: 30px;
		color: #999;
		cursor: pointer;
		border-top: 1px solid #282f3a;

		&.disabled {
			color: rgb(61, 77, 102);
			cursor: no-drop;
		}
	}
}

.d-left-scene-list {
	flex: 1;
	padding: 0 10px;
}

.d-left-scene {
	height: 100%;
	overflow: hidden;
	background-color: #1d2127;
	border-left: 1px solid #000;

	ul {
		overflow-y: auto;
	}
}
</style>
