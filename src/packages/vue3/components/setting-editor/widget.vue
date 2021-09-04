<template lang="pug">
el-collapse.setting-editor-widget
	el-collapse-item(v-for="child in list", :key="child.label", :index="child.label")
		template(#title)
			d-svg(:type="child.icon" :size="16")
			span(:style="{marginLeft:'8px'}") {{child.label}}
		.cursor-pointer.fn-flex.flex-column(
			v-for="widget in child.children",
			:draggable="true",
			@dragstart="dragStart($event, widget)")
			d-img.widget-img(:src="widget.avatar")
			span.widget-title {{ widget.name }}
</template>
<script lang="ts">
import dragStart from './dragStart'
import list from './list'
import Manager from '@dorring-sdk/core/Manager'
import { reactive, toRefs, defineComponent } from 'vue'
import dSvg from '@dorring-sdk/vue3/components-style/d-svg/index.vue'
import dImg from '@dorring-sdk/vue3/components-style/d-img/index.vue'

export default defineComponent({
	name: 'setting-editor-widget',
	components: {
		dSvg,
		dImg,
	},
	setup() {
		const manager: Manager = Manager.Instance()
		const state = reactive({ list, manager })
		return {
			...toRefs(state),
			dragStart,
		}
	},
})
</script>
<style lang="scss" scoped>
.setting-editor-widget {
	padding: 0 16px;
}
.widget-img {
	width: 120px;
	height: 60px;
}

.widget-title {
	width: 120px;
	text-align: center;
}
</style>
