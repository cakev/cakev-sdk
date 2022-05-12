<template lang="pug">
.d-manage-modal-control-data
	c-collapse(
		type="eye"
		title="入场动画",
		:value="true",
		@open-click="editor.current.widget.widgetAnimation.transitionEnable = true",
		@close-click="editor.current.widget.widgetAnimation.transitionEnable = false",
		:enable="editor.current.widget.widgetAnimation.transitionEnable")
		c-control(label="动画形式")
			template(slot="right")
				c-select(v-model="editor.current.widget.widgetAnimation.enter")
					c-select-option(:value="k.value", v-for="k in animationEnterNames", :key="k.value" :label="k.label")
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
	components: {
		DataEvent,
	},
	mixins: [func],
	data() {
		return {
			animationEnterNames: [
				{ label: '渐隐渐显', value: 'fadeIn' },
				{ label: '从左至右滑动', value: 'fadeInLeft' },
				{ label: '从右至左滑动', value: 'fadeInRight' },
				{ label: '从上至下滑动', value: 'fadeInDown' },
				{ label: '从下至上滑动', value: 'fadeInUp' },
				{ label: '从左上至右下滑动', value: 'fadeInTopLeft' },
				{ label: '从右上至左下滑动', value: 'fadeInTopRight' },
				{ label: '从左下至右上滑动', value: 'fadeInBottomLeft' },
				{ label: '从右下至左上滑动', value: 'fadeInBottomRight' },
			],
		}
	}
}
</script>
