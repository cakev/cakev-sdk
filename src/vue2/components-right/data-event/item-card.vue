<template lang="pug">
.d-manage-modal-control
	.fn-flex.flex-column(:style="{ width: '100%', paddingRight: '10px' }")
		i-select(
			:style="{ marginBottom: '10px' }",
			v-model="editor.currentWidget.events[eventType][activeIndex].eventClass",
			placeholder="事件类型")
			i-option(value="scene") 场景事件
			i-option(value="component") 组件事件
		i-select(
			v-if="isComponentClass",
			v-model="editor.currentWidget.events[eventType][activeIndex].ids",
			:style="{ marginBottom: '10px' }",
			placeholder="选择组件",
			multiple,
			filterable)
			i-option(:value="k", :key="i", v-for="(k, i) in Object.keys(editor.screen.screenWidgets)") {{ editor.screen.screenWidgets[k].config.widget.name }}
		i-select(
			v-if="isComponentClass",
			:style="{ marginBottom: '10px' }",
			v-model="editor.currentWidget.events[eventType][activeIndex].triggerType",
			placeholder="事件类型")
			i-option(value="config.api.params") 更新请求参数
			i-option(value="config.api.data") 更新响应数据
			i-option(value="config.config") 更新自定义数据
			template(v-if="isShowCustomEvents")
				i-option(:value="m.type", v-for="(m, n) in customEventsConfig", :key="n") {{ m.name }}
		d-code(
			v-if="isComponentClass",
			label="更新加工",
			:code="editor.currentWidget.events[eventType][activeIndex].process.methodBody",
			:show="editor.currentWidget.events[eventType][activeIndex].process.enable",
			@update:code="value => (editor.currentWidget.events[eventType][activeIndex].process.methodBody = value)")
			template(slot="right")
				i-switch(v-model="editor.currentWidget.events[eventType][activeIndex].process.enable")
		i-select(
			v-if="isSceneClass",
			:style="{ marginBottom: '10px' }",
			v-model="editor.currentWidget.events[eventType][activeIndex].id",
			filterable,
			placeholder="目标场景")
			i-option(:value="0") 主场景
			i-option(:value="key", v-for="(item, key) in editor.sceneObj", :key="key") {{ item.name }}
		i-select(
			v-if="isSceneClass",
			:style="{ marginBottom: '10px' }",
			v-model="editor.currentWidget.events[eventType][activeIndex].triggerType",
			placeholder="事件类型")
			i-option(value="openScene") 打开场景
			i-option(value="closeScene") 关闭场景
			i-option(value="changeScene") 切换场景
		i-select(
			v-if="isSceneClass",
			clearable,
			filterable,
			placeholder="场景过度动画",
			v-model="editor.currentWidget.events[eventType][activeIndex].animate")
			i-option(:value="k", v-for="(k, i) in animates", :key="i") {{ k }}
</template>
<script lang="ts">
import { Component, Prop } from 'vue-property-decorator'
import func from '@/vue2/components-func/func.mx'
import dCode from '@/vue2/components-right/d-code/index.vue'
import { animates } from '@/vue2/components-func/config.js'

@Component({ components: { dCode } })
export default class FuncData extends func {
	@Prop() activeIndex
	@Prop() eventType
	animates = animates

	get isComponentClass(): boolean {
		return this.editor.currentWidget.events[this.eventType][this.activeIndex].eventClass === 'component'
	}

	get isSceneClass(): boolean {
		return this.editor.currentWidget.events[this.eventType][this.activeIndex].eventClass === 'scene'
	}

	get isShowCustomEvents() {
		const ids = this.editor.currentWidget.events[this.eventType][this.activeIndex].ids
		return ids.length === 1
	}

	get customEventsConfig() {
		const ids = this.editor.currentWidget.events[this.eventType][this.activeIndex].ids
		if (ids.length !== 1) return []
		return this.editor.screen.screenWidgets[ids[0]].customEventsConfig
	}
}
</script>
