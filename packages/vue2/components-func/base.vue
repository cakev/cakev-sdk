<template lang="pug">
.d-manage-modal-control-base
	c-collapse(title="基础属性", :show="true")
		c-control(label="位置")
			template(slot="right")
				c-input(
					append="X",
					v-model="editor.current.widget.widgetLayout.left",
					:style="{ width: '100px', marginRight: '10px' }")
				c-input(append="Y", v-model="editor.current.widget.widgetLayout.top", :style="{ width: '100px' }")
		c-control(label="宽高")
			template(slot="right")
				c-input(
					append="W",
					v-model="editor.current.widget.widgetLayout.width",
					:style="{ width: '100px', marginRight: '10px' }")
				c-input(append="H", v-model="editor.current.widget.widgetLayout.height", :style="{ width: '100px' }")
		c-control(label="场景")
			template(slot="right")
				c-select(v-model="editor.screen.screenWidgetsLays[editor.current.widget.widgetId].scene")
					c-select-option(:value="0" label="主场景")
					c-select-option(:value="key", v-for="(item, key) in editor.sceneObj", :key="key" :label="item.name")
					c-select-option(:value="-1" label="回收站") 
		c-control(label="缩放比例")
			template(slot="right")
				c-input(v-model="scale" append="%")
</template>
<script lang="ts">
import func from './func.mx'

export default {
	name: 'FuncBase',
	mixins: [func],
	computed: {
		scale: {
			get() {
				return `${Math.round(this.editor.current.widget.widgetLayout.scale * 100)}`
			},
			set(val: any) {
				if (isNaN(val)) {
					this.editor.current.widget.widgetLayout.scale = 0
				} else {
					this.editor.current.widget.widgetLayout.scale = val / 100
				}
			},
		},
	},
}
</script>
