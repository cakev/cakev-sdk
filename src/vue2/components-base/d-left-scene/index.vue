<template lang="pug">
.d-left-scene.pos-a.fn-flex.flex-column(:style="{ width: `${editor.xRoomL2}px` }")
	.d-modal-title 场景区
	header.fn-flex.flex-row
		i-input(:value="editor.sceneObj[editor.currentSceneIndex].name", @on-change="handleSceneName", v-if="editScene")
			i-icon(type="md-checkmark", slot="suffix", @click="editScene = false")
		i-select(:value="editor.currentSceneIndex", v-if="!editScene", filterable, @on-change="changeSceneIndex")
			i-option(:value="0") 主场景
			i-option(:value="key", v-for="(item, key) in editor.sceneObj", :key="key") {{ item.name }}
			i-option(:value="-1") 回收站
	ul.d-scrollbar.d-left-scene-list
		draggable(:value="editor.currentSceneWidget", @change="sceneWidgetDragEnd")
			transition-group
				item-card(v-for="item in editor.currentSceneWidget", :key="item.id", :item="item")
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
import { Component, Vue } from 'vue-property-decorator'
import { Icon, Input, Select, Option } from 'view-design'
import ItemCard from './item-card.vue'
import draggable from 'vuedraggable'
import Editor from '@/core/Editor'
import { market } from '@/vue2/api/marketComponentType.api'

@Component({
	components: {
		draggable,
		ItemCard,
		'i-icon': Icon,
		'i-input': Input,
		'i-select': Select,
		'i-option': Option,
	},
})
export default class DLeftScene extends Vue {
	editor: Editor = Editor.Instance()
	editScene = false

	changeSceneIndex(index: string | number): void {
		this.editor.selectSceneIndex(index)
	}
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
	}

	handleSceneName(e): void {
		this.editor.setSceneName(e.target.value)
	}

	sceneWidgetDragEnd(e): void {
		debugger
		const oldItem = this.editor.screen.screenWidgetsLays[this.editor.currentSceneWidget[e.moved.oldIndex].id]
		const newItem = this.editor.screen.screenWidgetsLays[this.editor.currentSceneWidget[e.moved.newIndex].id]
		if (oldItem.zIndex === newItem.zIndex) {
			if (e.moved.newIndex > e.moved.oldIndex) {
				newItem.zIndex++
			} else {
				oldItem.zIndex++
			}
		} else {
			let zIndex = newItem.zIndex
			newItem.zIndex = oldItem.zIndex
			oldItem.zIndex = zIndex
		}
		this.editor.screen.screenWidgetsLays = { ...this.editor.screen.screenWidgetsLays }
	}

	mounted(): void {
		market()
	}
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
	padding-left: 8px;
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
