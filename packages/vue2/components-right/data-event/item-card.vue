<template lang="pug">
.d-manage-modal-control
	.fn-flex.flex-column(:style="{ width: '100%', paddingRight: '10px' }")
		c-select(
			:style="{ marginBottom: '10px' }",
			v-model="editor.current.widget.events[eventType][activeIndex].eventClass",
			placeholder="事件类型")
			c-select-option(value="scene") 场景事件
			c-select-option(value="component") 组件事件
		c-select(
			v-if="isComponentClass",
			v-model="editor.current.widget.events[eventType][activeIndex].ids",
			:style="{ marginBottom: '10px' }",
			placeholder="选择组件",
			multiple,
			filterable)
			c-select-option(:value="k", :key="i", v-for="(k, i) in Object.keys(editor.screen.screenWidgets)") {{ editor.screen.screenWidgets[k].config.widget.name }}
		c-select(
			v-if="isComponentClass",
			:style="{ marginBottom: '10px' }",
			v-model="editor.current.widget.events[eventType][activeIndex].triggerType",
			placeholder="事件类型")
			c-select-option(value="config.api.params") 更新请求参数
			c-select-option(value="config.api.data") 更新响应数据
			c-select-option(value="config.config") 更新自定义数据
			template(v-if="isShowCustomEvents")
				c-select-option(:value="m.type", v-for="(m, n) in customEventsConfig", :key="n") {{ m.name }}
		c-control(label="更新加工",)
			template(slot="bottom")
				c-code(
					v-if="isComponentClass",
					v-model="editor.current.widget.events[eventType][activeIndex].processBody",)
			template(slot="right")
				c-switch(v-model="editor.current.widget.events[eventType][activeIndex].processEnable")
		c-select(
			v-if="isSceneClass",
			:style="{ marginBottom: '10px' }",
			v-model="editor.current.widget.events[eventType][activeIndex].id",
			filterable,
			placeholder="目标场景")
			c-select-option(:value="0") 主场景
			c-select-option(:value="key", v-for="(item, key) in editor.sceneObj", :key="key") {{ item.name }}
		c-select(
			v-if="isSceneClass",
			:style="{ marginBottom: '10px' }",
			v-model="editor.current.widget.events[eventType][activeIndex].triggerType",
			placeholder="事件类型")
			c-select-option(value="openScene") 打开场景
			c-select-option(value="closeScene") 关闭场景
			c-select-option(value="changeScene") 切换场景
		c-select(
			v-if="isSceneClass",
			clearable,
			filterable,
			placeholder="场景过度动画",
			v-model="editor.current.widget.events[eventType][activeIndex].animate")
			c-select-option(:value="k", v-for="(k, i) in animates", :key="i") {{ k }}
</template>
<script lang="ts">
import func from '@/vue2/components-func/func.mx'
import { animates } from '@/vue2/components-func/config.js'

export default {
	name: 'func-data',
	mixins: [func],
	props: {
		activeIndex: {},
		eventType: {},
	},
	data() {
		return {
			animates: animates,
		}
	},
	computed: {
		isComponentClass() {
			return this.editor.current.widget.events[this.eventType][this.activeIndex].eventClass === 'component'
		},
		isSceneClass() {
			return this.editor.current.widget.events[this.eventType][this.activeIndex].eventClass === 'scene'
		},
		isShowCustomEvents() {
			const ids = this.editor.current.widget.events[this.eventType][this.activeIndex].ids
			return ids.length === 1
		},
		customEventsConfig() {
			const ids = this.editor.current.widget.events[this.eventType][this.activeIndex].ids
			if (ids.length !== 1) return []
			return this.editor.screen.screenWidgets[ids[0]].customEventsConfig
		},
	},
}
</script>
