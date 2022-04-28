<template lang="pug">
d-drawer(title="全局滤镜", v-model="currentVal")
	e-form-item(align="")
		e-label(value="状态")
		d-switch(v-model="editor.screen.screenFilter.enable")
	e-form-item
		e-label(value="色相")
		d-slider(type="hue-rotate" v-model="editor.screen.screenFilter.hueRotate", :min="-180" :max="180")
	e-form-item
		e-label(value="饱和度")
		d-slider(type="saturate" v-model="editor.screen.screenFilter.saturate", :min="-100")
	e-form-item
		e-label(value="明度")
		d-slider(type="brightness" v-model="editor.screen.screenFilter.brightness", :min="-100")
	e-form-item
		e-label(value="对比度")
		d-slider(v-model="editor.screen.screenFilter.contrast", :min="-100")
	e-form-item
		e-label(value="不透明度")
		d-slider(type="opacity" v-model="editor.screen.screenFilter.opacity")
	e-form-item
		e-label(value="灰度")
		d-slider(v-model="editor.screen.screenFilter.grayscale")
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { Switch } from 'view-design'
import eLabel from '@/vue2/components-style/e-label/index.vue'
import Editor from '@/core/Editor'
import DDrawer from '@/vue2/components-style/d-drawer/index.vue'
import DSlider from '@/vue2/components-style/d-slider/index.vue'
import DSwitch from '@/vue2/components-style/d-switch/index.vue'
import EFormItem from '@/vue2/components-style/e-form-item/index.vue'

@Component({
	components: {
		eLabel,
		DDrawer,
		EFormItem,
		DSlider,
		DSwitch,
		'i-switch': Switch,
	},
})
export default class globalFilter extends Vue {
	@Prop(Boolean) value!: boolean
	currentVal = false
	editor: Editor = Editor.Instance()
	@Watch('value')
	onValueChange(val: boolean): void {
		this.currentVal = val
	}

	@Watch('currentVal')
	onCurrentVal(val: boolean): void {
		this.$emit('input', val)
	}
}
</script>
