<template lang="pug">
.d-manage-modal-control-data
	c-collapse(
		type="eye"
		label="入场动画",
		:value="true",
		@open-click="editor.current.widget.widgetAnimation.transitionEnable = true",
		@close-click="editor.current.widget.widgetAnimation.transitionEnable = false",
		:enable="editor.current.widget.widgetAnimation.transitionEnable")
		c-control(label="动画形式")
			template(slot="right")
				c-select(v-model="editor.current.widget.widgetAnimation.enter")
					c-select-option(:value="k.value", v-for="k in editor.config.animations", :key="k.value" :label="k.label")
		c-control(label="延时时长")
			template(slot="right")
				c-input(append="ms", v-model="editor.current.widget.widgetAnimation.delay")
		c-control(label="动画时长")
			template(slot="right")
				c-input(append="ms", v-model="editor.current.widget.widgetAnimation.duration")
	data-event
</template>
<script lang="ts">
import DataEvent from '@/vue2/components-right/data-event/index.vue'
import Editor from '@/core/Editor'

export default {
	components: {
		DataEvent,
	},
	data() {
		return {
			editor: Editor.Instance() as Editor,
		}
	},
}
</script>
