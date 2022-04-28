<template lang="pug">
.d-manage-modal-control-data
	d-right-swiper-eye(
		title="入场动画",
		:show="true",
		@open-click="editor.currentWidget.animation.transitionEnable = true",
		@close-click="editor.currentWidget.animation.transitionEnable = false",
		:enable="editor.currentWidget.animation.transitionEnable")
		d-right-control(label="动画形式")
			i-select(v-model="editor.currentWidget.animation.enter")
				i-option(:value="k.value", v-for="k in animationEnterNames", :key="k.value") {{ k.label }}
		d-right-control(label="延时时长")
			d-input(append="ms", v-model="editor.currentWidget.animation.delay")
		d-right-control(label="动画时长")
			d-input(append="ms", v-model="editor.currentWidget.animation.duration")
	data-event
	d-right-control(label="组件关联", v-if="editor.currentWidget.config.api.bind")
		i-switch(v-model="editor.currentWidget.config.api.bind.enable")
		i-select(
			v-if="editor.currentWidget.config.api.bind.enable",
			v-model="editor.currentWidget.config.api.bind.refIds",
			filterable,
			multiple,
			:style="{ width: '100px', marginLeft: '10px' }")
			i-option(:value="editor.currentWidget.id", v-for="(item, key) in relateList", :key="key") {{ item.id }}
</template>
<script lang="ts">
import func from '@/vue2/components-func/func.mx'
import { Component } from 'vue-property-decorator'
import DataEvent from '@/vue2/components-right/data-event/index.vue'

@Component({
	components: {
		DataEvent,
	},
})
export default class FuncData extends func {
	animationEnterNames: any[] = [
		{ label: '渐隐渐显', value: 'fadeIn' },
		{ label: '渐隐渐显+从左至右滑动', value: 'fadeInLeft' },
		{ label: '渐隐渐显+从右至左滑动', value: 'fadeInRight' },
		{ label: '渐隐渐显+从上至下滑动', value: 'fadeInDown' },
		{ label: '渐隐渐显+从下至上滑动', value: 'fadeInUp' },
		{ label: '渐隐渐显+从左上至右下滑动', value: 'fadeInTopLeft' },
		{ label: '渐隐渐显+从右上至左下滑动', value: 'fadeInTopRight' },
		{ label: '渐隐渐显+从左下至右上滑动', value: 'fadeInBottomLeft' },
		{ label: '渐隐渐显+从右下至左上滑动', value: 'fadeInBottomRight' },
		{ label: '从左至右滑动', value: 'slideInLeft' },
		{ label: '从右至左滑动', value: 'slideInRight' },
		{ label: '从上至下滑动', value: 'slideInDown' },
		{ label: '从下至上滑动', value: 'slideInUp' },
	]
	get relateList() {
		const list = Object.values(this.editor.screen.screenWidgets)
			.filter(
				(v: any) =>
					v.config.api.bind &&
					v.config.api.bind.enable &&
					this.editor.screen.screenWidgetsLays[v.id].scene === this.editor.currentSceneIndex,
			)
			.map((v: any) => {
				const { id, name } = v.config.widget
				return { id, name }
			})
		return list
	}
}
</script>
