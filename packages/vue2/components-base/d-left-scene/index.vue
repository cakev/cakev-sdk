<template lang="pug">
.d-left-scene.pos-a.fn-flex.flex-column(:style="{ width: `${editor.xRoomL2}px` }")
	.d-modal-title 场景区
	header.fn-flex.flex-row
		c-input(
			icon-append="checkmark"
			@icon-append-click="editScene = false"
			:value="editor.sceneObj[editor.currentSceneIndex].name", 
			@on-change="handleSceneName", v-if="editScene")
		i-select(:value="editor.currentSceneIndex", v-if="!editScene", filterable, @on-change="changeSceneIndex")
			i-option(:value="0") 主场景
			i-option(:value="key", v-for="(item, key) in editor.sceneObj", :key="key") {{ item.name }}
			i-option(:value="-1") 回收站
	ul.d-scrollbar.d-left-scene-list
		draggable(:value="editor.currentSceneWidget", @change="sceneWidgetDragEnd")
			transition-group
				item-card(v-for="lay in editor.currentSceneWidget", :key="lay.widgetId", :lay="lay")
	.d-left-scene-bottom.fn-flex.flex-row
		.d-left-scene-bottom-btn.text-center(@click="handleSetScene('clear')") 清空
		.d-left-scene-bottom-btn.text-center(@click="handleSetScene('create')") 新增
		.d-left-scene-bottom-btn.text-center(
			@click="handleSetScene('edit')",
			:class="{ disabled: editor.currentSceneIndex === 0 }") 编辑
		.d-left-scene-bottom-btn.text-center(
			@click="handleSetScene('destroy')",
			:class="{ disabled: editor.currentSceneIndex === 0 }") 删除
</template>
<script lang="ts">
import { Select, Option } from 'view-design'
import ItemCard from './item-card.vue'
import draggable from 'vuedraggable'
import Editor from '@/core/Editor'

export default {
	name: 'd-left-scene',
	components: {
		draggable,
		ItemCard,
		'i-select': Select,
		'i-option': Option,
	},
	data() {
		return {
			editor: Editor.Instance() as Editor,
			editScene: false,
		}
	},
	methods: {
		changeSceneIndex(index: string | number): void {
			this.editor.selectSceneIndex(index)
		},
		handleSetScene(name: string): void {
			switch (name) {
				case 'create':
					this.editor.createScene()
					break
				case 'edit':
					this.editScene = true
					break
				case 'destroy':
					this.$Modal.confirm({
						title: '是否删除当前场景？',
						content: '该场景未删除的组件将自动进入回收站！',
						onOk: () => {
							this.editor.destroyScene()
						},
					})
					break
				case 'clear':
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
					break
			}
		},
		handleSceneName(e): void {
			this.editor.setSceneName(e.target.value)
		},
		sceneWidgetDragEnd(e): void {
			const oldLay = this.editor.screen.screenWidgetsLays[this.editor.currentSceneWidget[e.moved.oldIndex].widgetId]
			const newLay = this.editor.screen.screenWidgetsLays[this.editor.currentSceneWidget[e.moved.newIndex].widgetId]
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
