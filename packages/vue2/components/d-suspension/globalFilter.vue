<template lang="pug">
c-drawer(title="全局滤镜", v-model="currentVal")
	c-row
		c-label 状态
		c-switch(v-model="editor.screen.screenFilter.enable")
	c-slider(label="色相" type="hue-rotate" v-model="editor.screen.screenFilter.hueRotate", :min="-180" :max="180")
	c-slider(label="饱和度" type="saturate" v-model="editor.screen.screenFilter.saturate", :min="-100")
	c-slider(label="明度" type="brightness" v-model="editor.screen.screenFilter.brightness", :min="-100")
	c-slider(label="对比度" v-model="editor.screen.screenFilter.contrast", :min="-100")
	c-slider(label="不透明度" type="opacity" v-model="editor.screen.screenFilter.opacity")
	c-slider(label="灰度" v-model="editor.screen.screenFilter.grayscale")
</template>
<script lang="ts">
import Editor from '@/core/Editor'

export default {
	name: 'global-filter',
	props: {
		value: {
			type: Boolean,
		},
	},
	data() {
		return {
			currentVal: false,
			editor: Editor.Instance(),
		}
	},
	watch: {
		value(val: boolean) {
			this.currentVal = val
		},
		currentVal(val: boolean) {
			this.$emit('input', val)
		},
	},
}
</script>
