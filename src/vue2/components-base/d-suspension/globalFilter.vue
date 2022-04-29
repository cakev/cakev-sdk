<template lang="pug">
d-drawer(title="全局滤镜", v-model="currentVal")
	c-row
		c-label 状态
		d-switch(v-model="editor.screen.screenFilter.enable")
	c-row
		c-label 色相
		d-slider(type="hue-rotate" v-model="editor.screen.screenFilter.hueRotate", :min="-180" :max="180")
	c-row
		c-label 饱和度
		d-slider(type="saturate" v-model="editor.screen.screenFilter.saturate", :min="-100")
	c-row
		c-label 明度
		d-slider(type="brightness" v-model="editor.screen.screenFilter.brightness", :min="-100")
	c-row
		c-label 对比度
		d-slider(v-model="editor.screen.screenFilter.contrast", :min="-100")
	c-row
		c-label 不透明度
		d-slider(type="opacity" v-model="editor.screen.screenFilter.opacity")
	c-row
		c-label 灰度
		d-slider(v-model="editor.screen.screenFilter.grayscale")
</template>
<script lang="ts">
import { Switch } from 'view-design'
import Editor from '@/core/Editor'
import DDrawer from '@/vue2/components-style/d-drawer/index.vue'
import DSlider from '@/vue2/components-style/d-slider/index.vue'
import DSwitch from '@/vue2/components-style/d-switch/index.vue'

export default {
	name: 'global-filter',
	components: {
		DDrawer,
		DSlider,
		DSwitch,
		'i-switch': Switch,
	},
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
