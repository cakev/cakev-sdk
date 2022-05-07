<template lang="pug">
.d-manage-modal-control-data
	c-collapse(
		type="eye"
		title="入场动画",
		:show="true",
		@open-click="editor.current.widget.widgetAnimation.transitionEnable = true",
		@close-click="editor.current.widget.widgetAnimation.transitionEnable = false",
		:enable="editor.current.widget.widgetAnimation.transitionEnable")
		c-control(label="动画形式")
			template(slot="right")
				i-select(v-model="editor.current.widget.widgetAnimation.enter")
					i-option(:value="k.value", v-for="k in animationEnterNames", :key="k.value") {{ k.label }}
		c-control(label="延时时长")
			template(slot="right")
				c-input(append="ms", v-model="editor.current.widget.widgetAnimation.delay")
		c-control(label="动画时长")
			template(slot="right")
				c-input(append="ms", v-model="editor.current.widget.widgetAnimation.duration")
	data-event
</template>
<script lang="ts">
import func from '@/vue2/components-func/func.mx'
import DataEvent from '@/vue2/components-right/data-event/index.vue'

export default {
	name: 'func-data',
	components: {
		DataEvent,
	},
	mixins: [func],
	data() {
		return {
			animationEnterNames: [
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
			],
		}
	},
	computed: {
		relateList() {
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
		},
	},
}
</script>
