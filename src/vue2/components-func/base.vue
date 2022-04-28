<template lang="pug">
.d-manage-modal-control-base
	d-right-swiper(title="基础属性", :show="true")
		d-right-control(label="位置")
			d-input(
				append="X",
				v-model="editor.currentWidget.config.layout.position.left",
				:style="{ width: '100px', marginRight: '10px' }")
			d-input(append="Y", v-model="editor.currentWidget.config.layout.position.top", :style="{ width: '100px' }")
		d-right-control(label="宽高")
			d-input(
				append="W",
				v-model="editor.currentWidget.config.layout.size.width",
				:style="{ width: '100px', marginRight: '10px' }")
			d-input(append="H", v-model="editor.currentWidget.config.layout.size.height", :style="{ width: '100px' }")
		d-right-control(label="场景")
			i-select(v-model="editor.screen.screenWidgetsLays[editor.currentWidget.id].scene")
				i-option(:value="0") 主场景
				i-option(:value="key", v-for="(item, key) in editor.sceneObj", :key="key") {{ item.name }}
				i-option(:value="-1") 回收站
		d-right-control(label="缩放比例")
			i-input(v-model="scale", :style="{ width: '100px' }")
	d-right-echarts(v-if="editor.currentWidget.config.widgetType === 'echarts'")
</template>
<script lang="ts">
import func from './func.mx'
import { Component } from 'vue-property-decorator'
import dRightEcharts from '../components-right/d-right-echarts/index.vue'

@Component({
	components: {
		dRightEcharts,
	},
})
export default class FuncBase extends func {
	get scale() {
		return `${Math.round(this.editor.currentWidget.config.layout.scale * 100)}%`
	}

	set scale(val: any) {
		if (!isNaN(val)) {
			this.editor.currentWidget.config.layout.scale = val
		} else {
			const back = this.editor.currentWidget.config.layout.scale
			if (val.indexOf('%') !== -1) {
				let v = val.replace('%', '') / 100
				if (!isNaN(v)) {
					this.editor.currentWidget.config.layout.scale = v
				} else {
					this.editor.currentWidget.config.layout.scale = back
				}
			}
		}
	}
}
</script>
